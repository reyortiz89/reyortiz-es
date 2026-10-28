import type { Metadata } from "next";
import { site } from "@/content/site";

/** The blog is written in Spanish only, so its pages live under /es and have no English alternate. */
export const blogLocale = "es" as const;

export function blogUrl(slug?: string) {
  return new URL(`/${blogLocale}/blog${slug ? `/${slug}` : ""}`, site.url).toString();
}

export const rssUrl = new URL("/blog/rss.xml", site.url).toString();

export function blogMetadata({
  slug,
  title,
  description,
  article,
}: {
  slug?: string;
  title: string;
  description: string;
  article?: { publishedTime: string; modifiedTime: string; tags: string[]; image?: string };
}): Metadata {
  const url = blogUrl(slug);
  return {
    title,
    description,
    keywords: article?.tags,
    alternates: {
      canonical: url,
      languages: { es: url },
      types: { "application/rss+xml": rssUrl },
    },
    openGraph: {
      title,
      description,
      url,
      locale: "es_ES",
      siteName: site.name,
      ...(article
        ? {
            type: "article",
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime,
            authors: [site.legalName],
            tags: article.tags,
            ...(article.image ? { images: [article.image] } : {}),
          }
        : { type: "website" }),
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/** Cover image of a post: its own `image` when set, otherwise the branded cover generated for it. */
export function postCover(post: { slug: string; image?: string }) {
  return post.image ?? `/${blogLocale}/blog/${post.slug}/opengraph-image`;
}
