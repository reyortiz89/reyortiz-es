import { Plus } from "lucide-react";

export type AccordionItem = { question: string; answer: string };

/**
 * FAQ accordion on native <details>, so answers are in the HTML for search engines
 * and it works without JavaScript. The open/close height animates via CSS
 * (interpolate-size) where supported.
 */
export function Accordion({ items }: { items: AccordionItem[] }) {
  return (
    <div className="divide-y divide-(--border) rounded-2xl border border-(--border) bg-(--surface)">
      {items.map((item) => (
        <details
          key={item.question}
          className="group px-6 [interpolate-size:allow-keywords] [&::details-content]:h-0 [&::details-content]:overflow-hidden [&::details-content]:transition-all [&::details-content]:duration-300 [&[open]::details-content]:h-auto"
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-left font-medium text-(--text) [&::-webkit-details-marker]:hidden">
            {item.question}
            <Plus
              size={18}
              className="shrink-0 text-(--muted) transition-transform duration-300 group-open:rotate-45"
            />
          </summary>
          <p className="pb-5 text-sm">{item.answer}</p>
        </details>
      ))}
    </div>
  );
}
