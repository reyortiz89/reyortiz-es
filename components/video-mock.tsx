import { Check, Play, Sparkles } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import type { VideoVisual } from "@/content/videos";
import { cn } from "@/lib/cn";

/*
  Animated "cover" for each video: a small product-style mock of the topic.
  Sizes use container query units (cqw) so the same mock works in a small
  card and in the large featured slot.
*/

type Palette = "ink" | "lime" | "stone";

const dark = {
  "--vm-window": "#161618",
  "--vm-line": "rgba(255,255,255,.14)",
  "--vm-soft": "rgba(255,255,255,.06)",
  "--vm-strong": "rgba(255,255,255,.8)",
  "--vm-text": "#f3f3ee",
} as CSSProperties;

const light = {
  "--vm-window": "#ffffff",
  "--vm-line": "rgba(12,12,13,.12)",
  "--vm-soft": "rgba(12,12,13,.05)",
  "--vm-strong": "rgba(12,12,13,.82)",
  "--vm-text": "#0c0c0d",
} as CSSProperties;

const palettes: Record<Palette, { bg: string; chip: string; vars: CSSProperties }> = {
  ink: {
    bg: "bg-[#0c0c0d] bg-[radial-gradient(60%_80%_at_85%_0%,rgba(198,242,78,.28),transparent_70%)] text-white",
    chip: "bg-white/10 text-white",
    vars: dark,
  },
  lime: {
    bg: "bg-[#c6f24e] bg-[radial-gradient(70%_90%_at_0%_100%,rgba(255,255,255,.45),transparent_60%)] text-[#0c0c0d]",
    chip: "bg-[#0c0c0d]/10 text-[#0c0c0d]",
    vars: dark,
  },
  stone: {
    bg: "bg-[#e7e5dd] bg-[radial-gradient(70%_90%_at_100%_0%,rgba(198,242,78,.55),transparent_65%)] text-[#0c0c0d]",
    chip: "bg-[#0c0c0d]/10 text-[#0c0c0d]",
    vars: light,
  },
};

const line = "block rounded-full bg-[var(--vm-line)]";
const delay = (s: number): CSSProperties => ({ animationDelay: `${s}s` });

function Line({ w, className, style }: { w: string; className?: string; style?: CSSProperties }) {
  return <span className={cn(line, "h-[1.5cqw]", className)} style={{ width: w, ...style }} />;
}

function Ads() {
  return (
    <div className="grid h-full grid-cols-[1.15fr_0.85fr] grid-rows-[minmax(0,1fr)] gap-[3cqw]">
      <div className="flex min-h-0 flex-col gap-[1.6cqw] rounded-[2cqw] bg-[var(--vm-soft)] p-[2.2cqw]">
        <div className="flex items-center gap-[1.5cqw]">
          <span className="size-[4cqw] shrink-0 rounded-full bg-[#c6f24e]" />
          <div className="flex-1 space-y-[1cqw]">
            <Line w="55%" />
            <Line w="30%" className="h-[1cqw] opacity-60" />
          </div>
        </div>
        <div className="relative min-h-0 flex-1 overflow-hidden rounded-[1.5cqw] bg-gradient-to-br from-[#c6f24e] via-[#9ad14a] to-[#2f5d1e]">
          <span className="absolute left-[2cqw] top-[2cqw] h-[2cqw] w-[50%] rounded-full bg-white/85" />
          <span className="absolute left-[2cqw] top-[5cqw] h-[1.4cqw] w-[32%] rounded-full bg-white/50" />
          <span className="absolute bottom-[2cqw] left-[2cqw] rounded-full bg-[#0c0c0d] px-[2cqw] py-[0.8cqw] text-[1.7cqw] font-medium text-white">
            CTA
          </span>
        </div>
        <div className="flex items-center gap-[1.4cqw] rounded-full border border-[var(--vm-line)] bg-[var(--vm-window)] px-[1.8cqw] py-[1.2cqw]">
          <Sparkles className="size-[2.4cqw] shrink-0 text-[#c6f24e]" />
          <span className="flex-1">
            <span className={cn(line, "h-[1.3cqw] w-[80%] animate-vm-type bg-[var(--vm-strong)] opacity-70")} />
          </span>
          <span className="h-[2.2cqw] w-[0.4cqw] animate-vm-blink bg-[#c6f24e]" />
        </div>
      </div>
      <div className="flex min-h-0 flex-col gap-[2cqw]">
        {[0, 1.2].map((d, i) => (
          <div key={d} className="flex min-h-0 flex-1 animate-vm-pop flex-col rounded-[1.5cqw] bg-[var(--vm-soft)] p-[1.8cqw]" style={delay(d)}>
            <div className="flex items-center justify-between">
              <Line w="40%" className="h-[1.1cqw]" />
              <span className="text-[1.7cqw] font-semibold text-[#c6f24e]">{i === 0 ? "+38%" : "−21%"}</span>
            </div>
            <div className="mt-[1.4cqw] flex min-h-0 flex-1 items-end gap-[0.8cqw]">
              {(i === 0 ? [40, 55, 45, 70, 90] : [85, 70, 60, 50, 35]).map((h, j) => (
                <span
                  key={j}
                  className={cn("flex-1 origin-bottom animate-vm-grow rounded-t-[0.5cqw]", j === 4 ? "bg-[#c6f24e]" : "bg-[var(--vm-line)]")}
                  style={{ height: `${h}%`, ...delay(j * 0.15) }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Content() {
  const filled: Record<number, number> = { 1: 0, 3: 0.4, 6: 0.8, 8: 1.2, 11: 1.6, 13: 2, 16: 2.4, 19: 2.8 };
  return (
    <div className="flex h-full flex-col gap-[1.6cqw]">
      <div className="flex items-center justify-between">
        <Line w="28%" className="h-[2cqw] bg-[var(--vm-strong)] opacity-80" />
        <div className="flex gap-[1cqw]">
          {["in", "ig", "@"].map((p) => (
            <span key={p} className="grid size-[3.6cqw] place-items-center rounded-full bg-[var(--vm-soft)] text-[1.6cqw] text-[var(--vm-text)]">
              {p}
            </span>
          ))}
        </div>
      </div>
      <div className="grid flex-1 grid-cols-7 gap-[1cqw]">
        {Array.from({ length: 21 }, (_, i) => (
          <div key={i} className="relative rounded-[1cqw] bg-[var(--vm-soft)] p-[0.8cqw]">
            <span className="block h-[1cqw] w-[30%] rounded-full bg-[var(--vm-line)]" />
            {filled[i] !== undefined && (
              <span
                className={cn(
                  "absolute inset-x-[0.8cqw] bottom-[0.8cqw] h-[45%] animate-vm-pop rounded-[0.8cqw]",
                  i % 3 === 0 ? "bg-[#c6f24e]" : "bg-[var(--vm-strong)] opacity-80",
                )}
                style={delay(filled[i])}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function Chat() {
  const bubbles = [
    { side: "l", w: "62%", d: 0 },
    { side: "r", w: "70%", d: 0.9 },
    { side: "l", w: "45%", d: 1.8 },
    { side: "r", w: "58%", d: 2.7 },
  ];
  return (
    <div className="mx-auto flex h-full w-[62%] flex-col rounded-t-[3cqw] border-x border-t border-[var(--vm-line)] bg-[var(--vm-soft)] px-[2.5cqw] pt-[2cqw]">
      <div className="flex items-center gap-[1.4cqw] border-b border-[var(--vm-line)] pb-[1.6cqw]">
        <span className="relative size-[4cqw] rounded-full bg-[#c6f24e]">
          <span className="absolute -bottom-[0.2cqw] -right-[0.2cqw] size-[1.4cqw] rounded-full border border-[var(--vm-window)] bg-emerald-400" />
        </span>
        <Line w="35%" />
      </div>
      <div className="flex flex-1 flex-col justify-center gap-[1.4cqw] py-[1.6cqw]">
        {bubbles.map((b) => (
          <div
            key={b.d}
            className={cn(
              "animate-vm-pop rounded-[1.6cqw] p-[1.4cqw]",
              b.side === "l" ? "self-start rounded-bl-[0.4cqw] bg-[var(--vm-line)]" : "self-end rounded-br-[0.4cqw] bg-[#c6f24e]",
            )}
            style={{ width: b.w, ...delay(b.d) }}
          >
            <span className={cn("block h-[1.2cqw] rounded-full", b.side === "l" ? "bg-[var(--vm-strong)] opacity-50" : "bg-[#0c0c0d]/40")} style={{ width: "80%" }} />
          </div>
        ))}
        <span
          className="flex animate-vm-pop items-center gap-[0.8cqw] self-center rounded-full bg-[var(--vm-strong)] px-[2cqw] py-[0.8cqw] text-[1.8cqw] font-medium text-[var(--vm-window)]"
          style={delay(3.4)}
        >
          <Check className="size-[2cqw]" /> CRM
        </span>
      </div>
    </div>
  );
}

function Workflow({ ai }: { ai: string }) {
  const nodes = ["Lead", ai, "CRM", "Slack"];
  return (
    <div className="flex h-full flex-col justify-center gap-[4cqw]">
      <div className="flex items-center">
        {nodes.map((n, i) => (
          <div key={n} className="flex flex-1 items-center last:flex-none">
            <span
              className={cn(
                "grid h-[8cqw] min-w-[11cqw] place-items-center rounded-[1.8cqw] border px-[1.5cqw] text-[2cqw] font-medium",
                i === 1 ? "border-[#c6f24e] bg-[#c6f24e] text-[#0c0c0d]" : "border-[var(--vm-line)] bg-[var(--vm-soft)] text-[var(--vm-text)]",
              )}
            >
              {n}
            </span>
            {i < nodes.length - 1 && (
              <span className="relative mx-[1cqw] h-px flex-1 bg-[var(--vm-line)]">
                <span className="absolute -top-[0.6cqw] size-[1.3cqw] -translate-x-1/2 animate-vm-flow rounded-full bg-[#c6f24e]" style={delay(i * 0.5)} />
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="space-y-[1.4cqw] rounded-[1.6cqw] bg-[var(--vm-soft)] p-[2cqw]">
        {[0.4, 1.2, 2].map((d, i) => (
          <div key={d} className="flex animate-vm-pop items-center gap-[1.4cqw]" style={delay(d)}>
            <span className="grid size-[2.6cqw] place-items-center rounded-full bg-[#c6f24e] text-[#0c0c0d]">
              <Check className="size-[1.8cqw]" />
            </span>
            <Line w={["60%", "45%", "52%"][i]} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Agent() {
  return (
    <div className="grid h-full grid-cols-[0.7fr_1.3fr] items-center gap-[3cqw]">
      <div className="relative mx-auto grid size-[17cqw] place-items-center">
        <span className="absolute inset-0 animate-ping rounded-full bg-[#c6f24e]/30 [animation-duration:2.4s]" />
        <span className="absolute inset-[2cqw] rounded-full bg-[#c6f24e]/30" />
        <span className="relative grid size-[10cqw] place-items-center rounded-full bg-[#c6f24e] text-[#0c0c0d]">
          <Sparkles className="size-[4.5cqw]" />
        </span>
      </div>
      <div className="space-y-[1.8cqw]">
        {[
          { w: "85%", d: 0, strong: false },
          { w: "70%", d: 0.8, strong: true },
          { w: "90%", d: 1.6, strong: false },
          { w: "55%", d: 2.4, strong: true },
        ].map((l) => (
          <div key={l.d} className="rounded-[1.4cqw] bg-[var(--vm-soft)] p-[1.4cqw]">
            <span
              className={cn(line, "h-[1.4cqw] animate-vm-type", l.strong && "bg-[var(--vm-strong)] opacity-70")}
              style={{ width: l.w, ...delay(l.d) }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function PromptEditor() {
  const rows = ["75%", "55%", "88%", "40%", "68%", "30%"];
  return (
    <div className="grid h-full grid-cols-[1.3fr_0.7fr] gap-[2.5cqw]">
      <div className="rounded-[1.6cqw] bg-[var(--vm-soft)] p-[2cqw]">
        <div className="mb-[2cqw] flex items-center gap-[1cqw]">
          <span className="rounded-[0.8cqw] bg-[var(--vm-line)] px-[1.4cqw] py-[0.6cqw] font-mono text-[1.7cqw] text-[var(--vm-text)]">prompt.md</span>
        </div>
        <div className="space-y-[1.5cqw] font-mono">
          {rows.map((w, i) => (
            <div key={i} className="flex items-center gap-[1.4cqw]">
              <span className="w-[2cqw] text-[1.6cqw] text-[var(--vm-text)] opacity-40">{i + 1}</span>
              <span className={cn(line, "h-[1.4cqw] animate-vm-type", i % 3 === 0 && "bg-[#c6f24e]")} style={{ width: w, ...delay(i * 0.45) }} />
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-[1.6cqw]">
        <span className="flex items-center gap-[1cqw] self-start rounded-full bg-[#c6f24e] px-[1.8cqw] py-[0.8cqw] text-[1.8cqw] font-medium text-[#0c0c0d]">
          <Sparkles className="size-[2cqw]" /> Claude
        </span>
        {[0.6, 1.4, 2.2].map((d) => (
          <div key={d} className="animate-vm-pop space-y-[1cqw] rounded-[1.4cqw] bg-[var(--vm-soft)] p-[1.6cqw]" style={delay(d)}>
            <Line w="90%" className="h-[1.2cqw]" />
            <Line w="60%" className="h-[1.2cqw]" />
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="flex h-full flex-col gap-[2cqw]">
      <div className="grid grid-cols-3 gap-[1.6cqw]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-[1.4cqw] bg-[var(--vm-soft)] p-[1.6cqw]">
            <Line w="45%" className="h-[1cqw]" />
            <span className="mt-[1.2cqw] block h-[2.6cqw] w-[70%] rounded-[0.6cqw] bg-[var(--vm-strong)] opacity-80" />
            <span className="mt-[1cqw] block h-[1.1cqw] w-[30%] rounded-full bg-[#c6f24e]" />
          </div>
        ))}
      </div>
      <div className="grid flex-1 grid-cols-[1.4fr_0.6fr] gap-[1.6cqw]">
        <div className="relative rounded-[1.4cqw] bg-[var(--vm-soft)] p-[1.6cqw]">
          <svg viewBox="0 0 100 40" preserveAspectRatio="none" className="size-full">
            <path d="M0 34 L14 28 L28 30 L42 20 L56 22 L70 12 L84 14 L100 4 L100 40 L0 40 Z" fill="rgba(198,242,78,.18)" />
            <path
              d="M0 34 L14 28 L28 30 L42 20 L56 22 L70 12 L84 14 L100 4"
              fill="none"
              stroke="#c6f24e"
              strokeWidth="1.6"
              pathLength={1}
              strokeDasharray="1"
              className="animate-vm-draw"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>
        <div className="flex items-end gap-[1cqw] rounded-[1.4cqw] bg-[var(--vm-soft)] p-[1.6cqw]">
          {[45, 70, 55, 90].map((h, i) => (
            <span
              key={i}
              className={cn("flex-1 origin-bottom animate-vm-grow rounded-t-[0.6cqw]", i === 3 ? "bg-[#c6f24e]" : "bg-[var(--vm-line)]")}
              style={{ height: `${h}%`, ...delay(i * 0.3) }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function Calculator() {
  return (
    <div className="grid h-full grid-cols-[1.1fr_0.9fr] gap-[3cqw]">
      <div className="flex flex-col justify-center gap-[3cqw]">
        {["60%", "35%", "75%"].map((w, i) => (
          <div key={i}>
            <div className="flex justify-between">
              <Line w="40%" className="h-[1.1cqw]" />
              <Line w="14%" className="h-[1.1cqw] bg-[var(--vm-strong)] opacity-60" />
            </div>
            <div className="relative mt-[1.4cqw] h-[1.2cqw] rounded-full bg-[var(--vm-soft)]">
              <span className="absolute inset-y-0 left-0 origin-left animate-vm-grow-x rounded-full bg-[#c6f24e]" style={{ width: w, ...delay(i * 0.5) }} />
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center rounded-[2cqw] bg-[#c6f24e] p-[3cqw] text-[#0c0c0d]">
        <span className="text-[2cqw] font-medium opacity-70">ROI</span>
        <span className="mt-[1cqw] text-[7cqw] font-semibold leading-none tracking-tight">+%</span>
        <div className="mt-[2.4cqw] h-[1.2cqw] rounded-full bg-[#0c0c0d]/15">
          <span className="block h-full w-[70%] origin-left animate-vm-grow-x rounded-full bg-[#0c0c0d]" />
        </div>
      </div>
    </div>
  );
}

function Roadmap() {
  const rows = [
    { left: "0%", w: "30%", accent: true },
    { left: "18%", w: "38%", accent: false },
    { left: "40%", w: "30%", accent: false },
    { left: "62%", w: "34%", accent: true },
  ];
  return (
    <div className="flex h-full flex-col gap-[2cqw]">
      <div className="grid grid-cols-3 border-b border-[var(--vm-line)] pb-[1.4cqw] text-center font-mono text-[2cqw] text-[var(--vm-text)]">
        <span>30</span>
        <span>60</span>
        <span>90</span>
      </div>
      <div className="relative flex flex-1 flex-col justify-around">
        <span className="absolute inset-y-0 left-1/3 w-px bg-[var(--vm-soft)]" />
        <span className="absolute inset-y-0 left-2/3 w-px bg-[var(--vm-soft)]" />
        {rows.map((r, i) => (
          <div key={i} className="relative h-[4.5cqw]">
            <span
              className={cn(
                "absolute inset-y-0 origin-left animate-vm-grow-x rounded-full",
                r.accent ? "bg-[#c6f24e]" : "bg-[var(--vm-line)]",
              )}
              style={{ left: r.left, width: r.w, ...delay(i * 0.4) }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

function Spec() {
  return (
    <div className="mx-auto flex h-full w-[78%] flex-col gap-[1.6cqw] rounded-t-[1.6cqw] bg-[var(--vm-soft)] p-[3cqw]">
      <div className="flex items-center justify-between">
        <Line w="45%" className="h-[2.2cqw] bg-[var(--vm-strong)] opacity-80" />
        <span className="rounded-full bg-[#c6f24e] px-[1.6cqw] py-[0.6cqw] text-[1.8cqw] font-semibold text-[#0c0c0d]">MVP</span>
      </div>
      <Line w="90%" />
      <Line w="70%" />
      <div className="mt-[1cqw] space-y-[1.6cqw]">
        {[0.3, 1, 1.7, 2.4].map((d, i) => (
          <div key={d} className="flex items-center gap-[1.4cqw]">
            <span className="relative grid size-[2.8cqw] place-items-center rounded-[0.6cqw] border border-[var(--vm-line)]">
              <span className="absolute inset-0 grid animate-vm-pop place-items-center rounded-[0.6cqw] bg-[#c6f24e] text-[#0c0c0d]" style={delay(d)}>
                <Check className="size-[2cqw]" />
              </span>
            </span>
            <Line w={["55%", "70%", "40%", "62%"][i]} />
          </div>
        ))}
      </div>
    </div>
  );
}

function Visual({ visual, ai }: { visual: VideoVisual; ai: string }) {
  switch (visual) {
    case "ads":
      return <Ads />;
    case "content":
      return <Content />;
    case "chat":
      return <Chat />;
    case "workflow":
      return <Workflow ai={ai} />;
    case "agent":
      return <Agent />;
    case "prompt":
      return <PromptEditor />;
    case "dashboard":
      return <Dashboard />;
    case "calculator":
      return <Calculator />;
    case "roadmap":
      return <Roadmap />;
    case "spec":
      return <Spec />;
  }
}

export function VideoMock({
  visual,
  palette,
  ai,
  topLeft,
  topRight,
  play = true,
  className,
}: {
  visual: VideoVisual;
  palette: Palette;
  ai: string;
  topLeft: ReactNode;
  topRight?: ReactNode;
  play?: boolean;
  className?: string;
}) {
  const p = palettes[palette];
  return (
    <div className={cn("@container relative aspect-video overflow-hidden", p.bg, className)}>
      <div aria-hidden className="grain absolute inset-0" />
      <div className="absolute inset-x-[4cqw] top-[3.5cqw] z-10 flex items-center justify-between gap-[2cqw] text-[2.4cqw] font-medium">
        <span className={cn("rounded-full px-[2cqw] py-[0.9cqw] backdrop-blur", p.chip)}>{topLeft}</span>
        {topRight && <span className={cn("rounded-full px-[2cqw] py-[0.9cqw] backdrop-blur", p.chip)}>{topRight}</span>}
      </div>
      <div
        aria-hidden
        className="absolute inset-x-[7cqw] bottom-0 top-[13cqw] rounded-t-[2.6cqw] border border-b-0 border-white/10 bg-[var(--vm-window)] p-[3cqw] text-[var(--vm-text)] shadow-2xl shadow-black/30 transition-transform duration-500 group-hover:-translate-y-[1cqw]"
        style={p.vars}
      >
        <div className="relative h-full">
          <Visual visual={visual} ai={ai} />
        </div>
      </div>
      {play && (
      <span
        aria-hidden
        className="absolute left-1/2 top-[56%] z-10 grid size-[13cqw] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white/85 text-[#0c0c0d] shadow-xl ring-[1.4cqw] ring-white/25 backdrop-blur transition-transform duration-300 group-hover:scale-110"
      >
        <Play className="ml-[0.6cqw] size-[4.6cqw] fill-current" />
      </span>
      )}
    </div>
  );
}
