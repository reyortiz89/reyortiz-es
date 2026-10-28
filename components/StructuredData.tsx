import { seo } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

/**
 * Site-wide JSON-LD: who Rey is (Person), the consulting services and the website.
 */
export function StructuredData() {
  const personId = `${SITE_URL}/#person`;
  const address = {
    "@type": "PostalAddress",
    addressLocality: seo.city,
    addressCountry: seo.country,
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: seo.fullName,
        alternateName: seo.name,
        jobTitle: seo.jobTitle,
        description: seo.description,
        url: SITE_URL,
        email: `mailto:${seo.email}`,
        telephone: seo.telephone,
        address,
        worksFor: seo.worksFor.map((name) => ({ "@type": "Organization", name })),
        alumniOf: seo.alumniOf.map((name) => ({ "@type": "EducationalOrganization", name })),
        knowsAbout: seo.services.map((service) => service.name),
        sameAs: seo.sameAs,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: `${seo.name} | ${seo.jobTitle}`,
        description: seo.tagline,
        url: SITE_URL,
        email: seo.email,
        telephone: seo.telephone,
        founder: { "@id": personId },
        address,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services",
          itemListElement: seo.services.map((service) => ({
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: service.name,
              description: service.description,
              url: `${SITE_URL}/services/${service.slug}`,
            },
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: seo.name,
        url: SITE_URL,
        publisher: { "@id": personId },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
