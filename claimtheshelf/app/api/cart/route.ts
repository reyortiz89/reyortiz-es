import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { db } from "@/lib/db";

const COOKIE = "cts_visitor";

export async function POST(req: Request) {
  const { facingId, add } = (await req.json()) as { facingId?: string; add?: boolean };
  if (!facingId) return NextResponse.json({ error: "facingId required" }, { status: 400 });

  const jar = await cookies();
  let visitorId = jar.get(COOKIE)?.value;
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    jar.set(COOKIE, visitorId, { httpOnly: true, sameSite: "lax", maxAge: 60 * 60 * 24 * 365, path: "/" });
  }

  if (add === false) {
    await db.cartItem.deleteMany({ where: { visitorId, facingId } });
  } else {
    await db.cartItem.upsert({
      where: { visitorId_facingId: { visitorId, facingId } },
      update: {},
      create: { visitorId, facingId },
    });
  }
  const count = await db.cartItem.count({ where: { facingId } });
  return NextResponse.json({ inCarts: count });
}
