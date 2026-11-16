import type { L, LList } from "./types";

export type ServiceIcon = "code" | "workflow" | "compass" | "trending" | "briefcase";

export type Service = {
  slug: string;
  icon: ServiceIcon;
  title: L;
  tagline: L;
  description: L;
  forWho: LList;
  deliverables: LList;
  outcomes: LList;
  relatedCases: string[];
  /** Services worth proposing next to this one (cross-sell). */
  related: string[];
};

export const services: Service[] = [
  {
    slug: "software",
    icon: "code",
    title: { es: "Desarrollo de software a medida", en: "Custom software development" },
    tagline: {
      es: "Plataformas, MVPs e integraciones que encajan con tu operación y escalan contigo.",
      en: "Platforms, MVPs and integrations that fit your operation and scale with you.",
    },
    description: {
      es: "Diseñamos y construimos el software que tu negocio necesita: desde un MVP para validar una idea hasta portales de clientes, herramientas internas o la integración de los sistemas que ya usas. Con equipo de desarrollo propio y gestión de proyecto de principio a fin.",
      en: "We design and build the software your business needs: from an MVP to validate an idea to customer portals, internal tools or integrating the systems you already use. With our own development team and end-to-end project management.",
    },
    forWho: {
      es: ["Empresas que necesitan un producto digital o MVP rápido", "Equipos con herramientas desconectadas y datos duplicados", "Negocios que han superado las hojas de cálculo"],
      en: ["Companies that need a digital product or MVP fast", "Teams with disconnected tools and duplicated data", "Businesses that have outgrown spreadsheets"],
    },
    deliverables: {
      es: ["Discovery y especificación funcional", "Aplicaciones web y portales (Next.js, React, TypeScript)", "APIs e integraciones entre sistemas (ERP, CRM, pagos)", "Despliegue en la nube, documentación y mantenimiento"],
      en: ["Discovery and functional specification", "Web apps and portals (Next.js, React, TypeScript)", "APIs and system integrations (ERP, CRM, payments)", "Cloud deployment, documentation and maintenance"],
    },
    outcomes: {
      es: ["MVP en producción en semanas", "Menos trabajo manual y menos errores", "Un sistema mantenible que crece con el negocio"],
      en: ["MVP live in weeks", "Less manual work and fewer errors", "A maintainable system that grows with the business"],
    },
    relatedCases: ["shiponadime", "cashela", "smb-australia", "taverna-de-la-sal"],
    related: ["automation-ai", "fractional-operations"],
  },
  {
    slug: "automation-ai",
    icon: "workflow",
    title: { es: "Automatización e IA aplicada", en: "Automation & applied AI" },
    tagline: {
      es: "Elimina tareas repetitivas y usa la IA donde de verdad aporta valor.",
      en: "Remove repetitive work and use AI where it actually creates value.",
    },
    description: {
      es: "Identificamos los procesos que más tiempo y dinero te cuestan y los automatizamos: ventas, atención al cliente, operaciones, finanzas y reporting. Incluye agentes de IA para atender y cualificar clientes, basados en la experiencia de Closevibe.",
      en: "We find the processes that cost you the most time and money and automate them: sales, customer service, operations, finance and reporting. Includes AI agents that answer and qualify customers, built on our experience at Closevibe.",
    },
    forWho: {
      es: ["Equipos que pierden horas en tareas manuales", "Empresas con respuesta lenta a clientes y leads", "Negocios que quieren adoptar IA sin humo"],
      en: ["Teams losing hours to manual tasks", "Companies slow to respond to customers and leads", "Businesses that want to adopt AI without the hype"],
    },
    deliverables: {
      es: ["Auditoría de procesos y mapa de oportunidades", "Automatizaciones de flujos (CRM, email, WhatsApp, documentos)", "Agentes y asistentes de IA para ventas y soporte", "Cuadros de mando y reporting automático"],
      en: ["Process audit and opportunity map", "Workflow automations (CRM, email, WhatsApp, documents)", "AI agents and assistants for sales and support", "Dashboards and automated reporting"],
    },
    outcomes: {
      es: ["Hasta un 30 % menos de costes operativos", "Respuesta a leads en minutos, no días", "Equipo centrado en trabajo de más valor"],
      en: ["Up to 30% lower operating costs", "Lead response in minutes, not days", "A team focused on higher-value work"],
    },
    relatedCases: ["mbe-spain", "jj-flowers", "smb-australia", "teisoft"],
    related: ["digital-transformation", "growth-ai"],
  },
  {
    slug: "digital-transformation",
    icon: "compass",
    title: { es: "Consultoría de transformación digital", en: "Digital transformation consulting" },
    tagline: {
      es: "Un roadmap claro para digitalizar tu empresa sin perder el foco ni el presupuesto.",
      en: "A clear roadmap to digitalize your company without losing focus or budget.",
    },
    description: {
      es: "Analizamos cómo funciona hoy tu empresa, definimos dónde quieres llegar y construimos el plan para conseguirlo: qué herramientas, en qué orden, con qué presupuesto y cómo medir el avance. Después te acompañamos en la ejecución.",
      en: "We analyze how your company works today, define where you want to go and build the plan to get there: which tools, in what order, on what budget and how to measure progress. Then we support you through execution.",
    },
    forWho: {
      es: ["Pymes y mid-market que crecen con procesos manuales", "Direcciones que necesitan visibilidad y control", "Empresas que van a elegir ERP, CRM u otras plataformas"],
      en: ["SMBs and mid-market companies growing on manual processes", "Leadership teams that need visibility and control", "Companies about to choose an ERP, CRM or other platforms"],
    },
    deliverables: {
      es: ["Diagnóstico de madurez digital", "Roadmap priorizado con quick wins y KPIs", "Selección de herramientas y proveedores", "Gestión del cambio y acompañamiento"],
      en: ["Digital maturity assessment", "Prioritized roadmap with quick wins and KPIs", "Tool and vendor selection", "Change management and hands-on support"],
    },
    outcomes: {
      es: ["Decisiones tecnológicas alineadas con el negocio", "Visibilidad completa de la operación", "Inversión priorizada por retorno"],
      en: ["Technology decisions aligned with the business", "Full visibility over operations", "Investment prioritized by return"],
    },
    relatedCases: ["innova-eventos", "mbe-spain", "jj-flowers"],
    related: ["automation-ai", "software"],
  },
  {
    slug: "growth-ai",
    icon: "trending",
    title: { es: "Growth y captación con IA", en: "AI-powered growth" },
    tagline: {
      es: "Más leads cualificados con un sistema comercial y campañas apoyadas en IA.",
      en: "More qualified leads with a sales system and AI-assisted campaigns.",
    },
    description: {
      es: "Definimos tu cliente ideal, montamos el proceso comercial y el CRM, y lanzamos campañas y contenido con IA (incluidas campañas en Meta Ads creadas con Claude) para generar oportunidades de forma predecible.",
      en: "We define your ideal customer, set up your sales process and CRM, and launch AI-assisted campaigns and content (including Meta Ads campaigns built with Claude) to generate opportunities predictably.",
    },
    forWho: {
      es: ["Empresas de servicios B2B sin un proceso comercial claro", "Equipos que hacen outreach a mano", "Negocios que entran en nuevos mercados"],
      en: ["B2B service companies without a clear sales process", "Teams doing outreach by hand", "Businesses entering new markets"],
    },
    deliverables: {
      es: ["Definición de ICP y propuesta de valor", "Proceso comercial y CRM automatizado", "Campañas en Meta y LinkedIn con IA", "Contenido y secuencias de outreach"],
      en: ["ICP and value proposition definition", "Sales process and automated CRM", "AI-assisted Meta and LinkedIn campaigns", "Content and outreach sequences"],
    },
    outcomes: {
      es: ["Pipeline visible y predecible", "Cualificación y seguimiento más rápidos", "Menor coste por lead"],
      en: ["A visible, predictable pipeline", "Faster qualification and follow-up", "Lower cost per lead"],
    },
    relatedCases: ["teisoft", "saigon-technology", "idi-seafood"],
    related: ["automation-ai", "fractional-operations"],
  },
  {
    slug: "fractional-operations",
    icon: "briefcase",
    title: { es: "Operaciones y preventa fraccional", en: "Fractional operations & presales" },
    tagline: {
      es: "Un COO o responsable de preventa senior, sin contratarlo a tiempo completo.",
      en: "A senior COO or presales lead, without a full-time hire.",
    },
    description: {
      es: "Pongo a tu servicio la experiencia de dirigir operaciones en fintech y preventa enterprise: procesos de venta y RFP, operaciones escalables, gobierno de proyectos y coordinación entre producto, tecnología y negocio.",
      en: "I bring my experience running fintech operations and enterprise presales to your company: sales and RFP processes, scalable operations, project governance and alignment between product, engineering and business.",
    },
    forWho: {
      es: ["Startups y scale-ups que crecen rápido", "Empresas de software que responden RFPs", "Equipos donde la complejidad técnica frena las ventas"],
      en: ["Fast-growing startups and scale-ups", "Software companies answering RFPs", "Teams where technical complexity slows down sales"],
    },
    deliverables: {
      es: ["Modelo operativo y procesos documentados", "Operación de preventa y RFP/RFI", "Gobierno de proyectos y métricas", "Liderazgo interino de equipos"],
      en: ["Operating model and documented processes", "Presales and RFP/RFI operations", "Project governance and metrics", "Interim team leadership"],
    },
    outcomes: {
      es: ["Ciclos de venta más cortos", "Mejor tasa de éxito en propuestas", "Operación preparada para escalar"],
      en: ["Shorter sales cycles", "Higher proposal win rates", "Operations ready to scale"],
    },
    relatedCases: ["cashela", "saigon-technology", "shiponadime"],
    related: ["software", "growth-ai"],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
