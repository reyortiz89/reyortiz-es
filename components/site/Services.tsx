import Link from "next/link";
import { ArrowRight, ClipboardList, Code2, Network, RefreshCw } from "lucide-react";
import { site } from "@/data/site";
import { SectionTitle } from "./SectionTitle";

export const serviceIcons = {
  "automation-ai": RefreshCw,
  "digital-transformation": Network,
  "software-integration": Code2,
  "marketing-growth": ClipboardList,
} as const;

export function Services() {
  const { services } = site;
  return (
    <section id="services" aria-labelledby="services-title" className="py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionTitle id="services-title" title={services.title} intro={services.intro} />
        <ul className="grid gap-6 md:grid-cols-2">
          {services.items.map((s) => {
            const Icon = serviceIcons[s.slug];
            return (
              <li key={s.slug} className="reveal">
                <Link
                  href={`/services/${s.slug}`}
                  className="group relative flex h-full gap-5 overflow-hidden rounded-2xl border border-(--border) bg-(--surface) p-7 transition hover:-translate-y-1 hover:border-(--accent-2) hover:shadow-xl hover:text-(--text)"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-(--accent-2) transition-transform duration-500 group-hover:scale-x-100"
                  />
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-(--accent-2) text-(--accent-2) transition-colors duration-300 group-hover:bg-(--accent-2) group-hover:text-white">
                    <Icon size={24} />
                  </span>
                  <span>
                    <span className="block text-lg font-bold text-(--text) group-hover:text-(--accent)">{s.title}</span>
                    <span className="mt-2 block text-[15px] leading-7 text-(--muted)">{s.description}</span>
                    <ArrowRight
                      size={18}
                      aria-hidden
                      className="mt-4 text-(--accent-2) transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
