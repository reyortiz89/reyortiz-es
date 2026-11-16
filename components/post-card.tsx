import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { formatPostDate, type PostMeta } from "@/lib/blog";
import { blogLocale, postCover } from "@/lib/blog-meta";

export function PostCard({ post }: { post: PostMeta }) {
  return (
    <Link
      href={{ pathname: "/blog/[slug]", params: { slug: post.slug } }}
      locale={blogLocale}
      data-spotlight
      className="spotlight group flex h-full flex-col overflow-hidden rounded-[2rem] border border-border bg-surface transition-colors hover:border-foreground/25"
    >
      <div className="relative aspect-[1200/630] overflow-hidden border-b border-border bg-ink">
        {/* eslint-disable-next-line @next/next/no-img-element -- generated cover, already sized */}
        <img
          src={postCover(post)}
          alt=""
          width={1200}
          height={630}
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="flex items-center justify-between gap-4 text-xs uppercase tracking-[0.14em] text-muted">
          <span>{post.category}</span>
          <time dateTime={post.date}>{formatPostDate(post.date)}</time>
        </p>
        <h3 className="mt-6 text-xl font-medium leading-snug tracking-tight">{post.title}</h3>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted">{post.description}</p>
        <ArrowUpRight
          aria-hidden
          className="mt-auto size-5 self-end pt-6 text-muted transition-transform group-hover:rotate-45 group-hover:text-foreground"
          style={{ boxSizing: "content-box" }}
        />
      </div>
    </Link>
  );
}
