import Link from "next/link";
import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { resolveExpiredTakeovers } from "@/lib/takeover";
import { SHELF_LABEL, formatUsd, matchPriceCents } from "@/lib/pricing";
import { daysAgo, facingLabel, lastNDays } from "@/lib/format";
import { Stat } from "@/components/Stat";
import { Sparkline } from "@/components/Sparkline";
import { MatchButton } from "@/components/MatchButton";
import { updateFacing } from "../actions";

export const dynamic = "force-dynamic";

export default async function ManagePage({ params, searchParams }: { params: Promise<{ token: string }>; searchParams: Promise<{ welcome?: string }> }) {
  const { token } = await params;
  const { welcome } = await searchParams;
  await resolveExpiredTakeovers();

  const since = daysAgo(14);
  const owner = await db.owner.findUnique({
    where: { manageToken: token },
    include: {
      facings: {
        include: {
          aisle: true,
          takeovers: { where: { status: "PENDING" }, include: { challenger: true } },
          stats: { where: { date: { gte: since } }, orderBy: { date: "asc" } },
          _count: { select: { cartItems: true } },
        },
        orderBy: { claimedAt: "desc" },
      },
      challenges: { where: { status: "PENDING" }, include: { facing: { include: { aisle: true } } } },
      ledger: { orderBy: { createdAt: "desc" }, take: 10 },
    },
  });
  if (!owner) notFound();

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8 pt-8 flex flex-col gap-8">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[.16em] text-ink/60">Shelf panel</div>
          <h1 className="font-display text-5xl tracking-wide">{owner.name ?? owner.email}</h1>
          {welcome && <p className="mt-1 text-sm text-orange font-semibold">Listing claimed. Bookmark this page — the link is your login.</p>}
        </div>
        <div className="rounded-lg bg-ink text-cream px-4 py-3 text-sm">
          <div className="text-[11px] uppercase tracking-wider opacity-60">Shelf Credits</div>
          <div className="font-display text-3xl text-butter">{formatUsd(owner.creditsCents)}</div>
        </div>
      </div>

      {owner.facings.length === 0 && (
        <div className="rounded-lg border border-dashed border-ink/30 p-6 text-sm text-ink/60">
          You hold no facing right now. <Link href="/" className="underline">Pick an open one</Link>{owner.creditsCents > 0 ? " — your credits apply at checkout from this panel." : "."}
        </div>
      )}

      {owner.facings.map((f) => {
        const pending = f.takeovers[0];
        const series = lastNDays(14).map((day) => f.stats.find((s) => s.date.toISOString().slice(0, 10) === day)?.views ?? 0);
        return (
          <section key={f.id} className="rounded-xl bg-white border border-line p-6 grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-16 rounded flex items-center justify-center font-display text-lg text-ink" style={{ backgroundColor: f.color ?? "#ff8a5b" }}>
                  {(f.name ?? "?").slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-bold text-lg">{f.name}</div>
                  <div className="text-xs text-ink/60">
                    <Link href={`/facing/${f.id}`} className="underline">{facingLabel(f)}</Link> · value {formatUsd(f.currentPriceCents)}
                    {f.isFreeListing && " · free listing"}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <Stat value={f.views} label="views" />
                <Stat value={series.reduce((a, b) => a + b, 0)} label="views, 14 d" />
                <Stat value={f.clicks} label="clicks out" />
                <Stat value={f._count.cartItems} label="in carts" accent />
              </div>
              <Sparkline values={series} color={f.color ?? "#ff5a1f"} />

              <form action={updateFacing} className="grid gap-3 sm:grid-cols-2 text-sm">
                <input type="hidden" name="token" value={token} />
                <input type="hidden" name="facingId" value={f.id} />
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink/60">Name on the box</span>
                  <input name="name" defaultValue={f.name ?? ""} maxLength={40} className="rounded border border-line px-3 py-2" />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink/60">Website</span>
                  <input name="url" defaultValue={f.url ?? ""} className="rounded border border-line px-3 py-2" />
                </label>
                <label className="flex flex-col gap-1 sm:col-span-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink/60">Tagline</span>
                  <input name="tagline" defaultValue={f.tagline ?? ""} maxLength={80} className="rounded border border-line px-3 py-2" />
                </label>
                <label className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink/60">Box colour</span>
                  <input type="color" name="color" defaultValue={f.color ?? "#ff8a5b"} className="h-9 w-14 rounded border border-line" />
                </label>
                <button className="rounded bg-ink text-cream font-bold py-2 sm:justify-self-end px-6">Save</button>
              </form>
            </div>

            <aside className="flex flex-col gap-3">
              {pending ? (
                <div className="rounded-lg border-2 border-orange bg-orange/5 p-4 flex flex-col gap-2">
                  <div className="font-display text-2xl tracking-wide text-orange">SOMEONE WANTS THIS FACING</div>
                  <p className="text-sm">
                    <strong>{pending.challenger.name ?? "A company"}</strong> bid <strong>{formatUsd(pending.bidCents)}</strong>. You have until{" "}
                    <strong>{pending.deadline.toUTCString()}</strong> to match.
                  </p>
                  <p className="text-xs text-ink/60">Match by paying the difference. If you don&apos;t, the facing changes hands and you receive {formatUsd(f.currentPriceCents)} in credits.</p>
                  <MatchButton facingId={f.id} takeoverId={pending.id} ownerToken={token} matchCents={matchPriceCents(f.currentPriceCents)} creditsCents={owner.creditsCents} />
                </div>
              ) : (
                <div className="rounded-lg border border-line p-4 text-sm text-ink/70">
                  <div className="font-bold text-ink">No bids right now.</div>
                  A rival would need to pay {formatUsd(Math.round(f.currentPriceCents * 1.25))} to challenge you.
                </div>
              )}
              {f.shelf !== "EYE" && (
                <Link href={`/aisle/${f.aisle.slug}`} className="rounded-lg bg-butter text-ink text-center font-display text-lg tracking-wider py-2.5">
                  UPGRADE TO EYE LEVEL
                </Link>
              )}
              <div className="text-[11px] text-ink/50">{SHELF_LABEL[f.shelf]} · position {f.position}</div>
            </aside>
          </section>
        );
      })}

      {owner.challenges.length > 0 && (
        <section className="rounded-xl bg-white border border-line p-6">
          <h2 className="font-display text-2xl tracking-wide">YOUR PENDING BIDS</h2>
          <ul className="mt-2 text-sm flex flex-col gap-1">
            {owner.challenges.map((t) => (
              <li key={t.id}>
                <Link href={`/facing/${t.facingId}`} className="underline">{facingLabel(t.facing)}</Link> — {formatUsd(t.bidCents)}, holder must match by {t.deadline.toUTCString()}
              </li>
            ))}
          </ul>
        </section>
      )}

      {owner.ledger.length > 0 && (
        <section className="text-xs text-ink/60">
          <h2 className="font-bold uppercase tracking-wider mb-1">Credits history</h2>
          <ul>
            {owner.ledger.map((l) => (
              <li key={l.id}>{l.createdAt.toISOString().slice(0, 10)} · {l.deltaCents > 0 ? "+" : ""}{formatUsd(l.deltaCents)} · {l.reason}</li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
