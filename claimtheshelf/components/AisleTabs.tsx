import Link from "next/link";

export type AisleTab = { slug: string; name: string; status: "OPEN" | "LOCKED"; claimed: number; total: number };

export function AisleTabs({ aisles, active }: { aisles: AisleTab[]; active: string }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1">
      {aisles.map((a, i) => {
        const isActive = a.slug === active;
        const locked = a.status === "LOCKED";
        const full = a.claimed >= a.total;
        const inner = (
          <>
            <span className="opacity-60">Aisle {i + 1}</span>
            <span>{a.name}</span>
            {locked ? (
              <span className="text-[10px] font-extrabold tracking-wide opacity-60">LOCKED</span>
            ) : (
              <span className="text-[11px] opacity-70">{a.claimed}/{a.total}</span>
            )}
            {full && !locked && <span className="text-[9px] font-extrabold bg-orange text-white px-1.5 py-px rounded-sm">FULL</span>}
          </>
        );
        const cls = `flex items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-1.5 text-sm border ${
          isActive ? "bg-ink text-cream border-ink font-bold" : locked ? "border-dashed border-ink/30 text-ink/50" : "bg-white border-line hover:border-ink"
        }`;
        return (
          <Link key={a.slug} href={`/aisle/${a.slug}`} className={cls}>
            {inner}
          </Link>
        );
      })}
    </div>
  );
}
