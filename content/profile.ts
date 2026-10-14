import type { L, LList } from "./types";

/**
 * Biography and career, unified from the LinkedIn profile (Oct 2026) and the
 * previous site. Single source for the About page, the home page and JSON-LD.
 */
export const profile = {
  headline: {
    es: "Automatización, IA y software a medida para empresas",
    en: "Automation, AI and custom software for growing companies",
  } satisfies L,
  role: {
    es: "Consultor tecnológico · CEO de Closevibe · Líder de operaciones y preventa",
    en: "Technology consultant · CEO at Closevibe · Operations & presales leader",
  } satisfies L,
  short: {
    es: "Ayudo a empresas a pasar de procesos manuales a sistemas automatizados: software a medida, IA aplicada y operaciones que escalan sin añadir complejidad.",
    en: "I help companies move from manual work to automated systems: custom software, applied AI and operations that scale without adding complexity.",
  } satisfies L,
  bio: {
    es: [
      "Soy ingeniero informático y llevo más de 14 años trabajando donde se cruzan la tecnología, las operaciones y los ingresos. Empecé como desarrollador e investigador en minería de datos, y desde entonces he liderado preventa, entrega de software y operaciones en Europa, Asia y América.",
      "He dirigido ciclos de preventa técnica para banca, fintech y seguros en FPT Software y Flanks, he sido COO de una fintech de pagos internacionales y hoy dirijo Closevibe, una plataforma de agentes de IA que convierte conversaciones con clientes en ventas. En paralelo lidero el programa global de RFx en Boomi.",
      "Esa doble mirada, de negocio y de ingeniería, es la que llevo a cada cliente: entiendo qué necesita tu operación, lo traduzco en sistemas concretos (software, integraciones, automatizaciones, IA) y me aseguro de que tu equipo los adopte de verdad.",
    ],
    en: [
      "I'm a computer engineer with 14+ years working where technology, operations and revenue meet. I started as a developer and data-mining researcher, and have since led presales, software delivery and operations across Europe, Asia and the Americas.",
      "I've run technical presales for banks, fintechs and insurers at FPT Software and Flanks, served as COO of a cross-border payments fintech, and today I lead Closevibe, an AI-agent platform that turns customer conversations into sales. I also run the global RFx program at Boomi.",
      "That dual business-and-engineering view is what I bring to every client: I understand what your operation needs, translate it into concrete systems (software, integrations, automations, AI) and make sure your team actually adopts them.",
    ],
  } satisfies LList,
  approach: {
    es: [
      "Primero el negocio: cada iniciativa empieza con un objetivo medible.",
      "Quick wins en semanas, no proyectos eternos.",
      "Sin sobreingeniería: la solución más simple que escala.",
      "Adopción real: documentación, formación y acompañamiento.",
    ],
    en: [
      "Business first: every initiative starts with a measurable goal.",
      "Quick wins in weeks, not never-ending projects.",
      "No over-engineering: the simplest solution that scales.",
      "Real adoption: documentation, training and hands-on support.",
    ],
  } satisfies LList,
  regions: { es: "Europa · Asia · América", en: "Europe · Asia · Americas" } satisfies L,
  languages: {
    es: ["Español (nativo)", "Inglés (profesional)", "Vietnamita (básico)"],
    en: ["Spanish (native)", "English (professional)", "Vietnamese (elementary)"],
  } satisfies LList,
};

export type Experience = {
  company: string;
  role: L;
  period: L;
  location: string;
  summary: L;
  highlights?: LList;
};

export const experience: Experience[] = [
  {
    company: "Boomi",
    role: { es: "RFx Program Manager, Global Presales Operations", en: "RFx Program Manager, Global Presales Operations" },
    period: { es: "Abr 2026 – actualidad", en: "Apr 2026 – present" },
    location: "Barcelona",
    summary: {
      es: "Responsable global de la estrategia y ejecución de RFx: equipos distribuidos y respuestas enterprise competitivas, convirtiendo la operación en un motor escalable y basado en datos.",
      en: "Global owner of RFx strategy and execution: distributed teams and competitive enterprise responses, turning the function into a scalable, data-driven engine.",
    },
  },
  {
    company: "Closevibe",
    role: { es: "Cofundador y CEO", en: "Co-founder & CEO" },
    period: { es: "Nov 2025 – actualidad", en: "Nov 2025 – present" },
    location: "Barcelona",
    summary: {
      es: "Agentes de IA que convierten conversaciones con clientes en ventas mediante automatización inteligente, CRM y mensajería omnicanal.",
      en: "AI agents that turn customer conversations into sales through intelligent automation, CRM and omnichannel messaging.",
    },
  },
  {
    company: "Cashela",
    role: { es: "Chief Operating Officer", en: "Chief Operating Officer" },
    period: { es: "Ene 2025 – Abr 2026", en: "Jan 2025 – Apr 2026" },
    location: "Miami / Barcelona",
    summary: {
      es: "Operaciones de una fintech de pagos internacionales: expansión, monetización, cumplimiento normativo y automatización de CRM, soporte, onboarding y partners.",
      en: "Operations for a cross-border payments fintech: expansion, monetization, compliance and automation across CRM, support, onboarding and partners.",
    },
    highlights: {
      es: ["Estrategia de monetización e ingresos recurrentes", "Automatización de procesos operativos clave", "Escalabilidad y cumplimiento en varias jurisdicciones"],
      en: ["Monetization strategy and recurring revenue", "Automation of key operational processes", "Scalability and compliance across jurisdictions"],
    },
  },
  {
    company: "Flanks",
    role: { es: "Head of Presales Engineering", en: "Head of Presales Engineering" },
    period: { es: "Feb 2024 – Ene 2025", en: "Feb 2024 – Jan 2025" },
    location: "Barcelona",
    summary: {
      es: "Preventa para banca y wealth management: procesos de RFP y demos más rápidos y consistentes, y mejor traspaso a onboarding y soporte.",
      en: "Presales for banking and wealth management: faster, more consistent RFP and demo processes, and smoother handoff to onboarding and support.",
    },
  },
  {
    company: "FPT Software",
    role: { es: "Senior Sales & Presales Engineer", en: "Senior Sales & Presales Engineer" },
    period: { es: "Mar 2020 – Feb 2024", en: "Mar 2020 – Feb 2024" },
    location: "Hanoi · Seúl",
    summary: {
      es: "RFP/RFI y POCs para fintech, banca, seguros y valores. Estrategia de entrada en Corea del Sur y pilotos firmados de más de 100.000 $.",
      en: "RFPs/RFIs and POCs for fintech, banking, insurance and securities. South Korea market-entry strategy and signed pilots worth over $100k.",
    },
  },
  {
    company: "Dinvai Construcciones",
    role: { es: "Presales Engineer", en: "Presales Engineer" },
    period: { es: "Ago 2017 – Mar 2020", en: "Aug 2017 – Mar 2020" },
    location: "Hanoi",
    summary: {
      es: "Consultoría, demos y propuestas a medida de software para el sector construcción.",
      en: "Consulting, demos and tailored proposals for construction-industry software.",
    },
  },
  {
    company: "CITI",
    role: { es: "Project Manager", en: "Project Manager" },
    period: { es: "May 2015 – Ago 2017", en: "May 2015 – Aug 2017" },
    location: "La Habana",
    summary: {
      es: "Diseño y entrega de soluciones de software: alcance, plazos, equipo y liderazgo técnico.",
      en: "Design and delivery of software solutions: scope, schedule, team and technical leadership.",
    },
  },
  {
    company: "CENATAV",
    role: { es: "Investigador en minería de datos", en: "Data Mining Researcher" },
    period: { es: "Sep 2012 – May 2015", en: "Sep 2012 – May 2015" },
    location: "La Habana",
    summary: {
      es: "Análisis de redes complejas y patrones frecuentes, integración de algoritmos en procesos ETL y publicaciones científicas.",
      en: "Complex-network analysis and frequent-pattern mining, algorithms integrated into ETL pipelines, and published research.",
    },
  },
];

export const education: { title: L; school: string; period: string }[] = [
  {
    title: { es: "MBA en Transformación Digital", en: "MBA, Digital Transformation" },
    school: "IOE Business School",
    period: "2023 – 2024",
  },
  {
    title: { es: "Ingeniería en Ciencias Informáticas (Minería de Datos)", en: "Computer Science Engineering (Data Mining)" },
    school: "Universidad de las Ciencias Informáticas",
    period: "2008 – 2013",
  },
  {
    title: { es: "AWS Solutions Architect – Associate", en: "AWS Solutions Architect – Associate" },
    school: "Amazon Web Services",
    period: "2021",
  },
  {
    title: { es: "Product Manager Nanodegree", en: "Product Manager Nanodegree" },
    school: "Udacity",
    period: "2022",
  },
  {
    title: { es: "Cloud Computing for Business Leaders", en: "Cloud Computing for Business Leaders" },
    school: "Udacity",
    period: "",
  },
];
