/**
 * Infinite horizontal ticker. Items are rendered twice so the loop is seamless;
 * the copy is hidden from assistive tech. Pauses on hover and with reduced motion.
 */
export function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul className="flex shrink-0 items-center gap-10 pr-10" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-center gap-10 whitespace-nowrap font-display text-lg font-medium tracking-tight text-(--muted)"
        >
          {item}
          <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-(--accent)" />
        </li>
      ))}
    </ul>
  );

  return (
    <div className="marquee overflow-hidden py-2">
      <div className="marquee-track">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
