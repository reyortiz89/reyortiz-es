import { db } from "./db";
import { emails } from "./email";
import { defaultColor } from "./pricing";
import { facingLabel } from "./format";

/**
 * Resolve every pending takeover whose 72 h match window has expired:
 * the facing changes hands, the incumbent gets the previous value in credits.
 * Safe to call from the cron and lazily from page renders.
 */
export async function resolveExpiredTakeovers(facingId?: string) {
  const expired = await db.takeover.findMany({
    where: { status: "PENDING", deadline: { lt: new Date() }, ...(facingId ? { facingId } : {}) },
    include: { facing: { include: { aisle: true } }, purchase: true, challenger: true, incumbent: true },
  });

  for (const t of expired) {
    const done = await db.$transaction(async (tx) => {
      // re-check inside the transaction so two workers cannot resolve the same takeover
      const fresh = await tx.takeover.updateMany({
        where: { id: t.id, status: "PENDING" },
        data: { status: "COMPLETED", resolvedAt: new Date() },
      });
      if (fresh.count === 0) return false;

      await tx.facing.update({
        where: { id: t.facingId },
        data: {
          ownerId: t.challengerId,
          currentPriceCents: t.bidCents,
          name: t.purchase.companyName ?? t.challenger.name ?? "New holder",
          url: t.purchase.companyUrl ?? null,
          tagline: t.purchase.tagline ?? null,
          color: defaultColor(t.challengerId + t.facingId),
          isFreeListing: false,
          isFounding: false,
          claimedAt: new Date(),
        },
      });
      await tx.owner.update({ where: { id: t.incumbentId }, data: { creditsCents: { increment: t.previousPriceCents } } });
      await tx.creditLedger.create({
        data: { ownerId: t.incumbentId, deltaCents: t.previousPriceCents, reason: "Facing taken over", refId: t.id },
      });
      return true;
    });

    if (done) {
      await emails.takeoverCompleted(
        t.challenger.email,
        t.incumbent.email,
        facingLabel(t.facing),
        t.bidCents,
        t.previousPriceCents,
        t.challenger.manageToken,
        t.incumbent.manageToken,
      );
    }
  }
  return expired.length;
}
