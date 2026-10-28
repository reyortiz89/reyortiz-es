"use client";

/**
 * Fixed left sidebar (as on Rey's original site): photo, name, social links and the
 * section navigation with a Services submenu. On the home page the active item follows
 * the scroll position; on small screens the sidebar slides in from a toggle button.
 */
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import {
  ChevronDown,
  FileText,
  House,
  Images,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Moon,
  Newspaper,
  Server,
  Sun,
  User,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { site } from "@/data/site";
import { useTheme } from "../ThemeProvider";

const sections = [
  { id: "hero", label: site.nav.home, icon: House },
  { id: "about", label: site.nav.about, icon: User },
  { id: "resume", label: site.nav.resume, icon: FileText },
  { id: "portfolio", label: site.nav.portfolio, icon: Images },
  { id: "services", label: site.nav.services, icon: Server },
  { id: "contact", label: site.nav.contact, icon: Mail },
] as const;

export function Sidebar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { theme, toggleTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("hero");
  const [servicesOpen, setServicesOpen] = useState(pathname.startsWith("/services"));

  // Scrollspy: highlight the section whose top is closest above the middle of the screen.
  useEffect(() => {
    if (!isHome) return;
    const els = sections.map((s) => document.getElementById(s.id)).filter(Boolean) as HTMLElement[];
    const onScroll = () => {
      const y = window.scrollY + window.innerHeight * 0.4;
      let current = "hero";
      for (const el of els) if (el.offsetTop <= y) current = el.id;
      setActive(current);
    };
    const first = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(first);
      window.removeEventListener("scroll", onScroll);
    };
  }, [isHome]);

  const activeId = isHome ? active : pathname.startsWith("/services") ? "services" : null;
  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls="site-sidebar"
        aria-label={open ? "Close menu" : "Open menu"}
        className="fixed right-4 top-4 z-[60] inline-flex h-11 w-11 items-center justify-center rounded-full bg-(--accent-2) text-white shadow-lg xl:hidden"
      >
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            key="scrim"
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
          />
        ) : null}
      </AnimatePresence>

      <header
        id="site-sidebar"
        className={
          "fixed inset-y-0 left-0 z-50 flex w-[300px] flex-col overflow-y-auto bg-(--sidebar) px-4 py-6 text-(--sidebar-text) transition-transform duration-300 xl:translate-x-0 " +
          (open ? "translate-x-0" : "-translate-x-full")
        }
      >
        <div className="relative mx-auto h-[120px] w-[120px]">
          <span aria-hidden className="absolute -inset-1 animate-[spin_8s_linear_infinite] rounded-full bg-[conic-gradient(from_0deg,var(--accent-2),transparent_40%,var(--accent-2))] opacity-80" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={encodeURI(site.identity.photo)}
            alt={site.identity.name}
            width={120}
            height={120}
            className="relative h-[120px] w-[120px] rounded-full border-[6px] border-(--sidebar) object-cover"
          />
        </div>

        <Link href="/" onClick={close} className="mt-4 text-center font-display text-2xl font-bold text-white hover:text-white">
          {site.identity.name}
        </Link>

        <div className="mt-4 flex justify-center gap-2">
          {[
            { href: site.identity.linkedin, label: "LinkedIn", icon: Linkedin, external: true },
            { href: `mailto:${site.identity.email}`, label: "Email", icon: Mail, external: false },
            { href: site.identity.whatsapp, label: "WhatsApp", icon: MessageCircle, external: true },
          ].map((s) => (
            <a
              key={s.label}
              href={s.href}
              aria-label={s.label}
              target={s.external ? "_blank" : undefined}
              rel={s.external ? "noopener noreferrer" : undefined}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition hover:-translate-y-0.5 hover:bg-(--accent-2) hover:text-white"
            >
              <s.icon size={16} />
            </a>
          ))}
        </div>

        <nav aria-label="Main" className="mt-8 flex-1">
          <ul className="grid gap-1">
            {sections.map((s) => {
              const isActive = activeId === s.id;
              const href = isHome ? `#${s.id}` : `/#${s.id}`;
              const linkClass =
                "relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-[15px] transition-colors " +
                (isActive ? "text-white" : "hover:text-white");
              const inner = (
                <>
                  {isActive ? (
                    <motion.span
                      layoutId="sidebar-active"
                      className="absolute inset-0 rounded-xl bg-white/[0.07]"
                      transition={{ type: "spring", stiffness: 420, damping: 36 }}
                    />
                  ) : null}
                  <s.icon size={18} className={"relative " + (isActive ? "text-(--accent-2)" : "")} />
                  <span className="relative">{s.label}</span>
                </>
              );

              if (s.id === "services") {
                return (
                  <li key={s.id}>
                    <div className="flex items-center">
                      <a href={href} onClick={close} className={linkClass + " flex-1"}>
                        {inner}
                      </a>
                      <button
                        type="button"
                        onClick={() => setServicesOpen((o) => !o)}
                        aria-expanded={servicesOpen}
                        aria-label="Show services"
                        className="mr-1 inline-flex h-8 w-8 items-center justify-center rounded-lg hover:bg-white/10 hover:text-white"
                      >
                        <ChevronDown size={16} className={"transition-transform " + (servicesOpen ? "rotate-180" : "")} />
                      </button>
                    </div>
                    <AnimatePresence initial={false}>
                      {servicesOpen ? (
                        <motion.ul
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="ml-7 overflow-hidden border-l border-white/10"
                        >
                          {site.services.items.map((svc) => {
                            const current = pathname === `/services/${svc.slug}`;
                            return (
                              <li key={svc.slug}>
                                <Link
                                  href={`/services/${svc.slug}`}
                                  onClick={close}
                                  aria-current={current ? "page" : undefined}
                                  className={
                                    "block px-4 py-2 text-sm leading-snug transition-colors " +
                                    (current ? "text-(--accent-2)" : "hover:text-white")
                                  }
                                >
                                  {svc.title}
                                </Link>
                              </li>
                            );
                          })}
                        </motion.ul>
                      ) : null}
                    </AnimatePresence>
                  </li>
                );
              }

              return (
                <li key={s.id}>
                  <a href={href} onClick={close} className={linkClass} aria-current={isActive ? "true" : undefined}>
                    {inner}
                  </a>
                </li>
              );
            })}
            <li>
              <Link
                href="/blog"
                onClick={close}
                className={
                  "relative flex items-center gap-3 rounded-xl px-4 py-2.5 text-[15px] transition-colors " +
                  (pathname.startsWith("/blog") ? "bg-white/[0.07] text-white" : "hover:text-white")
                }
              >
                <Newspaper size={18} className={pathname.startsWith("/blog") ? "text-(--accent-2)" : ""} />
                Blog
              </Link>
            </li>
          </ul>
        </nav>

        <button
          type="button"
          onClick={toggleTheme}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2 text-sm transition hover:border-white/30 hover:text-white"
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
        >
          {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
          {theme === "dark" ? "Light" : "Dark"}
        </button>
      </header>
    </>
  );
}

