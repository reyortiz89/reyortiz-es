import type { L } from "./types";

/*
  Self-assessments. Every question has four answers scored 0–3 (0 = fully
  manual / not started, 3 = automated / best practice). Scores are turned into
  0–100 per area and overall by lib/assessment-score.ts, which both the page
  and the email report use.
*/

export type AssessmentOption = { label: L; score: 0 | 1 | 2 | 3 };

export type AssessmentQuestion = {
  id: string;
  area: string;
  text: L;
  options: AssessmentOption[];
  /** What to improve when this answer scores low; becomes a priority in the report. */
  priority: L;
};

export type AssessmentArea = { key: string; label: L; advice: L };

/** Unscored questions used to size the savings estimate. */
export type ContextQuestion = { id: "people" | "hours"; text: L; options: { label: L; value: number }[] };

export type AssessmentLevel = { min: number; label: L; text: L };

export type Assessment = {
  slug: string;
  kind: "audit" | "maturity";
  title: L;
  short: L;
  intro: L;
  minutes: number;
  areas: AssessmentArea[];
  questions: AssessmentQuestion[];
  context?: ContextQuestion[];
  levels: AssessmentLevel[];
  /** Service to offer next to the result. */
  service: string;
};

const opt = (es: string, en: string, score: AssessmentOption["score"]): AssessmentOption => ({ label: { es, en }, score });

export const automationAudit: Assessment = {
  slug: "automation-audit",
  kind: "audit",
  title: { es: "Auditoría de automatización", en: "Automation audit" },
  short: {
    es: "Descubre qué procesos automatizar primero y cuánto tiempo puedes recuperar.",
    en: "Find out which processes to automate first and how much time you can win back.",
  },
  intro: {
    es: "15 preguntas sobre ventas, operaciones, finanzas, atención al cliente y reporting. Al terminar ves tu puntuación al momento y puedes recibir el informe completo con tus prioridades y el ahorro estimado.",
    en: "15 questions on sales, operations, finance, customer service and reporting. When you finish you see your score straight away and can get the full report with your priorities and estimated savings.",
  },
  minutes: 5,
  service: "automation-ai",
  areas: [
    {
      key: "sales",
      label: { es: "Ventas", en: "Sales" },
      advice: {
        es: "Centraliza los leads en un CRM que se alimente solo y automatiza la primera respuesta y el seguimiento. Es donde antes se nota en ingresos.",
        en: "Centralize leads in a CRM that fills itself and automate the first reply and follow-ups. It's where the impact on revenue shows up first.",
      },
    },
    {
      key: "operations",
      label: { es: "Operaciones", en: "Operations" },
      advice: {
        es: "Conecta las herramientas entre áreas y convierte los procesos repetitivos en flujos con estados, avisos y asignaciones automáticas.",
        en: "Connect tools across teams and turn repetitive processes into workflows with statuses, alerts and automatic assignments.",
      },
    },
    {
      key: "finance",
      label: { es: "Finanzas", en: "Finance" },
      advice: {
        es: "Genera las facturas desde el sistema de ventas, automatiza la conciliación y los recordatorios de cobro, y captura los gastos sin teclearlos.",
        en: "Generate invoices from the sales system, automate reconciliation and payment reminders, and capture expenses without typing them.",
      },
    },
    {
      key: "service",
      label: { es: "Atención al cliente", en: "Customer service" },
      advice: {
        es: "Unifica los canales en una sola bandeja y deja que un asistente de IA resuelva las preguntas repetitivas para que el equipo atienda lo importante.",
        en: "Bring every channel into one inbox and let an AI assistant handle repetitive questions so your team focuses on what matters.",
      },
    },
    {
      key: "reporting",
      label: { es: "Reporting", en: "Reporting" },
      advice: {
        es: "Monta un cuadro de mando que se actualice solo con ventas, margen y caja, para decidir con datos del día y no del mes pasado.",
        en: "Set up a dashboard that updates itself with sales, margin and cash, so you decide with today's data instead of last month's.",
      },
    },
  ],
  questions: [
    {
      id: "s1",
      area: "sales",
      text: { es: "¿Dónde registras los leads y las oportunidades?", en: "Where do you record leads and opportunities?" },
      options: [
        opt("En emails, WhatsApp o papel, sin un sitio central", "In emails, WhatsApp or on paper, with no central place", 0),
        opt("En hojas de cálculo", "In spreadsheets", 1),
        opt("En un CRM que actualizamos a mano", "In a CRM we update by hand", 2),
        opt("En un CRM que se alimenta solo desde la web, formularios y anuncios", "In a CRM that fills itself from the website, forms and ads", 3),
      ],
      priority: { es: "Captura automática de leads en el CRM", en: "Automatic lead capture into the CRM" },
    },
    {
      id: "s2",
      area: "sales",
      text: { es: "¿Cuánto tardas en responder a un lead nuevo?", en: "How long does it take you to reply to a new lead?" },
      options: [
        opt("Más de 24 horas", "More than 24 hours", 0),
        opt("El mismo día", "The same day", 1),
        opt("Menos de una hora", "Less than an hour", 2),
        opt("Al instante, con respuesta automática o un agente de IA", "Instantly, with an automatic reply or an AI agent", 3),
      ],
      priority: { es: "Respuesta inmediata a cada lead con IA", en: "Instant reply to every lead with AI" },
    },
    {
      id: "s3",
      area: "sales",
      text: { es: "¿Cómo haces el seguimiento de presupuestos y propuestas?", en: "How do you follow up on quotes and proposals?" },
      options: [
        opt("Cuando nos acordamos", "Whenever we remember", 0),
        opt("Con recordatorios manuales", "With manual reminders", 1),
        opt("Con tareas en el CRM", "With tasks in the CRM", 2),
        opt("Con secuencias automáticas de email o WhatsApp", "With automatic email or WhatsApp sequences", 3),
      ],
      priority: { es: "Seguimiento automático de propuestas", en: "Automatic proposal follow-up" },
    },
    {
      id: "o1",
      area: "operations",
      text: {
        es: "¿Cómo pasa la información entre ventas, operaciones y finanzas?",
        en: "How does information move between sales, operations and finance?",
      },
      options: [
        opt("Por email, mensajes o reuniones", "By email, messages or meetings", 0),
        opt("Copiando datos entre hojas de cálculo", "Copying data between spreadsheets", 1),
        opt("Con algunas integraciones entre herramientas", "With some integrations between tools", 2),
        opt("Los sistemas están integrados y los datos fluyen solos", "Systems are integrated and data flows on its own", 3),
      ],
      priority: { es: "Integrar las herramientas entre áreas", en: "Integrating tools across teams" },
    },
    {
      id: "o2",
      area: "operations",
      text: {
        es: "¿Cómo gestionas los pedidos, proyectos o servicios del día a día?",
        en: "How do you manage day-to-day orders, projects or services?",
      },
      options: [
        opt("Con papel, email o de memoria", "On paper, by email or from memory", 0),
        opt("Con hojas de cálculo compartidas", "With shared spreadsheets", 1),
        opt("Con una herramienta de gestión, pero mucho trabajo manual", "With a management tool, but lots of manual work", 2),
        opt("Con flujos automáticos de estados, avisos y asignaciones", "With automatic workflows for statuses, alerts and assignments", 3),
      ],
      priority: { es: "Flujos automáticos para pedidos y proyectos", en: "Automatic workflows for orders and projects" },
    },
    {
      id: "o3",
      area: "operations",
      text: { es: "¿Tenéis los procesos documentados y estandarizados?", en: "Are your processes documented and standardized?" },
      options: [
        opt("No, cada persona lo hace a su manera", "No, everyone does it their own way", 0),
        opt("Algunos, en documentos sueltos", "Some, in scattered documents", 1),
        opt("La mayoría están documentados", "Most of them are documented", 2),
        opt("Documentados y ejecutados por las propias herramientas", "Documented and run by the tools themselves", 3),
      ],
      priority: { es: "Estandarizar y documentar los procesos clave", en: "Standardizing and documenting key processes" },
    },
    {
      id: "f1",
      area: "finance",
      text: { es: "¿Cómo emites las facturas?", en: "How do you issue invoices?" },
      options: [
        opt("A mano, una a una", "By hand, one by one", 0),
        opt("Con un programa, pero copiando los datos", "With software, but copying the data", 1),
        opt("Salen del sistema de ventas con poca intervención", "They come out of the sales system with little effort", 2),
        opt("Se generan y envían solas al cerrar el pedido o servicio", "They're generated and sent automatically when an order closes", 3),
      ],
      priority: { es: "Facturación automática", en: "Automatic invoicing" },
    },
    {
      id: "f2",
      area: "finance",
      text: { es: "¿Cómo controlas los cobros y los impagos?", en: "How do you track payments and overdue invoices?" },
      options: [
        opt("Revisando el banco de vez en cuando", "Checking the bank every now and then", 0),
        opt("Con una hoja de cálculo", "With a spreadsheet", 1),
        opt("Con alertas del programa de contabilidad", "With alerts from the accounting software", 2),
        opt("Conciliación y recordatorios de cobro automáticos", "Automatic reconciliation and payment reminders", 3),
      ],
      priority: { es: "Conciliación y recordatorios de cobro automáticos", en: "Automatic reconciliation and payment reminders" },
    },
    {
      id: "f3",
      area: "finance",
      text: { es: "¿Cómo gestionas los gastos y las facturas de proveedores?", en: "How do you handle expenses and supplier invoices?" },
      options: [
        opt("En papel y por email", "On paper and by email", 0),
        opt("Las escaneamos y las metemos a mano", "We scan them and type them in", 1),
        opt("Lectura automática (OCR) con revisión manual", "Automatic reading (OCR) with manual review", 2),
        opt("Se capturan, clasifican y contabilizan solas", "They're captured, classified and booked automatically", 3),
      ],
      priority: { es: "Captura automática de gastos y facturas de proveedores", en: "Automatic capture of expenses and supplier invoices" },
    },
    {
      id: "c1",
      area: "service",
      text: { es: "¿Por dónde te llegan las consultas de los clientes?", en: "How do customer questions reach you?" },
      options: [
        opt("Por muchos canales, sin centralizar", "Through many channels, nothing centralized", 0),
        opt("A un buzón de email compartido", "To a shared email inbox", 1),
        opt("A una herramienta de soporte o bandeja unificada", "To a support tool or unified inbox", 2),
        opt("A una bandeja unificada que clasifica y responde sola lo sencillo", "To a unified inbox that sorts and answers simple ones by itself", 3),
      ],
      priority: { es: "Bandeja unificada de atención al cliente", en: "Unified customer service inbox" },
    },
    {
      id: "c2",
      area: "service",
      text: {
        es: "¿Cómo se resuelven las preguntas repetitivas de los clientes?",
        en: "How are repetitive customer questions handled?",
      },
      options: [
        opt("El equipo las contesta todas a mano", "The team answers every one by hand", 0),
        opt("Con respuestas copiadas y pegadas", "With copy-pasted replies", 1),
        opt("Con una página de preguntas frecuentes o plantillas", "With an FAQ page or templates", 2),
        opt("Las resuelve un asistente de IA y el equipo atiende lo complejo", "An AI assistant solves them and the team handles complex cases", 3),
      ],
      priority: { es: "Asistente de IA para preguntas frecuentes", en: "AI assistant for frequent questions" },
    },
    {
      id: "c3",
      area: "service",
      text: { es: "¿Cómo mides la satisfacción de tus clientes?", en: "How do you measure customer satisfaction?" },
      options: [
        opt("No la medimos", "We don't", 0),
        opt("De forma puntual, cuando surge", "Occasionally, when it comes up", 1),
        opt("Con encuestas que enviamos a mano", "With surveys we send by hand", 2),
        opt("Con encuestas automáticas y alertas ante respuestas negativas", "With automatic surveys and alerts on negative answers", 3),
      ],
      priority: { es: "Encuestas de satisfacción automáticas", en: "Automatic satisfaction surveys" },
    },
    {
      id: "r1",
      area: "reporting",
      text: { es: "¿Cómo preparas los informes del negocio?", en: "How do you prepare business reports?" },
      options: [
        opt("No hacemos informes periódicos", "We don't do regular reports", 0),
        opt("A mano, en hojas de cálculo, cada mes", "By hand, in spreadsheets, every month", 1),
        opt("Exportando datos de varias herramientas", "Exporting data from several tools", 2),
        opt("Con un cuadro de mando que se actualiza solo", "With a dashboard that updates itself", 3),
      ],
      priority: { es: "Cuadro de mando automático", en: "Automatic dashboard" },
    },
    {
      id: "r2",
      area: "reporting",
      text: {
        es: "¿Cuánto tardas en saber cómo va el mes (ventas, margen y caja)?",
        en: "How long does it take you to know how the month is going (sales, margin and cash)?",
      },
      options: [
        opt("Semanas, al cerrar el mes", "Weeks, after month-end close", 0),
        opt("Unos días", "A few days", 1),
        opt("Unas horas", "A few hours", 2),
        opt("Lo veo en tiempo real", "I see it in real time", 3),
      ],
      priority: { es: "Indicadores clave en tiempo real", en: "Key metrics in real time" },
    },
    {
      id: "r3",
      area: "reporting",
      text: { es: "¿Tomas las decisiones con datos fiables?", en: "Do you make decisions with reliable data?" },
      options: [
        opt("Sobre todo por intuición", "Mostly by gut feeling", 0),
        opt("Con datos incompletos", "With incomplete data", 1),
        opt("Con datos fiables, pero tarde", "With reliable data, but late", 2),
        opt("Con datos fiables y al día", "With reliable, up-to-date data", 3),
      ],
      priority: { es: "Una única fuente de datos fiable", en: "A single reliable source of data" },
    },
  ],
  context: [
    {
      id: "people",
      text: {
        es: "¿Cuántas personas de tu equipo hacen tareas administrativas o repetitivas?",
        en: "How many people on your team do admin or repetitive tasks?",
      },
      options: [
        { label: { es: "1 o 2", en: "1 or 2" }, value: 1.5 },
        { label: { es: "De 3 a 5", en: "3 to 5" }, value: 4 },
        { label: { es: "De 6 a 15", en: "6 to 15" }, value: 10 },
        { label: { es: "Más de 15", en: "More than 15" }, value: 20 },
      ],
    },
    {
      id: "hours",
      text: {
        es: "¿Cuántas horas a la semana dedica cada una a esas tareas?",
        en: "How many hours a week does each of them spend on those tasks?",
      },
      options: [
        { label: { es: "Menos de 2", en: "Less than 2" }, value: 1.5 },
        { label: { es: "De 2 a 5", en: "2 to 5" }, value: 3.5 },
        { label: { es: "De 5 a 10", en: "5 to 10" }, value: 7.5 },
        { label: { es: "Más de 10", en: "More than 10" }, value: 12 },
      ],
    },
  ],
  levels: [
    {
      min: 0,
      label: { es: "Operación manual", en: "Manual operation" },
      text: {
        es: "Buena parte del trabajo depende de personas copiando datos y recordando tareas. Hay mucho margen: las primeras automatizaciones suelen dar resultados en semanas.",
        en: "Much of the work depends on people copying data and remembering tasks. There's a lot of room: the first automations usually pay off within weeks.",
      },
    },
    {
      min: 40,
      label: { es: "Automatización parcial", en: "Partly automated" },
      text: {
        es: "Tienes herramientas, pero no están conectadas y el equipo hace de pegamento. Integrar y automatizar los puntos de fricción libera horas cada semana.",
        en: "You have tools, but they're not connected and your team acts as the glue. Integrating and automating the friction points frees up hours every week.",
      },
    },
    {
      min: 70,
      label: { es: "Operación automatizada", en: "Automated operation" },
      text: {
        es: "Tu operación ya funciona con sistemas. El siguiente paso es usar IA donde aporta de verdad y afinar los datos para decidir más rápido.",
        en: "Your operation already runs on systems. The next step is using AI where it truly adds value and sharpening your data to decide faster.",
      },
    },
  ],
};

export const digitalMaturity: Assessment = {
  slug: "digital-maturity",
  kind: "maturity",
  title: { es: "Madurez digital", en: "Digital maturity" },
  short: {
    es: "Mide dónde está tu empresa en estrategia, procesos, datos, herramientas, personas y cliente.",
    en: "Measure where your company stands on strategy, processes, data, tools, people and customer.",
  },
  intro: {
    es: "12 preguntas sobre seis dimensiones. Obtienes tu nivel de madurez de 1 a 5, un gráfico por dimensiones y, si quieres, un informe con las recomendaciones para subir de nivel.",
    en: "12 questions across six dimensions. You get your maturity level from 1 to 5, a chart by dimension and, if you want, a report with recommendations to move up a level.",
  },
  minutes: 4,
  service: "digital-transformation",
  areas: [
    {
      key: "strategy",
      label: { es: "Estrategia", en: "Strategy" },
      advice: {
        es: "Define tres objetivos digitales medibles para los próximos 12 meses, con un responsable y un presupuesto para cada uno.",
        en: "Set three measurable digital goals for the next 12 months, each with an owner and a budget.",
      },
    },
    {
      key: "processes",
      label: { es: "Procesos", en: "Processes" },
      advice: {
        es: "Elige los tres procesos que más tiempo consumen, digitalízalos de principio a fin y mide su rendimiento con un par de KPIs.",
        en: "Pick the three most time-consuming processes, digitize them end to end and track them with a couple of KPIs.",
      },
    },
    {
      key: "data",
      label: { es: "Datos", en: "Data" },
      advice: {
        es: "Reúne clientes, ventas y operaciones en una fuente única y empieza con un cuadro de mando sencillo antes de pensar en predicciones.",
        en: "Bring customers, sales and operations into a single source and start with a simple dashboard before thinking about forecasting.",
      },
    },
    {
      key: "tools",
      label: { es: "Herramientas", en: "Tools" },
      advice: {
        es: "Integra las herramientas que ya usas antes de comprar otras nuevas, y prueba la IA en un proceso concreto con un objetivo medible.",
        en: "Integrate the tools you already use before buying new ones, and pilot AI on one specific process with a measurable goal.",
      },
    },
    {
      key: "people",
      label: { es: "Personas", en: "People" },
      advice: {
        es: "Nombra a un responsable de la transformación y forma al equipo en las herramientas clave; la adopción decide el resultado.",
        en: "Name an owner for the transformation and train the team on key tools; adoption decides the outcome.",
      },
    },
    {
      key: "customer",
      label: { es: "Cliente", en: "Customer" },
      advice: {
        es: "Mapea el recorrido de tu cliente con datos y digitaliza los momentos donde hoy hay esperas o llamadas innecesarias.",
        en: "Map your customer journey with data and digitize the moments that involve waiting or unnecessary calls today.",
      },
    },
  ],
  questions: [
    {
      id: "m1",
      area: "strategy",
      text: { es: "¿Tenéis una estrategia digital con objetivos medibles?", en: "Do you have a digital strategy with measurable goals?" },
      options: [
        opt("No", "No", 0),
        opt("Hay ideas, pero no un plan", "There are ideas, but no plan", 1),
        opt("Hay un plan, pero sin seguimiento", "There's a plan, but no follow-up", 2),
        opt("Un plan con objetivos, responsables y revisiones", "A plan with goals, owners and reviews", 3),
      ],
      priority: { es: "Plan digital con objetivos medibles", en: "Digital plan with measurable goals" },
    },
    {
      id: "m2",
      area: "strategy",
      text: { es: "¿Cómo decides la inversión en tecnología?", en: "How do you decide on technology investment?" },
      options: [
        opt("Solo cuando algo falla", "Only when something breaks", 0),
        opt("Sobre la marcha, sin presupuesto", "As we go, without a budget", 1),
        opt("Con un presupuesto anual", "With a yearly budget", 2),
        opt("Con un presupuesto ligado a objetivos y retorno", "With a budget tied to goals and return", 3),
      ],
      priority: { es: "Presupuesto de tecnología ligado a objetivos", en: "Technology budget tied to goals" },
    },
    {
      id: "m3",
      area: "processes",
      text: { es: "¿Cuántos procesos clave son digitales de principio a fin?", en: "How many key processes are digital end to end?" },
      options: [
        opt("Casi ninguno", "Almost none", 0),
        opt("Algunos", "Some", 1),
        opt("La mayoría", "Most", 2),
        opt("Todos, y se mejoran de forma continua", "All of them, and they keep improving", 3),
      ],
      priority: { es: "Digitalizar los procesos clave de principio a fin", en: "Digitizing key processes end to end" },
    },
    {
      id: "m4",
      area: "processes",
      text: { es: "¿Medís el rendimiento de vuestros procesos?", en: "Do you measure how your processes perform?" },
      options: [
        opt("No", "No", 0),
        opt("Alguno, de forma puntual", "A few, now and then", 1),
        opt("Los principales, con KPIs", "The main ones, with KPIs", 2),
        opt("Todos, con KPIs y mejora continua", "All of them, with KPIs and continuous improvement", 3),
      ],
      priority: { es: "KPIs para los procesos principales", en: "KPIs for the main processes" },
    },
    {
      id: "m5",
      area: "data",
      text: {
        es: "¿Dónde están los datos de clientes, ventas y operaciones?",
        en: "Where does your customer, sales and operations data live?",
      },
      options: [
        opt("Repartidos en muchos sitios", "Spread across many places", 0),
        opt("En hojas de cálculo", "In spreadsheets", 1),
        opt("En varias herramientas sin integrar", "In several tools that aren't integrated", 2),
        opt("Integrados en una fuente única", "Integrated into a single source", 3),
      ],
      priority: { es: "Una fuente única de datos", en: "A single source of data" },
    },
    {
      id: "m6",
      area: "data",
      text: { es: "¿Usáis los datos para anticiparos (previsiones, alertas)?", en: "Do you use data to look ahead (forecasts, alerts)?" },
      options: [
        opt("No", "No", 0),
        opt("Rara vez", "Rarely", 1),
        opt("En algunas áreas", "In some areas", 2),
        opt("De forma habitual", "Routinely", 3),
      ],
      priority: { es: "Previsiones y alertas con datos", en: "Data-driven forecasts and alerts" },
    },
    {
      id: "m7",
      area: "tools",
      text: { es: "¿Cómo son vuestras herramientas de trabajo?", en: "What are your work tools like?" },
      options: [
        opt("Básicas: email y hojas de cálculo", "Basic: email and spreadsheets", 0),
        opt("Varias herramientas en la nube, sueltas", "Several cloud tools, unconnected", 1),
        opt("Herramientas integradas en las áreas clave", "Integrated tools in key areas", 2),
        opt("Una plataforma integrada con automatizaciones e IA", "An integrated platform with automations and AI", 3),
      ],
      priority: { es: "Integrar las herramientas actuales", en: "Integrating current tools" },
    },
    {
      id: "m8",
      area: "tools",
      text: { es: "¿Usáis la IA en el día a día?", en: "Do you use AI day to day?" },
      options: [
        opt("No", "No", 0),
        opt("Pruebas individuales con ChatGPT o Claude", "Individual experiments with ChatGPT or Claude", 1),
        opt("En algunos procesos con reglas claras", "In some processes with clear rules", 2),
        opt("Integrada en procesos y con impacto medido", "Built into processes, with measured impact", 3),
      ],
      priority: { es: "Un piloto de IA con objetivo medible", en: "An AI pilot with a measurable goal" },
    },
    {
      id: "m9",
      area: "people",
      text: { es: "¿Cómo es la competencia digital del equipo?", en: "How digitally skilled is your team?" },
      options: [
        opt("Baja, y hay resistencia al cambio", "Low, and there's resistance to change", 0),
        opt("Desigual", "Uneven", 1),
        opt("Buena en general", "Good overall", 2),
        opt("Alta, con formación continua", "High, with ongoing training", 3),
      ],
      priority: { es: "Formación del equipo en las herramientas clave", en: "Training the team on key tools" },
    },
    {
      id: "m10",
      area: "people",
      text: { es: "¿Hay alguien responsable de la transformación digital?", en: "Is anyone responsible for digital transformation?" },
      options: [
        opt("No", "No", 0),
        opt("La dirección, cuando puede", "Management, when it has time", 1),
        opt("Una persona con dedicación parcial", "Someone part-time", 2),
        opt("Un responsable con equipo y presupuesto", "An owner with a team and budget", 3),
      ],
      priority: { es: "Un responsable de la transformación", en: "An owner for the transformation" },
    },
    {
      id: "m11",
      area: "customer",
      text: { es: "¿Cómo es la experiencia digital de tus clientes?", en: "What is your customers' digital experience like?" },
      options: [
        opt("Casi todo por teléfono o en persona", "Almost everything by phone or in person", 0),
        opt("Web informativa y email", "An informational website and email", 1),
        opt("Pueden comprar o pedir por canales digitales", "They can buy or order through digital channels", 2),
        opt("Experiencia digital completa y personalizada", "A complete, personalized digital experience", 3),
      ],
      priority: { es: "Canales digitales para comprar y pedir", en: "Digital channels to buy and order" },
    },
    {
      id: "m12",
      area: "customer",
      text: { es: "¿Conoces con datos el recorrido de tus clientes?", en: "Do you know your customer journey through data?" },
      options: [
        opt("No", "No", 0),
        opt("De forma intuitiva", "Intuitively", 1),
        opt("Con datos de algunas fases", "With data from some stages", 2),
        opt("Con datos de todo el recorrido", "With data from the whole journey", 3),
      ],
      priority: { es: "Medir el recorrido del cliente", en: "Measuring the customer journey" },
    },
  ],
  levels: [
    {
      min: 0,
      label: { es: "Nivel 1 · Inicial", en: "Level 1 · Initial" },
      text: {
        es: "La empresa funciona sobre todo con procesos manuales y herramientas básicas. Empieza por un plan sencillo con dos o tres objetivos y un responsable.",
        en: "The company runs mostly on manual processes and basic tools. Start with a simple plan with two or three goals and an owner.",
      },
    },
    {
      min: 20,
      label: { es: "Nivel 2 · Explorador", en: "Level 2 · Explorer" },
      text: {
        es: "Hay herramientas y ganas, pero sin un plan común. Toca ordenar: priorizar procesos, unificar datos y medir.",
        en: "There are tools and appetite, but no shared plan. Time to get organized: prioritize processes, unify data and measure.",
      },
    },
    {
      min: 40,
      label: { es: "Nivel 3 · En desarrollo", en: "Level 3 · Developing" },
      text: {
        es: "Las bases están puestas. El salto viene de integrar sistemas, automatizar procesos y dar al equipo datos fiables.",
        en: "The foundations are in place. The leap comes from integrating systems, automating processes and giving the team reliable data.",
      },
    },
    {
      min: 60,
      label: { es: "Nivel 4 · Integrado", en: "Level 4 · Integrated" },
      text: {
        es: "Procesos digitales e integrados. El siguiente paso es usar la IA y los datos para anticiparte y diferenciarte.",
        en: "Digital, integrated processes. The next step is using AI and data to anticipate and stand out.",
      },
    },
    {
      min: 80,
      label: { es: "Nivel 5 · Líder digital", en: "Level 5 · Digital leader" },
      text: {
        es: "La tecnología es una ventaja competitiva. Mantén la mejora continua y explora nuevos modelos de negocio digitales.",
        en: "Technology is a competitive advantage. Keep improving continuously and explore new digital business models.",
      },
    },
  ],
};

export const assessments = [automationAudit, digitalMaturity];

export function getAssessment(slug: string) {
  return assessments.find((a) => a.slug === slug);
}
