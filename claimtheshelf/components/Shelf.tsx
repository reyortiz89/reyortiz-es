import Link from "next/link";
import type { Facing, Shelf as ShelfKind } from "@prisma/client";
import { FACINGS_PER_SHELF, SHELVES, formatUsd } from "@/lib/pricing";

export type FacingCard = Pick<Facing, "id" | "shelf" | "position" | "status" | "name" | "color" | "currentPriceCents" | "isFounding" | "isFreeListing">;

const ROW_HEIGHT: Record<ShelfKind, string> = { TOP: "h-[110px]", EYE: "h-[136px]", MID: "h-[110px]", BOT: "h-[96px]" };
const BOX_HEIGHT: Record<ShelfKind, string> = { TOP: "h-[86px]", EYE: "h-[112px]", MID: "h-[86px]", BOT: "h-[74px]" };

export function Shelf({ facings, compact = false }: { facings: FacingCard[]; compact?: boolean }) {
  const byShelf = new Map<ShelfKind, FacingCard[]>();
  for (const s of SHELVES) byShelf.set(s, []);
  for (const f of facings) byShelf.get(f.shelf)!.push(f);

  return (
    <div className="relative rounded-md border border-line bg-paper shadow-[0_20px_40px_rgba(0,0,0,.08)] overflow-hidden">
      <div className="h-1.5 bg-ink" />
      {SHELVES.map((shelf) => {
        const row = byShelf.get(shelf)!.sort((a, b) => a.position - b.position);
        const isEye = shelf === "EYE";
        const openEye = isEye ? row.filter((f) => f.status === "OPEN").length : 0;
        return (
          <div key={shelf}>
            <div className={`grid gap-2 px-3 sm:px-5 items-end ${ROW_HEIGHT[shelf]}`} style={{ gridTemplateColumns: `repeat(${FACINGS_PER_SHELF}, minmax(0, 1fr))` }}>
              {row.map((f) => (
                <FacingBox key={f.id} facing={f} heightClass={BOX_HEIGHT[shelf]} compact={compact} />
              ))}
            </div>
            <div
              className={`relative z-10 flex items-center px-3 sm:px-5 font-display tracking-[.12em] text-[13px] shadow-[0_6px_10px_rgba(0,0,0,.18)] ${
                isEye ? "h-[18px] bg-butter border-t-2 border-[#e6b93f]" : "h-3 bg-gradient-to-b from-[#f2efe8] to-[#cfc9bc] border-t-2 border-[#e8e3d8]"
              }`}
            >
              {isEye && `EYE LEVEL = BUY LEVEL · ${FACINGS_PER_SHELF} FACINGS · ${openEye} OPEN`}
            </div>
            {!compact && (
              <div className="grid gap-2 px-3 sm:px-5 pt-1 pb-2" style={{ gridTemplateColumns: `repeat(${FACINGS_PER_SHELF}, minmax(0, 1fr))` }}>
                {row.map((f) => (
                  <PriceTag key={f.id} facing={f} />
                ))}
              </div>
            )}
          </div>
        );
      })}
      <div className="h-2" />
    </div>
  );
}

function FacingBox({ facing, heightClass, compact }: { facing: FacingCard; heightClass: string; compact: boolean }) {
  const href = `/facing/${facing.id}`;
  const base = `block ${heightClass} rounded-[3px] relative overflow-hidden`;
  if (facing.status === "OPEN") {
    return (
      <Link href={href} className={`${base} border-2 border-dashed border-orange bg-orange/5 text-orange flex flex-col items-center justify-center gap-0.5`}>
        <span className="font-display text-base tracking-wider leading-none">OPEN</span>
        {!compact && <span className="text-[9px] font-bold">{formatUsd(facing.currentPriceCents)}</span>}
      </Link>
    );
  }
  if (facing.status === "UNCLAIMED") {
    return (
      <Link href={href} className={`${base} bg-[#d9d4c7] text-ink/70 flex flex-col items-center justify-center gap-1 px-1 shadow-[inset_-6px_0_0_rgba(0,0,0,.08)]`}>
        <span className="font-display text-[13px] tracking-wide leading-none truncate max-w-full">{facing.name?.toUpperCase()}</span>
        <span className="text-[8px] font-extrabold tracking-wider uppercase bg-white/70 px-1 rounded-sm">unclaimed</span>
      </Link>
    );
  }
  return (
    <Link
      href={href}
      className={`${base} text-ink flex flex-col items-center justify-center gap-1 px-1 shadow-[inset_-6px_0_0_rgba(0,0,0,.16),0_2px_0_rgba(0,0,0,.15)] hover:-translate-y-1 transition-transform`}
      style={{ backgroundColor: facing.color ?? "#ff8a5b" }}
    >
      <span className="font-display text-[14px] tracking-wide leading-none truncate max-w-full">{(facing.name ?? "Claimed").toUpperCase()}</span>
      <span className="w-[36%] h-0.5 bg-black/35 rounded" />
      {facing.isFounding && <span className="absolute top-1 right-1 text-[7px] font-extrabold bg-black/55 text-white px-1 rounded-sm">FOUNDING</span>}
    </Link>
  );
}

function PriceTag({ facing }: { facing: FacingCard }) {
  const open = facing.status !== "CLAIMED";
  return (
    <div className="flex justify-between gap-0.5 whitespace-nowrap text-[9px] bg-white border border-[#d9d4c7] rounded-sm px-1 py-px text-ink overflow-hidden">
      <span className={`font-extrabold ${open ? "text-orange" : ""}`}>{formatUsd(facing.currentPriceCents)}</span>
      <span className="opacity-60 truncate">{open ? "claim" : `›${formatUsd(Math.round(facing.currentPriceCents * 1.25))}`}</span>
    </div>
  );
}
