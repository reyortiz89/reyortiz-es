import type { Metadata } from "next";
import { seo } from "@/lib/seo";
import { About } from "@/components/site/About";
import { Contact } from "@/components/site/Contact";
import { Hero } from "@/components/site/Hero";
import { Portfolio } from "@/components/site/Portfolio";
import { Resume } from "@/components/site/Resume";
import { Services } from "@/components/site/Services";
import { Skills } from "@/components/site/Skills";
import { Stats } from "@/components/site/Stats";
import { Testimonials } from "@/components/site/Testimonials";

export const metadata: Metadata = {
  title: { absolute: `${seo.name} - ${seo.tagline}` },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Stats />
      <Skills />
      <Resume />
      <Portfolio />
      <Services />
      <Testimonials />
      <Contact />
    </>
  );
}
