"use client";

import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import type { Pathname } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";
import { buttonVariants } from "./ui";

const items = [
  { href: "/services", key: "services" },
  { href: "/cases", key: "cases" },
  { href: "/resources", key: "resources" },
  { href: "/about", key: "about" },
] as const satisfies readonly { href: Pathname; key: string }[];

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-md focus:bg-primary focus:px-3 focus:py-2 focus:text-primary-foreground"
      >
        {t("skip")}
      </a>
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight text-foreground">
          <span className="grid size-8 place-items-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            RO
          </span>
          <span className="whitespace-nowrap">Rey Ortiz</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 md:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium transition-colors",
                isActive(item.href) ? "text-foreground" : "text-muted hover:text-foreground",
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher className="max-sm:hidden" />
          <ThemeToggle />
          <Link href="/contact" className={cn(buttonVariants.primary, "px-4 py-2 max-md:hidden")}>
            {t("cta")}
          </Link>
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-full text-foreground hover:bg-surface-2 md:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("close") : t("menu")}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" aria-hidden /> : <Menu className="size-5" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="h-[calc(100dvh-4rem)] border-t border-border bg-background md:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1 px-4 py-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-3 py-3 text-lg font-medium text-foreground hover:bg-surface-2"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link href="/contact" className={cn(buttonVariants.primary, "mt-4")}>
              {t("cta")}
            </Link>
            <LocaleSwitcher className="mt-6 self-start" />
          </nav>
        </div>
      )}
    </header>
  );
}
