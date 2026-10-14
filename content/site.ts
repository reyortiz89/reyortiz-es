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
  /** Booking page (Closevibe agenda) embedded on the contact page and the home page, and opened by "Book a call" buttons. */
  bookingUrl: process.env.NEXT_PUBLIC_CALENDLY_URL || "https://closevibe.com/r/closevibe-agenda/demo",
  yearsOfExperience: 14,
} as const;
