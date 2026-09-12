import type { Metadata } from "next";
import { Bebas_Neue, Work_Sans } from "next/font/google";
import Link from "next/link";
import { Header } from "@/components/Header";
import { SITE_NAME, siteUrl } from "@/lib/site";
import "./globals.css";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const work = Work_Sans({ subsets: ["latin"], weight: ["400", "600", "700", "800"], variable: "--font-work" });

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: { default: `${SITE_NAME} — eye level is buy level`, template: `%s · ${SITE_NAME}` },
  description:
    "A supermarket shelf for software companies. Claim a permanent facing, fight for eye level, and see exactly who looks at you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${work.variable}`}>
      <body className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line mt-16 py-8 text-xs text-ink/60">
          <div className="mx-auto max-w-7xl px-4 sm:px-8 flex flex-wrap gap-x-6 gap-y-2 justify-between">
            <span>
              A facing is a licence to display while the service operates — not property, not an investment, no traffic guaranteed.
              Every listing is a paid or free placement, never an endorsement.
            </span>
            <span className="flex gap-4">
              <Link href="/terms" className="underline">Terms</Link>
              <Link href="/stats" className="underline">Live stats</Link>
              <a href="mailto:hello@claimtheshelf.com" className="underline">Remove my brand</a>
            </span>
          </div>
        </footer>
      </body>
    </html>
  );
}
