import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider, ThemeScript } from "@/components";
import { profile } from "@/data/profile";
import { SITE_URL } from "@/lib/site";
import { StructuredData } from "@/components/StructuredData";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${profile.identity.name} | ${profile.identity.title}`,
    template: `%s | ${profile.identity.name}`,
  },
  description: profile.identity.summary,
  keywords: [
    "Presales",
    "Solutions",
    "Consultant",
    "Technical",
    "Finance",
    "SaaS",
    "Enterprise",
  ],
  openGraph: {
    title: `${profile.identity.name} | ${profile.identity.title}`,
    description: profile.identity.summary,
    type: "website",
    siteName: profile.identity.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.identity.name} | ${profile.identity.title}`,
    description: profile.identity.summary,
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
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
