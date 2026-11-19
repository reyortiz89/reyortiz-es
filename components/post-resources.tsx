import { ArrowRight, Calculator, Gauge, Radar } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { automationAudit, digitalMaturity } from "@/content/assessments";
import { Link } from "@/i18n/navigation";

type Item = { title: string; text: string; tag: string; cta: string };

/** Free resources offered at the end of every blog post, so a reader can take a next step without booking a call. */
export async function PostResources() {
  const t = await getTranslations("resources");
  const item = (key: string) => t.raw(`items.${key}`) as Item;
  const cards = [
    {
      ...item("audit"),
      icon: Gauge,
      track: "post_resource_audit",
      href: { pathname: "/resources/assessments/[slug]" as const, params: { slug: automationAudit.slug } },
    },
    {
      ...item("maturity"),
      icon: Radar,
      track: "post_resource_maturity",
      href: { pathname: "/resources/assessments/[slug]" as const, params: { slug: digitalMaturity.slug } },
    },
    { ...item("roi"), icon: Calculator, track: "post_resource_roi", href: "/resources/roi-calculator" as const },
  ];

  return (
    <aside className="mx-auto mt-20 max-w-3xl rounded-3xl border border-border bg-surface p-6 sm:p-8">
      <h2 className="text-2xl font-medium tracking-tight">{t("title")}</h2>
      <ul className="mt-6 divide-y divide-border">
        {cards.map(({ icon: Icon, title, text, tag, cta, href, track }) => (
          <li key={title}>
            <Link href={href} data-track={track} className="group flex items-start gap-4 py-5">
              <span className="grid size-11 shrink-0 place-items-center rounded-2xl bg-surface-2 transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                <Icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-lg font-medium tracking-tight text-foreground">{title}</span>
                  <span className="text-xs text-muted">{tag}</span>
                </span>
                <span className="mt-1 block text-pretty leading-relaxed text-muted">{text}</span>
                <span className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-foreground">
                  {cta}
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
