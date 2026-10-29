import type { MetadataRoute } from "next";
import { assessments } from "@/content/assessments";
import { cases } from "@/content/cases";
import { services } from "@/content/services";
import { routing } from "@/i18n/routing";
import { getAllPosts } from "@/lib/blog";
import { blogUrl } from "@/lib/blog-meta";
import { absoluteUrl } from "@/lib/metadata";

type Href = Parameters<typeof absoluteUrl>[0];

export default function sitemap(): MetadataRoute.Sitemap {
  const hrefs: { href: Href; priority: number }[] = [
    { href: "/", priority: 1 },
    { href: "/services", priority: 0.9 },
    ...services.map((s) => ({ href: { pathname: "/services/[slug]" as const, params: { slug: s.slug } }, priority: 0.8 })),
    { href: "/cases", priority: 0.8 },
    ...cases.map((c) => ({ href: { pathname: "/cases/[slug]" as const, params: { slug: c.slug } }, priority: 0.7 })),
    { href: "/resources", priority: 0.7 },
    ...assessments.map((a) => ({
      href: { pathname: "/resources/assessments/[slug]" as const, params: { slug: a.slug } },
      priority: 0.7,
    })),
    { href: "/resources/roi-calculator", priority: 0.6 },
    { href: "/videos", priority: 0.7 },
    { href: "/about", priority: 0.7 },
    { href: "/contact", priority: 0.8 },
  ];

  const lastModified = new Date();
  const pages = hrefs.flatMap(({ href, priority }) =>
    routing.locales.map((locale) => ({
      url: absoluteUrl(href, locale),
      lastModified,
      priority,
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(href, l)])),
      },
    })),
  );

  // The blog is Spanish only, so its URLs have no English alternate.
  const posts = getAllPosts();
  const blog: MetadataRoute.Sitemap = [
    { url: blogUrl(), lastModified: posts[0] ? new Date(posts[0].updated ?? posts[0].date) : lastModified, priority: 0.8 },
    ...posts.map((post) => ({
      url: blogUrl(post.slug),
      lastModified: new Date(post.updated ?? post.date),
      priority: 0.7,
    })),
  ];

  return [...pages, ...blog];
}
