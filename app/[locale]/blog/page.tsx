import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { PostCard } from "@/components/post-card";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { Container, PageHero, Section } from "@/components/ui";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";
import { blogLocale, blogMetadata, blogUrl } from "@/lib/blog-meta";

type Props = { params: Promise<{ locale: Locale }> };

export function generateStaticParams() {
  return [{ locale: blogLocale }];
}

// Re-render hourly so scheduled posts appear on their date without a redeploy.
export const revalidate = 3600;

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  if (locale !== blogLocale) return {};
  const t = await getTranslations({ locale, namespace: "blog" });
  return blogMetadata({ title: t("title"), description: t("subtitle") });
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  if (locale !== blogLocale) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const home = await getTranslations("home");
  const posts = getAllPosts();

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "@id": `${blogUrl()}#blog`,
          name: t("title"),
          description: t("subtitle"),
          url: blogUrl(),
          inLanguage: blogLocale,
          author: { "@id": `${site.url}/#person` },
          blogPost: posts.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: blogUrl(p.slug),
            datePublished: p.date,
          })),
        }}
      />
      <PageHero eyebrow={t("eyebrow")} title={t("heroTitle")} subtitle={t("subtitle")} />
      <Section className="pt-0 sm:pt-0">
        <Container>
          {posts.length === 0 ? (
            <p className="text-muted">{t("empty")}</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) * 0.08} className="h-full">
                  <PostCard post={post} />
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </Section>
      <CtaBand title={home("ctaTitle")} text={home("ctaText")} />
    </>
  );
}
