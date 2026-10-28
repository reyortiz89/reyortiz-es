"use client";

import { motion, useReducedMotion } from "motion/react";
import { Check, Loader2, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

export type ConsoleLine = { text: string; result?: string };

/**
 * Decorative "AI agent" console: each line shows a thinking spinner, streams in,
 * then resolves with a check and a result. Loops after a pause.
 * With reduced motion every line is shown resolved.
 */
export function AgentConsole({ title, lines }: { title: string; lines: ConsoleLine[] }) {
  const reduceMotion = useReducedMotion();
  const [step, setStep] = useState(lines.length);
  const [chars, setChars] = useState(0);

  // The server renders every line resolved; once mounted, restart from the first line.
  useEffect(() => {
    if (reduceMotion) return;
    const start = window.setTimeout(() => {
      setStep(0);
      setChars(0);
    }, 600);
    return () => window.clearTimeout(start);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    if (step >= lines.length) {
      const restart = window.setTimeout(() => {
        setStep(0);
        setChars(0);
      }, 4500);
      return () => window.clearTimeout(restart);
    }
    const full = lines[step].text.length;
    if (chars < full) {
      const t = window.setTimeout(() => setChars((c) => c + 2), 22);
      return () => window.clearTimeout(t);
    }
    const next = window.setTimeout(() => {
      setStep((s) => s + 1);
      setChars(0);
    }, 650);
    return () => window.clearTimeout(next);
  }, [chars, lines, reduceMotion, step]);

  return (
    <div
      aria-hidden
      className="relative overflow-hidden rounded-2xl border border-(--border) bg-(--surface) shadow-[0_30px_80px_-30px_var(--glow)]"
    >
      <div className="flex items-center gap-2 border-b border-(--border) px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        <span className="ml-3 flex items-center gap-1.5 font-mono text-xs text-(--muted)">
          <Sparkles size={12} className="text-(--accent)" />
          {title}
        </span>
      </div>
      <ul className="grid gap-3 p-5 font-mono text-[13px] leading-relaxed">
        {lines.map((line, i) => {
          const done = i < step;
          const active = i === step;
          if (!done && !active) return null;
          const visible = done ? line.text : line.text.slice(0, chars);
          return (
            <motion.li
              key={line.text}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex gap-3"
            >
              <span className="mt-0.5 shrink-0">
                {done ? (
                  <Check size={14} className="text-(--success)" />
                ) : (
                  <Loader2 size={14} className="animate-spin text-(--accent)" />
                )}
              </span>
              <span className="min-w-0">
                <span className="text-(--text)">{visible}</span>
                {active ? <span className="ml-0.5 inline-block h-3.5 w-1.5 translate-y-0.5 animate-pulse bg-(--accent)" /> : null}
                {done && line.result ? <span className="block text-(--muted)">→ {line.result}</span> : null}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
