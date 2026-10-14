"use client";

import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useTransition } from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LocaleSwitcher({ className }: { className?: string }) {
  const t = useTranslations("locale");
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams();
  const [pending, startTransition] = useTransition();

  function switchTo(next: Locale) {
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- params always match the current pathname
        { pathname, params },
        { locale: next },
      );
    });
  }

  return (
    <div
      role="group"
      aria-label={t("label")}
      className={cn("inline-flex rounded-full border border-border p-0.5 text-xs font-semibold", className)}
    >
      {routing.locales.map((l) => (
        <button
          key={l}
          type="button"
          lang={l}
          disabled={pending}
          aria-pressed={l === locale}
          aria-label={t(l)}
          onClick={() => l !== locale && switchTo(l)}
          className={cn(
            "rounded-full px-2.5 py-1 uppercase transition-colors",
            l === locale ? "bg-foreground text-background" : "text-muted hover:text-foreground",
          )}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
