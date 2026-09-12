import Link from "next/link";
import { db } from "@/lib/db";
import { formatUsd } from "@/lib/pricing";
import { daysAgo, facingLabel } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function StatsPage() {
  const since = daysAgo(7);
  const [claimed, open, unclaimed, takeovers, pending, totals, top, recent] = await Promise.all([
    db.facing.count({ where: { status: "CLAIMED" } }),
    db.facing.count({ where: { status: "OPEN", aisle: { status: "OPEN" } } }),
    db.facing.count({ where: { status: "UNCLAIMED" } }),
    db.takeover.count(),
    db.takeover.count({ where: { status: "PENDING" } }),
    db.facing.aggregate({ _sum: { views: true, clicks: true } }),
    db.dailyStat.groupBy({ by: ["facingId"], where: { date: { gte: since } }, _sum: { views: true }, orderBy: { _sum: { views: "desc" } }, take: 10 }),
    db.purchase.findMany({ where: { status: "PAID" }, orderBy: { createdAt: "desc" }, take: 10, include: { facing: { include: { aisle: true } } } }),
  ]);
  const topFacings = await db.facing.findMany({ where: { id: { in: top.map((t) => t.facingId) } }, include: { aisle: true } });

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8 pt-8 flex flex-col gap-8">
      <div>
        <div className="text-xs uppercase tracking-[.16em] text-ink/60">Built in public</div>
        <h1 className="font-display text-5xl tracking-wide">LIVE STATS</h1>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          [claimed, "facings claimed"],
          [open, "open facings"],
          [unclaimed, "free listings unclaimed"],
          [takeovers, `takeover bids (${pending} pending)`],
          [totals._sum.views ?? 0, "shelf views"],
          [totals._sum.clicks ?? 0, "clicks out"],
        ].map(([v, l]) => (
          <div key={String(l)} className="rounded-lg bg-white border border-line p-4">
            <div className="font-display text-4xl">{Number(v).toLocaleString("en-US")}</div>
            <div className="text-xs uppercase tracking-wider text-ink/60">{l}</div>
          </div>
        ))}
      </div>

      <section className="rounded-xl bg-white border border-line p-6">
        <h2 className="font-display text-2xl tracking-wide">SHELF REPORT · MOST VIEWED, LAST 7 DAYS</h2>
        <ol className="mt-3 flex flex-col gap-1 text-sm">
          {top.map((t, i) => {
            const f = topFacings.find((x) => x.id === t.facingId);
            if (!f) return null;
            return (
              <li key={t.facingId} className="flex items-center gap-3">
                <span className="w-6 font-bold opacity-60">{i + 1}</span>
                <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: f.color ?? "#d9d4c7" }} />
                <Link href={`/facing/${f.id}`} className="underline">{f.name ?? `Facing #${f.position}`}</Link>
                <span className="text-ink/50">{facingLabel(f)}</span>
                <span className="ml-auto font-bold">{(t._sum.views ?? 0).toLocaleString("en-US")}</span>
              </li>
            );
          })}
          {top.length === 0 && <li className="text-ink/50">No views recorded yet.</li>}
        </ol>
      </section>

      <section className="rounded-xl bg-white border border-line p-6">
        <h2 className="font-display text-2xl tracking-wide">RECENT MOVES</h2>
        <ul className="mt-3 flex flex-col gap-1 text-sm">
          {recent.map((p) => (
            <li key={p.id} className="flex gap-3">
              <span className="text-ink/50 w-24">{p.createdAt.toISOString().slice(0, 10)}</span>
              <span className="font-bold w-20">{p.kind === "CLAIM" ? "Claim" : p.kind === "TAKEOVER" ? "Bid" : "Match"}</span>
              <Link href={`/facing/${p.facingId}`} className="underline">{facingLabel(p.facing)}</Link>
              <span className="ml-auto">{formatUsd(p.amountCents)}</span>
            </li>
          ))}
          {recent.length === 0 && <li className="text-ink/50">Nothing yet — the shelf just opened.</li>}
        </ul>
      </section>
    </div>
  );
}
