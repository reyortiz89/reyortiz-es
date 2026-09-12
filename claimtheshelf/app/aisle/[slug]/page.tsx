import { notFound } from "next/navigation";
import { AisleTabs } from "@/components/AisleTabs";
import { Shelf } from "@/components/Shelf";
import { aisleTabs, aisleWithFacings } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function AislePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [tabs, aisle] = await Promise.all([aisleTabs(), aisleWithFacings(slug)]);
  if (!aisle) notFound();
  const facings = aisle.facings;
  const claimed = facings.filter((f) => f.status === "CLAIMED").length;
  const eyeOpen = facings.filter((f) => f.shelf === "EYE" && f.status === "OPEN").length;
  const locked = aisle.status === "LOCKED";

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-8 pt-8 flex flex-col gap-4">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <h1 className="font-display text-5xl tracking-wide">
          AISLE · <span className="text-orange">{aisle.name.toUpperCase()}</span>
        </h1>
        {!locked && (
          <div className="flex items-center gap-2 bg-ink text-cream rounded-full px-4 py-2 text-sm">
            <span className="w-2 h-2 rounded-full bg-butter" />
            <strong>{claimed} / {facings.length}</strong>&nbsp;claimed ·&nbsp;<strong className="text-butter">{eyeOpen} eye-level left</strong>
          </div>
        )}
      </div>
      <AisleTabs aisles={tabs} active={aisle.slug} />
      {locked ? (
        <div className="relative">
          <div className="opacity-40 pointer-events-none"><Shelf facings={facings} compact /></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="rounded-lg bg-ink text-cream px-6 py-4 text-center shadow-xl">
              <div className="font-display text-3xl tracking-wide">THIS AISLE IS LOCKED</div>
              <div className="text-sm opacity-75">It opens when the previous aisle is 80% full. Founding prices apply on opening day.</div>
            </div>
          </div>
        </div>
      ) : (
        <Shelf facings={facings} />
      )}
    </div>
  );
}
