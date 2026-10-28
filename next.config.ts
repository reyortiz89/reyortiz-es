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
  // Old URLs (the static site and the first Next.js pages) now live on the home page and /services/[slug].
  async redirects() {
    const services = ["automation-ai", "digital-transformation", "software-integration", "marketing-growth"];
    return [
      { source: "/about", destination: "/#about", permanent: true },
      { source: "/work", destination: "/#portfolio", permanent: true },
      { source: "/contact", destination: "/#contact", permanent: true },
      { source: "/services", destination: "/#services", permanent: true },
      { source: "/template", destination: "/", permanent: true },
      { source: "/template/index.html", destination: "/", permanent: true },
      { source: "/template/portfolio-details-case-studies.html", destination: "/#portfolio", permanent: true },
      ...services.map((slug) => ({
        source: `/template/services-${slug}.html`,
        destination: `/services/${slug}`,
        permanent: true,
      })),
      ...services.map((slug) => ({
        source: `/services-${slug}.html`,
        destination: `/services/${slug}`,
        permanent: true,
      })),
      { source: "/index.html", destination: "/", permanent: true },
    ];
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
