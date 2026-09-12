import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { emails } from "@/lib/email";
import { domainOf } from "@/lib/pricing";

/** A free (unclaimed) listing can be claimed by anyone with an email at the listed company's domain. */
export async function POST(req: Request) {
  const { facingId, email } = (await req.json()) as { facingId?: string; email?: string };
  if (!facingId || !email) return NextResponse.json({ error: "Missing fields" }, { status: 400 });

  const facing = await db.facing.findUnique({ where: { id: facingId } });
  if (!facing || facing.status !== "UNCLAIMED" || !facing.url) {
    return NextResponse.json({ error: "This listing cannot be claimed for free" }, { status: 400 });
  }
  const domain = domainOf(facing.url);
  const emailDomain = email.toLowerCase().split("@")[1];
  if (!domain || !emailDomain || !(emailDomain === domain || emailDomain.endsWith(`.${domain}`))) {
    return NextResponse.json({ error: `Use an email address at ${domain ?? "the company's domain"}` }, { status: 400 });
  }

  const token = await db.claimToken.create({
    data: { facingId, email: email.toLowerCase(), expiresAt: new Date(Date.now() + 24 * 3600 * 1000) },
  });
  await emails.freeClaimLink(email, facing.name ?? domain, token.token);
  return NextResponse.json({ ok: true });
}
