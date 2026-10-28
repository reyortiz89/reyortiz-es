import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import { methodSteps } from "@/data/method";
import { profile } from "@/data/profile";
import { getAllPosts } from "@/lib/blog";
import { Container, Section } from "@/components";
import { Accordion } from "@/components/ui/Accordion";
import { AgentConsole } from "@/components/ui/AgentConsole";
import { CountUp } from "@/components/ui/CountUp";
import { Globe, type GlobeLocation } from "@/components/ui/Globe";
import { Marquee } from "@/components/ui/Marquee";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { SlidingTabs } from "@/components/ui/SlidingTabs";
import { Spotlight } from "@/components/ui/Spotlight";
import { TextCycler } from "@/components/ui/TextCycler";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";

export const metadata: Metadata = {
  title: { absolute: `${profile.identity.name} | ${profile.identity.title}` },
  alternates: { canonical: "/" },
};

// Re-render hourly so the latest posts list picks up scheduled posts.
export const revalidate = 3600;

export default function HomePage() {
  const posts = getAllPosts().slice(0, 3);

  const stats = [
    { value: 12, suffix: "+", label: "años de experiencia internacional" },
    { value: 3, label: "continentes: Europa, Asia y América" },
    { value: profile.experience.length, label: "empresas en preventa, operaciones y producto" },
    { value: profile.services.length, label: "líneas de servicio para tu proyecto" },
  ];

  const serviceTabs = profile.services.map((s) => ({
    id: String(s.id),
    label: s.name.split(" (")[0],
    content: (
      <div className="grid gap-8 rounded-2xl border border-(--border) bg-(--surface) p-6 sm:p-8 md:grid-cols-12">
        <div className="md:col-span-7">
          <h3 className="text-2xl font-semibold tracking-tight text-(--text)">{s.outcome}</h3>
          <p className="mt-3">{s.description}</p>
          <p className="mt-6 font-mono text-xs uppercase tracking-wider text-(--muted)">Para quién</p>
          <p className="mt-1 text-sm text-(--text)">{s.audience}</p>
        </div>
        <ul className="grid content-start gap-3 md:col-span-5">
          {s.deliverables.map((d) => (
            <li key={d} className="flex gap-3 text-sm text-(--text)">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-(--accent)" />
              {d}
            </li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <>
      {/* Hero */}
      <Spotlight>
        <Container>
          <div className="grid items-center gap-14 py-20 sm:py-24 lg:grid-cols-12 lg:py-28">
            <div className="lg:col-span-7">
              <p className="inline-flex items-center gap-2 rounded-full border border-(--border) bg-(--surface) px-3 py-1 text-xs text-(--muted)">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--success) opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-(--success)" />
                </span>
                Disponible para nuevos proyectos · {profile.identity.location}
              </p>
              <h1 className="mt-6 text-4xl font-semibold leading-[1.05] tracking-tight text-(--text) sm:text-6xl">
                {profile.identity.title}.
                <br />
                <span className="text-(--muted)">Llevo la IA de la idea a </span>
                <TextCycler
                  className="shimmer-text"
                  words={["producción.", "resultados.", "tu equipo.", "tu negocio."]}
                />
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8">{profile.identity.summary}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/contact"
                  className="group inline-flex h-12 items-center gap-2 rounded-xl bg-(--accent) px-6 text-sm font-medium text-white transition hover:-translate-y-px hover:text-white hover:shadow-[0_10px_30px_-8px_var(--accent)]"
                >
                  Hablemos de tu proyecto
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services"
                  className="inline-flex h-12 items-center rounded-xl border border-(--border) bg-(--surface) px-6 text-sm font-medium text-(--text) transition hover:-translate-y-px"
                >
                  Ver servicios
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <AgentConsole
                title="ejemplo · plan de IA para tu empresa"
                lines={[
                  { text: "Analizando procesos y datos disponibles…", result: "14 procesos revisados" },
                  { text: "Priorizando casos de uso por impacto y esfuerzo…", result: "3 casos con ROI claro" },
                  { text: "Diseñando piloto con métricas de éxito…", result: "POC en 6 semanas" },
                  { text: "Preparando adopción y escalado…", result: "Equipo formado, en producción" },
                ]}
              />
            </div>
          </div>
        </Container>
      </Spotlight>

      {/* Stats */}
      <section aria-label="Cifras" className="border-y border-(--border) bg-(--surface)">
        <Container>
          <dl className="grid grid-cols-2 divide-(--border) md:grid-cols-4 md:divide-x">
            {stats.map((s) => (
              <div key={s.label} className="px-2 py-8 md:px-8">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-4xl font-semibold tracking-tight text-(--text) sm:text-5xl">
                  <CountUp value={s.value} suffix={s.suffix} />
                </dd>
                <dd className="mt-2 text-sm text-(--muted)">{s.label}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <div className="py-8">
        <Marquee items={[...profile.identity.expertise, ...profile.credibility.industries]} />
      </div>

      {/* Services */}
      <Section className="reveal">
        <Container>
          <SectionHeading
            eyebrow="Servicios"
            title="Cómo te ayudo"
            description="Desde la estrategia hasta la entrega: elige el área y mira qué incluye."
          />
          <div className="mt-10">
            <SlidingTabs items={serviceTabs} />
          </div>
        </Container>
      </Section>

      {/* Global experience */}
      <Section className="reveal">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="Experiencia internacional"
                title={`${places.length} países, un mismo método`}
                description="He liderado preventa, operaciones y proyectos desde Barcelona, Hanói, Seúl y La Habana. Gira el globo."
              />
              <ul className="mt-8 grid gap-3">
                {places.map((p) => (
                  <li
                    key={p.name}
                    className="flex items-center justify-between gap-4 rounded-xl border border-(--border) bg-(--surface) px-4 py-3"
                  >
                    <span className="flex items-center gap-3">
                      <MapPin size={16} className="text-(--accent)" />
                      <span className="font-medium text-(--text)">{p.name}</span>
                    </span>
                    <span className="text-right text-sm text-(--muted)">{p.note}</span>
                  </li>
                ))}
              </ul>
            </div>
            <Globe locations={places} home={places[0].location} />
          </div>
        </Container>
      </Section>

      {/* Selected work */}
      <Section className="reveal">
        <Container>
          <SectionHeading
            eyebrow="Casos"
            title="Proyectos seleccionados"
            description="Problema, enfoque y resultado de algunos proyectos que he liderado."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {profile.work.map((w) => (
              <TiltCard key={w.id}>
                <article className="p-7">
                  <p className="font-mono text-xs uppercase tracking-wider text-(--accent)">{w.category}</p>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight text-(--text)">{w.title}</h3>
                  <dl className="mt-5 grid gap-4 text-sm">
                    <div>
                      <dt className="font-medium text-(--text)">Reto</dt>
                      <dd className="mt-1 text-(--muted)">{w.problem}</dd>
                    </div>
                    <div>
                      <dt className="font-medium text-(--text)">Resultado</dt>
                      <dd className="mt-1 text-(--muted)">{w.outcome}</dd>
                    </div>
                  </dl>
                  <ul className="mt-6 flex flex-wrap gap-2">
                    {w.tags.map((t) => (
                      <li key={t} className="rounded-full border border-(--border) px-2.5 py-1 text-xs text-(--muted)">
                        {t}
                      </li>
                    ))}
                  </ul>
                </article>
              </TiltCard>
            ))}
          </div>
        </Container>
      </Section>

      {/* Process */}
      <Section className="reveal">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow="Método"
                title="De la idea a producción en cuatro pasos"
                description="Un proceso corto y medible para que la IA no se quede en una demo."
              />
            </div>
            <div className="lg:col-span-7">
              <ProcessSteps
                steps={methodSteps}
              />
            </div>
          </div>
        </Container>
      </Section>

      {/* Latest posts */}
      {posts.length > 0 ? (
        <Section className="reveal">
          <Container>
            <div className="flex flex-wrap items-end justify-between gap-4">
              <SectionHeading eyebrow="Blog" title="Últimos artículos" />
              <Link href="/blog" className="inline-flex items-center gap-1 text-sm font-medium text-(--accent)">
                Ver todos <ArrowRight size={14} />
              </Link>
            </div>
            <ul className="mt-10 grid gap-6 md:grid-cols-3">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block h-full rounded-2xl border border-(--border) bg-(--surface) p-6 transition hover:-translate-y-1 hover:shadow-md hover:text-(--text)"
                  >
                    <p className="font-mono text-xs uppercase tracking-wider text-(--muted)">
                      {post.category} · <time dateTime={post.date}>{formatDate(post.date)}</time>
                    </p>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight text-(--text) group-hover:text-(--accent)">
                      {post.title}
                    </h3>
                    <p className="mt-2 text-sm">{post.description}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}

      {/* FAQ */}
      <Section className="reveal">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <SectionHeading eyebrow="FAQ" title="Preguntas frecuentes" />
            </div>
            <div className="lg:col-span-8">
              <Accordion items={faq} />
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}

const places: (GlobeLocation & { note: string })[] = [
  { name: "Barcelona", location: [41.39, 2.17], note: "COO fintech · Head of Presales" },
  { name: "Hanói", location: [21.03, 105.85], note: "Preventa enterprise · 2017–2024" },
  { name: "Seúl", location: [37.57, 126.98], note: "Expansión a Corea del Sur" },
  { name: "La Habana", location: [23.11, -82.37], note: "Desarrollo, datos y gestión de proyectos" },
];

const faq = [
  {
    question: "¿Por dónde empieza un proyecto de IA contigo?",
    answer: "Con un diagnóstico corto de tus procesos y datos. En una o dos semanas tienes una lista priorizada de casos de uso con impacto estimado y un plan para el primer piloto.",
  },
  {
    question: "¿Necesito tener un equipo técnico propio?",
    answer: "No es imprescindible. Puedo coordinar proveedores o desarrolladores externos, y si ya tienes equipo, trabajo con él para que gane autonomía.",
  },
  {
    question: "¿Trabajas en remoto o presencial?",
    answer: "Las dos cosas. Estoy en Barcelona y trabajo en remoto con empresas de Europa y América, en español y en inglés.",
  },
  {
    question: "¿Cuánto tarda en verse un resultado?",
    answer: "Un piloto bien acotado suele estar listo en 4 a 8 semanas, con métricas acordadas desde el principio para decidir si se escala.",
  },
];

function formatDate(date: string) {
  return new Date(date).toLocaleDateString("es-ES", { day: "numeric", month: "short", year: "numeric" });
}
