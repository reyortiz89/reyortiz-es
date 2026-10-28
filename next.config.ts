import type { NextConfig } from "next";

const blogContent = ["./content/blog/**/*"];

const nextConfig: NextConfig = {
  // Blog routes read MDX from disk when they revalidate, so ship the content with them.
  outputFileTracingIncludes: {
    "/blog": blogContent,
    "/blog/[slug]": blogContent,
    "/blog/rss.xml": blogContent,
    "/sitemap.xml": blogContent,
  },
  async headers() {
    return [
      {
        // Static Bootstrap demo (placeholder texts); keep it out of search results until it is removed.
        source: "/template/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
