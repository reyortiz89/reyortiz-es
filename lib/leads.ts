import "server-only";
import { createTransport } from "nodemailer";
import { site } from "@/content/site";
import { notificationEmail, visitorEmail } from "./emails";
import type { Lead } from "./lead-schema";

/**
 * Lead delivery: every captured lead is emailed to Rey through the SMTP
 * mailbox (Namecheap Private Email by default), plus a confirmation to the
 * visitor. An optional webhook can forward leads to a CRM later on.
 */

type DeliveryResult = { webhook: boolean | null; email: boolean | null };

const smtp = {
  host: process.env.SMTP_HOST || "mail.privateemail.com",
  port: Number(process.env.SMTP_PORT || 465),
  user: process.env.SMTP_USER || site.email,
  pass: process.env.SMTP_PASS,
};

function transporter() {
  return createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.port === 465, // 465 = SSL; 587 = STARTTLS
    auth: { user: smtp.user, pass: smtp.pass },
  });
}

async function sendToWebhook(lead: Lead): Promise<boolean | null> {
  const url = process.env.LEADS_WEBHOOK_URL;
  if (!url) return null;
  const payload = {
    name: lead.name,
    email: lead.email,
    phone: lead.phone,
    company: lead.company,
    companySize: lead.companySize,
    interest: lead.interest,
    message: lead.message,
    assessment: lead.assessment,
    locale: lead.locale,
    source: lead.source,
    pageUrl: lead.pageUrl,
    utm: lead.utm,
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(process.env.LEADS_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.LEADS_WEBHOOK_TOKEN}` } : {}),
    },
    body: JSON.stringify({ ...payload, consentAt: new Date().toISOString(), site: "reyortiz.es" }),
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
  return true;
}

async function sendEmails(lead: Lead): Promise<boolean | null> {
  if (!smtp.pass) return null;
  const from = process.env.SMTP_FROM || smtp.user;
  const to = process.env.LEADS_NOTIFY_TO || from;
  const fromName = process.env.SMTP_FROM_NAME || "Rey Ortiz";
  const mailer = transporter();

  // Sent from our own mailbox (SPF/DKIM aligned); the visitor goes in Reply-To.
  await mailer.sendMail({ from: { name: "reyortiz.es", address: from }, to, replyTo: lead.email, ...notificationEmail(lead) });

  // Confirmation, report or video access for the visitor. Failure here should not fail the lead.
  await mailer
    .sendMail({ from: { name: fromName, address: from }, to: lead.email, ...visitorEmail(lead) })
    .catch((err) => console.error("[leads] visitor email failed", err));

  return true;
}

export async function deliverLead(lead: Lead): Promise<DeliveryResult> {
  const [webhook, email] = await Promise.allSettled([sendToWebhook(lead), sendEmails(lead)]);
  const result: DeliveryResult = {
    webhook: webhook.status === "fulfilled" ? webhook.value : false,
    email: email.status === "fulfilled" ? email.value : false,
  };
  if (webhook.status === "rejected") console.error("[leads] webhook delivery failed", webhook.reason);
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
