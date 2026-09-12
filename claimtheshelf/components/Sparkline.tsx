export function Sparkline({ values, color = "#ff5a1f" }: { values: number[]; color?: string }) {
  const max = Math.max(1, ...values);
  return (
    <div className="flex items-end gap-1 h-11">
      {values.map((v, i) => (
        <div key={i} className="flex-1 rounded-sm" style={{ height: `${Math.max(4, (v / max) * 100)}%`, backgroundColor: color, opacity: 0.85 }} title={String(v)} />
      ))}
    </div>
  );
}
