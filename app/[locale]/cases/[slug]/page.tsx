import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CaseRow } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { BackLink, CheckList, Container, Eyebrow, PageHero, Section } from "@/components/ui";
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

  const position = cases.findIndex((c) => c.slug === slug);
  const next = [cases[(position + 1) % cases.length], cases[(position + 2) % cases.length]];

  return (
    <>
      <PageHero
        back={<BackLink href="/cases">{t("title")}</BackLink>}
        eyebrow={item.client}
        title={item.summary[locale]}
        size="md"
        aside={
          item.metric ? (
            <div className="relative overflow-hidden rounded-[2rem] bg-accent p-8 text-accent-foreground sm:p-10">
              <div aria-hidden className="grain absolute inset-0" />
              <p className="relative text-6xl font-medium tracking-[-0.05em] sm:text-7xl">{item.metric.value}</p>
              <p className="relative mt-3 text-lg text-accent-foreground/75">{item.metric.label[locale]}</p>
            </div>
          ) : undefined
        }
      >
        <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border pt-8 sm:grid-cols-4">
          {facts.map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs uppercase tracking-[0.14em] text-muted">{label}</dt>
              <dd className="mt-2 font-medium">{value}</dd>
            </div>
          ))}
          <div>
            <dt className="text-xs uppercase tracking-[0.14em] text-muted">{t("servicesUsed")}</dt>
            <dd className="mt-2 flex flex-col gap-1 font-medium">
              {item.services.map((s) => {
                const service = getService(s);
                return service ? (
                  <Link
                    key={s}
                    href={{ pathname: "/services/[slug]", params: { slug: s } }}
                    className="underline decoration-border underline-offset-4 hover:decoration-foreground"
                  >
                    {service.title[locale]}
                  </Link>
                ) : null;
              })}
            </dd>
          </div>
        </dl>
      </PageHero>

      <Section className="pt-0 sm:pt-0">
        <Container className="space-y-4">
          {(
            [
              ["01", t("challenge"), item.challenge[locale]],
              ["02", t("solution"), item.solution[locale]],
            ] as const
          ).map(([n, title, text]) => (
            <Reveal key={n}>
              <div className="grid gap-6 rounded-3xl border border-border bg-surface p-8 sm:p-12 lg:grid-cols-[0.6fr_1.4fr]">
                <div>
                  <span className="font-display text-5xl text-muted">{n}</span>
                  <h2 className="mt-2 text-2xl font-medium tracking-tight sm:text-3xl">{title}</h2>
                </div>
                <p className="text-pretty text-xl leading-relaxed text-muted sm:text-2xl">{text}</p>
              </div>
            </Reveal>
          ))}
          <Reveal>
            <div className="relative grid gap-6 overflow-hidden rounded-3xl bg-ink p-8 text-ink-foreground sm:p-12 lg:grid-cols-[0.6fr_1.4fr]">
              <div aria-hidden className="grain absolute inset-0" />
              <div className="relative">
                <span className="font-display text-5xl text-accent">03</span>
                <h2 className="mt-2 text-2xl font-medium tracking-tight sm:text-3xl">{t("results")}</h2>
              </div>
              <CheckList
                items={item.results[locale]}
                className="relative grid gap-4 space-y-0 text-xl sm:grid-cols-2 [&_li]:text-ink-foreground [&_svg]:text-accent"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section className="pt-0 sm:pt-0">
        <Container>
          <Reveal>
            <Eyebrow>{t("more")}</Eyebrow>
          </Reveal>
          <div className="mt-8 border-b border-border">
            {next.map((c) => (
              <CaseRow key={c.slug} item={c} locale={locale} />
            ))}
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
