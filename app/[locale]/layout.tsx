import { Analytics } from "@vercel/analytics/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata, Viewport } from "next";
import { Instrument_Serif } from "next/font/google";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { ReactNode } from "react";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { ScrollProgress, SpotlightTracker } from "@/components/effects";
import { JsonLd } from "@/components/json-ld";
import { Providers } from "@/components/providers";
import { experience, profile } from "@/content/profile";
import { site } from "@/content/site";
import { routing } from "@/i18n/routing";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });
  return {
    metadataBase: new URL(site.url),
    title: { default: t("title"), template: `%s · ${site.name}` },
    description: t("description"),
    authors: [{ name: site.legalName, url: site.url }],
    creator: site.legalName,
    formatDetection: { telephone: false },
    // Google Search Console "HTML tag" verification: set the content value in Vercel.
    ...(process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
      ? { verification: { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION } }
      : {}),
  };
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f6f6f1" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const personLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: site.legalName,
        alternateName: site.name,
        jobTitle: profile.role[locale],
        description: profile.short[locale],
        url: site.url,
        image: `${site.url}/images/rey-ortiz-retrato.webp`,
        email: `mailto:${site.email}`,
        address: { "@type": "PostalAddress", addressLocality: site.location.city, addressCountry: site.location.country },
        sameAs: [site.linkedin],
        worksFor: experience
          .filter((e) => e.period.en.includes("present"))
          .map((e) => ({ "@type": "Organization", name: e.company })),
        knowsLanguage: ["es", "en"],
      },
      {
        "@type": "ProfessionalService",
        "@id": `${site.url}/#business`,
        name: site.name,
        url: site.url,
        description: profile.short[locale],
        founder: { "@id": `${site.url}/#person` },
        areaServed: ["ES", "EU", "US", "LATAM"],
        address: { "@type": "PostalAddress", addressLocality: site.location.city, addressCountry: site.location.country },
        email: site.email,
        telephone: site.phone.replace(/\s/g, ""),
      },
    ],
  };

  return (
    <html lang={locale} suppressHydrationWarning className={`${GeistSans.variable} ${GeistMono.variable} ${serif.variable}`}>
      <body className="min-h-dvh">
        <NextIntlClientProvider>
          <Providers>
            <ScrollProgress />
            <SpotlightTracker />
            <Header />
            <main id="main">{children}</main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
        <JsonLd data={personLd} />
        <Analytics />
      </body>
    </html>
  );
}
