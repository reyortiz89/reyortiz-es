import { ArrowUpRight } from "lucide-react";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import type { CaseStudy } from "@/content/cases";
import type { Service } from "@/content/services";
import { ServiceIcon } from "./icons";
import { Badge } from "./ui";

export function ServiceCard({ service, locale }: { service: Service; locale: Locale }) {
  return (
    <Link
      href={{ pathname: "/services/[slug]", params: { slug: service.slug } }}
      className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-primary/50 hover:bg-surface-2"
    >
      <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
        <ServiceIcon name={service.icon} className="size-5" />
      </span>
      <h3 className="mt-5 text-lg font-semibold text-foreground">{service.title[locale]}</h3>
      <p className="mt-2 flex-1 leading-relaxed text-muted">{service.tagline[locale]}</p>
      <ArrowUpRight
        className="mt-6 size-5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
        aria-hidden
      />
    </Link>
  );
}

export function CaseCard({ item, locale }: { item: CaseStudy; locale: Locale }) {
  return (
    <Link
      href={{ pathname: "/cases/[slug]", params: { slug: item.slug } }}
      className="group flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-primary/50 hover:bg-surface-2"
    >
      <div className="flex items-center justify-between gap-3">
        <Badge>{item.sector[locale]}</Badge>
        <ArrowUpRight className="size-5 shrink-0 text-muted group-hover:text-primary" aria-hidden />
      </div>
      <h3 className="mt-5 text-lg font-semibold text-foreground">{item.client}</h3>
      <p className="mt-2 flex-1 leading-relaxed text-muted">{item.summary[locale]}</p>
      {item.metric && (
        <p className="mt-6 border-t border-border pt-4">
          <span className="text-2xl font-semibold tracking-tight text-foreground">{item.metric.value}</span>{" "}
          <span className="text-sm text-muted">{item.metric.label[locale]}</span>
        </p>
      )}
    </Link>
  );
}
