import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: `About | ${profile.identity.name}`,
  description: `Professional background and experience for ${profile.identity.name}.`,
};

export default function AboutPage() {
  return (
    <PageShell
      title="About"
      description="Professional background, working style, and the type of problems I help solve."
    >
      <div className="grid gap-12 md:grid-cols-12">
        <section className="md:col-span-7" aria-labelledby="about-narrative">
          <h2 id="about-narrative" className="text-xl font-semibold tracking-tight text-(--text)">
            Overview
          </h2>
          <div className="mt-4 space-y-4">
            <p className="text-base leading-7 text-(--muted)">{profile.identity.about}</p>
            <p className="text-base leading-7 text-(--muted)">{profile.identity.summary}</p>
          </div>

          <div className="mt-8 rounded-2xl border border-(--border) bg-(--surface) p-6 shadow-sm">
            <h3 className="text-sm font-semibold tracking-tight text-(--text)">Working principles</h3>
            <ul className="mt-4 space-y-2 text-sm text-(--muted)">
              <li>Clarity over complexitymake requirements explicit.</li>
              <li>Trust is built through accurate demos and realistic execution plans.</li>
              <li>Documentation and alignment reduce cycle time and delivery risk.</li>
            </ul>
          </div>
        </section>

        <aside className="md:col-span-5" aria-labelledby="about-facts">
          <h2 id="about-facts" className="text-xl font-semibold tracking-tight text-(--text)">
            Quick facts
          </h2>
          <dl className="mt-4 space-y-4 rounded-2xl border border-(--border) bg-(--surface) p-6 text-sm shadow-sm">
            <div>
              <dt className="font-medium text-(--text)">Location</dt>
              <dd className="mt-1 text-(--muted)">{profile.identity.location}</dd>
            </div>
            <div>
              <dt className="font-medium text-(--text)">Languages</dt>
              <dd className="mt-1 text-(--muted)">{profile.identity.languages.join(", ")}</dd>
            </div>
            <div>
              <dt className="font-medium text-(--text)">Core work</dt>
              <dd className="mt-1 text-(--muted)">
                Presales leadership, solution architecture, and delivery enablement.
              </dd>
            </div>
          </dl>

          <section className="mt-10" aria-labelledby="about-education">
            <h3 id="about-education" className="text-sm font-semibold tracking-tight text-(--text)">
              Education
            </h3>
            <ul className="mt-4 space-y-3">
              {profile.education.map((edu) => (
                <li
                  key={edu.id}
                  className="rounded-2xl border border-(--border) bg-(--surface) p-5 text-sm shadow-sm"
                >
                  <p className="font-medium text-(--text)">{edu.degree}</p>
                  <p className="mt-1 text-(--muted)">{edu.institution}</p>
                  <p className="mt-1 text-(--muted)">{edu.year}</p>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </PageShell>
  );
}
