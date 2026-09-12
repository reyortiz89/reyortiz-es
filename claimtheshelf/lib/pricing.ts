import type { Shelf } from "@prisma/client";

export const TAKEOVER_MULTIPLIER = 1.25;
export const MATCH_WINDOW_HOURS = 72;
export const FACINGS_PER_SHELF = 12;
export const SHELVES: Shelf[] = ["TOP", "EYE", "MID", "BOT"];

export const SHELF_LABEL: Record<Shelf, string> = {
  TOP: "Top shelf",
  EYE: "Eye level",
  MID: "Middle shelf",
  BOT: "Bottom shelf",
};

/** What a challenger pays to bid for a claimed facing. */
export function takeoverPriceCents(currentPriceCents: number) {
  return Math.round(currentPriceCents * TAKEOVER_MULTIPLIER);
}

/** What the incumbent pays to keep the facing: the difference up to the bid. */
export function matchPriceCents(currentPriceCents: number) {
  return takeoverPriceCents(currentPriceCents) - currentPriceCents;
}

export function formatUsd(cents: number) {
  return `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

const PALETTE = ["#ff8a5b", "#7cc4ff", "#ffb347", "#9ad39a", "#6fd3d3", "#e0a3ff", "#ffd166", "#8fe3c2", "#f2a6c2", "#b3c7ff", "#7fa9ff", "#ffe08a", "#c8f28a", "#ffa8a8", "#a3e4ff", "#f7c59f"];

export function defaultColor(seed: string) {
  let h = 0;
  for (const ch of seed) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return PALETTE[h % PALETTE.length];
}

export function domainOf(url: string) {
  try {
    return new URL(url.startsWith("http") ? url : `https://${url}`).hostname.replace(/^www\./, "").toLowerCase();
  } catch {
    return null;
  }
}
