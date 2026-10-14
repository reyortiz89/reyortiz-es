/**
 * Global site settings. Contact details shown publicly live here, so changing
 * an email or phone number is a one-line edit.
 */
export const site = {
  name: "Rey Ortiz",
  legalName: "Reynier Ortiz Tamayo",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://reyortiz.es",
  email: "rey@closevibe.com",
  phone: "+34 632 503 325",
  whatsapp: "https://wa.me/34632503325",
  location: { city: "Barcelona", country: "ES" },
  linkedin: "https://www.linkedin.com/in/reynier-ortiz-tamayo/",
  github: "https://github.com/reyortiz89",
  /** Calendly link for the "book a call" buttons; they fall back to /contact when unset. */
  calendlyUrl: process.env.NEXT_PUBLIC_CALENDLY_URL ?? "",
  yearsOfExperience: 14,
} as const;
