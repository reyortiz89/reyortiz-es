import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const blogContent = ["./content/blog/**/*"];

const nextConfig: NextConfig = {
  // Blog routes read MDX from disk when they revalidate, so ship the content with them.
  outputFileTracingIncludes: {
    "/[locale]/blog": blogContent,
    "/[locale]/blog/[slug]": blogContent,
    "/blog/rss.xml": blogContent,
    "/sitemap.xml": blogContent,
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default withNextIntl(nextConfig);
