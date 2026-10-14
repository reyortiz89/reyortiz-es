import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CaseCard, ServiceCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { ServiceIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { CheckList, Container, Section } from "@/components/ui";
import { getCase } from "@/content/cases";
import { getService, services } from "@/content/services";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl, pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => services.map((s) => ({ locale, slug: s.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    locale,
    href: { pathname: "/services/[slug]", params: { slug } },
    title: service.title[locale],
    description: service.tagline[locale],
  });
}

export default async function ServicePage({ params }: Props) {
  const { locale, slug } = await params;
  const service = getService(slug);
  if (!service) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("services");

  const relatedCases = service.relatedCases.map(getCase).filter((c) => c !== undefined);
  const relatedServices = service.related.map(getService).filter((s) => s !== undefined);

  return (
    <>
      <Section className="pb-12">
        <Container className="max-w-4xl">
          <Link href="/services" className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
            <ArrowLeft className="size-4" aria-hidden />
            {t("title")}
          </Link>
          <span className="mt-8 grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
            <ServiceIcon name={service.icon} className="size-7" />
          </span>
          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{service.title[locale]}</h1>
          <p className="mt-4 text-xl text-muted">{service.tagline[locale]}</p>
          <p className="mt-8 text-lg leading-relaxed text-foreground">{service.description[locale]}</p>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container className="grid max-w-4xl gap-6 md:grid-cols-3">
          {(
            [
              ["forWho", service.forWho[locale]],
              ["deliverables", service.deliverables[locale]],
              ["outcomes", service.outcomes[locale]],
            ] as const
          ).map(([key, items]) => (
            <div key={key} className="rounded-2xl border border-border bg-surface p-6">
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-primary">{t(key)}</h2>
              <CheckList items={items} />
            </div>
          ))}
        </Container>
      </Section>

      {relatedCases.length > 0 && (
        <Section className="border-t border-border">
          <Container>
            <h2 className="text-2xl font-semibold tracking-tight">{t("relatedCases")}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {relatedCases.map((c) => (
                <CaseCard key={c.slug} item={c} locale={locale} />
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section className="pt-0">
        <Container>
          <h2 className="text-2xl font-semibold tracking-tight">{t("relatedServices")}</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {relatedServices.map((s) => (
              <ServiceCard key={s.slug} service={s} locale={locale} />
            ))}
          </div>
        </Container>
      </Section>

      <CtaBand title={t("ctaTitle")} text={t("ctaText")} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title[locale],
          description: service.description[locale],
          url: absoluteUrl({ pathname: "/services/[slug]", params: { slug } }, locale),
          provider: { "@id": `${site.url}/#business` },
          areaServed: ["ES", "EU", "US", "LATAM"],
          serviceType: service.title.en,
        }}
      />
    </>
  );
}
