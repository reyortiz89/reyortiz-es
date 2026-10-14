import type { ServiceIcon } from "@/content/services";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

/*
  Small abstract product-style illustrations for the services bento.
  Pure markup with theme tokens, so they adapt to light and dark mode.
*/

function Frame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "relative overflow-hidden rounded-2xl border border-border bg-background/70 p-4 shadow-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

function CodeVisual() {
  const lines = [
    ["w-10 bg-accent", "w-24 bg-foreground/20", "w-12 bg-foreground/10"],
    ["w-6", "w-16 bg-foreground/20", "w-20 bg-accent/70"],
    ["w-6", "w-10 bg-foreground/10", "w-28 bg-foreground/20"],
    ["w-6", "w-20 bg-accent/60", "w-8 bg-foreground/10"],
    ["w-10 bg-foreground/20", "w-14 bg-foreground/10"],
  ];
  return (
    <Frame>
      <div className="mb-3 flex gap-1.5">
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-foreground/15" />
        <span className="size-2 rounded-full bg-accent" />
      </div>
      <div className="space-y-2 font-mono">
        {lines.map((line, i) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-4 text-[10px] text-muted">{i + 1}</span>
            {line.map((c, j) => (
              <span key={j} className={cn("h-2 rounded-full", c)} />
            ))}
          </div>
        ))}
      </div>
    </Frame>
  );
}

function WorkflowVisual({ ai }: { ai: string }) {
  const nodes = ["Lead", ai, "CRM", "Email"];
  return (
    <Frame className="flex items-center justify-between gap-2 py-6">
      {nodes.map((n, i) => (
        <div key={n} className="flex flex-1 items-center gap-2">
          <span
            className={cn(
              "grid h-10 min-w-12 place-items-center rounded-xl border px-2 text-[11px] font-medium",
              i === 1 ? "border-accent bg-accent text-accent-foreground" : "border-border bg-surface text-foreground",
            )}
          >
            {n}
          </span>
          {i < nodes.length - 1 && (
            <span className="relative h-px flex-1 bg-border">
              <span className="absolute -top-[3px] right-0 size-[7px] animate-pulse-dot rounded-full bg-accent" />
            </span>
          )}
        </div>
      ))}
    </Frame>
  );
}

function RoadmapVisual() {
  const rows = [
    { w: "w-1/3", ml: "ml-0", accent: true },
    { w: "w-2/5", ml: "ml-[20%]", accent: false },
    { w: "w-1/3", ml: "ml-[45%]", accent: false },
    { w: "w-1/4", ml: "ml-[70%]", accent: true },
  ];
  return (
    <Frame>
      <div className="mb-3 flex justify-between text-[10px] text-muted">
        <span>Q1</span>
        <span>Q2</span>
        <span>Q3</span>
        <span>Q4</span>
      </div>
      <div className="space-y-2.5">
        {rows.map((r, i) => (
          <div key={i} className={cn("h-3 rounded-full", r.w, r.ml, r.accent ? "bg-accent" : "bg-foreground/15")} />
        ))}
      </div>
    </Frame>
  );
}

function GrowthVisual() {
  const bars = [28, 36, 32, 48, 56, 70, 88];
  return (
    <Frame className="flex h-36 items-end gap-2">
      {bars.map((h, i) => (
        <span
          key={i}
          style={{ height: `${h}%` }}
          className={cn("flex-1 rounded-t-md", i === bars.length - 1 ? "bg-accent" : "bg-foreground/15")}
        />
      ))}
    </Frame>
  );
}

function OpsVisual() {
  return (
    <Frame className="flex items-center gap-4">
      <div className="relative size-20 shrink-0">
        <svg viewBox="0 0 36 36" className="size-20 -rotate-90">
          <circle cx="18" cy="18" r="15.5" fill="none" className="stroke-foreground/10" strokeWidth="4" />
          <circle
            cx="18"
            cy="18"
            r="15.5"
            fill="none"
            className="stroke-accent"
            strokeWidth="4"
            strokeLinecap="round"
            strokeDasharray="97.4"
            strokeDashoffset="24"
          />
        </svg>
        <span className="absolute inset-0 grid place-items-center text-sm font-semibold">75%</span>
      </div>
      <div className="flex-1 space-y-2">
        <span className="block h-2 w-full rounded-full bg-foreground/15" />
        <span className="block h-2 w-4/5 rounded-full bg-foreground/10" />
        <span className="block h-2 w-3/5 rounded-full bg-accent/70" />
      </div>
    </Frame>
  );
}

export function ServiceVisual({ name, locale }: { name: ServiceIcon; locale: Locale }) {
  switch (name) {
    case "code":
      return <CodeVisual />;
    case "workflow":
      return <WorkflowVisual ai={locale === "es" ? "IA" : "AI"} />;
    case "compass":
      return <RoadmapVisual />;
    case "trending":
      return <GrowthVisual />;
    case "briefcase":
      return <OpsVisual />;
  }
}
