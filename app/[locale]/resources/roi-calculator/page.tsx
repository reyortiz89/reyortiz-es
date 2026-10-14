import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/cta-band";
import { RoiCalculator } from "@/components/roi-calculator";
import { BackLink, Container, PageHero, Section } from "@/components/ui";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "roi" });
  return pageMetadata({ locale, href: "/resources/roi-calculator", title: t("title"), description: t("subtitle") });
}

export default async function RoiPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("roi");
  const tr = await getTranslations("resources");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("heroTitle")}
        subtitle={t("subtitle")}
        back={<BackLink href="/resources">{tr("back")}</BackLink>}
      />
      <Section className="pt-0 sm:pt-0">
        <Container>
          <RoiCalculator />
        </Container>
      </Section>
      <CtaBand title={t("ctaTitle")} text={t("ctaText")} />
    </>
  );
}
