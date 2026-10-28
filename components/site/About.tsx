import { ChevronRight } from "lucide-react";
import { site } from "@/data/site";
import { SectionTitle } from "./SectionTitle";

export function About() {
  const { about } = site;
  return (
    <section id="about" aria-labelledby="about-title" className="py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionTitle id="about-title" title={about.title} intro={about.intro} />

        <div className="grid items-start gap-10 lg:grid-cols-12">
          <div className="reveal relative lg:col-span-4">
            <span aria-hidden className="absolute -left-3 -top-3 h-full w-full rounded-3xl border-2 border-(--accent-2)" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={encodeURI(about.image)}
              alt={site.identity.name}
              className="relative aspect-square w-full rounded-3xl object-cover shadow-xl transition duration-500 hover:-translate-y-1 hover:shadow-2xl"
            />
          </div>

          <div className="reveal lg:col-span-8">
            <h3 className="text-2xl font-bold text-(--text) sm:text-3xl">{about.headline}</h3>
            <p className="mt-4 text-lg italic">{about.lead}</p>

            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {about.facts.map((f) => (
                <li
                  key={f.label}
                  className="flex items-center gap-2 rounded-xl border border-(--border) bg-(--surface) px-4 py-3 text-sm transition hover:border-(--accent-2)"
                >
                  <ChevronRight size={16} className="shrink-0 text-(--accent-2)" />
                  <strong className="text-(--text)">{f.label}:</strong>
                  <span className="min-w-0 truncate text-(--muted)">{f.value}</span>
                </li>
              ))}
            </ul>

            <p className="mt-8">{about.approach}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
