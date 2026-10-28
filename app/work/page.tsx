import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { PageShell } from "@/components/PageShell";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Experiencia",
  description: "Más de 12 años liderando proyectos, preventa y operaciones tecnológicas en fintech, banca y SaaS en Europa, Asia y América.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <PageShell
      eyebrow="Experiencia"
      title="12 años entre negocio y tecnología"
      description="Roles, alcance y responsabilidades en fintech, banca, seguros y SaaS, en Europa, Asia y América."
    >
      <div className="grid gap-12 lg:grid-cols-12">
        <section className="lg:col-span-8" aria-labelledby="experience-timeline">
          <h2 id="experience-timeline" className="sr-only">
            Trayectoria profesional
          </h2>
          <ol className="relative">
            <span
              aria-hidden
              className="absolute left-[11px] top-2 bottom-2 w-px bg-gradient-to-b from-(--accent) via-(--border) to-transparent"
            />
            {profile.experience.map((role, i) => (
              <li key={role.id} className="reveal relative pb-10 pl-12">
                <span
                  aria-hidden
                  className={
                    "absolute left-0 top-6 flex h-6 w-6 items-center justify-center rounded-full border bg-(--bg) " +
                    (i === 0 ? "border-(--accent)" : "border-(--border)")
                  }
                >
                  <span className={"h-2 w-2 rounded-full " + (i === 0 ? "bg-(--accent)" : "bg-(--muted)")} />
                </span>
                <article className="rounded-2xl border border-(--border) bg-(--surface) p-6 transition hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--border))] hover:shadow-md">
                  <header className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="text-lg font-semibold tracking-tight text-(--text)">{role.title}</h3>
                    <p className="font-mono text-xs text-(--muted)">
                      {role.startDate} — {role.endDate}
                    </p>
                  </header>
                  <p className="mt-1 text-sm font-medium text-(--accent)">
                    {role.company} · {role.location}
                  </p>
                  <p className="mt-4 text-sm">{role.description}</p>
                  <ul className="mt-4 grid gap-2 text-sm text-(--muted)">
                    {role.highlights.map((h) => (
                      <li key={h} className="flex gap-2">
                        <span aria-hidden className="mt-2 h-1 w-1 shrink-0 rounded-full bg-(--accent)" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </article>
              </li>
            ))}
          </ol>
        </section>

        <aside className="lg:col-span-4">
          <div className="sticky top-24 grid gap-6 rounded-2xl border border-(--border) bg-(--surface) p-6">
            <SectionHeading eyebrow="Habilidades" title="Lo que aporto" as="h2" />
            {profile.skills.map((g) => (
              <div key={g.category}>
                <p className="text-sm font-medium text-(--text)">{g.category}</p>
                <ul className="mt-2 flex flex-wrap gap-1.5">
                  {g.items.map((item) => (
                    <li key={item} className="rounded-full border border-(--border) px-2.5 py-0.5 text-xs text-(--muted)">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </aside>
      </div>
    </PageShell>
  );
}
