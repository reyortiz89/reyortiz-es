import { ArrowUpRight, CalendarDays } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";

/**
 * The booking page (Closevibe agenda) embedded in the site, with a link to open
 * it in a new tab in case the visitor prefers it or the embed is blocked.
 */
export async function BookingEmbed({ className }: { className?: string }) {
  const t = await getTranslations("booking");
  return (
    <div
      id="agenda"
      className={cn(
        "scroll-mt-28 overflow-hidden rounded-[2rem] border border-border bg-surface shadow-2xl shadow-black/5",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 border-b border-border px-5 py-3.5">
        <p className="flex items-center gap-2 text-sm font-medium text-foreground">
          <CalendarDays className="size-4 text-accent-ink" aria-hidden />
          {t("title")}
        </p>
        <a
          href={site.bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-foreground"
        >
          {t("open")}
          <ArrowUpRight className="size-3.5" aria-hidden />
        </a>
      </div>
      <iframe
        src={site.bookingUrl}
        title={t("title")}
        loading="lazy"
        className="block h-[720px] w-full bg-surface sm:h-[680px]"
        allow="clipboard-write; payment"
      />
    </div>
  );
}
