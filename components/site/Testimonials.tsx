"use client";

/**
 * Testimonial carousel: auto-advances every 5 seconds (as on the original site),
 * pauses on hover or focus, and can be driven with the dots or by swiping.
 */
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { SectionTitle } from "./SectionTitle";

export function Testimonials() {
  const { testimonials } = site;
  const items = testimonials.items;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (paused || reduceMotion) return;
    const id = window.setInterval(() => setIndex((i) => (i + 1) % items.length), 5000);
    return () => window.clearInterval(id);
  }, [items.length, paused, reduceMotion]);

  const t = items[index];

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" className="bg-(--surface) py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionTitle id="testimonials-title" title={testimonials.title} intro={testimonials.intro} />

        <div
          className="reveal relative mx-auto max-w-3xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          aria-roledescription="carousel"
        >
          <div className="relative min-h-[300px]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={t.name}
                aria-roledescription="slide"
                aria-label={`${index + 1} / ${items.length}`}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -40 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -60) setIndex((i) => (i + 1) % items.length);
                  if (info.offset.x > 60) setIndex((i) => (i - 1 + items.length) % items.length);
                }}
                className="relative cursor-grab rounded-3xl border border-(--border) bg-(--bg) p-8 shadow-sm active:cursor-grabbing sm:p-10"
              >
                <Quote aria-hidden size={40} className="text-(--accent-2) opacity-30" />
                <blockquote className="mt-2 text-lg italic leading-8 text-(--text)">{t.quote}</blockquote>
                <figcaption className="mt-8 flex items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.image}
                    alt=""
                    className="h-16 w-16 rounded-full border-4 border-(--surface-2) object-cover"
                  />
                  <span>
                    <span className="block font-bold text-(--text)">{t.name}</span>
                    <span className="block text-sm text-(--muted)">{t.role}</span>
                  </span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {items.map((item, i) => (
              <button
                key={item.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`${i + 1} / ${items.length}: ${item.name}`}
                aria-current={i === index ? "true" : undefined}
                className={
                  "h-2.5 rounded-full transition-all duration-300 " +
                  (i === index ? "w-8 bg-(--accent-2)" : "w-2.5 bg-(--border) hover:bg-(--muted)")
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
