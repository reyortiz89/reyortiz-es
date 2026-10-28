import { Headset, NotebookText, Smile, Users } from "lucide-react";
import { site } from "@/data/site";
import { CountUp } from "../ui/CountUp";

const icons = [Smile, NotebookText, Headset, Users];

export function Stats() {
  return (
    <section aria-label="Stats" className="pb-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {site.stats.map((s, i) => {
            const Icon = icons[i % icons.length];
            return (
              <div
                key={s.label}
                className="reveal group relative overflow-hidden rounded-2xl border border-(--border) bg-(--surface) p-6 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <span
                  aria-hidden
                  className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-(--accent-2) opacity-10 transition-transform duration-500 group-hover:scale-150"
                />
                <Icon size={28} className="text-(--accent-2)" />
                <dd className="mt-4 font-display text-4xl font-bold text-(--text)">
                  <CountUp value={s.value} />
                </dd>
                <dt className="mt-2 text-sm text-(--muted)">
                  <strong className="text-(--text)">{s.label}</strong> {s.detail}
                </dt>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
}
