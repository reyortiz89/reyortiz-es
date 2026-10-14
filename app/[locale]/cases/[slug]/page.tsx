import { ArrowLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { CheckList, Container, Section } from "@/components/ui";
import { cases, getCase } from "@/content/cases";
import { getService } from "@/content/services";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { absoluteUrl, pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => cases.map((c) => ({ locale, slug: c.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const item = getCase(slug);
  if (!item) return {};
  return pageMetadata({
    locale,
    href: { pathname: "/cases/[slug]", params: { slug } },
    title: `${item.client}: ${item.summary[locale]}`,
    description: item.challenge[locale],
  });
}

export default async function CasePage({ params }: Props) {
  const { locale, slug } = await params;
  const item = getCase(slug);
  if (!item) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("cases");

  const facts = [
    [t("sector"), item.sector[locale]],
    [t("location"), item.location[locale]],
    [t("duration"), item.duration[locale]],
  ] as const;

  return (
    <>
      <Section className="pb-12">
        <Container className="max-w-4xl">
          <Link href="/cases" className="inline-flex items-center gap-1 text-sm text-muted hover:text-foreground">
            <ArrowLeft className="size-4" aria-hidden />
            {t("title")}
          </Link>
          <p className="mt-8 text-sm font-semibold uppercase tracking-wider text-primary">{item.client}</p>
          <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">{item.summary[locale]}</h1>

          <dl className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
            {facts.map(([label, value]) => (
              <div key={label} className="bg-surface p-4">
                <dt className="text-xs text-muted">{label}</dt>
                <dd className="mt-1 font-medium">{value}</dd>
              </div>
            ))}
            <div className="bg-surface p-4">
              <dt className="text-xs text-muted">{t("servicesUsed")}</dt>
              <dd className="mt-1 flex flex-wrap gap-x-2 font-medium">
                {item.services.map((s) => {
                  const service = getService(s);
                  return service ? (
                    <Link
                      key={s}
                      href={{ pathname: "/services/[slug]", params: { slug: s } }}
                      className="text-primary hover:underline"
                    >
                      {service.title[locale]}
                    </Link>
                  ) : null;
                })}
              </dd>
            </div>
          </dl>
        </Container>
      </Section>

      <Section className="pt-0">
        <Container className="max-w-4xl space-y-12">
          {item.metric && (
            <p className="rounded-2xl border border-primary/30 bg-primary/5 p-6">
              <span className="text-4xl font-semibold tracking-tight">{item.metric.value}</span>{" "}
              <span className="text-lg text-muted">{item.metric.label[locale]}</span>
            </p>
          )}
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{t("challenge")}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{item.challenge[locale]}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{t("solution")}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{item.solution[locale]}</p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">{t("results")}</h2>
            <div className="mt-4">
              <CheckList items={item.results[locale]} />
            </div>
          </div>
        </Container>
      </Section>

      <CtaBand title={t("ctaTitle")} text={t("ctaText")} />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: `${item.client}: ${item.summary[locale]}`,
          description: item.challenge[locale],
          inLanguage: locale,
          url: absoluteUrl({ pathname: "/cases/[slug]", params: { slug } }, locale),
          author: { "@id": `${site.url}/#person` },
        }}
      />
    </>
  );
}
