import type { Metadata } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer, Navbar, ThemeProvider, ThemeScript } from "@/components";
import { profile } from "@/data/profile";
import { SITE_URL } from "@/lib/site";
import { StructuredData } from "@/components/StructuredData";

const heading = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-heading", display: "swap" });
const body = Geist({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const code = Geist_Mono({ subsets: ["latin"], variable: "--font-code", display: "swap" });

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
    <html
      lang="es"
      suppressHydrationWarning
      className={`${heading.variable} ${body.variable} ${code.variable}`}
    >
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <ThemeScript />
        <StructuredData />
      </head>
      <body>
        <ThemeProvider>
          <a
            href="#contenido"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[200] focus:rounded-xl focus:bg-(--surface) focus:px-4 focus:py-2"
          >
            Saltar al contenido
          </a>
          <Navbar />
          <main id="contenido">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
