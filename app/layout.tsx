import type { Metadata } from "next";
import "./globals.css";
import { Navbar, Footer } from "@/components";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.identity.name} | ${profile.identity.title}`,
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
  },
  twitter: {
    card: "summary",
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
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="bg-white antialiased text-slate-900">
        <Navbar />
        <main className="flex flex-col min-h-screen">
          <div className="flex-1">{children}</div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
