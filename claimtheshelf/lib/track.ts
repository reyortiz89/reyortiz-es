import { db } from "./db";
import { todayUtc } from "./format";

/** Record a view or click-out on a facing, with a per-day country breakdown. */
export async function track(facingId: string, kind: "view" | "click", country: string | null) {
  const date = todayUtc();
  const field = kind === "view" ? "views" : "clicks";
  try {
    await db.facing.update({ where: { id: facingId }, data: { [field]: { increment: 1 } } });
    const stat = await db.dailyStat.upsert({
      where: { facingId_date: { facingId, date } },
      update: { [field]: { increment: 1 } },
      create: { facingId, date, [field]: 1 },
    });
    if (kind === "view" && country) {
      const countries = (stat.countries ?? {}) as Record<string, number>;
      countries[country] = (countries[country] ?? 0) + 1;
      await db.dailyStat.update({ where: { id: stat.id }, data: { countries } });
    }
  } catch (e) {
    console.error("track failed", e);
  }
}
