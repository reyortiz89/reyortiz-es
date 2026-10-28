export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
}: {
  eyebrow: string;
  title: string;
  description?: string;
  as?: "h2" | "h3";
}) {
  return (
    <div className="max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-(--accent)">{eyebrow}</p>
      <Tag className="mt-3 text-3xl font-semibold tracking-tight text-(--text) sm:text-4xl">{title}</Tag>
      {description ? <p className="mt-3 text-lg">{description}</p> : null}
    </div>
  );
}
