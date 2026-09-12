import { db } from "./db";
import type { AisleTab } from "@/components/AisleTabs";
import { FACINGS_PER_SHELF, SHELVES } from "./pricing";

export async function aisleTabs(): Promise<AisleTab[]> {
  const aisles = await db.aisle.findMany({
    orderBy: { sort: "asc" },
    include: { _count: { select: { facings: { where: { status: "CLAIMED" } } } } },
  });
  return aisles.map((a) => ({ slug: a.slug, name: a.name, status: a.status, claimed: a._count.facings, total: SHELVES.length * FACINGS_PER_SHELF }));
}

export const facingCardSelect = {
  id: true,
  shelf: true,
  position: true,
  status: true,
  name: true,
  color: true,
  currentPriceCents: true,
  isFounding: true,
  isFreeListing: true,
} as const;

export async function aisleWithFacings(slug: string) {
  return db.aisle.findUnique({
    where: { slug },
    include: { facings: { select: facingCardSelect, orderBy: [{ shelf: "asc" }, { position: "asc" }] } },
  });
}

export async function firstOpenAisleSlug() {
  const a = await db.aisle.findFirst({ where: { status: "OPEN" }, orderBy: { sort: "asc" }, select: { slug: true } });
  return a?.slug ?? null;
}
