import { Calculator, FileText, Gauge, Play, Route, Sparkles } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/motion";
import { Container, PageHero, Section } from "@/components/ui";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

const icons = [Gauge, Sparkles, Route, Calculator, Play, FileText];
const layout = ["lg:col-span-2 lg:row-span-2", "", "", "", "", ""];

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resources" });
  const tm = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, href: "/resources", title: tm("resources"), description: t("subtitle") });
}

export default async function ResourcesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("resources");
  const tc = await getTranslations("common");
  const items = t.raw("items") as { title: string; text: string; tag: string }[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("heroTitle")} subtitle={t("subtitle")} />
      <Section className="pt-0 sm:pt-0">
        <Container>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {items.map((item, i) => {
              const Icon = icons[i % icons.length];
              const featured = i === 0;
              return (
                <Reveal key={item.title} delay={(i % 4) * 0.05} className={cn("h-full", layout[i])}>
                  <li
                    className={cn(
                      "relative flex h-full flex-col overflow-hidden rounded-3xl p-7",
                      featured ? "bg-ink text-ink-foreground sm:p-10" : "border border-border bg-surface",
                    )}
                  >
                    {featured && (
                      <>
                        <div aria-hidden className="grain absolute inset-0" />
                        <div aria-hidden className="absolute -bottom-24 -right-24 size-72 rounded-full bg-accent/30 blur-3xl" />
                      </>
                    )}
                    <div className="relative flex items-center justify-between">
                      <span
                        className={cn(
                          "grid size-11 place-items-center rounded-2xl",
                          featured ? "bg-accent text-accent-foreground" : "bg-surface-2",
                        )}
                      >
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span
                        className={cn(
                          "rounded-full px-3 py-1 text-xs",
                          featured ? "bg-ink-foreground/10 text-ink-foreground/80" : "bg-surface-2 text-muted",
                        )}
                      >
                        {item.tag}
                      </span>
                    </div>
                    <h2
                      className={cn(
                        "relative font-medium tracking-tight",
                        featured ? "mt-auto pt-16 text-3xl sm:text-5xl" : "mt-10 text-xl",
                      )}
                    >
                      {item.title}
                    </h2>
                    <p
                      className={cn(
                        "relative mt-3 text-pretty leading-relaxed",
                        featured ? "max-w-md text-lg text-ink-foreground/70" : "flex-1 text-muted",
                      )}
                    >
                      {item.text}
                    </p>
                    <p
                      className={cn(
                        "relative mt-6 inline-flex items-center gap-2 text-sm font-medium",
                        featured ? "text-accent" : "text-foreground",
                      )}
                    >
                      <span className="size-1.5 animate-pulse-dot rounded-full bg-accent" />
                      {tc("comingSoon")}
                    </p>
                  </li>
                </Reveal>
              );
            })}
          </ul>
        </Container>
      </Section>
      <CtaBand title={t("ctaTitle")} text={t("notice")} contactLabel={t("cta")} />
    </>
  );
}
