import Link from "next/link";
import { AisleTabs } from "@/components/AisleTabs";
import { Shelf } from "@/components/Shelf";
import { db } from "@/lib/db";
import { aisleTabs, aisleWithFacings, firstOpenAisleSlug } from "@/lib/queries";
import { formatUsd } from "@/lib/pricing";

export const dynamic = "force-dynamic";

export default async function Home() {
  const slug = await firstOpenAisleSlug();
  const [tabs, aisle, totals] = await Promise.all([
    aisleTabs(),
    slug ? aisleWithFacings(slug) : null,
    db.facing.aggregate({ _sum: { views: true, clicks: true }, _count: { _all: true } }),
  ]);
  const facings = aisle?.facings ?? [];
  const eyeOpen = facings.filter((f) => f.shelf === "EYE" && f.status === "OPEN").length;
  const claimed = facings.filter((f) => f.status === "CLAIMED").length;
  const takeovers = await db.takeover.count();

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8">
      <section className="pt-10 pb-8 flex flex-col lg:flex-row lg:items-end gap-6 justify-between">
        <div className="max-w-2xl">
          <h1 className="font-display text-6xl sm:text-7xl leading-[.9] tracking-wide">
            A SUPERMARKET SHELF <span className="text-orange">FOR SOFTWARE.</span>
          </h1>
          <p className="mt-4 text-lg text-ink/75 max-w-xl">
            Claim a permanent facing. Fight for eye level. See exactly who looks at you. Any rival can take your spot at 1.25× —
            unless you match.
          </p>
        </div>
        {aisle && (
          <div className="flex items-center gap-3 self-start lg:self-auto">
            <div className="flex items-center gap-2 bg-ink text-cream rounded-full px-4 py-2 text-sm">
              <span className="w-2 h-2 rounded-full bg-butter" />
              <strong>{claimed} / {facings.length}</strong>&nbsp;in {aisle.name} ·&nbsp;
              <strong className="text-butter">{eyeOpen} eye-level left</strong>
            </div>
          </div>
        )}
      </section>

      {aisle ? (
        <section className="flex flex-col gap-4">
          <AisleTabs aisles={tabs} active={aisle.slug} />
          <Shelf facings={facings} />
          <p className="text-xs text-ink/55">
            Grey boxes are free listings — companies we put on the shelf and that can claim their box at no cost. Coloured boxes are paid facings.
            Placement is never an endorsement.
          </p>
        </section>
      ) : (
        <section className="rounded-lg border border-dashed border-ink/30 p-8 text-center text-ink/60">No aisle is open yet. Run the seed to create the first one.</section>
      )}

      <section id="how" className="mt-16 grid gap-6 md:grid-cols-3">
        {[
          ["1. Claim a facing", `Pick an open box. Eye level is ${formatUsd(8900)}, the bottom shelf ${formatUsd(2900)}. One payment, no renewal.`],
          ["2. Defend it", "Anyone can bid 1.25× for your box. You get 72 hours to match by paying the difference. If you don't, they take it and you get its value back in Shelf Credits."],
          ["3. Watch the numbers", "Every facing shows views, clicks, countries and how many visitors saved it to their cart. Real numbers, updated live."],
        ].map(([t, d]) => (
          <div key={t} className="rounded-lg bg-white border border-line p-6">
            <h3 className="font-display text-2xl tracking-wide">{t}</h3>
            <p className="mt-2 text-sm text-ink/75">{d}</p>
          </div>
        ))}
      </section>

      <section className="mt-12 rounded-lg bg-ink text-cream p-6 flex flex-wrap gap-8 items-center justify-between">
        <div className="flex gap-8">
          <div><div className="font-display text-4xl">{(totals._sum.views ?? 0).toLocaleString("en-US")}</div><div className="text-xs uppercase tracking-wider opacity-60">shelf views</div></div>
          <div><div className="font-display text-4xl">{(totals._sum.clicks ?? 0).toLocaleString("en-US")}</div><div className="text-xs uppercase tracking-wider opacity-60">clicks out</div></div>
          <div><div className="font-display text-4xl">{takeovers}</div><div className="text-xs uppercase tracking-wider opacity-60">takeover bids</div></div>
        </div>
        <Link href="/stats" className="rounded-lg bg-butter text-ink font-display text-xl tracking-wider px-5 py-2.5">LIVE STATS</Link>
      </section>
    </div>
  );
}
