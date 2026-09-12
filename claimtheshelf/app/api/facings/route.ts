import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  const ids = (new URL(req.url).searchParams.get("ids") ?? "").split(",").filter(Boolean).slice(0, 50);
  const facings = await db.facing.findMany({
    where: { id: { in: ids } },
    select: { id: true, name: true, tagline: true, color: true, url: true, status: true, aisle: { select: { name: true } } },
  });
  return NextResponse.json({ facings: facings.map((f) => ({ ...f, aisle: f.aisle.name })) });
}
