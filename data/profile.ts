/**
 * Single source of truth for profile content
 * Update this file to manage all personal/professional information
 */

export const profile = {
  identity: {
    name: "Reynier Ortiz",
    title: "Consultor de IA y Project Manager",
    location: "Barcelona, España",
    email: "rey.ortiztamayo@gmail.com",
    phone: "+34 (632) 503-325",
    languages: ["Español", "Inglés"],
    summary:
      "Más de 12 años de experiencia internacional en Europa, Asia y América. Ayudo a empresas a llevar la inteligencia artificial de la idea a producción: estrategia, gestión de proyectos, automatización y arquitectura de soluciones, con foco en resultados de negocio en fintech, banca, SaaS B2B y gran empresa.",
    // Short version (~155 characters) for meta descriptions and social previews.
    seoDescription:
      "Consultor de IA y Project Manager en Barcelona. Ayudo a empresas a llevar la inteligencia artificial de la idea a producción con proyectos medibles.",
    about:
      "Uno negocio, producto e ingeniería. He liderado preventa, operaciones y proyectos tecnológicos en distintos mercados y culturas, y hoy me centro en que la IA genere valor real: casos de uso bien elegidos, proyectos con alcance claro y equipos que los adoptan.",
    expertise: [
      "Inteligencia artificial aplicada a empresas",
      "Gestión de proyectos",
      "Automatización de procesos",
      "Agentes de IA",
      "Arquitectura de soluciones",
      "Preventa técnica",
      "Fintech y pagos",
    ],
  },

  experience: [
    {
      id: 1,
      title: "Chief Operations Officer",
      company: "Fintech de pagos transfronterizos",
      location: "Barcelona, España",
      startDate: "Ene 2025",
      endDate: "Actualidad",
      description: "Dirección de preventa y operaciones para soluciones de pagos internacionales.",
      highlights: [
        "Lideré la preventa de soluciones de pagos transfronterizos (demos, validación e integración)",
        "Diseñé flujos de cliente (pay-in, compliance, FX) alineados con la normativa",
        "Construí modelos de precios y propuestas a medida con los equipos de ventas y producto",
        "Estandaricé la documentación de API y onboarding para acortar el ciclo de venta",
      ],
    },
    {
      id: 2,
      title: "Head of Presales Engineering",
      company: "Flanks",
      location: "Barcelona, España",
      startDate: "Feb 2024",
      endDate: "Ene 2025",
      description: "Responsable del ciclo completo de preventa para banca y gestión patrimonial.",
      highlights: [
        "Gestioné el ciclo completo de preventa con clientes de banca y gestión patrimonial",
        "Lideré respuestas a RFP/RFI y presentaciones técnicas de producto",
        "Preparé demos y configuraciones adaptadas a los procesos de cada cliente",
        "Validé la viabilidad técnica con producto e ingeniería antes de la venta",
        "Mejoré la tasa de cierre alineando las soluciones con requisitos de datos y cumplimiento",
      ],
    },
    {
      id: 3,
      title: "Senior Presales Engineer",
      company: "CMC Global",
      location: "Hanói, Vietnam",
      startDate: "May 2023",
      endDate: "Feb 2024",
      description: "Preventa para grandes cuentas corporativas en América.",
      highlights: [
        "Gestioné la preventa de grandes cuentas corporativas en América",
        "Elaboré diseños de solución, demos y propuestas para clientes",
        "Dirigí talleres para identificar requisitos técnicos y de negocio",
        "Realicé análisis de competencia para afinar el posicionamiento",
      ],
    },
    {
      id: 4,
      title: "Senior Presales Engineer",
      company: "FPT Software",
      location: "Hanói y Seúl",
      startDate: "Mar 2020",
      endDate: "May 2023",
      description: "Respuestas a RFP/RFI y diseño de pruebas de concepto para fintech, banca y seguros.",
      highlights: [
        "Respondí RFP/RFI en fintech, banca y seguros",
        "Diseñé pruebas de concepto y pilotos que cerraron oportunidades de seis cifras",
        "Presenté arquitecturas y hojas de ruta a comités de dirección",
        "Apoyé la estrategia de expansión en Corea del Sur",
      ],
    },
    {
      id: 5,
      title: "Presales Engineer",
      company: "Dinvai Construcciones",
      location: "Hanói",
      startDate: "Ago 2017",
      endDate: "Mar 2020",
      description: "Descubrimiento, demos y propuestas para productos SaaS.",
      highlights: [
        "Dirigí sesiones de descubrimiento y demos de software en directo",
        "Convertí necesidades de negocio en propuestas técnicas con alcance definido",
        "Definí entregables junto a los equipos de desarrollo",
        "Apoyé las primeras ventas de productos SaaS",
      ],
    },
    {
      id: 6,
      title: "Desarrollador de software / Project Manager",
      company: "CITI",
      location: "La Habana, Cuba",
      startDate: "May 2015",
      endDate: "Ago 2017",
      description: "Entrega de principio a fin de herramientas internas de finanzas y operaciones.",
      highlights: [
        "Desarrollé herramientas internas para finanzas y operaciones",
        "Dirigí proyectos completos, desde los requisitos hasta el despliegue",
        "Resolví incidencias en producción y aseguré entregas a tiempo",
        "Coordiné hojas de ruta con distintas áreas",
      ],
    },
    {
      id: 7,
      title: "Investigador en minería de datos / Desarrollador",
      company: "CENATAV",
      location: "La Habana, Cuba",
      startDate: "Sep 2012",
      endDate: "May 2015",
      description: "Minería de datos, análisis de redes e integración ETL.",
      highlights: [
        "Modelos de minería de datos y análisis de redes",
        "Integré algoritmos en procesos ETL para mejorar la calidad de los datos",
        "Presenté resultados en congresos",
        "Construí herramientas internas de analítica y reporting",
      ],
    },
  ],

  education: [
    {
      id: 1,
      degree: "Ingeniería en Ciencias Informáticas, especialidad en minería de datos",
      institution: "Universidad de las Ciencias Informáticas",
      year: 2013,
    },
  ],

  skills: [
    {
      category: "IA y automatización",
      items: ["Casos de uso de IA", "Agentes de IA", "Automatización de procesos", "Integración de modelos de lenguaje"],
    },
    {
      category: "Gestión de proyectos",
      items: ["Planificación y alcance", "Gobierno de proyectos", "Gestión de riesgos", "Gestión de stakeholders"],
    },
    {
      category: "Preventa y soluciones",
      items: ["Respuesta a RFP/RFI", "Demos técnicas", "Talleres de descubrimiento", "Diseño de soluciones"],
    },
    {
      category: "Cloud y arquitectura",
      items: ["AWS", "Docker", "Kubernetes", "Integración de sistemas", "Diseño de APIs"],
    },
    {
      category: "Empresa y fintech",
      items: ["Software empresarial", "Pagos transfronterizos", "Cumplimiento normativo", "Metodología MEDDICC"],
    },
  ],

  services: [
    {
      id: 3,
      name: "Consultoría de IA y automatización",
      outcome: "Identificar dónde la IA aporta valor real y llevarla de la idea a producción.",
      description:
        "Análisis de procesos, selección de casos de uso y hoja de ruta de IA y automatización con retorno medible.",
      deliverables: [
        "Diagnóstico de procesos y oportunidades de IA",
        "Priorización de casos de uso por impacto y viabilidad",
        "Business case y piloto con métricas de éxito",
        "Hoja de ruta de implantación y selección de proveedores",
      ],
      audience: "Pymes y grandes empresas que quieren aplicar IA con resultados",
    },
    {
      id: 1,
      name: "Gestión de proyectos y PMO",
      outcome: "Proyectos tecnológicos y de IA entregados a tiempo, con alcance claro y equipos alineados.",
      description:
        "Estructura, gobierno y operación de proyectos complejos con varios equipos y stakeholders.",
      deliverables: [
        "Hoja de ruta y modelo de gobierno del proyecto",
        "Alineación de stakeholders y plan de comunicación",
        "Gestión de riesgos y plan de mitigación",
        "Seguimiento del avance y métricas de éxito",
      ],
      audience: "Empresas medianas y grandes que escalan sus proyectos",
    },
    {
      id: 5,
      name: "Preventa y diseño de soluciones",
      outcome: "Ganar más oportunidades con propuestas técnicas claras y centradas en el cliente.",
      description:
        "Preventa de principio a fin: descubrimiento, RFP, demos, pruebas de concepto y propuestas.",
      deliverables: [
        "Gestión y respuesta de RFP/RFI",
        "Talleres de descubrimiento y requisitos",
        "Demos técnicas y pruebas de concepto",
        "Propuesta de solución y modelo de precios",
      ],
      audience: "Empresas SaaS B2B, software empresarial, fintech y servicios profesionales",
    },
    {
      id: 2,
      name: "Desarrollo web y a medida",
      outcome: "Productos digitales modernos, rápidos y fáciles de mantener.",
      description:
        "Desarrollo web full-stack con frameworks modernos y buenas prácticas, del concepto a producción.",
      deliverables: [
        "Aplicaciones web a medida (Next.js, React, TypeScript)",
        "Diseño responsive y mobile-first",
        "Optimización de rendimiento y SEO",
        "Despliegue y configuración DevOps",
      ],
      audience: "Startups, agencias y empresas que necesitan soluciones web a medida",
    },
    {
      id: 4,
      name: "Marketing técnico y go-to-market",
      outcome: "Estrategias de salida al mercado y contenido técnico que convence a quien compra.",
      description:
        "Posicionamiento, mensajes y contenido técnico para apoyar ventas y lanzamientos.",
      deliverables: [
        "Estrategia go-to-market y posicionamiento",
        "Contenido técnico y fichas de solución",
        "Presentaciones comerciales y casos de éxito",
        "Análisis de competencia y guía de mensajes",
      ],
      audience: "Empresas SaaS, fintech y B2B que lanzan o escalan",
    },
  ],

  work: [
    {
      id: 1,
      title: "Habilitación de preventa en pagos transfronterizos",
      category: "Preventa y diseño de soluciones",
      problem:
        "Una empresa de pagos internacionales necesitaba flujos de solución claros y modulares para resolver la complejidad de cumplimiento, FX y enrutamiento de pagos.",
      approach:
        "Mapeo de casos de uso → diseño de flujos de pay-in, compliance y FX → modelos de precios → documentación de integración por API.",
      outcome:
        "Mensaje comercial estandarizado, ciclo de preventa más corto y más cierres gracias a una alineación técnica clara.",
      tags: ["Preventa", "Fintech", "Diseño de soluciones"],
    },
    {
      id: 2,
      title: "Liderazgo de preventa técnica en banca y gestión patrimonial",
      category: "RFP y demos técnicas",
      problem:
        "Una plataforma de gestión patrimonial afrontaba RFP complejas con requisitos técnicos y de cumplimiento exigentes.",
      approach:
        "Estrategia de respuesta a RFP, talleres de descubrimiento con clientes y presentaciones de arquitectura a medida.",
      outcome:
        "Mayor tasa de éxito al alinear la solución con el gobierno del dato y la normativa de cada cliente.",
      tags: ["RFP", "Banca", "Arquitectura técnica"],
    },
    {
      id: 3,
      title: "Programa de pruebas de concepto y pilotos",
      category: "Validación de soluciones",
      problem:
        "Grandes clientes de seguros y fintech necesitaban validar rápido las capacidades de la plataforma antes de comprometerse.",
      approach:
        "Diseño de pruebas de concepto acotadas, puesta en marcha técnica y presentación de resultados y recomendaciones.",
      outcome:
        "Ciclos de compra más rápidos y pruebas de concepto convertidas en contratos de varias cifras.",
      tags: ["Prueba de concepto", "Seguros", "Fintech"],
    },
    {
      id: 4,
      title: "Calidad de datos y optimización ETL",
      category: "Datos y analítica",
      problem: "Procesos ETL heredados con mala calidad de datos y procesamiento lento.",
      approach:
        "Algoritmos de minería de datos, controles de calidad y validaciones integradas en los flujos.",
      outcome:
        "Datos más precisos, analítica más rápida y mejor inteligencia de negocio.",
      tags: ["Minería de datos", "ETL", "Analítica"],
    },
  ],

  credibility: {
    experience: "12+",
    regions: ["Europa", "Asia", "América"],
    industries: ["Finanzas", "SaaS", "Empresa", "Fintech"],
  },

  social: {
    linkedin: "https://linkedin.com/in/reynierortiz",
    github: "https://github.com/reyortiz",
  },
};

export type Profile = typeof profile;
