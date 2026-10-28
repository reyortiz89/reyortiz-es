"use client";

import { useRef } from "react";

/**
 * Dot-grid backdrop with a soft glow that follows the pointer.
 * Pointer position is written to CSS variables, so no React re-renders happen on move.
 */
export function Spotlight({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onPointerMove}
      className={"group relative isolate overflow-hidden " + (className ?? "")}
      style={{ "--spot-x": "50%", "--spot-y": "30%" } as React.CSSProperties}
    >
      <div aria-hidden className="dot-grid pointer-events-none absolute inset-0 -z-10" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(520px circle at var(--spot-x) var(--spot-y), var(--glow), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}
