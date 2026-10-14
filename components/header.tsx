"use client";

import { ArrowUpRight, Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Link, usePathname } from "@/i18n/navigation";
import type { Pathname } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { BookCallButton } from "./book-call";
import { LocaleSwitcher } from "./locale-switcher";
import { ThemeToggle } from "./theme-toggle";

const items = [
  { href: "/services", key: "services" },
  { href: "/cases", key: "cases" },
  { href: "/resources", key: "resources" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const satisfies readonly { href: Pathname; key: string }[];

export function Brand({ className }: { className?: string }) {
  return (
    <span className={cn("flex items-center gap-2.5 font-medium tracking-tight text-foreground", className)}>
      <span className="grid size-8 place-items-center rounded-full bg-foreground text-background">
        <span className="font-display text-lg leading-none">R</span>
      </span>
      <span className="whitespace-nowrap text-[15px]">
        Rey Ortiz<span className="text-accent-ink">.</span>
      </span>
    </span>
  );
}

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Close the mobile menu whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-full focus:bg-foreground focus:px-4 focus:py-2 focus:text-background"
      >
        {t("skip")}
      </a>
      <div
        className={cn(
          "mx-auto flex h-14 w-full max-w-6xl items-center justify-between gap-3 rounded-full border pl-4 pr-2 transition-all duration-300 sm:pl-5",
          scrolled || open
            ? "border-border bg-background/80 shadow-lg shadow-black/[0.04] backdrop-blur-xl"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="/" aria-label="Rey Ortiz" onClick={() => setOpen(false)}>
          <Brand />
        </Link>

        <nav aria-label="Main" className="hidden items-center lg:flex">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? "page" : undefined}
              className={cn(
                "relative rounded-full px-3.5 py-2 text-sm transition-colors",
                isActive(item.href) ? "text-foreground" : "text-muted hover:text-foreground",
              )}
            >
              {t(item.key)}
              {isActive(item.href) && (
                <span aria-hidden className="absolute inset-x-3.5 -bottom-0.5 h-px bg-foreground" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <LocaleSwitcher className="max-sm:hidden" />
          <ThemeToggle />
          <BookCallButton className="px-4 py-2.5 max-md:hidden">{t("cta")}</BookCallButton>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full bg-foreground text-background lg:hidden"
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
        <div
          id="mobile-nav"
          className="mx-auto mt-2 max-w-6xl overflow-y-auto rounded-3xl border border-border bg-background p-3 shadow-2xl lg:hidden"
          style={{ maxHeight: "calc(100dvh - 6rem)" }}
        >
          <nav aria-label="Mobile" className="flex flex-col">
            {items.map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center justify-between border-b border-border px-3 py-4 text-2xl font-medium tracking-tight text-foreground last:border-0"
              >
                <span>
                  <span className="mr-3 font-mono text-xs text-muted">0{i + 1}</span>
                  {t(item.key)}
                </span>
                <ArrowUpRight className="size-5 text-muted transition-transform group-hover:rotate-45" aria-hidden />
              </Link>
            ))}
          </nav>
          <div className="mt-3 flex items-center justify-between gap-3 px-1">
            <LocaleSwitcher />
            <BookCallButton className="flex-1">{t("cta")}</BookCallButton>
          </div>
        </div>
      )}
    </header>
  );
}
