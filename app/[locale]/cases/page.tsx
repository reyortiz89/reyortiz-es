import { getTranslations, setRequestLocale } from "next-intl/server";
import { CaseCard, CaseRow } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/motion";
import { Container, Eyebrow, PageHero, Section } from "@/components/ui";
import { cases } from "@/content/cases";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "cases" });
  return pageMetadata({ locale, href: "/cases", title: t("title"), description: t("subtitle") });
}

export default async function CasesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("cases");
  const featured = cases.filter((c) => c.featured);
  const rest = cases.filter((c) => !c.featured);

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("heroTitle")} subtitle={t("subtitle")} />
      <Section className="pt-0 sm:pt-0">
        <Container>
          <div className="grid gap-4 md:grid-cols-3">
            {featured.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.08} className="h-full">
                <CaseCard item={c} locale={locale} index={i} />
              </Reveal>
            ))}
          </div>

          <Reveal>
            <Eyebrow className="mt-24">{t("more")}</Eyebrow>
          </Reveal>
          <div className="mt-8 border-b border-border">
            {rest.map((c) => (
              <Reveal key={c.slug}>
                <CaseRow item={c} locale={locale} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand title={t("ctaTitle")} text={t("ctaText")} />
    </>
  );
}
