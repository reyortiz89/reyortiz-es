/**
 * Site header: sliding active-page indicator, ⌘K command menu, theme toggle and mobile menu
 */
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Menu, Moon, Search, Sun, X } from "lucide-react";
import { useState } from "react";
import { profile } from "@/data/profile";
import { Container } from "./Container";
import { useTheme } from "./ThemeProvider";
import { CommandMenu, type CommandItem } from "./ui/CommandMenu";

const navItems = [
  { label: "Inicio", href: "/" },
  { label: "Sobre mí", href: "/about" },
  { label: "Servicios", href: "/services" },
  { label: "Experiencia", href: "/work" },
  { label: "Blog", href: "/blog" },
];

const commandItems: CommandItem[] = [
  ...navItems.map((i) => ({ ...i, group: "Páginas" })),
  { label: "Contacto", href: "/contact", group: "Páginas", hint: "Cuéntame tu proyecto" },
  { label: "LinkedIn", href: profile.social.linkedin, group: "Redes" },
  { label: "GitHub", href: profile.social.github, group: "Redes" },
];

export function Navbar() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const [hovered, setHovered] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [commandOpen, setCommandOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));
  const highlighted = hovered ?? navItems.find((i) => isActive(i.href))?.href ?? null;

  return (
    <header className="sticky top-0 z-50 border-b border-(--border) bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] backdrop-blur-xl">
      <Container>
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="group inline-flex items-center gap-3" aria-label="Inicio">
            <span className="relative inline-flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-(--text) font-display text-sm font-bold tracking-tight text-(--bg)">
              RO
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
            </span>
            <span className="hidden leading-tight sm:block">
              <span className="block text-sm font-semibold tracking-tight text-(--text)">
                {profile.identity.name}
              </span>
              <span className="block text-xs text-(--muted)">{profile.identity.title}</span>
            </span>
          </Link>

          <nav className="hidden md:block" aria-label="Principal">
            <ul className="flex items-center" onMouseLeave={() => setHovered(null)}>
              {navItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.href} className="relative">
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      onMouseEnter={() => setHovered(item.href)}
                      className={
                        "relative z-10 inline-flex px-3.5 py-2 text-sm transition-colors " +
                        (active ? "text-(--text)" : "text-(--muted) hover:text-(--text)")
                      }
                    >
                      {item.label}
                    </Link>
                    {highlighted === item.href ? (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute inset-0 rounded-xl bg-(--surface-2)"
                        transition={{ type: "spring", stiffness: 450, damping: 35 }}
                      />
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setCommandOpen(true)}
              className="hidden h-10 items-center gap-2 rounded-xl border border-(--border) bg-(--surface) px-3 text-sm text-(--muted) transition hover:text-(--text) lg:inline-flex"
              aria-label="Buscar (Ctrl+K)"
            >
              <Search size={15} />
              <kbd className="font-mono text-[11px]">⌘K</kbd>
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-(--border) bg-(--surface) text-(--text) transition hover:-translate-y-px hover:shadow-md"
              aria-label={theme === "dark" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={theme}
                  initial={{ rotate: -90, scale: 0.5, opacity: 0 }}
                  animate={{ rotate: 0, scale: 1, opacity: 1 }}
                  exit={{ rotate: 90, scale: 0.5, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>

            <Link
              href="/contact"
              className="hidden h-10 items-center justify-center rounded-xl bg-(--accent) px-4 text-sm font-medium text-white shadow-sm transition hover:-translate-y-px hover:text-white hover:shadow-[0_8px_24px_-6px_var(--accent)] sm:inline-flex"
            >
              Hablemos
            </Link>

            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-(--border) bg-(--surface) text-(--text) md:hidden"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Cerrar menú" : "Abrir menú"}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </Container>

      <AnimatePresence>
        {mobileOpen ? (
          <motion.nav
            id="mobile-menu"
            aria-label="Principal móvil"
            className="overflow-hidden border-t border-(--border) md:hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <Container>
              <ul className="grid gap-1 py-4">
                {[...navItems, { label: "Contacto", href: "/contact" }].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i }}
                  >
                    <Link
                      href={item.href}
                      aria-current={isActive(item.href) ? "page" : undefined}
                      onClick={() => setMobileOpen(false)}
                      className={
                        "block rounded-xl px-3 py-3 text-base " +
                        (isActive(item.href) ? "bg-(--surface-2) text-(--text)" : "text-(--muted)")
                      }
                    >
                      {item.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </Container>
          </motion.nav>
        ) : null}
      </AnimatePresence>

      <CommandMenu items={commandItems} open={commandOpen} onOpenChange={setCommandOpen} />
    </header>
  );
}
