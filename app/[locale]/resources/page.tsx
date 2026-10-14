import { Calculator, FileText, Gauge, Play, Route, Sparkles } from "lucide-react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Badge, ButtonLink, Container, Section, SectionHeader } from "@/components/ui";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

const icons = [Gauge, Sparkles, Route, Calculator, Play, FileText];

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
    <Section>
      <Container>
        <SectionHeader as="h1" title={t("title")} subtitle={t("subtitle")} />
        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item, i) => {
            const Icon = icons[i % icons.length];
            return (
              <li key={item.title} className="flex flex-col rounded-2xl border border-border bg-surface p-6">
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <Badge>{item.tag}</Badge>
                </div>
                <h2 className="mt-5 text-lg font-semibold">{item.title}</h2>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{item.text}</p>
                <p className="mt-6 text-sm font-medium text-primary">{tc("comingSoon")}</p>
              </li>
            );
          })}
        </ul>
        <div className="mt-12 flex flex-col items-start gap-4 rounded-2xl border border-dashed border-border p-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-muted">{t("notice")}</p>
          <ButtonLink href="/contact">{t("cta")}</ButtonLink>
        </div>
      </Container>
    </Section>
  );
}
