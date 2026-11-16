import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Infinite horizontal ticker. Content is duplicated so the loop is seamless. */
export function Marquee({ items, className }: { items: ReactNode[]; className?: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center gap-14 pr-14">
      {items.map((item, i) => (
        <li key={i} className="shrink-0">
          {item}
        </li>
      ))}
    </ul>
  );
  return (
    <div className={cn("fade-x flex overflow-hidden", className)}>
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
