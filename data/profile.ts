/**
 * Single source of truth for profile content
 * Update this file to manage all personal/professional information
 */

export const profile = {
  identity: {
    name: "Reynier Ortiz",
    title: "Solutions Consultant & Technical Presales",
    location: "Barcelona, Spain",
    email: "rey.ortiztamayo@gmail.com",
    phone: "+34 (632) 503-325",
    languages: ["Spanish", "English"],
    summary:
      "12+ years of international experience across Europe, Asia, and the Americas. Specialized in aligning product capabilities with client needs through technical presales, RFP leadership, and solution architecture. Expert in accelerating deal cycles and delivering scalable revenue-driving solutions for Finance, Enterprise, and B2B SaaS organizations.",
    about:
      "Passionate about crafting technical solutions that solve real business problems. I bridge sales, product, and engineering—working across cultures and markets to deliver compelling demos, strategic proposals, and solutions that build trust and drive results.",
  },

  experience: [
    {
      id: 1,
      title: "Chief Operations Officer",
      company: "Cross-border Payments Fintech",
      location: "Barcelona, Spain",
      startDate: "Jan 2025",
      endDate: "Present",
      description: "Leading presales and operations for international payment solutions.",
      highlights: [
        "Led presales for cross-border payment solutions (demos, validation, integration)",
        "Designed client flows (Pay-in, Compliance, FX) aligned with regulatory needs",
        "Built tailored pricing models and solution proposals with sales/product teams",
        "Standardized API and onboarding docs to reduce sales cycle time",
      ],
    },
    {
      id: 2,
      title: "Head of Presales Engineer",
      company: "Flanks",
      location: "Barcelona, Spain",
      startDate: "Feb 2024",
      endDate: "Jan 2025",
      description: "Owned full presales cycle for banking and wealth management clients.",
      highlights: [
        "Owned full presales cycle for banking and wealth clients",
        "Led RFP/RFI responses and technical product presentations",
        "Delivered demos and configurations tailored to client workflows",
        "Worked with product/engineering to validate feasibility pre-sale",
        "Improved win rate by aligning solutions with compliance and data needs",
      ],
    },
    {
      id: 3,
      title: "Senior Presales Engineer",
      company: "CMC Global",
      location: "Hanoi, Vietnam",
      startDate: "May 2023",
      endDate: "Feb 2024",
      description: "Managed presales for large enterprise accounts across the Americas.",
      highlights: [
        "Managed presales for large enterprise accounts across the Americas",
        "Delivered solution designs, demos, and client-facing proposals",
        "Led workshops to uncover technical and business requirements",
        "Conducted competitor analysis to refine positioning",
      ],
    },
    {
      id: 4,
      title: "Senior Presales Engineer",
      company: "FPT Software",
      location: "Hanoi & Seoul",
      startDate: "Mar 2020",
      endDate: "May 2023",
      description: "RFP/RFI responses and POC design for fintech, banking, and insurance.",
      highlights: [
        "Responded to RFPs/RFIs in fintech, banking, insurance",
        "Designed POCs and pilots, closing 6-figure opportunities",
        "Presented architectures and roadmaps to C-level clients",
        "Supported expansion strategy into South Korea",
      ],
    },
    {
      id: 5,
      title: "Presales Engineer",
      company: "Dinvai Construcciones",
      location: "Hanoi",
      startDate: "Aug 2017",
      endDate: "Mar 2020",
      description: "Discovery, demos, and proposal development for SaaS products.",
      highlights: [
        "Led discovery sessions and live software demos",
        "Converted business needs into scoped technical proposals",
        "Partnered with dev teams to define deliverables",
        "Supported early-stage sales for SaaS products",
      ],
    },
    {
      id: 6,
      title: "Software Developer / Project Manager",
      company: "CITI",
      location: "Havana, Cuba",
      startDate: "May 2015",
      endDate: "Aug 2017",
      description: "Full-cycle delivery of internal finance/operations tools.",
      highlights: [
        "Developed internal tools for finance/operations",
        "Led full-cycle delivery from requirements to deployment",
        "Resolved production issues and ensured timely releases",
        "Collaborated cross-functionally on roadmaps",
      ],
    },
    {
      id: 7,
      title: "Data Mining Researcher / Software Developer",
      company: "CENATAV",
      location: "Havana, Cuba",
      startDate: "Sep 2012",
      endDate: "May 2015",
      description: "Data mining, network analysis, and ETL integration.",
      highlights: [
        "Data mining + network analysis models",
        "Integrated algorithms into ETL workflows to improve data quality",
        "Presented findings at conferences",
        "Built internal tools for analytics/reporting",
      ],
    },
  ],

  education: [
    {
      id: 1,
      degree: "Engineering in Computer Science, Data Mining",
      institution: "University of Informatics Sciences",
      year: 2013,
    },
  ],

  skills: [
    {
      category: "Presales & Solutioning",
      items: ["RFP/RFI Response", "Technical Demos", "Discovery Workshops", "Solution Design"],
    },
    {
      category: "Cloud & Architecture",
      items: ["AWS", "Docker", "Kubernetes", "System Integration"],
    },
    {
      category: "Technical Product",
      items: [
        "Product Documentation",
        "Technical Architecture",
        "API Design",
        "Requirements Analysis",
      ],
    },
    {
      category: "Enterprise & Fintech",
      items: ["Enterprise Software", "Cross-border Payments", "Compliance", "MEDDICC Methodology"],
    },
    {
      category: "Communication & Soft Skills",
      items: [
        "Client-facing Communication",
        "Business Discovery",
        "Cross-cultural Collaboration",
        "Stakeholder Management",
      ],
    },
  ],

  services: [
    {
      id: 1,
      name: "Project Operations Officer",
      outcome: "Streamline project delivery, align teams, and accelerate time-to-value.",
      description:
        "Structure and operations for complex multi-stakeholder projects. Define workflows, governance, and success metrics.",
      deliverables: [
        "Project roadmap & governance structure",
        "Stakeholder alignment & communication cadence",
        "Risk assessment & mitigation plan",
        "Progress tracking & success metrics",
      ],
      audience: "Mid-market & enterprise teams scaling delivery",
    },
    {
      id: 2,
      name: "Website Development & Custom Development",
      outcome: "Build modern, fast, and maintainable digital products that drive engagement.",
      description:
        "Full-stack web development using modern frameworks and best practices. From concept to production.",
      deliverables: [
        "Custom web applications (Next.js, React, TypeScript)",
        "Responsive design & mobile-first implementation",
        "Performance optimization & SEO",
        "Deployment & DevOps setup",
      ],
      audience: "Startups, agencies, and enterprises needing custom web solutions",
    },
    {
      id: 3,
      name: "Business Consultancy in Automation & Digitalization",
      outcome: "Identify automation opportunities and digital transformation roadmaps.",
      description:
        "Business process analysis and technology recommendations to reduce friction and scale operations.",
      deliverables: [
        "Process audit & bottleneck identification",
        "Automation opportunity assessment",
        "Technology stack recommendation",
        "Implementation roadmap & vendor evaluation",
      ],
      audience: "SMBs and enterprises seeking operational efficiency",
    },
    {
      id: 4,
      name: "Marketing (Technical + GTM support)",
      outcome: "Develop go-to-market strategies and technical content that resonates with buyers.",
      description:
        "Positioning, messaging, and technical content to support sales and product launch.",
      deliverables: [
        "GTM strategy & positioning framework",
        "Technical content & solution briefs",
        "Sales enablement decks & case studies",
        "Competitive analysis & messaging guide",
      ],
      audience: "SaaS, fintech, and B2B companies launching or scaling",
    },
    {
      id: 5,
      name: "Presales Lead (RFP/RFI, demos, solutioning)",
      outcome: "Win more deals faster by delivering compelling, customer-centric solutions.",
      description:
        "End-to-end presales: from discovery and RFP response to demos, proposals, and negotiations.",
      deliverables: [
        "RFP/RFI response & evaluation management",
        "Discovery & requirements workshop facilitation",
        "Technical demo & proof-of-concept",
        "Solution proposal & pricing models",
      ],
      audience: "B2B SaaS, enterprise software, fintech, and professional services firms",
    },
  ],

  work: [
    {
      id: 1,
      title: "Cross-border Payments Presales Enablement",
      category: "Presales & Solution Design",
      problem:
        "International payment company needed clear, modular solution flows to address compliance, FX, and payment routing complexity.",
      approach:
        "Mapped client use cases → designed Pay-in/Compliance/FX flows → built pricing models → documented API integration paths.",
      outcome:
        "Standardized sales messaging, reduced presales cycle time, improved deal closure through clear technical alignment.",
      tags: ["Presales", "Fintech", "Solution Design"],
    },
    {
      id: 2,
      title: "Banking & Wealth Technical Presales Leadership",
      category: "RFP & Technical Demos",
      problem:
        "Wealth management platform faced complex RFP processes with demanding technical and compliance requirements.",
      approach:
        "Led RFP response strategy, conducted discovery workshops with clients, delivered tailored architecture presentations.",
      outcome:
        "Achieved higher win rate through alignment with client data governance and regulatory frameworks.",
      tags: ["RFP", "Banking", "Technical Architecture"],
    },
    {
      id: 3,
      title: "Enterprise POC & Pilot Program",
      category: "Solution Validation",
      problem:
        "Large insurance and fintech clients needed rapid validation of platform capabilities before major commitments.",
      approach:
        "Designed focused POCs, led technical setup, presented results and recommendations to stakeholders.",
      outcome:
        "Accelerated procurement cycles, converted POCs into multi-figure contracts.",
      tags: ["POC", "Insurance", "Fintech"],
    },
    {
      id: 4,
      title: "Data Quality & ETL Optimization",
      category: "Data & Analytics",
      problem: "Legacy ETL pipelines suffered from poor data quality and slow processing.",
      approach:
        "Implemented data mining algorithms, built quality checks, integrated validation into workflows.",
      outcome:
        "Improved data accuracy, accelerated analytics delivery, enabled better business intelligence.",
      tags: ["Data Mining", "ETL", "Analytics"],
    },
  ],

  credibility: {
    experience: "12+",
    regions: ["Europe", "Asia", "Americas"],
    industries: ["Finance", "SaaS", "Enterprise", "Fintech"],
  },

  social: {
    linkedin: "https://linkedin.com/in/reynierortiz",
    github: "https://github.com/reyortiz",
  },
};

export type Profile = typeof profile;
