import { Briefcase, Cpu, KanbanSquare, Network } from "lucide-react";
import { site } from "@/data/site";
import { SectionTitle } from "./SectionTitle";
import { TiltCard } from "../ui/TiltCard";

const icons = [Briefcase, Cpu, Network, KanbanSquare];

export function Skills() {
  const { skills } = site;
  return (
    <section id="skills" aria-labelledby="skills-title" className="bg-(--surface) py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionTitle id="skills-title" title={skills.title} intro={skills.intro} />
        <div className="grid gap-6 md:grid-cols-2">
          {skills.groups.map((g, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div key={g.title} className="reveal">
                <TiltCard max={5} className="!bg-(--bg)">
                  <div className="p-7">
                    <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-(--accent-2) text-white shadow-[0_8px_20px_-6px_var(--accent-2)]">
                      <Icon size={22} />
                    </span>
                    <h3 className="mt-5 text-xl font-bold text-(--text)">{g.title}</h3>
                    <ul className="mt-4 grid gap-2.5">
                      {g.items.map((item) => (
                        <li key={item} className="flex gap-3 text-[15px] text-(--muted)">
                          <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-(--accent-2)" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </TiltCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
