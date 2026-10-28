import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * Blog content pipeline: posts are MDX files in content/blog with YAML frontmatter.
 * A post is public once its date has passed and it is not marked as a draft,
 * so a week of posts can be merged ahead of time and appear on their day.
 */

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

export type PostType = "noticia" | "guia" | "caso" | "opinion";

export type PostMeta = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  type: PostType;
  keyword?: string;
  image?: string;
  draft: boolean;
};

export type Post = PostMeta & { content: string };

function slugFromFile(file: string) {
  // Files may be prefixed with their date (2026-11-02-my-post.mdx); the URL keeps only the slug.
  return file.replace(/\.mdx$/, "").replace(/^\d{4}-\d{2}-\d{2}-/, "");
}

function toDateString(value: unknown) {
  return value instanceof Date ? value.toISOString().slice(0, 10) : String(value ?? "");
}

function readPost(file: string): Post {
  const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
  const { data, content } = matter(raw);

  return {
    slug: data.slug ?? slugFromFile(file),
    title: data.title,
    description: data.description,
    date: toDateString(data.date),
    updated: data.updated ? toDateString(data.updated) : undefined,
    category: data.category ?? "General",
    tags: data.tags ?? [],
    type: data.type ?? "guia",
    keyword: data.keyword,
    image: data.image,
    draft: data.draft === true,
    content,
  };
}

function isPublished(post: PostMeta, now = new Date()) {
  return !post.draft && new Date(post.date) <= now;
}

export function getAllPosts(): Post[] {
  if (!fs.existsSync(BLOG_DIR)) return [];

  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map(readPost)
    .filter((post) => isPublished(post))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(slug: string): Post | undefined {
  return getAllPosts().find((post) => post.slug === slug);
}

export function getRelatedPosts(post: PostMeta, limit = 3): Post[] {
  return getAllPosts()
    .filter((other) => other.slug !== post.slug)
    .sort((a, b) => Number(b.category === post.category) - Number(a.category === post.category))
    .slice(0, limit);
}
