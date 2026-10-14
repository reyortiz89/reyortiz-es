import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";
import { deliverLead, rateLimited, verifyTurnstile } from "@/lib/leads";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? null;
  if (rateLimited(ip ?? "unknown")) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  const body = await req.json().catch(() => null);
  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const fields = parsed.error.issues.map((i) => String(i.path[0]));
    // A filled honeypot is a bot: pretend success so it learns nothing.
    if (fields.includes("website")) return NextResponse.json({ ok: true });
    return NextResponse.json({ ok: false, error: "invalid", fields }, { status: 400 });
  }

  if (!(await verifyTurnstile(parsed.data.turnstileToken, ip).catch(() => false))) {
    return NextResponse.json({ ok: false, error: "captcha" }, { status: 400 });
  }

  const result = await deliverLead(parsed.data);
  const delivered = result.closeby === true || result.email === true;
  const nothingConfigured = result.closeby === null && result.email === null;

  if (nothingConfigured) {
    console.warn("[leads] no delivery channel configured; lead received:", parsed.data.email);
    if (process.env.NODE_ENV === "production") {
      return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
    }
    return NextResponse.json({ ok: true });
  }
  if (!delivered) return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
