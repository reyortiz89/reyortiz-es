import { getTranslations, setRequestLocale } from "next-intl/server";
import { ServiceCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { Reveal } from "@/components/motion";
import { Container, PageHero, Section } from "@/components/ui";
import { services } from "@/content/services";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "services" });
  const tm = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, href: "/services", title: tm("services"), description: t("subtitle") });
}

const bento = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "sm:col-span-2 lg:col-span-2"];

export default async function ServicesPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("services");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("heroTitle")} subtitle={t("subtitle")} />
      <Section className="pt-0 sm:pt-0">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 3) * 0.06} className={cn(bento[i])}>
                <ServiceCard service={s} locale={locale} index={i} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
      <CtaBand title={t("ctaTitle")} text={t("ctaText")} />
    </>
  );
}
