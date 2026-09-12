export function Stat({ value, label, accent = false }: { value: string | number; label: string; accent?: boolean }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className={`font-bold text-xl leading-none ${accent ? "text-orange" : ""}`}>{typeof value === "number" ? value.toLocaleString("en-US") : value}</span>
      <span className="text-[11px] uppercase tracking-wider opacity-60">{label}</span>
    </div>
  );
}
