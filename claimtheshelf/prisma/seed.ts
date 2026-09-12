import { PrismaClient, Shelf, FacingStatus, AisleStatus } from "@prisma/client";
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const prisma = new PrismaClient();

const SHELVES: Shelf[] = ["TOP", "EYE", "MID", "BOT"];
const FACINGS_PER_SHELF = 12;
const BASE_PRICE_CENTS: Record<Shelf, number> = { TOP: 3900, EYE: 8900, MID: 5900, BOT: 2900 };

const AISLES: { slug: string; name: string; sort: number; status: AisleStatus }[] = [
  { slug: "saas", name: "SaaS", sort: 1, status: "OPEN" },
  { slug: "marketing", name: "Marketing", sort: 2, status: "LOCKED" },
  { slug: "ai", name: "AI", sort: 3, status: "LOCKED" },
];

type Listing = { aisle: string; name: string; url: string; tagline?: string };

async function main() {
  for (const a of AISLES) {
    const aisle = await prisma.aisle.upsert({
      where: { slug: a.slug },
      update: { name: a.name, sort: a.sort },
      create: a,
    });
    for (const shelf of SHELVES) {
      for (let position = 1; position <= FACINGS_PER_SHELF; position++) {
        await prisma.facing.upsert({
          where: { aisleId_shelf_position: { aisleId: aisle.id, shelf, position } },
          update: {},
          create: {
            aisleId: aisle.id,
            shelf,
            position,
            basePriceCents: BASE_PRICE_CENTS[shelf],
            currentPriceCents: BASE_PRICE_CENTS[shelf],
            status: FacingStatus.OPEN,
          },
        });
      }
    }
    console.log(`aisle ${a.slug}: ${SHELVES.length * FACINGS_PER_SHELF} facings ready`);
  }

  // Free listings: real companies you selected, placed on the bottom shelf (then middle) as UNCLAIMED.
  const file = join(process.cwd(), "prisma", "listings.json");
  if (!existsSync(file)) {
    console.log("no prisma/listings.json — skipping free listings (see listings.example.json)");
    return;
  }
  const listings = JSON.parse(readFileSync(file, "utf8")) as Listing[];
  let placed = 0;
  for (const l of listings) {
    const aisle = await prisma.aisle.findUnique({ where: { slug: l.aisle } });
    if (!aisle) { console.warn(`unknown aisle ${l.aisle} for ${l.name}`); continue; }
    const already = await prisma.facing.findFirst({ where: { aisleId: aisle.id, url: l.url } });
    if (already) continue;
    const slot = await prisma.facing.findFirst({
      where: { aisleId: aisle.id, status: FacingStatus.OPEN, shelf: { in: ["BOT", "MID"] } },
      orderBy: [{ shelf: "desc" }, { position: "asc" }],
    });
    if (!slot) { console.warn(`no free slot left in ${l.aisle} for ${l.name}`); continue; }
    await prisma.facing.update({
      where: { id: slot.id },
      data: { status: FacingStatus.UNCLAIMED, name: l.name, url: l.url, tagline: l.tagline ?? null, isFreeListing: true },
    });
    placed++;
  }
  console.log(`placed ${placed} unclaimed listings`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
