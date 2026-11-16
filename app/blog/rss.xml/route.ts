import { site } from "@/content/site";
import { getAllPosts } from "@/lib/blog";
import { blogUrl, rssUrl } from "@/lib/blog-meta";

export const revalidate = 3600;

function escape(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export function GET() {
  const items = getAllPosts()
    .map((post) => {
      const url = blogUrl(post.slug);
      return `    <item>
      <title>${escape(post.title)}</title>
      <link>${url}</link>
      <guid>${url}</guid>
      <description>${escape(post.description)}</description>
      <category>${escape(post.category)}</category>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escape(`Blog · ${site.name}`)}</title>
    <link>${blogUrl()}</link>
    <atom:link href="${rssUrl}" rel="self" type="application/rss+xml" />
    <description>${escape(`Artículos y noticias de ${site.name}.`)}</description>
    <language>es</language>
${items}
  </channel>
</rss>
`;

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } });
}
