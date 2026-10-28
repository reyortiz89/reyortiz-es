"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { Check } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type Step = { title: string; detail: string };

/**
 * "Agent progress" style list: when it scrolls into view, steps complete one after another,
 * each turning from a pulsing dot into a check. All steps are readable before the animation.
 */
export function ProcessSteps({ steps }: { steps: Step[] }) {
  const ref = useRef<HTMLOListElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();
  const [done, setDone] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduceMotion) {
      // Deferred so server and first client render match.
      const t = window.setTimeout(() => setDone(steps.length), 0);
      return () => window.clearTimeout(t);
    }
    const id = window.setInterval(() => {
      setDone((d) => {
        if (d >= steps.length) {
          window.clearInterval(id);
          return d;
        }
        return d + 1;
      });
    }, 700);
    return () => window.clearInterval(id);
  }, [inView, reduceMotion, steps.length]);

  return (
    <ol ref={ref} className="relative grid gap-4">
      {steps.map((step, i) => {
        const complete = i < done;
        const running = i === done && inView;
        return (
          <li
            key={step.title}
            className="flex gap-4 rounded-2xl border border-(--border) bg-(--surface) p-5 shadow-sm"
          >
            <span
              className={
                "relative mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 " +
                (complete
                  ? "border-(--accent) bg-(--accent) text-white"
                  : "border-(--border) bg-(--bg) text-(--muted)")
              }
            >
              {complete ? (
                <motion.span initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  <Check size={16} strokeWidth={3} />
                </motion.span>
              ) : (
                <span className="font-mono text-xs">{i + 1}</span>
              )}
              {running ? (
                <span className="absolute inset-0 animate-ping rounded-full border border-(--accent) opacity-60" />
              ) : null}
            </span>
            <div className="min-w-0">
              <h3 className="text-base font-semibold text-(--text)">{step.title}</h3>
              <p className="mt-1 text-sm">{step.detail}</p>
            </div>
          </li>
        );
      })}
    </ol>
  );
}
