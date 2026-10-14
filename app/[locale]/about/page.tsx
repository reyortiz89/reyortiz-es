import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/cta-band";
import { LinkedInIcon } from "@/components/icons";
import { CheckList, Container, ExternalButton, Section } from "@/components/ui";
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

  return (
    <>
      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1.3fr_0.7fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-primary">{t("title")}</p>
            <h1 className="mt-3 text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
              {profile.headline[locale]}
            </h1>
            <p className="mt-4 text-lg text-muted">{profile.role[locale]}</p>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-foreground">
              {profile.bio[locale].map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <ExternalButton href={site.linkedin} variant="secondary" className="mt-8">
              <LinkedInIcon className="size-4" />
              LinkedIn
            </ExternalButton>
          </div>
          <div className="space-y-4">
            <Image
              src="/images/rey-ortiz-evento-fintech.webp"
              alt={t("photoAlt")}
              width={900}
              height={1200}
              priority
              sizes="(min-width: 1024px) 33vw, 100vw"
              className="aspect-[3/4] w-full rounded-3xl border border-border object-cover"
            />
            <div className="rounded-2xl border border-border bg-surface p-5">
              <p className="text-sm font-semibold">{t("languages")}</p>
              <p className="mt-2 text-sm text-muted">{profile.languages[locale].join(" · ")}</p>
              <p className="mt-4 text-sm text-muted">{profile.regions[locale]}</p>
            </div>
          </div>
        </Container>
      </Section>

      <Section className="border-y border-border bg-surface">
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <h2 className="text-3xl font-semibold tracking-tight">{t("approach")}</h2>
          <CheckList items={profile.approach[locale]} />
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-3xl font-semibold tracking-tight">{t("experience")}</h2>
          <ol className="mt-10 space-y-0 border-l border-border">
            {experience.map((job) => (
              <li key={`${job.company}-${job.period.en}`} className="relative pb-10 pl-8 last:pb-0">
                <span aria-hidden className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-primary" />
                <p className="text-sm text-muted">
                  {job.period[locale]} · {job.location}
                </p>
                <h3 className="mt-1 text-lg font-semibold">
                  {job.role[locale]} <span className="text-muted">· {job.company}</span>
                </h3>
                <p className="mt-2 max-w-3xl leading-relaxed text-muted">{job.summary[locale]}</p>
                {job.highlights && (
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {job.highlights[locale].map((h) => (
                      <li key={h} className="rounded-full border border-border px-3 py-1 text-xs text-muted">
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ol>
        </Container>
      </Section>

      <Section className="border-t border-border">
        <Container>
          <h2 className="text-3xl font-semibold tracking-tight">{t("education")}</h2>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {education.map((e) => (
              <li key={e.title.en} className="rounded-2xl border border-border bg-surface p-5">
                <p className="font-semibold">{e.title[locale]}</p>
                <p className="mt-1 text-sm text-muted">
                  {e.school}
                  {e.period ? ` · ${e.period}` : ""}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      <CtaBand title={ts("ctaTitle")} text={ts("ctaText")} />
    </>
  );
}
