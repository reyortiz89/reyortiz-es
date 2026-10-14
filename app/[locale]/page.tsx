import { ArrowRight, ArrowUpRight, Check, Plus, X } from "lucide-react";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookCallButton } from "@/components/book-call";
import { CaseCard, ServiceCard } from "@/components/cards";
import { BookingEmbed } from "@/components/booking-embed";
import { JsonLd } from "@/components/json-ld";
import { Marquee } from "@/components/marquee";
import { CountUp, Reveal } from "@/components/motion";
import { Accent, ButtonLink, Container, Eyebrow, Section, SectionHeader } from "@/components/ui";
import { cases } from "@/content/cases";
import { services } from "@/content/services";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/cn";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, href: "/", description: t("description") });
}

const clients = [
  "Boomi",
  "Mail Boxes Etc.",
  "FPT Software",
  "Saigon Technology",
  "Closevibe",
  "Cashela",
  "Flanks",
  "J&J Flowers",
  "Teisoft",
  "Shiponadime",
  "IDI Seafood",
  "Innova Eventos",
];

/* Bento layout: two wide cards on top, three below. */
const bento = ["lg:col-span-3", "lg:col-span-3", "lg:col-span-2", "lg:col-span-2", "lg:col-span-2"];

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("home");
  const tc = await getTranslations("common");

  const process = t.raw("process") as { title: string; text: string }[];
  const faq = t.raw("faq") as { q: string; a: string }[];
  const beforeItems = t.raw("beforeItems") as string[];
  const afterItems = t.raw("afterItems") as string[];
  const scoreAreas = t.raw("scoreAreas") as string[];
  const bookingPoints = t.raw("bookingPoints") as string[];
  const featured = cases.filter((c) => c.featured);
  const heroCase = featured[0];

  const stats = [
    { to: site.yearsOfExperience, suffix: "+", label: t("stats.years") },
    { to: 3, label: t("stats.regions") },
    { to: cases.length, label: t("stats.cases") },
    { to: 30, prefix: "-", suffix: locale === "es" ? " %" : "%", label: t("stats.cost") },
  ];
  const scores = [72, 48, 64, 35, 56];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden pb-16 pt-32 sm:pb-24 sm:pt-40">
        <div aria-hidden className="glow absolute inset-0" />
        <div aria-hidden className="grid-lines absolute inset-0" />
        <Container className="relative grid items-center gap-14 lg:grid-cols-[1.3fr_0.9fr] lg:gap-10">
          <div>
            <Reveal>
              <p className="inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 py-1.5 pl-2 pr-4 text-sm text-muted backdrop-blur">
                <span className="relative flex size-2.5 items-center justify-center">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500/60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                {t("available")}
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-7 text-balance text-[3.25rem] font-medium leading-[0.95] tracking-[-0.045em] text-foreground sm:text-7xl lg:text-[5.5rem]">
                <Accent text={t("title")} accentClassName="text-accent-ink" />
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-7 max-w-xl text-pretty text-lg leading-relaxed text-muted sm:text-xl">{t("subtitle")}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-10 flex flex-wrap items-center gap-3">
                <BookCallButton>{tc("bookCall")}</BookCallButton>
                <ButtonLink href="/cases" variant="secondary">
                  {tc("allCases")}
                </ButtonLink>
              </div>
              <p className="mt-10 font-mono text-xs uppercase tracking-[0.14em] text-muted">{t("eyebrow")}</p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-border bg-surface-2 shadow-2xl shadow-black/10">
              <Image
                src="/images/rey-ortiz-evento-fintech.webp"
                alt="Rey Ortiz"
                fill
                priority
                sizes="(min-width: 1024px) 36vw, 90vw"
                className="object-cover object-[50%_35%]"
              />
              <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute inset-x-5 bottom-5 text-white">
                <p className="text-lg font-medium">Rey Ortiz</p>
                <p className="text-sm text-white/75">{t("heroRole")}</p>
              </div>
            </div>

            {heroCase?.metric && (
              <div className="absolute -left-4 top-10 animate-float rounded-2xl border border-border bg-surface/90 p-4 shadow-xl backdrop-blur-xl sm:-left-10">
                <p className="text-3xl font-medium tracking-tight text-foreground">{heroCase.metric.value}</p>
                <p className="text-xs text-muted">{heroCase.metric.label[locale]}</p>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-wider text-accent-ink">MBE Spain</p>
              </div>
            )}

            <div
              className="absolute -right-3 bottom-24 animate-float rounded-2xl border border-border bg-surface/90 p-3 shadow-xl backdrop-blur-xl [animation-delay:-3s] sm:-right-8"
              aria-hidden
            >
              <p className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-muted">
                <span className="size-1.5 animate-pulse-dot rounded-full bg-emerald-500" />
                {t("heroWorkflow")}
              </p>
              <div className="flex items-center gap-1.5 text-[11px] font-medium">
                {["Lead", locale === "es" ? "IA" : "AI", "CRM"].map((n, i) => (
                  <span key={n} className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "rounded-lg border px-2 py-1",
                        i === 1 ? "border-accent bg-accent text-accent-foreground" : "border-border bg-background",
                      )}
                    >
                      {n}
                    </span>
                    {i < 2 && <ArrowRight className="size-3 text-muted" />}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Clients */}
      <section aria-label={t("trustedBy")} className="border-y border-border py-10">
        <Container>
          <p className="mb-6 text-center text-xs uppercase tracking-[0.18em] text-muted">{t("trustedBy")}</p>
        </Container>
        <Marquee
          items={clients.map((name, i) => (
            <span
              key={name}
              className={cn(
                "text-2xl tracking-tight text-foreground/55 sm:text-3xl",
                i % 3 === 1 ? "font-display" : "font-medium",
              )}
            >
              {name}
            </span>
          ))}
        />
      </section>

      {/* Before / after */}
      <Section>
        <Container>
          <Reveal>
            <SectionHeader eyebrow={t("beforeAfterEyebrow")} title={t("beforeAfterTitle")} />
          </Reveal>
          <div className="mt-14 grid gap-4 lg:grid-cols-2">
            <Reveal className="h-full">
              <div className="h-full rounded-3xl border border-border bg-surface p-8 sm:p-10">
                <p className="text-sm font-medium uppercase tracking-[0.16em] text-muted">{t("before")}</p>
                <ul className="mt-8 space-y-5">
                  {beforeItems.map((item) => (
                    <li key={item} className="flex items-start gap-4 text-lg text-muted">
                      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-surface-2">
                        <X className="size-3.5" aria-hidden />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="h-full">
              <div className="relative h-full overflow-hidden rounded-3xl bg-ink p-8 text-ink-foreground sm:p-10">
                <div aria-hidden className="grain absolute inset-0" />
                <div aria-hidden className="absolute -right-20 -top-20 size-64 rounded-full bg-accent/25 blur-3xl" />
                <p className="relative text-sm font-medium uppercase tracking-[0.16em] text-accent">{t("after")}</p>
                <ul className="relative mt-8 space-y-5">
                  {afterItems.map((item) => (
                    <li key={item} className="flex items-start gap-4 text-lg">
                      <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-full bg-accent text-accent-foreground">
                        <Check className="size-3.5" aria-hidden />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Services bento */}
      <Section className="pt-0 sm:pt-0">
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <Reveal>
              <SectionHeader eyebrow={t("servicesEyebrow")} title={t("servicesTitle")} subtitle={t("servicesSubtitle")} />
            </Reveal>
            <Reveal>
              <ButtonLink href="/services" variant="secondary" className="shrink-0">
                {tc("viewServices")}
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 0.06} className={cn(bento[i], i === 4 && "sm:col-span-2 lg:col-span-2")}>
                <ServiceCard service={service} locale={locale} index={i} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-ink py-20 text-ink-foreground sm:py-28">
        <div aria-hidden className="grain absolute inset-0" />
        <div aria-hidden className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
        <Container className="relative">
          <Reveal>
            <Eyebrow className="text-ink-foreground/60">{t("statsEyebrow")}</Eyebrow>
            <h2 className="mt-5 max-w-3xl text-balance text-4xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-6xl">
              <Accent text={t("statsTitle")} accentClassName="text-accent" />
            </h2>
          </Reveal>
          <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {stats.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="border-t border-ink-foreground/15 pt-6">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-6xl font-medium tracking-[-0.05em] sm:text-7xl">
                    <CountUp to={s.to} prefix={s.prefix} suffix={s.suffix} />
                  </dd>
                  <dd className="mt-3 max-w-[14rem] text-sm leading-relaxed text-ink-foreground/60">{s.label}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </Container>
      </section>

      {/* Featured cases */}
      <Section>
        <Container>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <Reveal>
              <SectionHeader eyebrow={t("casesEyebrow")} title={t("casesTitle")} subtitle={t("casesSubtitle")} />
            </Reveal>
            <Reveal>
              <ButtonLink href="/cases" variant="secondary" className="shrink-0">
                {tc("allCases")}
                <ArrowRight className="size-4" aria-hidden />
              </ButtonLink>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-4 md:grid-cols-3">
            {featured.map((item, i) => (
              <Reveal key={item.slug} delay={i * 0.08} className="h-full">
                <CaseCard item={item} locale={locale} index={i} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section className="border-t border-border">
        <Container className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <Reveal>
              <SectionHeader eyebrow={t("processEyebrow")} title={t("processTitle")} />
              <BookCallButton className="mt-10">{tc("bookCall")}</BookCallButton>
            </Reveal>
          </div>
          <ol>
            {process.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.05}>
                <li className="group grid grid-cols-[auto_1fr] gap-6 border-t border-border py-10 sm:gap-10">
                  <span className="w-14 font-display text-5xl leading-none text-muted transition-colors group-hover:text-accent-ink sm:w-20 sm:text-6xl">
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="text-2xl font-medium tracking-tight sm:text-3xl">{step.title}</h3>
                    <p className="mt-3 max-w-md text-pretty text-lg leading-relaxed text-muted">{step.text}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Free assessment */}
      <Section className="pt-0 sm:pt-0">
        <Container>
          <Reveal>
            <div className="grid items-center gap-12 overflow-hidden rounded-[2rem] border border-border bg-surface p-8 sm:p-12 lg:grid-cols-2 lg:p-16">
              <div>
                <Eyebrow>{t("resourcesEyebrow")}</Eyebrow>
                <h2 className="mt-5 text-balance text-4xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-5xl">
                  <Accent text={t("resourcesTitle")} />
                </h2>
                <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-muted">{t("resourcesText")}</p>
                <ButtonLink href="/resources" className="mt-10">
                  {t("resourcesCta")}
                  <ArrowRight className="size-4" aria-hidden />
                </ButtonLink>
              </div>

              <div aria-hidden className="relative">
                <div aria-hidden className="absolute -inset-10 rounded-full bg-accent/20 blur-3xl" />
                <div className="relative rounded-3xl border border-border bg-background p-6 shadow-2xl shadow-black/10 sm:p-8">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{t("scoreLabel")}</p>
                    <span className="rounded-full bg-surface-2 px-2.5 py-1 text-[11px] text-muted">{t("scoreExample")}</span>
                  </div>
                  <div className="mt-6 flex items-end gap-3">
                    <span className="text-7xl font-medium leading-none tracking-[-0.05em]">55</span>
                    <span className="pb-2 text-sm text-muted">{t("scoreOutOf")}</span>
                  </div>
                  <div className="mt-8 space-y-4">
                    {scoreAreas.map((area, i) => (
                      <div key={area}>
                        <div className="mb-1.5 flex justify-between text-sm">
                          <span>{area}</span>
                          <span className="tabular-nums text-muted">{scores[i]}</span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-surface-2">
                          <div
                            className={cn("h-full rounded-full", scores[i] < 50 ? "bg-foreground/30" : "bg-accent")}
                            style={{ width: `${scores[i]}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* About */}
      <Section className="pt-0 sm:pt-0">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <Reveal>
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-surface-2">
              <Image
                src="/images/rey-ortiz-msp-global.webp"
                alt="Rey Ortiz, MSP Global"
                fill
                sizes="(min-width: 1024px) 34vw, 90vw"
                className="object-cover object-top"
              />
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <Eyebrow>{t("aboutEyebrow")}</Eyebrow>
            <h2 className="mt-5 text-balance text-4xl font-medium leading-[1.02] tracking-[-0.035em] sm:text-5xl">
              <Accent text={t("aboutTitle")} />
            </h2>
            <blockquote className="mt-8 border-l-2 border-accent pl-6 font-display text-2xl leading-snug text-foreground sm:text-3xl">
              “{t("aboutQuote")}”
            </blockquote>
            <div className="mt-6 flex items-center gap-3">
              <Image
                src="/images/rey-ortiz-retrato.webp"
                alt=""
                width={44}
                height={44}
                className="size-11 rounded-full object-cover"
              />
              <p className="text-sm leading-tight">
                <span className="block font-medium">Rey Ortiz</span>
                <span className="text-muted">{t("heroRole")}</span>
              </p>
            </div>
            <ButtonLink href="/about" variant="secondary" className="mt-10">
              {t("aboutCta")}
              <ArrowUpRight className="size-4" aria-hidden />
            </ButtonLink>
          </Reveal>
        </Container>
      </Section>

      {/* FAQ */}
      <Section className="border-t border-border">
        <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <Reveal>
            <SectionHeader eyebrow={t("faqEyebrow")} title={t("faqTitle")} />
          </Reveal>
          <div>
            {faq.map((f, i) => (
              <Reveal key={f.q} delay={i * 0.04}>
                <details className="group border-t border-border py-6 last:border-b" open={i === 0}>
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-xl font-medium tracking-tight sm:text-2xl [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <span className="grid size-10 shrink-0 place-items-center rounded-full border border-border transition-all group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-accent-foreground">
                      <Plus className="size-4" aria-hidden />
                    </span>
                  </summary>
                  <p className="mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted">{f.a}</p>
                </details>
              </Reveal>
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

      {/* Booking */}
      <Section className="pt-0 sm:pt-0">
        <Container>
          <div className="relative overflow-hidden rounded-[2rem] bg-accent p-6 text-accent-foreground sm:p-10 lg:p-14">
            <div aria-hidden className="grain absolute inset-0" />
            <div className="relative grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
              <Reveal>
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-accent-foreground/70">
                  {t("bookingEyebrow")}
                </p>
                <h2 className="mt-5 text-balance text-4xl font-medium leading-[1] tracking-[-0.04em] sm:text-6xl">
                  <Accent text={t("ctaTitle")} />
                </h2>
                <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-accent-foreground/75">{t("ctaText")}</p>
                <ul className="mt-8 space-y-3">
                  {bookingPoints.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-lg">
                      <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent-foreground text-accent">
                        <Check className="size-3.5" aria-hidden />
                      </span>
                      {point}
                    </li>
                  ))}
                </ul>
                <Link
                  href={{ pathname: "/contact", hash: "message" }}
                  className="mt-10 inline-flex items-center gap-2 border-b border-accent-foreground/30 pb-1 font-medium transition-colors hover:border-accent-foreground"
                >
                  {t("bookingAlt")}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </Reveal>
              <Reveal delay={0.1}>
                <BookingEmbed className="border-accent-foreground/10 text-foreground" />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
