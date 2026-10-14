import type { Locale } from "@/i18n/routing";
import { site } from "./site";

/**
 * Legal pages (LSSI-CE / RGPD). Template text: have it reviewed before relying
 * on it, and add the NIF to `owner` once it should be published.
 */
export const legalSlugs = ["aviso-legal", "privacidad", "cookies"] as const;
export type LegalSlug = (typeof legalSlugs)[number];

type Block = { heading: string; body: string[] };

export const legalUpdated = "2026-10-14";

const owner = {
  name: site.legalName,
  city: "Barcelona, España",
  email: site.email,
};

export const legal: Record<LegalSlug, Record<Locale, Block[]>> = {
  "aviso-legal": {
    es: [
      {
        heading: "Titular del sitio web",
        body: [
          `En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico (LSSI-CE), se informa de que el titular de ${site.url} es ${owner.name}, con domicilio en ${owner.city}. Email de contacto: ${owner.email}.`,
        ],
      },
      {
        heading: "Objeto",
        body: [
          "Este sitio web ofrece información sobre los servicios profesionales de consultoría tecnológica, automatización, inteligencia artificial y desarrollo de software de su titular, así como recursos gratuitos para empresas.",
        ],
      },
      {
        heading: "Propiedad intelectual",
        body: [
          "Los textos, imágenes, diseño y código de este sitio pertenecen a su titular o se usan con permiso. No se permite su reproducción sin autorización previa. Las marcas de terceros mencionadas pertenecen a sus respectivos propietarios.",
        ],
      },
      {
        heading: "Responsabilidad",
        body: [
          "El titular no se responsabiliza del mal uso de los contenidos ni de los daños derivados de interrupciones del servicio. Los enlaces a sitios de terceros se ofrecen a título informativo.",
        ],
      },
      {
        heading: "Legislación aplicable",
        body: ["Este aviso legal se rige por la legislación española."],
      },
    ],
    en: [
      {
        heading: "Website owner",
        body: [
          `In accordance with Spanish Law 34/2002 (LSSI-CE), the owner of ${site.url} is ${owner.name}, based in ${owner.city}. Contact email: ${owner.email}.`,
        ],
      },
      {
        heading: "Purpose",
        body: [
          "This website provides information about its owner's professional services in technology consulting, automation, artificial intelligence and software development, as well as free resources for companies.",
        ],
      },
      {
        heading: "Intellectual property",
        body: [
          "The texts, images, design and code of this website belong to its owner or are used with permission. They may not be reproduced without prior authorization. Third-party trademarks belong to their respective owners.",
        ],
      },
      {
        heading: "Liability",
        body: [
          "The owner is not liable for misuse of the content or for damages resulting from service interruptions. Links to third-party sites are provided for information only.",
        ],
      },
      {
        heading: "Governing law",
        body: ["This legal notice is governed by Spanish law."],
      },
    ],
  },
  privacidad: {
    es: [
      {
        heading: "Responsable del tratamiento",
        body: [`${owner.name}, ${owner.city}. Email: ${owner.email}.`],
      },
      {
        heading: "Qué datos tratamos y para qué",
        body: [
          "Los datos que nos facilitas en los formularios (nombre, email, teléfono, empresa, tamaño de empresa y mensaje) se usan para responder a tu solicitud, enviarte la información o recursos que pidas y, si procede, preparar una propuesta de servicios.",
          "También registramos de qué página o campaña llegas (por ejemplo, parámetros UTM) para medir qué canales funcionan.",
        ],
      },
      {
        heading: "Base legal",
        body: [
          "Tu consentimiento, que das al enviar el formulario, y la aplicación de medidas precontractuales a petición tuya. Puedes retirar el consentimiento en cualquier momento.",
        ],
      },
      {
        heading: "Destinatarios y encargados",
        body: [
          "Para prestar el servicio usamos proveedores que actúan como encargados del tratamiento: Vercel Inc. (alojamiento web) y Namecheap Private Email (correo electrónico). Algunos pueden tratar datos fuera del Espacio Económico Europeo con las garantías adecuadas (cláusulas contractuales tipo). No cedemos tus datos a terceros con fines comerciales.",
        ],
      },
      {
        heading: "Conservación",
        body: [
          "Conservamos tus datos mientras exista una relación comercial o hasta que solicites su supresión, y después durante los plazos legales aplicables.",
        ],
      },
      {
        heading: "Tus derechos",
        body: [
          `Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad escribiendo a ${owner.email}. Si consideras que no se han atendido correctamente, puedes reclamar ante la Agencia Española de Protección de Datos (www.aepd.es).`,
        ],
      },
    ],
    en: [
      {
        heading: "Data controller",
        body: [`${owner.name}, ${owner.city}. Email: ${owner.email}.`],
      },
      {
        heading: "What data we process and why",
        body: [
          "The data you provide in our forms (name, email, phone, company, company size and message) is used to answer your request, send you the information or resources you ask for and, where relevant, prepare a service proposal.",
          "We also record which page or campaign you came from (for example, UTM parameters) to measure which channels work.",
        ],
      },
      {
        heading: "Legal basis",
        body: [
          "Your consent, given when you submit the form, and pre-contractual steps taken at your request. You can withdraw your consent at any time.",
        ],
      },
      {
        heading: "Recipients and processors",
        body: [
          "To provide the service we use processors: Vercel Inc. (web hosting) and Namecheap Private Email (email). Some may process data outside the European Economic Area under appropriate safeguards (standard contractual clauses). We do not sell or share your data for marketing purposes.",
        ],
      },
      {
        heading: "Retention",
        body: [
          "We keep your data while there is a business relationship or until you ask us to delete it, and afterwards for the legally required periods.",
        ],
      },
      {
        heading: "Your rights",
        body: [
          `You can exercise your rights of access, rectification, erasure, objection, restriction and portability by writing to ${owner.email}. You may also lodge a complaint with the Spanish Data Protection Agency (www.aepd.es).`,
        ],
      },
    ],
  },
  cookies: {
    es: [
      {
        heading: "Qué usamos",
        body: [
          "Este sitio no usa cookies publicitarias ni de seguimiento de terceros.",
          "Solo usamos almacenamiento técnico necesario para que la web funcione: una cookie que recuerda tu idioma (NEXT_LOCALE) y una preferencia guardada en tu navegador con el tema claro u oscuro que eliges.",
          "Para medir visitas usamos Vercel Web Analytics, que no utiliza cookies ni identifica a los visitantes de forma individual.",
        ],
      },
      {
        heading: "Cambios",
        body: [
          "Si en el futuro añadimos cookies no esenciales, te pediremos tu consentimiento antes de activarlas y actualizaremos esta política.",
        ],
      },
    ],
    en: [
      {
        heading: "What we use",
        body: [
          "This site does not use advertising or third-party tracking cookies.",
          "We only use technical storage required for the site to work: a cookie that remembers your language (NEXT_LOCALE) and a browser setting that stores your light or dark theme choice.",
          "To measure visits we use Vercel Web Analytics, which does not use cookies or identify individual visitors.",
        ],
      },
      {
        heading: "Changes",
        body: [
          "If we add non-essential cookies in the future, we will ask for your consent before enabling them and update this policy.",
        ],
      },
    ],
  },
};
