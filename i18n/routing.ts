import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["es", "en"],
  defaultLocale: "es",
  localePrefix: "always",
  pathnames: {
    "/": "/",
    "/services": { es: "/servicios", en: "/services" },
    "/services/[slug]": { es: "/servicios/[slug]", en: "/services/[slug]" },
    "/cases": { es: "/casos", en: "/case-studies" },
    "/cases/[slug]": { es: "/casos/[slug]", en: "/case-studies/[slug]" },
    "/resources": { es: "/recursos", en: "/resources" },
    "/resources/assessments/[slug]": { es: "/recursos/evaluaciones/[slug]", en: "/resources/assessments/[slug]" },
    "/resources/roi-calculator": { es: "/recursos/calculadora-roi", en: "/resources/roi-calculator" },
    "/videos": "/videos",
    "/about": { es: "/sobre-mi", en: "/about" },
    "/contact": { es: "/contacto", en: "/contact" },
    "/legal/[slug]": "/legal/[slug]",
  },
});

export type Locale = (typeof routing.locales)[number];
export type Pathname = keyof typeof routing.pathnames;
