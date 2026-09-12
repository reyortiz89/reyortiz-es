import Link from "next/link";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export default async function Success({ searchParams }: { searchParams: Promise<{ session_id?: string }> }) {
  const { session_id } = await searchParams;
  const purchase = session_id ? await db.purchase.findUnique({ where: { stripeSessionId: session_id }, include: { facing: { include: { aisle: true } } } }) : null;

  return (
    <div className="mx-auto max-w-xl px-4 sm:px-8 pt-16 text-center flex flex-col gap-4 items-center">
      <h1 className="font-display text-6xl tracking-wide">{purchase?.status === "PAID" ? "YOU'RE ON THE SHELF." : "PAYMENT RECEIVED."}</h1>
      {purchase ? (
        <>
          <p className="text-ink/75">
            {purchase.kind === "CLAIM" && "Your facing is being placed. "}
            {purchase.kind === "TAKEOVER" && "Your bid is registered. The holder has 72 hours to match — you'll hear either way. "}
            {purchase.kind === "MATCH" && "You matched the bid and kept your facing. "}
            {purchase.status !== "PAID" && "This usually takes a few seconds; refresh if it's not showing yet. "}
            Your <strong>manage link</strong> is on its way to your inbox — it is your login, keep it private.
          </p>
          <Link href={`/facing/${purchase.facingId}`} className="rounded-lg bg-orange text-white font-display text-xl tracking-wider px-6 py-3">
            SEE THE FACING
          </Link>
        </>
      ) : (
        <p className="text-ink/75">We couldn&apos;t find that checkout. If you paid, your email confirmation has everything you need.</p>
      )}
    </div>
  );
}
