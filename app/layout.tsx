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
  description: profile.identity.seoDescription,
  keywords: [
    "consultor de inteligencia artificial",
    "consultor IA Barcelona",
    "project manager IA",
    "gestión de proyectos de IA",
    "implementar IA en empresas",
    "automatización con IA",
    "agentes de IA para empresas",
    "IA en fintech",
  ],
  openGraph: {
    title: `${profile.identity.name} | ${profile.identity.title}`,
    description: profile.identity.seoDescription,
    type: "website",
    siteName: profile.identity.name,
    locale: "es_ES",
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.identity.name} | ${profile.identity.title}`,
    description: profile.identity.seoDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
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
