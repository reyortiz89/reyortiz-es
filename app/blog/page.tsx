import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
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
      eyebrow="Blog"
      title="Blog"
      description="Inteligencia artificial y proyectos: guías prácticas, casos reales y las noticias que importan a las empresas."
    >
      {posts.length === 0 ? (
        <p className="text-(--muted)">Muy pronto, los primeros artículos.</p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2">
          {posts.map((post, i) => (
            <li key={post.slug} className={"reveal " + (i === 0 ? "md:col-span-2" : "")}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full flex-col rounded-2xl border border-(--border) bg-(--surface) p-7 transition hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--border))] hover:shadow-md hover:text-(--text)"
              >
                <p className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-(--muted)">
                  <span className="rounded-full bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] px-2.5 py-0.5 text-(--accent)">
                    {post.category}
                  </span>
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </p>
                <h2
                  className={
                    "mt-4 font-semibold tracking-tight text-(--text) group-hover:text-(--accent) " +
                    (i === 0 ? "text-2xl sm:text-3xl" : "text-xl")
                  }
                >
                  {post.title}
                </h2>
                <p className="mt-3 text-sm leading-7">{post.description}</p>
                <span className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-(--accent)">
                  Leer artículo <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-ES", { day: "numeric", month: "long", year: "numeric" });
}
