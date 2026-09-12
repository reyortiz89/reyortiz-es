import type { Facing, Aisle } from "@prisma/client";
import { SHELF_LABEL } from "./pricing";

export function facingLabel(f: Pick<Facing, "shelf" | "position"> & { aisle: Pick<Aisle, "name"> }) {
  return `${f.aisle.name} · ${SHELF_LABEL[f.shelf]} · #${f.position}`;
}

export function daysAgo(n: number) {
  return new Date(Date.now() - n * 86400 * 1000);
}

/** ISO dates (YYYY-MM-DD) for the last n days, oldest first. */
export function lastNDays(n: number) {
  return Array.from({ length: n }, (_, i) => daysAgo(n - 1 - i).toISOString().slice(0, 10));
}

export function todayUtc() {
  const d = new Date();
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}
