import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { db } from "@/lib/db";
import { stripe, stripeTaxEnabled } from "@/lib/stripe";
import { matchPriceCents, takeoverPriceCents } from "@/lib/pricing";
import { siteUrl } from "@/lib/site";
import { facingLabel } from "@/lib/format";

type Body = {
  facingId: string;
  kind: "claim" | "takeover" | "match";
  takeoverId?: string;
  ownerToken?: string;
  useCredits?: boolean;
};

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }
  const { facingId, kind } = body;
  if (!facingId || !["claim", "takeover", "match"].includes(kind)) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  const facing = await db.facing.findUnique({
    where: { id: facingId },
    include: { aisle: true, takeovers: { where: { status: "PENDING" } } },
  });
  if (!facing) return NextResponse.json({ error: "Facing not found" }, { status: 404 });
  if (facing.aisle.status !== "OPEN") return NextResponse.json({ error: "This aisle is not open yet" }, { status: 400 });

  const owner = body.ownerToken ? await db.owner.findUnique({ where: { manageToken: body.ownerToken } }) : null;
  const pending = facing.takeovers[0];
  const label = facingLabel(facing);

  let amount: number;
  let description: string;
  let takeoverId: string | undefined;

  if (kind === "claim") {
    if (facing.status === "CLAIMED") return NextResponse.json({ error: "This facing is taken — bid for it instead" }, { status: 400 });
    amount = facing.currentPriceCents;
    description = `Claim facing · ${label}`;
  } else if (kind === "takeover") {
    if (facing.status !== "CLAIMED" || !facing.ownerId) return NextResponse.json({ error: "Nothing to take over — claim it directly" }, { status: 400 });
    if (pending) return NextResponse.json({ error: "A bid is already pending on this facing" }, { status: 409 });
    if (owner && owner.id === facing.ownerId) return NextResponse.json({ error: "You already hold this facing" }, { status: 400 });
    amount = takeoverPriceCents(facing.currentPriceCents);
    description = `Take over facing · ${label}`;
  } else {
    if (!owner) return NextResponse.json({ error: "Sign in through your manage link to match" }, { status: 401 });
    if (!pending || pending.id !== body.takeoverId || pending.incumbentId !== owner.id) {
      return NextResponse.json({ error: "No pending bid to match" }, { status: 400 });
    }
    amount = matchPriceCents(facing.currentPriceCents);
    description = `Match bid · ${label}`;
    takeoverId = pending.id;
  }

  // Shelf Credits: applied as a one-off Stripe coupon; deducted on payment in the webhook.
  let creditsUsed = 0;
  const discounts: Stripe.Checkout.SessionCreateParams.Discount[] = [];
  if (owner && body.useCredits && owner.creditsCents > 0) {
    creditsUsed = Math.min(owner.creditsCents, Math.max(0, amount - 100));
    if (creditsUsed > 0) {
      const coupon = await stripe().coupons.create({ amount_off: creditsUsed, currency: "usd", duration: "once", name: "Shelf Credits", max_redemptions: 1 });
      discounts.push({ coupon: coupon.id });
    }
  }

  const customFields: Stripe.Checkout.SessionCreateParams.CustomField[] =
    kind === "match"
      ? []
      : [
          { key: "company", label: { type: "custom", custom: "Company name (shown on the box)" }, type: "text", text: { maximum_length: 40 } },
          { key: "website", label: { type: "custom", custom: "Website URL" }, type: "text", text: { maximum_length: 120 } },
          { key: "tagline", label: { type: "custom", custom: "Tagline (optional)" }, type: "text", optional: true, text: { maximum_length: 80 } },
        ];

  const session = await stripe().checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: amount,
          product_data: { name: description, description: "Permanent facing on claimtheshelf.com. Licence to display while the service operates." },
        },
      },
    ],
    custom_fields: customFields,
    ...(discounts.length ? { discounts } : { allow_promotion_codes: false }),
    ...(owner ? { customer_email: owner.email } : {}),
    ...(stripeTaxEnabled() ? { automatic_tax: { enabled: true }, tax_id_collection: { enabled: true } } : {}),
    billing_address_collection: stripeTaxEnabled() ? "required" : "auto",
    metadata: { facingId, kind, takeoverId: takeoverId ?? "", ownerId: owner?.id ?? "" },
    success_url: siteUrl(`/checkout/success?session_id={CHECKOUT_SESSION_ID}`),
    cancel_url: siteUrl(`/facing/${facingId}`),
    consent_collection: { terms_of_service: "required" },
    custom_text: {
      terms_of_service_acceptance: { message: `I accept the [terms](${siteUrl("/terms")}): a facing is a licence to display, not property or an investment; no traffic is guaranteed; Shelf Credits are internal and non-refundable.` },
    },
  });

  await db.purchase.create({
    data: {
      facingId,
      ownerId: owner?.id,
      kind: kind === "claim" ? "CLAIM" : kind === "takeover" ? "TAKEOVER" : "MATCH",
      amountCents: amount,
      creditsUsedCents: creditsUsed,
      stripeSessionId: session.id,
      takeoverId,
    },
  });

  return NextResponse.json({ url: session.url });
}
