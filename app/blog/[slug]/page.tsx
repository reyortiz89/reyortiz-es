import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PageShell } from "@/components/PageShell";
import { profile } from "@/data/profile";
import { getAllPosts, getPost, getRelatedPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

type Params = { slug: string };

export const revalidate = 3600;
export const dynamicParams = true;

export function generateStaticParams(): Params[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return {
    title: post.title,
    description: post.description,
    keywords: post.keyword ? [post.keyword, ...post.tags] : post.tags,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      url: `/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      authors: [profile.identity.name],
      tags: post.tags,
      ...(post.image ? { images: [post.image] } : {}),
    },
  };
}

export default async function PostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const related = getRelatedPosts(post);

  const jsonLd = {
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
        keywords: post.tags.join(", "),
        articleSection: post.category,
        inLanguage: "es",
        author: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${SITE_URL}/#person` },
        ...(post.image ? { image: new URL(post.image, SITE_URL).toString() } : {}),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE_URL}/blog` },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
  };

  return (
    <PageShell title={post.title} description={post.description}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <article className="max-w-3xl">
        <p className="text-xs uppercase tracking-wide text-(--muted)">
          {post.category} · <time dateTime={post.date}>{post.date}</time> · {profile.identity.name}
        </p>
        <div className="post-body mt-8 text-base leading-8 text-(--text)">
          <MDXRemote source={post.content} />
        </div>
      </article>

      {related.length > 0 ? (
        <aside className="mt-16 max-w-3xl border-t border-(--border) pt-8">
          <h2 className="text-lg font-semibold text-(--text)">Sigue leyendo</h2>
          <ul className="mt-4 grid gap-3">
            {related.map((item) => (
              <li key={item.slug}>
                <Link href={`/blog/${item.slug}`} className="text-(--accent) hover:underline">
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </PageShell>
  );
}
