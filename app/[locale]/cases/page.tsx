import { getTranslations, setRequestLocale } from "next-intl/server";
import { CaseCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { Container, Section, SectionHeader } from "@/components/ui";
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

  return (
    <>
      <Section>
        <Container>
          <SectionHeader as="h1" title={t("title")} subtitle={t("subtitle")} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cases.map((c) => (
              <CaseCard key={c.slug} item={c} locale={locale} />
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand title={t("ctaTitle")} text={t("ctaText")} />
    </>
  );
}
