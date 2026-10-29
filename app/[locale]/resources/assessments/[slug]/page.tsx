import { Check, Clock, ListChecks, Mail } from "lucide-react";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { AssessmentRunner } from "@/components/assessment-runner";
import { BackLink, Container, PageHero, Section } from "@/components/ui";
import { assessments, getAssessment } from "@/content/assessments";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => assessments.map((a) => ({ locale, slug: a.slug })));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const assessment = getAssessment(slug);
  if (!assessment) return {};
  return pageMetadata({
    locale,
    href: { pathname: "/resources/assessments/[slug]", params: { slug } },
    title: assessment.title[locale],
    description: assessment.short[locale],
  });
}

export default async function AssessmentPage({ params }: Props) {
  const { locale, slug } = await params;
  const assessment = getAssessment(slug);
  if (!assessment) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("assessments");
  const tr = await getTranslations("resources");

  const facts = [
    { icon: Clock, text: t("minutes", { minutes: assessment.minutes }) },
    { icon: ListChecks, text: t("questions", { count: assessment.questions.length }) },
    { icon: Mail, text: t("reportByEmail") },
  ];

  return (
    <>
      <PageHero
        eyebrow={t(assessment.kind === "audit" ? "eyebrowAudit" : "eyebrowMaturity")}
        title={assessment.title[locale]}
        subtitle={assessment.intro[locale]}
        size="md"
        back={<BackLink href="/resources">{tr("back")}</BackLink>}
      >
        <ul className="mt-8 flex flex-wrap gap-2">
          {facts.map(({ icon: Icon, text }) => (
            <li key={text} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 text-sm">
              <Icon className="size-4 text-accent-ink" aria-hidden />
              {text}
            </li>
          ))}
        </ul>
      </PageHero>
      <Section className="pt-0 sm:pt-0">
        <Container className="grid items-start gap-4 lg:grid-cols-[1fr_20rem]">
          <AssessmentRunner assessment={assessment} />
          <aside className="space-y-4 lg:sticky lg:top-28">
            <div className="rounded-[2rem] border border-border bg-surface p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">{t("youGet")}</p>
              <ul className="mt-5 space-y-3 text-sm">
                {(t.raw(assessment.kind === "audit" ? "gateItemsAudit" : "gateItemsMaturity") as string[]).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent-ink" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-[2rem] border border-border bg-surface p-6">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">{t("areas")}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {assessment.areas.map((area) => (
                  <li key={area.key} className="rounded-full bg-surface-2 px-3 py-1.5 text-sm">
                    {area.label[locale]}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </Container>
      </Section>
    </>
  );
}
