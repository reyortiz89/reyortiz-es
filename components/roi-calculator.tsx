"use client";

import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { cn } from "@/lib/cn";

/** Working weeks per year used for the estimate (holidays excluded). */
const WEEKS = 46;

type Field = { key: "people" | "hours" | "cost" | "share" | "investment"; min: number; max: number; step: number; unit: string };

const fields: Field[] = [
  { key: "people", min: 1, max: 50, step: 1, unit: "" },
  { key: "hours", min: 1, max: 40, step: 1, unit: "h" },
  { key: "cost", min: 10, max: 120, step: 1, unit: "€" },
  { key: "share", min: 10, max: 90, step: 5, unit: "%" },
  { key: "investment", min: 0, max: 60000, step: 500, unit: "€" },
];

export function RoiCalculator() {
  const t = useTranslations("roi");
  const locale = useLocale();
  const [v, setV] = useState({ people: 3, hours: 6, cost: 25, share: 60, investment: 6000 });

  const nf = new Intl.NumberFormat(locale === "es" ? "es-ES" : "en-US", { maximumFractionDigits: 0 });
  const hoursYear = v.people * v.hours * (v.share / 100) * WEEKS;
  const savingsYear = hoursYear * v.cost;
  const paybackMonths = savingsYear > 0 ? (v.investment / savingsYear) * 12 : Infinity;
  const roi = v.investment > 0 ? ((savingsYear - v.investment) / v.investment) * 100 : null;

  const format = (f: Field, value: number) =>
    f.unit === "€" ? `${nf.format(value)} €` : f.unit === "%" ? `${value} %` : f.unit === "h" ? `${value} h` : nf.format(value);

  return (
    <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
      <div className="rounded-[2rem] border border-border bg-surface p-6 sm:p-10">
        <div className="space-y-8">
          {fields.map((f) => (
            <label key={f.key} className="block">
              <span className="flex items-baseline justify-between gap-4">
                <span className="font-medium">{t(`fields.${f.key}`)}</span>
                <span className="font-mono text-lg tabular-nums">{format(f, v[f.key])}</span>
              </span>
              <span className="mt-1 block text-sm text-muted">{t(`hints.${f.key}`)}</span>
              <input
                type="range"
                min={f.min}
                max={f.max}
                step={f.step}
                value={v[f.key]}
                onChange={(e) => setV((s) => ({ ...s, [f.key]: Number(e.target.value) }))}
                className="mt-4 w-full accent-[var(--accent-ink)]"
              />
            </label>
          ))}
        </div>
      </div>

      <div className="space-y-4 lg:sticky lg:top-28 lg:self-start">
        <div className="relative overflow-hidden rounded-[2rem] bg-ink p-8 text-ink-foreground sm:p-10">
          <div aria-hidden className="grain absolute inset-0" />
          <div aria-hidden className="absolute -right-20 -top-20 size-64 rounded-full bg-accent/25 blur-3xl" />
          <p className="relative text-xs uppercase tracking-[0.16em] text-ink-foreground/60">{t("savingsYear")}</p>
          <p className="relative mt-3 text-6xl font-medium tracking-[-0.05em] text-accent sm:text-7xl">
            {nf.format(Math.round(savingsYear / 100) * 100)} €
          </p>
          <p className="relative mt-2 text-ink-foreground/70">{t("hoursYear", { hours: nf.format(Math.round(hoursYear)) })}</p>
          <dl className="relative mt-10 grid grid-cols-2 gap-6 border-t border-ink-foreground/15 pt-6">
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-ink-foreground/60">{t("payback")}</dt>
              <dd className="mt-2 text-3xl font-medium tracking-tight">
                {v.investment === 0
                  ? t("immediate")
                  : Number.isFinite(paybackMonths)
                    ? t("months", { months: paybackMonths < 1 ? "< 1" : nf.format(Math.ceil(paybackMonths)) })
                    : "—"}
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-[0.14em] text-ink-foreground/60">{t("roiYear")}</dt>
              <dd className={cn("mt-2 text-3xl font-medium tracking-tight", roi !== null && roi < 0 && "text-ink-foreground/60")}>
                {roi === null ? "—" : `${roi > 0 ? "+" : ""}${nf.format(roi)} %`}
              </dd>
            </div>
          </dl>
        </div>
        <p className="px-2 text-sm leading-relaxed text-muted">{t("note", { weeks: WEEKS })}</p>
      </div>
    </div>
  );
}
