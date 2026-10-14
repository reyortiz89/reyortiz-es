import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import type { CaseStudy } from "@/content/cases";
import type { Service } from "@/content/services";
import { cn } from "@/lib/cn";
import { ServiceIcon } from "./icons";
import { ServiceVisual } from "./service-visuals";

export function ServiceCard({
  service,
  locale,
  index,
  className,
}: {
  service: Service;
  locale: Locale;
  index?: number;
  className?: string;
}) {
  return (
    <Link
      href={{ pathname: "/services/[slug]", params: { slug: service.slug } }}
      className={cn(
        "group relative flex h-full flex-col justify-between gap-8 overflow-hidden rounded-3xl border border-border bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl hover:shadow-black/5 sm:p-8",
        className,
      )}
    >
      <div className="flex items-start justify-between gap-4">
        <span className="grid size-11 place-items-center rounded-2xl bg-surface-2 text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          <ServiceIcon name={service.icon} className="size-5" />
        </span>
        {index !== undefined && <span className="font-mono text-xs text-muted">0{index + 1}</span>}
      </div>
      <ServiceVisual name={service.icon} locale={locale} />
      <div>
        <h3 className="text-xl font-medium tracking-tight text-foreground sm:text-2xl">{service.title[locale]}</h3>
        <p className="mt-2 text-pretty leading-relaxed text-muted">{service.tagline[locale]}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground">
          <span className="border-b border-transparent transition-colors group-hover:border-foreground">
            {locale === "es" ? "Ver servicio" : "View service"}
          </span>
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

/** Editorial row used in case-study lists. */
export function CaseRow({ item, locale }: { item: CaseStudy; locale: Locale }) {
  return (
    <Link
      href={{ pathname: "/cases/[slug]", params: { slug: item.slug } }}
      className="group grid grid-cols-1 items-center gap-3 border-t border-border py-7 transition-colors sm:grid-cols-[1.1fr_1.4fr_auto] sm:gap-8"
    >
      <div>
        <p className="text-2xl font-medium tracking-tight text-foreground transition-transform duration-300 group-hover:translate-x-2 sm:text-3xl">
          {item.client}
        </p>
        <p className="mt-1 text-sm text-muted">
          {item.sector[locale]} · {item.location[locale]}
        </p>
      </div>
      <p className="text-pretty leading-relaxed text-muted">{item.summary[locale]}</p>
      <div className="flex items-center justify-between gap-6 sm:justify-end">
        {item.metric && (
          <p className="text-right">
            <span className="block text-2xl font-medium tracking-tight text-foreground">{item.metric.value}</span>
            <span className="block text-xs text-muted">{item.metric.label[locale]}</span>
          </p>
        )}
        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-border transition-all group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
          <ArrowUpRight className="size-5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}

const covers = [
  "from-[#c6f24e] via-[#9ad14a] to-[#2f5d1e]",
  "from-[#1f2937] via-[#111827] to-[#000000]",
  "from-[#e7e5dd] via-[#d6d3c8] to-[#a8a495]",
];

/** Large visual card for featured case studies. */
export function CaseCard({ item, locale, index = 0 }: { item: CaseStudy; locale: Locale; index?: number }) {
  const dark = index % covers.length === 1;
  return (
    <Link
      href={{ pathname: "/cases/[slug]", params: { slug: item.slug } }}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/5"
    >
      <div
        className={cn(
          "relative flex aspect-[4/3] flex-col justify-between overflow-hidden bg-gradient-to-br p-6",
          covers[index % covers.length],
          dark ? "text-white" : "text-[#0c0c0d]",
        )}
      >
        <div aria-hidden className="grain absolute inset-0" />
        <span className="relative text-xs font-medium uppercase tracking-[0.16em] opacity-80">{item.sector[locale]}</span>
        {item.metric && (
          <p className="relative">
            <span className="block text-5xl font-medium tracking-[-0.04em] sm:text-6xl">{item.metric.value}</span>
            <span className="mt-1 block text-sm opacity-80">{item.metric.label[locale]}</span>
          </p>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <p className="text-lg font-medium text-foreground">{item.client}</p>
        <p className="mt-2 flex-1 text-pretty leading-relaxed text-muted">{item.summary[locale]}</p>
        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium">
          {locale === "es" ? "Leer caso" : "Read case"}
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
