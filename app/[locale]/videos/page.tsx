import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/cta-band";
import { Container, PageHero, Section } from "@/components/ui";
import { VideoLibrary } from "@/components/video-library";
import type { Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/metadata";
import { publishedVideos } from "@/lib/video-sources";

type Props = { params: Promise<{ locale: Locale }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "videos" });
  const tm = await getTranslations({ locale, namespace: "meta" });
  return pageMetadata({ locale, href: "/videos", title: tm("videos"), description: t("subtitle") });
}

export default async function VideosPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("videos");
  const steps = t.raw("steps") as string[];

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("heroTitle")} subtitle={t("subtitle")}>
        <ol className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm">
          {steps.map((step, i) => (
            <li key={step} className="flex items-center gap-3">
              <span className="grid size-7 place-items-center rounded-full bg-foreground font-mono text-xs text-background">
                {i + 1}
              </span>
              {step}
            </li>
          ))}
        </ol>
      </PageHero>
      <Section className="pt-0 sm:pt-0">
        <Container>
          <VideoLibrary published={publishedVideos()} />
        </Container>
      </Section>
      <CtaBand title={t("ctaTitle")} text={t("ctaText")} />
    </>
  );
}
