/**
 * Section heading in the style of the original site: title with an accent rule, then the intro.
 */
export function SectionTitle({ title, intro, id }: { title: string; intro?: string; id?: string }) {
  return (
    <div className="reveal mb-12 max-w-3xl">
      <h2 id={id} className="relative pb-4 text-3xl font-bold text-(--text) sm:text-4xl">
        {title}
        <span aria-hidden className="absolute bottom-0 left-0 h-[3px] w-14 rounded-full bg-(--accent-2)" />
      </h2>
      {intro ? <p className="mt-5 text-base leading-8">{intro}</p> : null}
    </div>
  );
}
