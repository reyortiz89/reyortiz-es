import "server-only";
import { createTransport } from "nodemailer";
import type { Lead } from "./lead-schema";

/**
 * Lead delivery: every captured lead is (1) pushed to Closeby and (2) emailed
 * through the Closeby SMTP account, plus a confirmation to the visitor.
 * Each channel is optional so the site keeps working while one is not configured.
 */

type DeliveryResult = { closeby: boolean | null; email: boolean | null };

function smtpConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function transporter() {
  const port = Number(process.env.SMTP_PORT ?? 465);
  return createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function leadRows(lead: Lead) {
  return [
    ["Nombre", lead.name],
    ["Email", lead.email],
    ["Teléfono", lead.phone],
    ["Empresa", lead.company],
    ["Tamaño", lead.companySize],
    ["Interés", lead.interest],
    ["Idioma", lead.locale],
    ["Origen", lead.source],
    ["Página", lead.pageUrl],
    ["UTM", lead.utm && Object.keys(lead.utm).length ? JSON.stringify(lead.utm) : ""],
  ].filter(([, v]) => v) as [string, string][];
}

async function sendToCloseby(lead: Lead): Promise<boolean | null> {
  const url = process.env.CLOSEBY_WEBHOOK_URL;
  if (!url) return null;
  const payload = {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    companySize: lead.companySize,
    interest: lead.interest,
    message: lead.message,
    locale: lead.locale,
    source: lead.source,
    pageUrl: lead.pageUrl,
    utm: lead.utm,
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.CLOSEBY_API_KEY ? { Authorization: `Bearer ${process.env.CLOSEBY_API_KEY}` } : {}),
    },
    body: JSON.stringify({ ...payload, consentAt: new Date().toISOString(), site: "reyortiz.es" }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Closeby responded ${res.status}`);
  return true;
}

async function sendEmails(lead: Lead): Promise<boolean | null> {
  if (!smtpConfigured()) return null;
  const from = process.env.SMTP_FROM || process.env.SMTP_USER!;
  const to = process.env.LEADS_NOTIFY_TO || from;
  const fromName = process.env.SMTP_FROM_NAME || "Rey Ortiz";
  const mailer = transporter();
  const rows = leadRows(lead);

  // Sent from our own mailbox (SPF/DKIM aligned); the visitor goes in Reply-To.
  await mailer.sendMail({
    from: { name: "reyortiz.es", address: from },
    to,
    replyTo: lead.email,
    subject: `Nuevo lead (${lead.source}): ${lead.name}${lead.company ? ` · ${lead.company}` : ""}`,
    text: `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${lead.message}\n`,
    html: `<div style="font-family:system-ui,sans-serif;line-height:1.5">
      <table>${rows.map(([k, v]) => `<tr><td style="padding-right:12px;color:#555">${k}</td><td>${escapeHtml(v)}</td></tr>`).join("")}</table>
      <hr/><p style="white-space:pre-wrap">${escapeHtml(lead.message)}</p></div>`,
  });

  // Confirmation to the visitor. Failure here should not fail the lead.
  const isEs = lead.locale === "es";
  await mailer
    .sendMail({
      from: { name: fromName, address: from },
      to: lead.email,
      subject: isEs ? "He recibido tu mensaje" : "I've received your message",
      text: isEs
        ? `Hola ${lead.name},\n\nGracias por escribirme. He recibido tu mensaje y te responderé lo antes posible con los siguientes pasos.\n\nUn saludo,\nRey Ortiz\nhttps://reyortiz.es`
        : `Hi ${lead.name},\n\nThanks for reaching out. I've received your message and will get back to you as soon as possible with next steps.\n\nBest,\nRey Ortiz\nhttps://reyortiz.es`,
    })
    .catch((err) => console.error("[leads] confirmation email failed", err));

  return true;
}

export async function deliverLead(lead: Lead): Promise<DeliveryResult> {
  const [closeby, email] = await Promise.allSettled([sendToCloseby(lead), sendEmails(lead)]);
  const result: DeliveryResult = {
    closeby: closeby.status === "fulfilled" ? closeby.value : false,
    email: email.status === "fulfilled" ? email.value : false,
  };
  if (closeby.status === "rejected") console.error("[leads] Closeby delivery failed", closeby.reason);
  if (email.status === "rejected") console.error("[leads] email delivery failed", email.reason);
  return result;
}

export async function verifyTurnstile(token: string | undefined, ip: string | null) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // Antispam disabled until keys are configured.
  if (!token) return false;
  const body = new URLSearchParams({ secret, response: token });
  if (ip) body.set("remoteip", ip);
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    body,
    signal: AbortSignal.timeout(5000),
  });
  const data = (await res.json()) as { success?: boolean };
  return data.success === true;
}

// Best-effort, per-instance rate limit. Enough to stop casual abuse; swap for
// a shared store (e.g. Upstash) if spam becomes a problem.
const hits = new Map<string, number[]>();
export function rateLimited(key: string, limit = 5, windowMs = 10 * 60_000) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > limit;
}
