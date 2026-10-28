"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

export type CommandItem = { label: string; href: string; group: string; hint?: string };

/**
 * ⌘K / Ctrl+K command palette for jumping around the site.
 * Opens from the keyboard shortcut or from the trigger rendered by the Navbar.
 */
export function CommandMenu({
  items,
  open,
  onOpenChange,
}: {
  items: CommandItem[];
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Clear the search whenever the menu closes, so it reopens fresh.
  function close() {
    setQuery("");
    setActive(0);
    onOpenChange(false);
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) close();
        else onOpenChange(true);
      }
      if (e.key === "Escape" && open) close();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });


  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((i) => `${i.label} ${i.group} ${i.hint ?? ""}`.toLowerCase().includes(q));
  }, [items, query]);

  function go(item: CommandItem | undefined) {
    if (!item) return;
    close();
    if (item.href.startsWith("http") || item.href.startsWith("mailto:")) {
      window.open(item.href, "_blank", "noopener");
    } else {
      router.push(item.href);
    }
  }

  function onInputKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[active]);
    }
  }

  const groups = [...new Set(results.map((r) => r.group))];

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-start justify-center bg-[color-mix(in_srgb,var(--bg)_55%,transparent)] px-4 pt-[14vh] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Buscar en la web"
            className="w-full max-w-lg overflow-hidden rounded-2xl border border-(--border) bg-(--surface) shadow-2xl"
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.97, y: -6 }}
            transition={{ type: "spring", stiffness: 500, damping: 36 }}
          >
            <div className="flex items-center gap-3 border-b border-(--border) px-4">
              <Search size={18} className="text-(--muted)" />
              <input
                ref={inputRef}
                autoFocus
                id="command-search"
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActive(0);
                }}
                onKeyDown={onInputKey}
                placeholder="¿A dónde quieres ir?"
                className="h-14 w-full bg-transparent text-sm text-(--text) outline-none placeholder:text-(--muted)"
                role="combobox"
                aria-expanded="true"
                aria-controls="command-results"
                aria-activedescendant={results[active] ? `cmd-${active}` : undefined}
              />
              <kbd className="rounded-md border border-(--border) px-1.5 py-0.5 font-mono text-[10px] text-(--muted)">
                ESC
              </kbd>
            </div>

            <ul id="command-results" role="listbox" className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 ? (
                <li className="px-3 py-6 text-center text-sm text-(--muted)">Sin resultados</li>
              ) : null}
              {groups.map((group) => (
                <li key={group} role="presentation">
                  <p className="px-3 pb-1 pt-3 font-mono text-[11px] uppercase tracking-wider text-(--muted)">
                    {group}
                  </p>
                  <ul role="presentation">
                    {results.map((item, idx) =>
                      item.group !== group ? null : (
                        <li
                          key={item.href}
                          id={`cmd-${idx}`}
                          role="option"
                          aria-selected={idx === active}
                          onMouseEnter={() => setActive(idx)}
                          onClick={() => go(item)}
                          className={
                            "flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm " +
                            (idx === active ? "bg-(--surface-2) text-(--text)" : "text-(--muted)")
                          }
                        >
                          <span>
                            {item.label}
                            {item.hint ? <span className="ml-2 text-xs text-(--muted)">{item.hint}</span> : null}
                          </span>
                          {idx === active ? <ArrowRight size={14} className="text-(--accent)" /> : null}
                        </li>
                      )
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
