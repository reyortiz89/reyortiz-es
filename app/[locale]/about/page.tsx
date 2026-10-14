import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { BookCallButton } from "@/components/book-call";
import { CtaBand } from "@/components/cta-band";
import { LinkedInIcon } from "@/components/icons";
import { CountUp, Reveal } from "@/components/motion";
import { Container, Eyebrow, ExternalButton, PageHero, Section } from "@/components/ui";
import { cases } from "@/content/cases";
import { education, experience, profile } from "@/content/profile";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about" });
  return pageMetadata({ locale, href: "/about", title: t("title"), description: profile.short[locale] });
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const ts = await getTranslations("services");
  const th = await getTranslations("home");
  const tc = await getTranslations("common");
  const [lead, ...bio] = profile.bio[locale];

  const stats = [
    { to: site.yearsOfExperience, suffix: "+", label: th("stats.years") },
    { to: 3, label: th("stats.regions") },
    { to: cases.length, label: th("stats.cases") },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("heroTitle")}
        subtitle={profile.role[locale]}
        aside={
          <div className="relative mx-auto aspect-[3/4] w-full max-w-sm overflow-hidden rounded-[2rem] border border-border bg-surface-2 shadow-2xl shadow-black/10 lg:max-w-none">
            <Image
              src="/images/rey-ortiz-barcelona.webp"
              alt={t("photoAlt")}
              fill
              priority
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="object-cover"
            />
          </div>
        }
      >
        <div className="mt-10 flex flex-wrap gap-3">
          <BookCallButton>{tc("bookCall")}</BookCallButton>
          <ExternalButton href={site.linkedin} variant="secondary">
            <LinkedInIcon className="size-4" />
            LinkedIn
          </ExternalButton>
        </div>
      </PageHero>

      {/* Bio */}
      <Section className="pt-0 sm:pt-0">
        <Container className="grid gap-10 border-t border-border pt-16 lg:grid-cols-[0.5fr_1.5fr]">
          <Reveal>
            <Eyebrow>{t("title")}</Eyebrow>
          </Reveal>
          <div>
            <Reveal>
              <p className="text-pretty text-2xl font-medium leading-snug tracking-tight sm:text-3xl">{lead}</p>
            </Reveal>
            <div className="mt-8 grid gap-6 text-lg leading-relaxed text-muted md:grid-cols-2">
              {bio.map((p, i) => (
                <Reveal key={p} delay={i * 0.06}>
                  <p className="text-pretty">{p}</p>
                </Reveal>
              ))}
            </div>
            <dl className="mt-14 grid grid-cols-3 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="border-t border-border pt-5">
                  <dt className="sr-only">{s.label}</dt>
                  <dd className="text-4xl font-medium tracking-[-0.04em] sm:text-6xl">
                    <CountUp to={s.to} suffix={s.suffix} />
                  </dd>
                  <dd className="mt-2 text-sm text-muted">{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </Section>

      {/* Approach */}
      <section className="relative overflow-hidden bg-ink py-20 text-ink-foreground sm:py-28">
        <div aria-hidden className="grain absolute inset-0" />
        <Container className="relative">
          <Reveal>
            <Eyebrow className="text-ink-foreground/60">{t("approach")}</Eyebrow>
          </Reveal>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-ink-foreground/10 bg-ink-foreground/10 sm:grid-cols-2 lg:grid-cols-4">
            {profile.approach[locale].map((item, i) => {
              const [title, ...rest] = item.split(":");
              return (
                <li key={item} className="bg-ink p-8">
                  <span className="font-display text-5xl text-accent">0{i + 1}</span>
                  <p className="mt-8 text-xl font-medium tracking-tight">{title}</p>
                  {rest.length > 0 && (
                    <p className="mt-2 leading-relaxed text-ink-foreground/60">{rest.join(":").trim()}</p>
                  )}
                </li>
              );
            })}
          </ol>
        </Container>
      </section>

      {/* Experience */}
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[0.5fr_1.5fr]">
          <Reveal>
            <div className="lg:sticky lg:top-32">
              <Eyebrow>{t("experience")}</Eyebrow>
              <p className="mt-4 text-sm text-muted">{profile.languages[locale].join(" · ")}</p>
            </div>
          </Reveal>
          <ol className="border-b border-border">
            {experience.map((job) => (
              <Reveal key={`${job.company}-${job.period.en}`}>
                <li className="grid gap-3 border-t border-border py-8 sm:grid-cols-[0.45fr_1fr] sm:gap-8">
                  <div>
                    <p className="text-sm text-muted">{job.period[locale]}</p>
                    <p className="text-sm text-muted">{job.location}</p>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium tracking-tight sm:text-2xl">{job.company}</h3>
                    <p className="mt-1 text-foreground/80">{job.role[locale]}</p>
                    <p className="mt-3 max-w-2xl text-pretty leading-relaxed text-muted">{job.summary[locale]}</p>
                    {job.highlights && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {job.highlights[locale].map((h) => (
                          <li key={h} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                            {h}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Education */}
      <Section className="pt-0 sm:pt-0">
        <Container className="grid gap-10 lg:grid-cols-[0.5fr_1.5fr]">
          <Reveal>
            <Eyebrow>{t("education")}</Eyebrow>
          </Reveal>
          <ul className="grid gap-4 sm:grid-cols-2">
            {education.map((e, i) => (
              <Reveal key={e.title.en} delay={(i % 2) * 0.06} className="h-full">
                <li className="h-full rounded-3xl border border-border bg-surface p-6">
                  <p className="text-lg font-medium tracking-tight">{e.title[locale]}</p>
                  <p className="mt-2 text-sm text-muted">
                    {e.school}
                    {e.period ? ` · ${e.period}` : ""}
                  </p>
                </li>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Gallery */}
      <Section className="pt-0 sm:pt-0">
        <Container>
          <Reveal>
            <Eyebrow>{t("gallery")}</Eyebrow>
          </Reveal>
          <div className="mt-8 grid gap-4 md:grid-cols-[1.6fr_1fr]">
            <Reveal className="relative aspect-[16/10] overflow-hidden rounded-3xl bg-surface-2 md:aspect-auto">
              <Image
                src="/images/rey-ortiz-mwc-barcelona.webp"
                alt="Rey Ortiz, Mobile World Congress Barcelona"
                fill
                sizes="(min-width: 768px) 60vw, 100vw"
                className="object-cover"
              />
            </Reveal>
            <Reveal delay={0.08} className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-surface-2">
              <Image
                src="/images/rey-ortiz-msp-global.webp"
                alt="Rey Ortiz, MSP Global"
                fill
                sizes="(min-width: 768px) 35vw, 100vw"
                className="object-cover object-top"
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <CtaBand title={ts("ctaTitle")} text={ts("ctaText")} />
    </>
  );
}
