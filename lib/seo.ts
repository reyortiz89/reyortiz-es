import { site } from "@/data/site";

/**
 * SEO values derived from the site's own copy (data/site.ts). SEO must not change
 * what the site says, only how it is described to search engines, so everything
 * here is read from that file rather than written separately.
 */
const firstSentence = (text: string) => text.split(/(?<=\.)\s/)[0];

export const seo = {
  name: site.identity.name,
  fullName: site.identity.fullName,
  jobTitle: site.hero.roles[0],
  tagline: site.about.headline,
  description: firstSentence(site.about.intro),
  email: site.identity.email,
  telephone: site.about.facts.find((fact) => fact.label === "Phone")?.value,
  city: "Barcelona",
  country: "ES",
  sameAs: [site.identity.linkedin, site.identity.whatsapp],
  // "CEO — Closevibe" → Closevibe
  worksFor: site.resume.experience
    .filter((role) => /present/i.test(role.period))
    .map((role) => role.title.split(" — ").pop() as string),
  alumniOf: site.resume.education.map((entry) => entry.institution),
  services: site.services.items.map((service) => ({
    slug: service.slug,
    name: service.title,
    description: service.description,
  })),
  keywords: [
    ...site.hero.roles,
    ...site.services.items.map((service) => service.title),
    "SMEs",
    "Barcelona",
  ],
};
