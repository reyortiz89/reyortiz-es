import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { defaultColor } from "@/lib/pricing";
import { siteUrl } from "@/lib/site";

/** Magic link from the free-claim email: assigns the listing to the company and opens their panel. */
export async function GET(_req: Request, { params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const t = await db.claimToken.findUnique({ where: { token }, include: { facing: true } });
  if (!t || t.usedAt || t.expiresAt < new Date()) {
    return NextResponse.redirect(siteUrl("/?claim=expired"));
  }
  if (t.facing.status !== "UNCLAIMED") {
    return NextResponse.redirect(siteUrl(`/facing/${t.facingId}?claim=taken`));
  }

  const owner = await db.owner.upsert({
    where: { email: t.email },
    update: {},
    create: { email: t.email, name: t.facing.name },
  });
  await db.$transaction([
    db.claimToken.update({ where: { id: t.id }, data: { usedAt: new Date() } }),
    db.facing.update({
      where: { id: t.facingId },
      data: {
        status: "CLAIMED",
        ownerId: owner.id,
        isFreeListing: true,
        color: t.facing.color ?? defaultColor(owner.id + t.facingId),
        currentPriceCents: t.facing.basePriceCents,
        claimedAt: new Date(),
      },
    }),
  ]);
  return NextResponse.redirect(siteUrl(`/manage/${owner.manageToken}?welcome=1`));
}
