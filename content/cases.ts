import type { L, LList } from "./types";

export type CaseStudy = {
  slug: string;
  client: string;
  sector: L;
  location: L;
  duration: L;
  services: string[];
  summary: L;
  /** Headline result shown on cards. */
  metric?: { value: string; label: L };
  challenge: L;
  solution: L;
  results: LList;
  featured?: boolean;
};

export const cases: CaseStudy[] = [
  {
    slug: "mbe-spain",
    client: "Mail Boxes Etc. (MBE Spain)",
    sector: { es: "Logística y servicios", en: "Logistics & services" },
    location: { es: "España", en: "Spain" },
    duration: { es: "Colaboración continua", en: "Ongoing collaboration" },
    services: ["automation-ai", "digital-transformation"],
    summary: {
      es: "Automatización y estandarización de procesos para reducir costes y ganar control operativo.",
      en: "Process automation and standardization to cut costs and gain operational control.",
    },
    metric: { value: "-30 %", label: { es: "costes operativos", en: "operating costs" } },
    challenge: {
      es: "Procesos internos manuales, costes operativos altos y poca visibilidad sobre cómo se ejecutaba el trabajo.",
      en: "Manual internal processes, high operating costs and little visibility into how work was being done.",
    },
    solution: {
      es: "Automatizamos los procesos clave, estandarizamos los flujos de trabajo e implantamos mejoras de eficiencia para reducir fricción y mejorar el control.",
      en: "We automated key processes, standardized workflows and rolled out efficiency improvements to reduce friction and improve control.",
    },
    results: {
      es: ["~30 % de reducción de costes", "Mayor eficiencia operativa", "Mejora en ingresos", "Mejor control de procesos internos"],
      en: ["~30% cost reduction", "Higher operational efficiency", "Improved revenue performance", "Better control of internal processes"],
    },
    featured: true,
  },
  {
    slug: "jj-flowers",
    client: "J&J Flowers",
    sector: { es: "Retail / floristería (pyme)", en: "Retail / florist (SMB)" },
    location: { es: "Florida, EE. UU.", en: "Florida, USA" },
    duration: { es: "3 meses", en: "3 months" },
    services: ["automation-ai", "digital-transformation", "growth-ai"],
    summary: {
      es: "Digitalización de pedidos, entregas y clientes con CRM y un plan de marketing local.",
      en: "Digitalized orders, deliveries and customers with a CRM and a local marketing plan.",
    },
    metric: { value: "-25-30 %", label: { es: "tiempo de preparación de pedidos", en: "order preparation time" } },
    challenge: {
      es: "Costes operativos altos, preparación de pedidos manual y lenta, coordinación de entregas ineficiente y ningún CRM ni estrategia de marketing.",
      en: "High operating costs, slow manual order preparation, inefficient delivery coordination and no CRM or marketing strategy.",
    },
    solution: {
      es: "Optimizamos la gestión de ventas y pedidos, rediseñamos la preparación y las entregas, implantamos un CRM para clientes y pedidos y definimos un marketing local y online rentable.",
      en: "We streamlined sales and order management, redesigned preparation and delivery, implemented a CRM for customers and orders, and defined cost-effective local and online marketing.",
    },
    results: {
      es: ["25-30 % menos tiempo de preparación", "Entregas más precisas y consistentes", "Datos de clientes y pedidos centralizados", "Más visibilidad local y clientes recurrentes"],
      en: ["25-30% less preparation time", "More accurate, consistent deliveries", "Centralized customer and order data", "More local visibility and repeat customers"],
    },
    featured: true,
  },
  {
    slug: "shiponadime",
    client: "ShipOnADime",
    sector: { es: "Logística / envíos", en: "Logistics / shipping" },
    location: { es: "Global (EE. UU. e India)", en: "Global (USA & India)" },
    duration: { es: "1 año", en: "1 year" },
    services: ["software", "fractional-operations"],
    summary: {
      es: "Gestión de proyecto y entrega de un MVP escalable con equipos distribuidos.",
      en: "Project management and delivery of a scalable MVP with distributed teams.",
    },
    metric: { value: "< 3", label: { es: "meses hasta el MVP", en: "months to MVP" } },
    challenge: {
      es: "Costes operativos altos, equipos repartidos entre EE. UU. e India y necesidad de un MVP rápido sobre una plataforma escalable.",
      en: "High operating costs, teams split between the USA and India, and the need for a fast MVP on a scalable platform.",
    },
    solution: {
      es: "Asumí la gestión completa del proyecto, entregamos el MVP en menos de 3 meses, aplicamos una estrategia de optimización de costes y apoyamos el crecimiento del producto y el marketing.",
      en: "I took full ownership of project management, we shipped the MVP in under 3 months, applied a cost-optimization strategy and supported product growth and marketing.",
    },
    results: {
      es: ["MVP entregado en menos de 3 meses", "Menores costes de desarrollo y operación", "Plataforma preparada para crecer", "Mejor coordinación entre equipos"],
      en: ["MVP delivered in under 3 months", "Lower development and operating costs", "Platform ready for growth", "Better cross-team coordination"],
    },
    featured: true,
  },
  {
    slug: "teisoft",
    client: "Teisoft LLC",
    sector: { es: "Servicios IT", en: "IT services" },
    location: { es: "Global", en: "Global" },
    duration: { es: "2 meses", en: "2 months" },
    services: ["growth-ai", "automation-ai"],
    summary: {
      es: "Proceso comercial repetible con ICP, outreach y CRM automatizado.",
      en: "A repeatable sales system with ICP, outreach and an automated CRM.",
    },
    metric: { value: "Pipedrive + Slack", label: { es: "CRM automatizado", en: "automated CRM" } },
    challenge: {
      es: "Sin proceso comercial estructurado, ICP poco claro, outreach y seguimiento ineficientes y poca visibilidad interna.",
      en: "No structured sales process, unclear ICP, inefficient outreach and follow-up, and limited internal visibility.",
    },
    solution: {
      es: "Definimos ICP y mercados objetivo, diseñamos el proceso de venta de servicios IT, creamos la estrategia de outreach (LinkedIn + email) e implantamos Pipedrive con automatizaciones en Slack.",
      en: "We defined the ICP and target markets, designed the IT-services sales process, built the outreach strategy (LinkedIn + email) and implemented Pipedrive with Slack automations.",
    },
    results: {
      es: ["Proceso de venta claro y repetible", "Cualificación y seguimiento más rápidos", "Mejor coordinación interna", "Pipeline visible"],
      en: ["Clear, repeatable sales process", "Faster lead qualification and follow-up", "Better internal coordination", "Visible pipeline"],
    },
  },
  {
    slug: "saigon-technology",
    client: "Saigon Technology",
    sector: { es: "Desarrollo de software (APAC)", en: "Software development (APAC)" },
    location: { es: "Vietnam → Japón y Australia", en: "Vietnam → Japan & Australia" },
    duration: { es: "6 meses", en: "6 months" },
    services: ["growth-ai", "fractional-operations"],
    summary: {
      es: "Alineación de ventas y entrega para crecer en Japón y Australia.",
      en: "Aligned sales and delivery to grow in Japan and Australia.",
    },
    metric: { value: "2", label: { es: "nuevos mercados", en: "new markets" } },
    challenge: {
      es: "Oferta comercial y técnica fragmentada, outreach internacional poco eficaz y falta de alineación entre ventas y entrega.",
      en: "Fragmented sales and technical offering, ineffective international outreach and misalignment between sales and delivery.",
    },
    solution: {
      es: "Alineamos los equipos de ventas y técnico, simplificamos outreach y propuestas, estandarizamos la oferta de servicios y apoyamos las conversaciones con clientes.",
      en: "We aligned sales and technical teams, streamlined outreach and proposals, standardized the service offering and supported client conversations.",
    },
    results: {
      es: ["Ciclo de venta más corto", "Propuestas más consistentes", "Mejor conversión en Japón y Australia", "Más coordinación entre equipos"],
      en: ["Shorter sales cycle", "More consistent proposals", "Better conversion in Japan and Australia", "Stronger team coordination"],
    },
  },
  {
    slug: "innova-eventos",
    client: "Innova Eventos",
    sector: { es: "Eventos y festivales", en: "Events & festivals" },
    location: { es: "España", en: "Spain" },
    duration: { es: "6 meses", en: "6 months" },
    services: ["digital-transformation", "software"],
    summary: {
      es: "Digitalización e integración de ERP y CRM para ganar visibilidad.",
      en: "Digitalization and ERP/CRM integration for full visibility.",
    },
    metric: { value: "ERP + CRM", label: { es: "integrados", en: "integrated" } },
    challenge: {
      es: "Operaciones manuales, herramientas desconectadas y poca visibilidad sobre eventos y operaciones.",
      en: "Manual operations, disconnected tools and limited visibility across events and operations.",
    },
    solution: {
      es: "Lideramos la digitalización de la empresa, integramos ERP y CRM y optimizamos procesos para reducir la coordinación manual.",
      en: "We led company-wide digitalization, integrated ERP and CRM and optimized processes to reduce manual coordination.",
    },
    results: {
      es: ["Visibilidad operativa completa", "Menos coordinación manual", "Mejor planificación y ejecución de eventos"],
      en: ["Full operational visibility", "Less manual coordination", "Better event planning and execution"],
    },
  },
  {
    slug: "smb-australia",
    client: "SMB Australia",
    sector: { es: "Servicios profesionales", en: "Professional services" },
    location: { es: "Australia", en: "Australia" },
    duration: { es: "Proyecto", en: "Project" },
    services: ["software", "automation-ai", "growth-ai"],
    summary: {
      es: "Automatización de presupuestos para responder antes a cada oportunidad.",
      en: "Quote automation to respond faster to every opportunity.",
    },
    challenge: {
      es: "Presupuestos hechos a mano, respuesta comercial lenta y marketing fragmentado.",
      en: "Manual quote generation, slow sales response and fragmented marketing.",
    },
    solution: {
      es: "Construimos un sistema de automatización de presupuestos, dimos soporte de desarrollo y mejoramos procesos de marketing.",
      en: "We built a quote automation system, provided development support and improved marketing processes.",
    },
    results: {
      es: ["Presupuestos en menos tiempo", "Menos trabajo manual", "Ventas más eficientes"],
      en: ["Faster quote turnaround", "Less manual effort", "More efficient sales"],
    },
  },
  {
    slug: "cashela",
    client: "Cashela",
    sector: { es: "Fintech / pagos internacionales", en: "Fintech / cross-border payments" },
    location: { es: "EE. UU.", en: "USA" },
    duration: { es: "Más de 4 años", en: "4+ years" },
    services: ["software", "fractional-operations"],
    summary: {
      es: "MVP en 6 meses y operaciones escaladas en un entorno regulado.",
      en: "MVP in 6 months and scaled operations in a regulated environment.",
    },
    metric: { value: "6", label: { es: "meses hasta el MVP", en: "months to MVP" } },
    challenge: {
      es: "Sin producto en producción, un entorno regulatorio y técnico complejo y la necesidad de un MVP sobre infraestructura escalable.",
      en: "No live product, a complex regulatory and technical landscape, and the need for an MVP on scalable infrastructure.",
    },
    solution: {
      es: "Entregamos el MVP en 6 meses, lideramos las operaciones y el escalado, habilitamos flujos B2B y B2C y apoyamos la expansión, incluida la integración cripto.",
      en: "We delivered the MVP in 6 months, led operations and scaling, enabled B2B and B2C flows, and supported expansion including crypto integration.",
    },
    results: {
      es: ["MVP en producción en 6 meses", "Plataforma operativamente escalable", "Clientes B2B y B2C", "Nuevas capacidades de producto"],
      en: ["Live MVP in 6 months", "Operationally scalable platform", "B2B and B2C customers", "Expanded product capabilities"],
    },
  },
  {
    slug: "taverna-de-la-sal",
    client: "Taverna de la Sal",
    sector: { es: "Hostelería", en: "Hospitality" },
    location: { es: "España", en: "Spain" },
    duration: { es: "Proyecto", en: "Project" },
    services: ["software"],
    summary: {
      es: "Nueva web e integraciones para atraer más reservas directas.",
      en: "New website and integrations to drive more direct inquiries.",
    },
    challenge: {
      es: "Presencia digital anticuada, poca visibilidad online y ninguna integración moderna.",
      en: "Outdated digital presence, limited online visibility and no modern integrations.",
    },
    solution: {
      es: "Rediseñamos y desarrollamos la web, integramos herramientas modernas y mejoramos la experiencia y el rendimiento.",
      en: "We redesigned and built the website, integrated modern tools and improved UX and performance.",
    },
    results: {
      es: ["Mejor presencia online", "Mejor experiencia de cliente", "Más consultas directas"],
      en: ["Stronger online presence", "Better customer experience", "More direct inquiries"],
    },
  },
  {
    slug: "idi-seafood",
    client: "IDI Seafood",
    sector: { es: "Distribución alimentaria", en: "Food distribution" },
    location: { es: "LATAM", en: "LATAM" },
    duration: { es: "Proyecto", en: "Project" },
    services: ["growth-ai"],
    summary: {
      es: "Estrategia de entrada en LATAM y outreach a grandes partners.",
      en: "LATAM market-entry strategy and outreach to large partners.",
    },
    metric: { value: "LATAM", label: { es: "entrada en mercado", en: "market entry" } },
    challenge: {
      es: "Sin presencia en LATAM y acceso limitado a grandes partners.",
      en: "No presence in LATAM and limited access to large partners.",
    },
    solution: {
      es: "Desarrollamos la estrategia de entrada, apoyamos el desarrollo de negocio y lanzamos el outreach a grandes partners.",
      en: "We developed the market-entry strategy, supported business development and ran outreach to large partners.",
    },
    results: {
      es: ["Entrada en el mercado LATAM", "Nuevas oportunidades de partnership", "Mayor alcance comercial"],
      en: ["Entered the LATAM market", "New partnership opportunities", "Expanded commercial reach"],
    },
  },
];

export function getCase(slug: string) {
  return cases.find((c) => c.slug === slug);
}
