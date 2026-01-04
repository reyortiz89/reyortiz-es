import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: `Work | ${profile.identity.name}`,
  description: `Experience timeline for ${profile.identity.name}.`,
};

export default function WorkPage() {
  return (
    <PageShell
      title="Work"
      description="A resume-style timeline of roles, scope, and responsibilities."
    >
      <section aria-labelledby="experience-timeline">
        <h2 id="experience-timeline" className="text-xl font-semibold tracking-tight text-(--text)">
          Experience
        </h2>

        <div className="mt-8 grid gap-8 md:grid-cols-12">
          <div className="md:col-span-8">
            <ol className="relative border-l border-(--border) pl-6">
              {profile.experience.map((role) => (
                <li key={role.id} className="relative pb-10">
                  <div className="absolute -left-2 top-2 h-4 w-4 rounded-full border border-(--border) bg-(--bg)" />

                  <article className="rounded-2xl border border-(--border) bg-(--surface) p-6 shadow-sm">
                    <header className="flex flex-col gap-2">
                      <h3 className="text-base font-semibold tracking-tight text-(--text)">
                        {role.title}
                      </h3>
                      <p className="text-sm text-(--muted)">
                        {role.company}  {role.location}
                      </p>
                      <p className="text-sm text-(--muted)">
                        {role.startDate}  {role.endDate}
                      </p>
                    </header>

                    <p className="mt-4 text-sm leading-7 text-(--muted)">{role.description}</p>

                    <h4 className="mt-5 text-xs font-semibold tracking-wide text-(--text)">
                      Responsibilities
                    </h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-(--muted)">
                      {role.highlights.map((h, i) => (
                        <li key={i}>{h}</li>
                      ))}
                    </ul>
                  </article>
                </li>
              ))}
            </ol>
          </div>

          <aside className="md:col-span-4">
            <div className="rounded-2xl border border-(--border) bg-(--surface) p-6 text-sm shadow-sm">
              <h3 className="text-sm font-semibold tracking-tight text-(--text)">Skills snapshot</h3>
              <p className="mt-3 text-(--muted)">
                Core skill groups used across roles.
              </p>
              <ul className="mt-4 space-y-3">
                {profile.skills.map((g) => (
                  <li key={g.category}>
                    <p className="font-medium text-(--text)">{g.category}</p>
                    <p className="mt-1 text-(--muted)">{g.items.slice(0, 4).join(", ")}</p>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
