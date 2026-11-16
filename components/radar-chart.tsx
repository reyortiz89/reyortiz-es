/** Radar chart for 0–100 scores. Pure SVG, themed with CSS variables. */
export function RadarChart({ items, className }: { items: { label: string; score: number }[]; className?: string }) {
  const size = 320;
  const c = size / 2;
  const r = 110;
  const n = items.length;
  const point = (i: number, value: number) => {
    const angle = (Math.PI * 2 * i) / n - Math.PI / 2;
    return [c + Math.cos(angle) * r * (value / 100), c + Math.sin(angle) * r * (value / 100)] as const;
  };
  const polygon = (value: (i: number) => number) =>
    items.map((_, i) => point(i, value(i)).join(",")).join(" ");

  return (
    <svg viewBox={`-70 -10 ${size + 140} ${size + 20}`} className={className} role="img" aria-label={items.map((i) => `${i.label}: ${i.score}`).join(", ")}>
      {[25, 50, 75, 100].map((ring) => (
        <polygon key={ring} points={polygon(() => ring)} fill="none" stroke="var(--border)" strokeWidth="1" />
      ))}
      {items.map((_, i) => {
        const [x, y] = point(i, 100);
        return <line key={i} x1={c} y1={c} x2={x} y2={y} stroke="var(--border)" strokeWidth="1" />;
      })}
      <polygon
        points={polygon((i) => Math.max(4, items[i].score))}
        fill="color-mix(in srgb, var(--accent) 45%, transparent)"
        stroke="var(--accent-ink)"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {items.map((item, i) => {
        const [x, y] = point(i, Math.max(4, item.score));
        return <circle key={i} cx={x} cy={y} r="4" fill="var(--accent-ink)" />;
      })}
      {items.map((item, i) => {
        const [x, y] = point(i, 122);
        const anchor = Math.abs(x - c) < 4 ? "middle" : x > c ? "start" : "end";
        return (
          <text
            key={item.label}
            x={x}
            y={y}
            textAnchor={anchor}
            dominantBaseline="middle"
            fontSize="13"
            fill="var(--muted)"
          >
            {item.label}
          </text>
        );
      })}
    </svg>
  );
}
