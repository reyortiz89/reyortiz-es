import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { site } from "@/content/site";

type Href = Parameters<typeof getPathname>[0]["href"];

/** Absolute URL of a route in a given locale. */
export function absoluteUrl(href: Href, locale: Locale) {
  return new URL(getPathname({ href, locale }), site.url).toString();
}

/** Page metadata with canonical URL and hreflang alternates for every locale. */
export function pageMetadata({
  locale,
  href,
  title,
  description,
}: {
  locale: Locale;
  href: Href;
  title?: string;
  description: string;
}): Metadata {
  const languages = Object.fromEntries(routing.locales.map((l) => [l, absoluteUrl(href, l)]));
  return {
    title,
    description,
    alternates: {
      canonical: absoluteUrl(href, locale),
      languages: { ...languages, "x-default": absoluteUrl(href, routing.defaultLocale) },
    },
    openGraph: {
      title: title ?? undefined,
      description,
      url: absoluteUrl(href, locale),
      locale: locale === "es" ? "es_ES" : "en_US",
      type: "website",
      siteName: site.name,
    },
    twitter: { card: "summary_large_image", title: title ?? undefined, description },
  };
}
