"use client";

import { AnimatePresence, motion } from "motion/react";
import { useId, useState } from "react";

export type TabItem = { id: string; label: string; content: React.ReactNode };

/**
 * Tabs with a pill that slides to the active tab and a cross-fade between panels.
 * Arrow keys move between tabs (WAI-ARIA tabs pattern).
 */
export function SlidingTabs({ items }: { items: TabItem[] }) {
  const [active, setActive] = useState(items[0]?.id);
  const uid = useId();
  const current = items.find((i) => i.id === active) ?? items[0];

  function onKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    const idx = items.findIndex((i) => i.id === active);
    let next = idx;
    if (e.key === "ArrowRight") next = (idx + 1) % items.length;
    else if (e.key === "ArrowLeft") next = (idx - 1 + items.length) % items.length;
    else return;
    e.preventDefault();
    setActive(items[next].id);
    document.getElementById(`${uid}-tab-${items[next].id}`)?.focus();
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Servicios"
        onKeyDown={onKeyDown}
        className="flex gap-1 overflow-x-auto rounded-2xl border border-(--border) bg-(--surface) p-1.5"
      >
        {items.map((item) => {
          const selected = item.id === active;
          return (
            <button
              key={item.id}
              id={`${uid}-tab-${item.id}`}
              role="tab"
              type="button"
              aria-selected={selected}
              aria-controls={`${uid}-panel`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(item.id)}
              className={
                "relative shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition-colors " +
                (selected ? "text-white" : "text-(--muted) hover:text-(--text)")
              }
            >
              {selected ? (
                <motion.span
                  layoutId={`${uid}-pill`}
                  className="absolute inset-0 rounded-xl bg-(--accent) shadow-sm"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ) : null}
              <span className="relative">{item.label}</span>
            </button>
          );
        })}
      </div>

      <div id={`${uid}-panel`} role="tabpanel" aria-labelledby={`${uid}-tab-${current.id}`} className="mt-6">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {current.content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
