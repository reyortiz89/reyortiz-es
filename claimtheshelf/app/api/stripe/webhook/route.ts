import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { emails } from "@/lib/email";
import { defaultColor, matchPriceCents, MATCH_WINDOW_HOURS } from "@/lib/pricing";
import { facingLabel } from "@/lib/format";

export const runtime = "nodejs";

function field(session: Stripe.Checkout.Session, key: string) {
  return session.custom_fields?.find((f) => f.key === key)?.text?.value?.trim() || null;
}

function normalizeUrl(u: string | null) {
  if (!u) return null;
  return /^https?:\/\//i.test(u) ? u : `https://${u}`;
}

export async function POST(req: Request) {
  const sig = req.headers.get("stripe-signature");
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!sig || !secret) return NextResponse.json({ error: "Webhook not configured" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe().webhooks.constructEvent(await req.text(), sig, secret);
  } catch (e) {
    return NextResponse.json({ error: `Bad signature: ${(e as Error).message}` }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed" && event.type !== "checkout.session.async_payment_succeeded") {
    return NextResponse.json({ received: true });
  }
  const session = event.data.object as Stripe.Checkout.Session;
  if (session.payment_status !== "paid") return NextResponse.json({ received: true });

  const purchase = await db.purchase.findUnique({ where: { stripeSessionId: session.id } });
  if (!purchase) return NextResponse.json({ error: "Unknown session" }, { status: 404 });
  if (purchase.status === "PAID") return NextResponse.json({ received: true }); // idempotent

  const email = (session.customer_details?.email ?? session.customer_email ?? "").toLowerCase();
  if (!email) return NextResponse.json({ error: "No email on session" }, { status: 400 });
  const paymentIntentId = typeof session.payment_intent === "string" ? session.payment_intent : session.payment_intent?.id ?? null;

  const companyName = field(session, "company");
  const companyUrl = normalizeUrl(field(session, "website"));
  const tagline = field(session, "tagline");

  const owner = await db.owner.upsert({
    where: { email },
    update: { name: companyName ?? undefined },
    create: { email, name: companyName ?? session.customer_details?.name ?? null },
  });

  const facing = await db.facing.findUniqueOrThrow({ where: { id: purchase.facingId }, include: { aisle: true, owner: true } });
  const label = facingLabel(facing);

  // credits used are deducted now that the payment is real
  const settle = async (extra: object = {}) =>
    db.$transaction(async (tx) => {
      await tx.purchase.update({
        where: { id: purchase.id },
        data: { status: "PAID", ownerId: owner.id, email, stripePaymentIntentId: paymentIntentId, companyName, companyUrl, tagline, ...extra },
      });
      if (purchase.creditsUsedCents > 0) {
        await tx.owner.update({ where: { id: owner.id }, data: { creditsCents: { decrement: purchase.creditsUsedCents } } });
        await tx.creditLedger.create({ data: { ownerId: owner.id, deltaCents: -purchase.creditsUsedCents, reason: "Credits applied at checkout", refId: purchase.id } });
      }
    });

  if (purchase.kind === "CLAIM") {
    if (facing.status === "CLAIMED") {
      // someone else got it first — refund
      if (paymentIntentId) await stripe().refunds.create({ payment_intent: paymentIntentId });
      await db.purchase.update({ where: { id: purchase.id }, data: { status: "REFUNDED", ownerId: owner.id, email } });
      return NextResponse.json({ received: true, refunded: true });
    }
    await settle();
    await db.facing.update({
      where: { id: facing.id },
      data: {
        status: "CLAIMED",
        ownerId: owner.id,
        name: companyName ?? owner.name ?? "Claimed",
        url: companyUrl,
        tagline,
        color: facing.color ?? defaultColor(owner.id + facing.id),
        isFreeListing: false,
        claimedAt: new Date(),
      },
    });
    await emails.claimed(email, label, owner.manageToken);
    return NextResponse.json({ received: true });
  }

  if (purchase.kind === "TAKEOVER") {
    const existing = await db.takeover.findFirst({ where: { facingId: facing.id, status: "PENDING" } });
    if (!facing.ownerId || facing.status !== "CLAIMED" || existing || facing.ownerId === owner.id) {
      if (paymentIntentId) await stripe().refunds.create({ payment_intent: paymentIntentId });
      await db.purchase.update({ where: { id: purchase.id }, data: { status: "REFUNDED", ownerId: owner.id, email } });
      return NextResponse.json({ received: true, refunded: true });
    }
    await settle();
    const deadline = new Date(Date.now() + MATCH_WINDOW_HOURS * 3600 * 1000);
    const takeover = await db.takeover.create({
      data: {
        facingId: facing.id,
        challengerId: owner.id,
        incumbentId: facing.ownerId,
        bidCents: purchase.amountCents,
        previousPriceCents: facing.currentPriceCents,
        deadline,
        purchaseId: purchase.id,
      },
    });
    await db.purchase.update({ where: { id: purchase.id }, data: { takeoverId: takeover.id } });
    const incumbent = facing.owner!;
    await emails.takeoverNoticeToIncumbent(incumbent.email, label, purchase.amountCents, matchPriceCents(facing.currentPriceCents), deadline, incumbent.manageToken);
    await emails.takeoverReceipt(email, label, purchase.amountCents, deadline, owner.manageToken);
    return NextResponse.json({ received: true });
  }

  // MATCH
  const takeover = purchase.takeoverId
    ? await db.takeover.findUnique({ where: { id: purchase.takeoverId }, include: { purchase: true, challenger: true } })
    : null;
  if (!takeover || takeover.status !== "PENDING" || takeover.incumbentId !== owner.id) {
    if (paymentIntentId) await stripe().refunds.create({ payment_intent: paymentIntentId });
    await db.purchase.update({ where: { id: purchase.id }, data: { status: "REFUNDED", ownerId: owner.id, email } });
    return NextResponse.json({ received: true, refunded: true });
  }
  await settle();
  await db.$transaction([
    db.takeover.update({ where: { id: takeover.id }, data: { status: "MATCHED", resolvedAt: new Date(), matchPurchaseId: purchase.id } }),
    db.facing.update({ where: { id: facing.id }, data: { currentPriceCents: takeover.bidCents } }),
    db.purchase.update({ where: { id: takeover.purchaseId }, data: { status: "REFUNDED" } }),
  ]);
  if (takeover.purchase.stripePaymentIntentId) {
    await stripe().refunds.create({ payment_intent: takeover.purchase.stripePaymentIntentId });
  }
  await emails.takeoverMatched(takeover.challenger.email, email, label, takeover.bidCents);
  return NextResponse.json({ received: true });
}
