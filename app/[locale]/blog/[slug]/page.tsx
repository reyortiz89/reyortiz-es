import { MDXRemote } from "next-mdx-remote/rsc";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/cta-band";
import { JsonLd } from "@/components/json-ld";
import { Reveal } from "@/components/motion";
import { PostCard } from "@/components/post-card";
import { BackLink, Container, PageHero, Section } from "@/components/ui";
import { site } from "@/content/site";
import type { Locale } from "@/i18n/routing";
import { formatPostDate, getAllPosts, getPost, getRelatedPosts, readingMinutes } from "@/lib/blog";
import { blogLocale, blogMetadata, blogUrl } from "@/lib/blog-meta";

type Props = { params: Promise<{ locale: Locale; slug: string }> };

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ locale: blogLocale, slug: post.slug }));
}

// Posts scheduled for a later date are rendered on demand once their date arrives.
export const dynamicParams = true;
export const revalidate = 3600;

export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const post = locale === blogLocale ? getPost(slug) : undefined;
  if (!post) return {};
  return blogMetadata({
    slug,
    title: post.title,
    description: post.description,
    article: {
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      tags: post.keyword ? [post.keyword, ...post.tags] : post.tags,
      image: post.image,
    },
  });
}

export default async function PostPage({ params }: Props) {
  const { locale, slug } = await params;
  const post = locale === blogLocale ? getPost(slug) : undefined;
  if (!post) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("blog");
  const home = await getTranslations("home");
  const url = blogUrl(post.slug);
  const related = getRelatedPosts(post);
  const faq = extractFaq(post.content);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              headline: post.title,
              description: post.description,
              datePublished: post.date,
              dateModified: post.updated ?? post.date,
              mainEntityOfPage: url,
              url,
              keywords: (post.keyword ? [post.keyword, ...post.tags] : post.tags).join(", "),
              articleSection: post.category,
              inLanguage: blogLocale,
              author: { "@id": `${site.url}/#person` },
              publisher: { "@id": `${site.url}/#person` },
              isPartOf: { "@id": `${blogUrl()}#blog` },
              ...(post.image ? { image: new URL(post.image, site.url).toString() } : {}),
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: t("home"), item: new URL(`/${blogLocale}`, site.url).toString() },
                { "@type": "ListItem", position: 2, name: t("title"), item: blogUrl() },
                { "@type": "ListItem", position: 3, name: post.title, item: url },
              ],
            },
            ...(faq.length
              ? [
                  {
                    "@type": "FAQPage",
                    mainEntity: faq.map(({ question, answer }) => ({
                      "@type": "Question",
                      name: question,
                      acceptedAnswer: { "@type": "Answer", text: answer },
                    })),
                  },
                ]
              : []),
          ],
        }}
      />
      <PageHero back={<BackLink href="/blog">{t("title")}</BackLink>} eyebrow={post.category} title={post.title} size="md">
        <p className="mt-8 flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted">
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
          <span aria-hidden>·</span>
          <span>{t("readingTime", { minutes: readingMinutes(post.content) })}</span>
          <span aria-hidden>·</span>
          <span>{site.name}</span>
        </p>
      </PageHero>
      <Section className="pt-0 sm:pt-0">
        <Container>
          <article className="post-body mx-auto max-w-3xl">
            <MDXRemote source={post.content} />
          </article>

          {related.length > 0 && (
            <aside className="mt-24 border-t border-border pt-12">
              <h2 className="text-2xl font-medium tracking-tight">{t("related")}</h2>
              <div className="mt-8 grid gap-4 md:grid-cols-3">
                {related.map((item, i) => (
                  <Reveal key={item.slug} delay={i * 0.08} className="h-full">
                    <PostCard post={item} />
                  </Reveal>
                ))}
              </div>
            </aside>
          )}
        </Container>
      </Section>
      <CtaBand title={home("ctaTitle")} text={home("ctaText")} />
    </>
  );
}

/** Pulls question/answer pairs from a "Preguntas frecuentes" section (### headings) for FAQ rich results. */
function extractFaq(content: string) {
  const section = content.split(/^## Preguntas frecuentes\s*$/m)[1]?.split(/^(?:## |---)/m)[0];
  if (!section) return [];
  return section
    .split(/^### /m)
    .slice(1)
    .map((block) => {
      const [question, ...rest] = block.split("\n");
      const answer = rest.join(" ").replace(/\*\*|\[|\]\([^)]*\)/g, "").replace(/\s+/g, " ").trim();
      return { question: question.trim(), answer };
    })
    .filter((item) => item.question && item.answer);
}
