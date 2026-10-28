import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider, ThemeScript } from "@/components";
import { seo } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { StructuredData } from "@/components/StructuredData";
import { Footer } from "@/components/site/Footer";
import { Sidebar } from "@/components/site/Sidebar";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${seo.name} - ${seo.tagline}`,
    template: `%s | ${seo.name}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: seo.fullName, url: SITE_URL }],
  openGraph: {
    title: `${seo.name} - ${seo.tagline}`,
    description: seo.description,
    type: "website",
    siteName: seo.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${seo.name} - ${seo.tagline}`,
    description: seo.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ThemeScript />
        <StructuredData />
      </head>
      <body>
        <ThemeProvider>
          <Sidebar />
          <div className="xl:pl-[300px]">
            <main id="main">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
