"use client";

/**
 * Success stories: animated category filters, image cards, and a case-study dialog.
 * A case can be opened from a link with ?case=<slug>#portfolio, as on the original site.
 */
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { site, type CaseStudy } from "@/data/site";
import { SectionTitle } from "./SectionTitle";

export function Portfolio() {
  const { portfolio } = site;
  const [filter, setFilter] = useState("all");
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const opener = useRef<HTMLElement | null>(null);

  const visible = portfolio.cases.filter(
    (c) => filter === "all" || (c.categories as readonly string[]).includes(filter)
  );
  const current = portfolio.cases.find((c) => c.slug === openSlug) ?? null;

  // Open a case passed in the URL (?case=slug), deferred so the first render matches the server.
  useEffect(() => {
    const slug = new URLSearchParams(window.location.search).get("case");
    if (!slug || !portfolio.cases.some((c) => c.slug === slug)) return;
    const t = window.setTimeout(() => setOpenSlug(slug), 0);
    return () => window.clearTimeout(t);
  }, [portfolio.cases]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (current && !dialog.open) dialog.showModal();
    if (!current && dialog.open) dialog.close();
  }, [current]);

  function openCase(c: CaseStudy, el: HTMLElement) {
    opener.current = el;
    setOpenSlug(c.slug);
    const url = new URL(window.location.href);
    url.searchParams.set("case", c.slug);
    window.history.replaceState(null, "", url.pathname + url.search + "#portfolio");
  }

  function closeCase() {
    setOpenSlug(null);
    const url = new URL(window.location.href);
    url.searchParams.delete("case");
    window.history.replaceState(null, "", url.pathname + url.search + "#portfolio");
    opener.current?.focus();
  }

  return (
    <section id="portfolio" aria-labelledby="portfolio-title" className="bg-(--surface) py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionTitle id="portfolio-title" title={portfolio.title} intro={portfolio.intro} />

        <div role="group" aria-label="Filter" className="reveal mb-10 flex flex-wrap justify-center gap-2">
          {portfolio.filters.map((f) => {
            const selected = filter === f.key;
            return (
              <button
                key={f.key}
                type="button"
                aria-pressed={selected}
                onClick={() => setFilter(f.key)}
                className={
                  "relative rounded-full px-5 py-2 text-sm font-medium transition-colors " +
                  (selected ? "text-white" : "text-(--muted) hover:text-(--text)")
                }
              >
                {selected ? (
                  <motion.span
                    layoutId="portfolio-filter"
                    className="absolute inset-0 rounded-full bg-(--accent-2)"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                ) : null}
                <span className="relative">{f.label}</span>
              </button>
            );
          })}
        </div>

        <motion.ul layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {visible.map((c) => (
              <motion.li
                key={c.slug}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.3 }}
              >
                <button
                  type="button"
                  onClick={(e) => openCase(c, e.currentTarget)}
                  className="group relative block h-full w-full overflow-hidden rounded-2xl border border-(--border) bg-(--bg) text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="block h-56 overflow-hidden bg-white">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={c.image}
                      alt={c.name}
                      loading="lazy"
                      className={
                        "h-full w-full transition-transform duration-700 group-hover:scale-110 " +
                        (c.imageFit === "contain" ? "object-contain" : "object-cover")
                      }
                    />
                  </span>
                  <span className="block p-5">
                    <span className="flex items-start justify-between gap-3">
                      <span className="text-lg font-bold text-(--text)">{c.name}</span>
                      <ArrowUpRight
                        size={18}
                        className="mt-1 shrink-0 text-(--accent-2) transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      />
                    </span>
                    <span className="mt-2 block text-sm leading-6 text-(--muted)">{c.summary}</span>
                  </span>
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </div>

      <dialog
        ref={dialogRef}
        onClose={() => openSlug && closeCase()}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeCase();
        }}
        aria-labelledby="case-title"
        className="m-auto w-[min(100%-2rem,960px)] max-h-[90vh] overflow-hidden rounded-3xl border border-(--border) bg-(--bg) p-0 text-(--text) shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm open:animate-[dialog-in_0.3s_ease-out]"
      >
        {current ? (
          <div className="grid max-h-[90vh] overflow-y-auto md:grid-cols-2">
            <div className="bg-white md:sticky md:top-0 md:h-full">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.image}
                alt={current.name}
                className={"h-64 w-full md:h-full " + (current.imageFit === "contain" ? "object-contain" : "object-cover")}
              />
            </div>
            <div className="relative p-7 sm:p-9">
              <button
                type="button"
                onClick={closeCase}
                aria-label="Close"
                className="absolute right-4 top-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-(--surface-2) text-(--text) transition hover:rotate-90"
              >
                <X size={18} />
              </button>
              <h2 id="case-title" className="pr-10 text-2xl font-bold text-(--text)">
                {current.heading}
              </h2>
              <p className="mt-5">
                <strong className="text-(--text)">Project overview:</strong> {current.overview}
              </p>
              {(
                [
                  ["Challenge", current.challenge],
                  ["Solution", current.solution],
                  ["Results", current.results],
                ] as const
              ).map(([label, value]) => (
                <div key={label} className="mt-6">
                  <h3 className="flex items-center gap-2 text-lg font-bold text-(--text)">
                    <span aria-hidden className="h-4 w-1 rounded-full bg-(--accent-2)" />
                    {label}
                  </h3>
                  <p className="mt-2">{value}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </dialog>
    </section>
  );
}
