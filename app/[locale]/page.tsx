import { ArrowRight, Calendar, CheckCircle2, Gauge, Sparkles } from "lucide-react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CaseCard, ServiceCard } from "@/components/cards";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { ButtonLink, Container, ExternalButton, Section, SectionHeader } from "@/components/ui";
import { cases } from "@/content/cases";
import { profile } from "@/content/profile";
import { services } from "@/content/services";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, href: "/", description: t("description") });
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("common");
  const ts = await getTranslations("services");

  const problems = t.raw("problems") as string[];
  const process = t.raw("process") as { title: string; text: string }[];
  const faq = t.raw("faq") as { q: string; a: string }[];
  const featured = cases.filter((c) => c.featured);

  const stats = [
    { value: `${site.yearsOfExperience}+`, label: t("stats.years") },
    { value: "3", label: t("stats.regions") },
    { value: String(cases.length), label: t("stats.cases") },
    { value: "$100k+", label: t("stats.pilots") },
  ];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div aria-hidden className="hero-glow absolute inset-0" />
        <div aria-hidden className="grid-fade absolute inset-0" />
        <Container className="relative grid items-center gap-12 py-16 sm:py-24 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1 text-sm font-medium text-muted">
              <Sparkles className="size-4 text-primary" aria-hidden />
              {t("eyebrow")}
            </p>
            <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground sm:text-6xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{t("subtitle")}</p>
            <div className="mt-10 flex flex-wrap gap-3">
              {site.bookingUrl ? (
                <ExternalButton href={site.bookingUrl}>
                  <Calendar className="size-4" aria-hidden />
                  {t("primaryCta")}
                </ExternalButton>
              ) : (
                <ButtonLink href="/contact">
                  {tc("contactMe")}
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              )}
              <ButtonLink href="/cases" variant="secondary">
                {t("secondaryCta")}
              </ButtonLink>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-sm">
            <div className="overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl shadow-primary/10">
              <Image
                src="/images/rey-ortiz-retrato.webp"
                alt="Rey Ortiz"
                width={520}
                height={520}
                priority
                className="aspect-square w-full object-cover"
              />
              <div className="p-5">
                <p className="font-semibold text-foreground">Rey Ortiz</p>
                <p className="mt-1 text-sm text-muted">{profile.role[locale]}</p>
              </div>
            </div>
          </div>
        </Container>

        <Container className="relative pb-16">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-background p-5">
                <dt className="text-sm text-muted">{s.label}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-foreground">{s.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* Clients */}
      <section aria-labelledby="clients" className="border-y border-border bg-surface py-10">
        <Container>
          <p id="clients" className="text-center text-sm font-medium text-muted">
            {t("trustedBy")}
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-base font-semibold text-foreground/70">
            {cases.map((c) => (
              <li key={c.slug}>{c.client}</li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Problems */}
      <Section>
        <Container className="grid gap-10 lg:grid-cols-2">
          <SectionHeader title={t("problemsTitle")} />
          <ul className="space-y-4">
            {problems.map((p) => (
              <li key={p} className="flex gap-3 rounded-xl border border-border bg-surface p-4">
                <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden />
                <span className="text-foreground">{p}</span>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Services */}
      <Section className="pt-0">
        <Container>
          <SectionHeader title={t("servicesTitle")} subtitle={t("servicesSubtitle")} />
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} locale={locale} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Cases */}
      <Section className="border-y border-border bg-surface">
        <Container>
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeader title={t("casesTitle")} subtitle={t("casesSubtitle")} />
            <ButtonLink href="/cases" variant="secondary">
              {tc("allCases")}
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {featured.map((c) => (
              <CaseCard key={c.slug} item={c} locale={locale} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section>
        <Container>
          <SectionHeader title={t("processTitle")} />
          <ol className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, i) => (
              <li key={step.title} className="rounded-2xl border border-border p-6">
                <span className="font-mono text-sm text-primary">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 leading-relaxed text-muted">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Resources teaser */}
      <Section className="pt-0">
        <Container>
          <div className="grid items-center gap-8 rounded-3xl border border-border bg-surface p-8 sm:p-12 lg:grid-cols-[auto_1fr_auto]">
            <span className="grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary">
              <Gauge className="size-7" aria-hidden />
            </span>
            <div>
              <h2 className="text-2xl font-semibold tracking-tight">{t("resourcesTitle")}</h2>
              <p className="mt-2 max-w-2xl text-muted">{t("resourcesText")}</p>
            </div>
            <ButtonLink href="/resources" variant="secondary">
              {t("resourcesCta")}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* About teaser */}
      <Section className="pt-0">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="overflow-hidden rounded-3xl border border-border">
            <Image
              src="/images/rey-ortiz-mwc-barcelona.webp"
              alt="Rey Ortiz, Mobile World Congress Barcelona"
              width={1400}
              height={647}
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <SectionHeader title={t("aboutTitle")} />
            <p className="mt-6 text-lg leading-relaxed text-muted">{profile.bio[locale][0]}</p>
            <ButtonLink href="/about" variant="secondary" className="mt-8">
              {t("aboutCta")}
              <ArrowRight className="size-4" aria-hidden />
            </ButtonLink>
          </div>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-border">
        <Container className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <SectionHeader title={t("faqTitle")} />
          <div className="divide-y divide-border rounded-2xl border border-border">
            {faq.map((item) => (
              <details key={item.q} className="group p-5 [&_summary::-webkit-details-marker]:hidden">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground">
                  {item.q}
                  <span aria-hidden className="text-xl text-muted transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faq.map((f) => ({
              "@type": "Question",
              name: f.q,
              acceptedAnswer: { "@type": "Answer", text: f.a },
            })),
          }}
        />
      </Section>

      <CtaBand title={ts("ctaTitle")} text={ts("ctaText")} />
    </>
  );
}
