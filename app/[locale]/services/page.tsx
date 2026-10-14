import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServiceCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { Container, Section, SectionHeader } from "@/components/ui";
import { services } from "@/content/services";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const tm = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, href: "/services", title: tm("services"), description: t("subtitle") });
}

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <>
      <Section>
        <Container>
          <SectionHeader as="h1" title={t("title")} subtitle={t("subtitle")} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} locale={locale} />
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand title={t("ctaTitle")} text={t("ctaText")} />
    </>
  );
}
