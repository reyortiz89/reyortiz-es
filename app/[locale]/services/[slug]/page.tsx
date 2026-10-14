import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookCallButton } from "@/components/book-call";
import { CaseRow, ServiceCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { ServiceIcon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { ServiceVisual } from "@/components/service-visuals";
import { BackLink, CheckList, Container, Eyebrow, PageHero, Section } from "@/components/ui";
import { getCase } from "@/content/cases";
import { getService, services } from "@/content/services";
import { site } from "@/content/site";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
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
  const tc = await getTranslations("common");
  const index = services.findIndex((s) => s.slug === slug);

  const relatedCases = service.relatedCases.map(getCase).filter((c) => c !== undefined);
  const relatedServices = service.related.map(getService).filter((s) => s !== undefined);

  const columns = [
    { key: "forWho", items: service.forWho[locale], dark: false },
    { key: "deliverables", items: service.deliverables[locale], dark: true },
    { key: "outcomes", items: service.outcomes[locale], dark: false },
  ] as const;

  return (
    <>
      <PageHero
        back={<BackLink href="/services">{t("title")}</BackLink>}
        eyebrow={`${t("detailEyebrow")} 0${index + 1}`}
        title={service.title[locale]}
        subtitle={service.tagline[locale]}
        aside={
          <div className="relative rounded-[2rem] border border-border bg-surface p-6 shadow-2xl shadow-black/5 sm:p-8">
            <span className="mb-6 grid size-12 place-items-center rounded-2xl bg-accent text-accent-foreground">
              <ServiceIcon name={service.icon} className="size-6" />
            </span>
            <ServiceVisual name={service.icon} locale={locale} />
          </div>
        }
      >
        <BookCallButton className="mt-10">{tc("bookCall")}</BookCallButton>
      </PageHero>

      <Section className="pt-0 sm:pt-0">
        <Container>
          <Reveal>
            <p className="max-w-4xl text-pretty text-2xl font-medium leading-snug tracking-tight text-foreground sm:text-3xl">
              {service.description[locale]}
            </p>
          </Reveal>
          <div className="mt-16 grid gap-4 md:grid-cols-3">
            {columns.map((col, i) => (
              <Reveal key={col.key} delay={i * 0.08} className="h-full">
                <div
                  className={cn(
                    "relative h-full overflow-hidden rounded-3xl p-7 sm:p-8",
                    col.dark ? "bg-ink text-ink-foreground" : "border border-border bg-surface",
                  )}
                >
                  {col.dark && <div aria-hidden className="grain absolute inset-0" />}
                  <h2
                    className={cn(
                      "relative mb-6 text-xs font-medium uppercase tracking-[0.18em]",
                      col.dark ? "text-accent" : "text-muted",
                    )}
                  >
                    {t(col.key)}
                  </h2>
                  <CheckList
                    items={[...col.items]}
                    className={cn("relative", col.dark && "[&_li]:text-ink-foreground [&_svg]:text-accent")}
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {relatedCases.length > 0 && (
        <Section className="border-t border-border">
          <Container>
            <Reveal>
              <Eyebrow>{t("relatedCases")}</Eyebrow>
            </Reveal>
            <div className="mt-10 border-b border-border">
              {relatedCases.map((c) => (
                <Reveal key={c.slug}>
                  <CaseRow item={c} locale={locale} />
                </Reveal>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section className={cn(relatedCases.length > 0 ? "pt-0 sm:pt-0" : "border-t border-border")}>
        <Container>
          <Reveal>
            <Eyebrow>{t("relatedServices")}</Eyebrow>
          </Reveal>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {relatedServices.map((s) => (
              <Reveal key={s.slug}>
                <ServiceCard service={s} locale={locale} />
              </Reveal>
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
