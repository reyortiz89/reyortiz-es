import type { L, LList } from "./types";

/*
  Video library. Only public metadata lives here (the repo is public): the
  playable URL of each video is kept in the VIDEO_SOURCES environment variable
  and is only handed out after the visitor registers (see lib/video-sources.ts).
  A video without a source shows as "coming soon".
*/

export type VideoCategory = "marketing" | "sales" | "ai" | "operations" | "strategy";

/** Animated mock used as the video's cover. */
export type VideoVisual =
  | "ads"
  | "content"
  | "chat"
  | "workflow"
  | "agent"
  | "prompt"
  | "dashboard"
  | "calculator"
  | "roadmap"
  | "spec";

export type Video = {
  slug: string;
  category: VideoCategory;
  visual: VideoVisual;
  title: L;
  summary: L;
  takeaways: LList;
  /** Service offered next to the video. */
  service: string;
};

export const videoCategories: VideoCategory[] = ["marketing", "sales", "ai", "operations", "strategy"];

export const videos: Video[] = [
  {
    slug: "meta-ads-claude",
    category: "marketing",
    visual: "ads",
    title: {
      es: "Campañas en Meta Ads con Claude: del briefing al anuncio",
      en: "Meta Ads campaigns with Claude: from brief to live ad",
    },
    summary: {
      es: "Cómo usar Claude para preparar el briefing, escribir los textos, generar variantes creativas, definir la segmentación de una campaña en Meta Ads y leer los resultados para optimizar.",
      en: "How to use Claude to prepare the brief, write the copy, generate creative variants, define targeting for a Meta Ads campaign and read the results to optimize.",
    },
    takeaways: {
      es: ["Briefing y público objetivo con IA", "Diez variantes de texto en minutos", "Cómo leer las métricas y qué cambiar"],
      en: ["Brief and target audience with AI", "Ten copy variants in minutes", "How to read the metrics and what to change"],
    },
    service: "growth-ai",
  },
  {
    slug: "ai-content-calendar",
    category: "marketing",
    visual: "content",
    title: { es: "Un mes de contenido en una tarde con IA", en: "A month of content in one afternoon with AI" },
    summary: {
      es: "Un sistema para planificar el calendario editorial, escribir guiones y adaptar cada pieza a LinkedIn, Instagram, email y blog sin perder tu voz.",
      en: "A system to plan your content calendar, write scripts and adapt every piece to LinkedIn, Instagram, email and blog without losing your voice.",
    },
    takeaways: {
      es: ["Calendario editorial a partir de tus objetivos", "Guiones y textos con tu estilo", "Reutilizar una idea en cinco canales"],
      en: ["A content calendar built from your goals", "Scripts and copy in your style", "Reusing one idea across five channels"],
    },
    service: "growth-ai",
  },
  {
    slug: "whatsapp-lead-response",
    category: "sales",
    visual: "chat",
    title: {
      es: "Responde a cada lead en minutos: WhatsApp, IA y CRM",
      en: "Answer every lead in minutes: WhatsApp, AI and CRM",
    },
    summary: {
      es: "Cómo montar una primera respuesta automática por WhatsApp que cualifica al lead, lo registra en el CRM y te avisa solo cuando merece tu tiempo.",
      en: "How to set up an automatic first reply on WhatsApp that qualifies the lead, logs it in the CRM and only alerts you when it's worth your time.",
    },
    takeaways: {
      es: ["Respuesta en segundos, a cualquier hora", "Preguntas de cualificación que funcionan", "Del chat al CRM sin teclear nada"],
      en: ["A reply in seconds, at any hour", "Qualifying questions that work", "From chat to CRM without typing anything"],
    },
    service: "automation-ai",
  },
  {
    slug: "sales-follow-up-crm",
    category: "sales",
    visual: "workflow",
    title: {
      es: "Automatiza tu seguimiento comercial con un CRM",
      en: "Automate your sales follow-up with a CRM",
    },
    summary: {
      es: "El sistema que usamos con equipos comerciales: perfil de cliente ideal, secuencias de seguimiento y alertas en Slack para que ninguna oportunidad se enfríe.",
      en: "The system we use with sales teams: ideal customer profile, follow-up sequences and Slack alerts so no opportunity goes cold.",
    },
    takeaways: {
      es: ["Etapas del pipeline que reflejan la realidad", "Secuencias automáticas que no suenan a robot", "Alertas y tareas en el momento justo"],
      en: ["Pipeline stages that reflect reality", "Automatic sequences that don't sound robotic", "Alerts and tasks at the right moment"],
    },
    service: "automation-ai",
  },
  {
    slug: "ai-customer-agents",
    category: "ai",
    visual: "agent",
    title: {
      es: "Agentes de IA para atención al cliente: qué funciona hoy",
      en: "AI agents for customer service: what works today",
    },
    summary: {
      es: "Qué tareas puede resolver hoy un agente de IA, cómo conectarlo a tus datos y cuándo debe pasar la conversación a una persona.",
      en: "Which tasks an AI agent can handle today, how to connect it to your data and when it should hand the conversation to a person.",
    },
    takeaways: {
      es: ["Casos de uso con retorno claro", "Cómo darle a la IA tu información", "Límites, supervisión y traspaso a humano"],
      en: ["Use cases with a clear return", "How to give the AI your information", "Limits, oversight and handoff to a human"],
    },
    service: "automation-ai",
  },
  {
    slug: "claude-prompts-teams",
    category: "ai",
    visual: "prompt",
    title: { es: "Prompts que funcionan: Claude para equipos de empresa", en: "Prompts that work: Claude for business teams" },
    summary: {
      es: "Plantillas y hábitos para que todo el equipo saque partido a Claude en ventas, operaciones y atención al cliente, con resultados consistentes.",
      en: "Templates and habits so the whole team gets the most out of Claude in sales, operations and customer service, with consistent results.",
    },
    takeaways: {
      es: ["La estructura de un buen prompt", "Una biblioteca de prompts para tu empresa", "Errores comunes y cómo evitarlos"],
      en: ["The structure of a good prompt", "A prompt library for your company", "Common mistakes and how to avoid them"],
    },
    service: "automation-ai",
  },
  {
    slug: "realtime-dashboard",
    category: "operations",
    visual: "dashboard",
    title: { es: "Tu cuadro de mando en tiempo real, sin Excel", en: "Your real-time dashboard, without spreadsheets" },
    summary: {
      es: "Qué indicadores mirar cada semana, cómo conectar tus herramientas y cómo montar un cuadro de mando que se actualiza solo.",
      en: "Which metrics to check every week, how to connect your tools and how to build a dashboard that updates itself.",
    },
    takeaways: {
      es: ["Los diez indicadores que importan", "Conectar CRM, facturación y operaciones", "Alertas cuando algo se desvía"],
      en: ["The ten metrics that matter", "Connecting CRM, invoicing and operations", "Alerts when something drifts"],
    },
    service: "digital-transformation",
  },
  {
    slug: "automation-roi",
    category: "strategy",
    visual: "calculator",
    title: {
      es: "Calcula el ROI de una automatización antes de invertir",
      en: "Work out the ROI of an automation before you invest",
    },
    summary: {
      es: "Un método sencillo para estimar horas ahorradas, coste y plazo de retorno de cualquier automatización, y decidir por dónde empezar.",
      en: "A simple method to estimate hours saved, cost and payback for any automation, and decide where to start.",
    },
    takeaways: {
      es: ["Medir el coste real de un proceso manual", "Estimar ahorro y retorno sin hojas eternas", "Priorizar con una matriz impacto/esfuerzo"],
      en: ["Measuring the real cost of a manual process", "Estimating savings and payback without endless spreadsheets", "Prioritizing with an impact/effort matrix"],
    },
    service: "automation-ai",
  },
  {
    slug: "ai-roadmap-90-days",
    category: "strategy",
    visual: "roadmap",
    title: { es: "Roadmap de IA en 90 días para una pyme", en: "A 90-day AI roadmap for an SMB" },
    summary: {
      es: "Cómo pasar de probar ChatGPT o Claude por libre a un plan de 90 días con quick wins, responsables y métricas.",
      en: "How to go from ad-hoc ChatGPT or Claude experiments to a 90-day plan with quick wins, owners and metrics.",
    },
    takeaways: {
      es: ["Elegir los primeros casos de uso", "Plan 30/60/90 con responsables", "Medir el impacto y escalar"],
      en: ["Choosing the first use cases", "A 30/60/90 plan with owners", "Measuring impact and scaling"],
    },
    service: "digital-transformation",
  },
  {
    slug: "software-spec",
    category: "operations",
    visual: "spec",
    title: {
      es: "Cómo especificar tu software para que no se desvíe",
      en: "How to spec your software so it stays on track",
    },
    summary: {
      es: "Lo que debe incluir una buena especificación de software para recibir presupuestos comparables y evitar sorpresas de plazo y coste.",
      en: "What a good software specification should include to get comparable quotes and avoid surprises on timeline and cost.",
    },
    takeaways: {
      es: ["Del problema de negocio a requisitos claros", "Prioridades: qué va en el MVP y qué no", "Cómo comparar presupuestos"],
      en: ["From business problem to clear requirements", "Priorities: what goes in the MVP and what doesn't", "How to compare quotes"],
    },
    service: "software",
  },
];

export function getVideo(slug: string) {
  return videos.find((v) => v.slug === slug);
}
