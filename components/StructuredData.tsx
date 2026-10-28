import { profile } from "@/data/profile";
import { SITE_URL } from "@/lib/site";

/**
 * Site-wide JSON-LD: who Reynier is (Person), the consulting service and the website.
 */
export function StructuredData() {
  const personId = `${SITE_URL}/#person`;

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: profile.identity.name,
        jobTitle: profile.identity.title,
        description: profile.identity.summary,
        url: SITE_URL,
        email: `mailto:${profile.identity.email}`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Barcelona",
          addressCountry: "ES",
        },
        knowsLanguage: ["es", "en"],
        sameAs: Object.values(profile.social),
      },
      {
        "@type": "ProfessionalService",
        "@id": `${SITE_URL}/#service`,
        name: profile.identity.name,
        description: profile.identity.summary,
        url: SITE_URL,
        founder: { "@id": personId },
        areaServed: ["ES", "EU"],
        address: {
          "@type": "PostalAddress",
          addressLocality: "Barcelona",
          addressCountry: "ES",
        },
      },
      {
        "@type": "WebSite",
        "@id": `${SITE_URL}/#website`,
        name: profile.identity.name,
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
