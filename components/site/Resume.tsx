import { site } from "@/data/site";
import { SectionTitle } from "./SectionTitle";

function TimelineItem({ children, last = false }: { children: React.ReactNode; last?: boolean }) {
  return (
    <div className={"reveal relative border-l-2 border-(--accent-2) pl-6 " + (last ? "pb-0" : "pb-8")}>
      <span aria-hidden className="absolute -left-[9px] top-1 h-4 w-4 rounded-full border-2 border-(--accent-2) bg-(--bg)" />
      {children}
    </div>
  );
}

function Period({ children }: { children: React.ReactNode }) {
  return (
    <p className="mt-2 inline-block rounded-md bg-(--surface-2) px-3 py-1 font-mono text-xs font-semibold text-(--text)">
      {children}
    </p>
  );
}

export function Resume() {
  const { resume } = site;
  return (
    <section id="resume" aria-labelledby="resume-title" className="py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionTitle id="resume-title" title={resume.title} intro={resume.intro} />

        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h3 className="mb-6 text-2xl font-bold text-(--text)">{resume.summaryTitle}</h3>
            <TimelineItem>
              <h4 className="text-lg font-bold uppercase tracking-wide text-(--text)">{site.identity.fullName}</h4>
              <p className="mt-2 italic">{resume.summary}</p>
              <ul className="mt-3 list-disc pl-5 text-sm text-(--muted)">
                {resume.contactLines.map((l) => (
                  <li key={l}>{l}</li>
                ))}
              </ul>
            </TimelineItem>

            <h3 className="mb-6 mt-10 text-2xl font-bold text-(--text)">{resume.educationTitle}</h3>
            {resume.education.map((e, i) => (
              <TimelineItem key={e.degree} last={i === resume.education.length - 1}>
                <h4 className="text-lg font-bold uppercase tracking-wide text-(--text)">{e.degree}</h4>
                <Period>{e.period}</Period>
                <p className="mt-2 italic">{e.institution}</p>
                <p className="mt-2">{e.description}</p>
              </TimelineItem>
            ))}
          </div>

          <div>
            <h3 className="mb-6 text-2xl font-bold text-(--text)">{resume.experienceTitle}</h3>
            {resume.experience.map((e) => (
              <TimelineItem key={e.title}>
                <h4 className="text-lg font-bold uppercase tracking-wide text-(--text)">{e.title}</h4>
                <Period>{e.period}</Period>
                <p className="mt-2 italic">{e.place}</p>
                <ul className="mt-3 grid list-disc gap-1.5 pl-5 text-[15px] text-(--muted)">
                  {e.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </TimelineItem>
            ))}
            <TimelineItem last>
              <h4 className="text-lg font-bold uppercase tracking-wide text-(--text)">{resume.earlier.title}</h4>
              <p className="mt-2 italic">{resume.earlier.intro}</p>
              <ul className="mt-3 grid list-disc gap-1.5 pl-5 text-[15px] text-(--muted)">
                {resume.earlier.items.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </TimelineItem>
          </div>
        </div>
      </div>
    </section>
  );
}
