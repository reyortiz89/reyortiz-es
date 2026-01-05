import { NextResponse } from "next/server";
import { createTransport } from "nodemailer";

const REQUIRED_ENV = [
  "ZOHO_SMTP_HOST",
  "ZOHO_SMTP_PORT",
  "ZOHO_SMTP_USER",
  "ZOHO_SMTP_PASS",
  "CONTACT_TO_EMAIL",
] as const;

type RequiredEnvKey = (typeof REQUIRED_ENV)[number];

function getEnv(name: RequiredEnvKey) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(req: Request) {
  try {
    // Ensure required env vars exist
    for (const key of REQUIRED_ENV) getEnv(key);

    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
    }

    const name = typeof body.name === "string" ? body.name.trim() : "";
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";

    if (!name || !email || !message) {
      return NextResponse.json(
        { ok: false, error: "Missing required fields" },
        { status: 400 }
      );
    }
    if (!isValidEmail(email)) {
      return NextResponse.json({ ok: false, error: "Invalid email" }, { status: 400 });
    }

    const host = getEnv("ZOHO_SMTP_HOST");
    const port = Number(getEnv("ZOHO_SMTP_PORT"));
    const user = getEnv("ZOHO_SMTP_USER");
    const pass = getEnv("ZOHO_SMTP_PASS");
    const to = getEnv("CONTACT_TO_EMAIL");
    const from = process.env.CONTACT_FROM_EMAIL || user;

    const transporter = createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass },
    });

    // Send from your Zoho mailbox to avoid spoofing/DMARC issues.
    // Put visitor email in Reply-To.
    await transporter.sendMail({
      from: {
        name: process.env.CONTACT_FROM_NAME || "Website Contact",
        address: from,
      },
      to,
      subject: `New message from ${name}`,
      replyTo: email,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}\n`,
      html: `
        <div style="font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Arial; line-height: 1.5">
          <p><strong>Name:</strong> ${escapeHtml(name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(email)}</p>
          <hr />
          <p style="white-space: pre-wrap">${escapeHtml(message)}</p>
        </div>
      `.trim(),
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}

function escapeHtml(input: string) {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
