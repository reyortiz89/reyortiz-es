import Link from "next/link";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { after } from "next/server";
import { db } from "@/lib/db";
import { daysAgo, lastNDays } from "@/lib/format";
import { track } from "@/lib/track";
import { resolveExpiredTakeovers } from "@/lib/takeover";
import { SHELF_LABEL, domainOf, formatUsd, takeoverPriceCents } from "@/lib/pricing";
import { ClaimActions } from "@/components/ClaimActions";
import { SaveButton } from "@/components/SaveButton";
import { Sparkline } from "@/components/Sparkline";
import { Stat } from "@/components/Stat";

export const dynamic = "force-dynamic";

export default async function FacingPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await resolveExpiredTakeovers(id);

  const since = daysAgo(14);
  const facing = await db.facing.findUnique({
    where: { id },
    include: {
      aisle: true,
      takeovers: { where: { status: "PENDING" }, take: 1 },
      stats: { where: { date: { gte: since } }, orderBy: { date: "asc" } },
      _count: { select: { cartItems: true } },
    },
  });
  if (!facing) notFound();

  const country = (await headers()).get("x-vercel-ip-country");
  after(() => track(id, "view", country));

  // 14-day series and country breakdown
  const series: number[] = [];
  const countries: Record<string, number> = {};
  for (const day of lastNDays(14)) {
    const s = facing.stats.find((x) => x.date.toISOString().slice(0, 10) === day);
    series.push(s?.views ?? 0);
    for (const [c, n] of Object.entries((s?.countries ?? {}) as Record<string, number>)) countries[c] = (countries[c] ?? 0) + n;
  }
  const topCountries = Object.entries(countries).sort((a, b) => b[1] - a[1]).slice(0, 3);
  const views14 = series.reduce((a, b) => a + b, 0);

  const isClaimed = facing.status === "CLAIMED";
  const neighbours = await db.facing.findMany({
    where: { aisleId: facing.aisleId, shelf: facing.shelf, position: { in: [facing.position - 1, facing.position + 1] } },
    select: { id: true, name: true, status: true, position: true },
  });

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-8 pt-8 grid gap-8 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col gap-6">
        <div className="text-xs uppercase tracking-[.16em] text-ink/60">
          <Link href={`/aisle/${facing.aisle.slug}`} className="underline">Aisle · {facing.aisle.name}</Link> · {SHELF_LABEL[facing.shelf]} · Facing #{facing.position}
        </div>

        <div className="flex items-end gap-6">
          <div
            className={`w-[150px] h-[190px] rounded-[4px] flex flex-col items-center justify-center gap-2 px-2 shadow-[inset_-8px_0_0_rgba(0,0,0,.16),0_18px_26px_rgba(0,0,0,.25)] ${
              facing.status === "OPEN" ? "border-2 border-dashed border-orange bg-orange/5 text-orange" : ""
            }`}
            style={isClaimed ? { backgroundColor: facing.color ?? "#ff8a5b" } : facing.status === "UNCLAIMED" ? { backgroundColor: "#d9d4c7" } : undefined}
          >
            <span className="font-display text-2xl tracking-wide leading-none text-center break-words max-w-full">
              {(facing.name ?? (facing.status === "OPEN" ? "OPEN" : "")).toUpperCase()}
            </span>
            {facing.status !== "OPEN" && <span className="w-[40%] h-0.5 bg-black/35 rounded" />}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-display text-5xl tracking-wide leading-none">{facing.name ?? `Facing #${facing.position}`}</h1>
            {facing.tagline && <p className="text-ink/75">{facing.tagline}</p>}
            {facing.url && (
              <a href={`/out/${facing.id}`} target="_blank" rel="noopener sponsored" className="text-sm font-semibold underline text-orange">
                {domainOf(facing.url)} ↗
              </a>
            )}
            <div className="flex flex-wrap gap-2 mt-2 text-[10px] font-extrabold uppercase tracking-wider">
              <span className="bg-white border border-line rounded px-2 py-0.5">{facing.status === "UNCLAIMED" ? "Free listing · unclaimed" : facing.isFreeListing ? "Free listing" : facing.status === "OPEN" ? "Open" : "Paid facing"}</span>
              {facing.isFounding && <span className="bg-ink text-cream rounded px-2 py-0.5">Founding</span>}
              <span className="bg-white border border-line rounded px-2 py-0.5">Sponsored placement</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg bg-white border border-line p-5 flex flex-col gap-4">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Stat value={facing.views} label="views, all time" />
            <Stat value={views14} label="views, 14 days" />
            <Stat value={facing.clicks} label="clicks out" />
            <Stat value={facing._count.cartItems} label="in carts" accent />
          </div>
          <Sparkline values={series} color={facing.color ?? "#ff5a1f"} />
          <div className="text-[11px] text-ink/55">
            Last 14 days{topCountries.length ? ` · ${topCountries.map(([c, n]) => `${c} ${Math.round((n / Math.max(1, views14)) * 100)}%`).join(", ")}` : ""}
          </div>
        </div>

        {neighbours.length > 0 && (
          <div className="text-sm text-ink/70">
            Next to:{" "}
            {neighbours.map((n, i) => (
              <span key={n.id}>
                {i > 0 && " · "}
                <Link href={`/facing/${n.id}`} className="underline">{n.status === "OPEN" ? `open facing #${n.position}` : n.name}</Link>
              </span>
            ))}
          </div>
        )}
      </div>

      <aside className="flex flex-col gap-4 lg:sticky lg:top-24 self-start">
        <div className="rounded-xl bg-ink text-cream p-5 flex flex-col gap-4">
          <div className="text-[11px] uppercase tracking-[.16em] opacity-60">{SHELF_LABEL[facing.shelf]} · facing #{facing.position}</div>
          <ClaimActions
            facingId={facing.id}
            status={facing.status}
            priceCents={facing.currentPriceCents}
            takeoverCents={takeoverPriceCents(facing.currentPriceCents)}
            pendingUntil={facing.takeovers[0]?.deadline.toISOString() ?? null}
            freeDomain={facing.url ? domainOf(facing.url) : null}
            aisleOpen={facing.aisle.status === "OPEN"}
          />
        </div>
        <div className="flex items-center justify-between">
          <SaveButton facingId={facing.id} initialCount={facing._count.cartItems} />
          <span className="text-xs text-ink/55">Base price {formatUsd(facing.basePriceCents)}</span>
        </div>
      </aside>
    </div>
  );
}
