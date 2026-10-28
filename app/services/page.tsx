import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Bot, Code2, Megaphone, Presentation, Workflow, type LucideIcon } from "lucide-react";
import { methodSteps } from "@/data/method";
import { profile } from "@/data/profile";
import { PageShell } from "@/components/PageShell";
import { ProcessSteps } from "@/components/ui/ProcessSteps";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TiltCard } from "@/components/ui/TiltCard";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Consultoría de IA, gestión de proyectos, automatización y transformación digital para empresas. Proyectos con alcance claro y resultados medibles.",
  alternates: { canonical: "/services" },
};

const icons: Record<number, LucideIcon> = { 1: Workflow, 2: Code2, 3: Bot, 4: Megaphone, 5: Presentation };

export default function ServicesPage() {
  return (
    <PageShell
      eyebrow="Servicios"
      title="IA y proyectos con resultados medibles"
      description="Estrategia, gestión de proyectos y ejecución técnica, con alcance claro desde el primer día."
    >
      <section aria-labelledby="services-list">
        <h2 id="services-list" className="sr-only">
          Servicios
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {profile.services.map((service) => {
            const Icon = icons[service.id] ?? Workflow;
            return (
              <div key={service.id} className="reveal">
                <TiltCard max={5}>
                  <article className="p-7">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-(--accent)">
                      <Icon size={22} />
                    </span>
                    <p className="mt-5 text-sm font-medium text-(--accent)">{service.name}</p>
                    <h3 className="mt-1 text-xl font-semibold tracking-tight text-(--text)">{service.outcome}</h3>
                    <p className="mt-3 text-sm">{service.description}</p>
                    <ul className="mt-5 grid gap-2 text-sm text-(--text)">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex gap-2">
                          <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-(--accent)" />
                          {d}
                        </li>
                      ))}
                    </ul>
                    <p className="mt-5 border-t border-(--border) pt-4 text-xs text-(--muted)">
                      <span className="font-medium text-(--text)">Para quién: </span>
                      {service.audience}
                    </p>
                  </article>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </section>

      <section className="reveal mt-24 grid gap-12 lg:grid-cols-12" aria-labelledby="services-process">
        <div className="lg:col-span-5">
          <SectionHeading
            eyebrow="Método"
            title="Cómo trabajamos juntos"
            description="Cuatro pasos para que cada proyecto termine en producción y no en una demo."
          />
          <Link
            href="/contact"
            className="group mt-8 inline-flex h-12 items-center gap-2 rounded-xl bg-(--accent) px-6 text-sm font-medium text-white transition hover:text-white hover:shadow-[0_10px_30px_-8px_var(--accent)]"
          >
            Cuéntame tu proyecto
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
        <div className="lg:col-span-7" id="services-process">
          <ProcessSteps
            steps={methodSteps}
          />
        </div>
      </section>
    </PageShell>
  );
}
