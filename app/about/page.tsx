import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, GraduationCap, Languages, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { PageShell } from "@/components/PageShell";
import { Marquee } from "@/components/ui/Marquee";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";

export const metadata: Metadata = {
  title: "Sobre mí",
  description: "Reynier Ortiz, consultor de IA y Project Manager en Barcelona: trayectoria internacional en preventa, operaciones y proyectos tecnológicos.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  const principles = [
    { title: "Claridad antes que complejidad", detail: "Requisitos explícitos y alcance acotado desde el primer día." },
    { title: "Confianza con hechos", detail: "Demos realistas y planes de ejecución que se pueden cumplir." },
    { title: "Alinear para ir más rápido", detail: "Documentación y comunicación que reducen ciclos y riesgo de entrega." },
  ];

  return (
    <PageShell
      eyebrow="Sobre mí"
      title={`Hola, soy ${profile.identity.name.split(" ")[0]}`}
      description={profile.identity.about}
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <section className="reveal lg:col-span-7" aria-labelledby="about-story">
          <SectionHeading eyebrow="Trayectoria" title="Negocio, producto e ingeniería" />
          <p id="about-story" className="mt-6 text-lg leading-8">
            {profile.identity.summary}
          </p>

          <h2 className="mt-14 text-2xl font-semibold tracking-tight text-(--text)">Cómo trabajo</h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-3">
            {principles.map((p) => (
              <li key={p.title}>
                <TiltCard>
                  <div className="p-5">
                    <h3 className="text-base font-semibold text-(--text)">{p.title}</h3>
                    <p className="mt-2 text-sm">{p.detail}</p>
                  </div>
                </TiltCard>
              </li>
            ))}
          </ul>
        </section>

        <aside className="reveal grid content-start gap-4 lg:col-span-5" aria-label="Datos rápidos">
          <dl className="grid gap-5 rounded-2xl border border-(--border) bg-(--surface) p-6">
            <div className="flex gap-3">
              <MapPin size={18} className="mt-0.5 text-(--accent)" />
              <div>
                <dt className="text-sm font-medium text-(--text)">Ubicación</dt>
                <dd className="text-sm text-(--muted)">{profile.identity.location}</dd>
              </div>
            </div>
            <div className="flex gap-3">
              <Languages size={18} className="mt-0.5 text-(--accent)" />
              <div>
                <dt className="text-sm font-medium text-(--text)">Idiomas</dt>
                <dd className="text-sm text-(--muted)">{profile.identity.languages.join(", ")}</dd>
              </div>
            </div>
            {profile.education.map((edu) => (
              <div key={edu.id} className="flex gap-3">
                <GraduationCap size={18} className="mt-0.5 text-(--accent)" />
                <div>
                  <dt className="text-sm font-medium text-(--text)">Formación</dt>
                  <dd className="text-sm text-(--muted)">
                    {edu.degree} · {edu.institution} ({edu.year})
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <div className="rounded-2xl border border-(--border) bg-(--surface) p-6">
            <p className="font-mono text-xs uppercase tracking-wider text-(--muted)">Especialidades</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {profile.identity.expertise.map((e) => (
                <li key={e} className="rounded-full border border-(--border) bg-(--bg) px-3 py-1 text-sm text-(--text)">
                  {e}
                </li>
              ))}
            </ul>
          </div>

          <Link
            href="/work"
            className="group inline-flex items-center justify-between rounded-2xl border border-(--border) bg-(--surface) p-6 text-(--text)"
          >
            <span className="font-medium">Ver toda mi experiencia</span>
            <ArrowRight size={18} className="text-(--accent) transition-transform group-hover:translate-x-1" />
          </Link>
        </aside>
      </div>

      <div className="mt-20">
        <Marquee items={profile.skills.flatMap((g) => g.items)} />
      </div>
    </PageShell>
  );
}
