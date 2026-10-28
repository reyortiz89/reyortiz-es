import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog",
  description: "Artículos, guías y noticias sobre inteligencia artificial y gestión de proyectos para empresas.",
  alternates: {
    canonical: "/blog",
    types: { "application/rss+xml": "/blog/rss.xml" },
  },
};

// Re-render hourly so scheduled posts appear on their publish date without a redeploy.
export const revalidate = 3600;

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <PageShell
      title="Blog"
      description="Inteligencia artificial y proyectos: guías prácticas, casos reales y las noticias que importan a las empresas."
    >
      {posts.length === 0 ? (
        <p className="text-(--muted)">Muy pronto, los primeros artículos.</p>
      ) : (
        <ul className="grid gap-6">
          {posts.map((post) => (
            <li key={post.slug} className="rounded-2xl border border-(--border) bg-(--surface) p-6 shadow-sm">
              <p className="text-xs uppercase tracking-wide text-(--muted)">
                {post.category} · <time dateTime={post.date}>{post.date}</time>
              </p>
              <h2 className="mt-2 text-xl font-semibold tracking-tight text-(--text)">
                <Link href={`/blog/${post.slug}`} className="hover:text-(--accent)">
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-7 text-(--muted)">{post.description}</p>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
