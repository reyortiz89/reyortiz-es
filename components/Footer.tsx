/**
 * Site footer with a closing call to action, sitemap links and contact details
 */
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { Container } from "./Container";

const columns = [
  {
    title: "Web",
    links: [
      { label: "Sobre mí", href: "/about" },
      { label: "Servicios", href: "/services" },
      { label: "Experiencia", href: "/work" },
      { label: "Blog", href: "/blog" },
    ],
  },
  {
    title: "Contacto",
    links: [
      { label: "Escríbeme", href: "/contact" },
      { label: "LinkedIn", href: profile.social.linkedin },
      { label: "GitHub", href: profile.social.github },
      { label: "RSS del blog", href: "/blog/rss.xml" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative isolate mt-24 overflow-hidden border-t border-(--border)">
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-80 w-[60rem] -translate-x-1/2 rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--glow), transparent)" }}
      />
      <Container>
        <div className="grid gap-12 py-16 md:grid-cols-12">
          <div className="md:col-span-6">
            <p className="font-display text-3xl font-semibold leading-tight tracking-tight text-(--text) sm:text-4xl">
              ¿Tienes un proyecto de IA en mente?
            </p>
            <p className="mt-3 max-w-md">
              Cuéntame en qué punto estás. Te respondo con próximos pasos concretos en menos de 48 horas.
            </p>
            <Link
              href="/contact"
              className="group mt-6 inline-flex items-center gap-2 rounded-xl bg-(--accent) px-5 py-3 text-sm font-medium text-white transition hover:text-white hover:shadow-[0_8px_24px_-6px_var(--accent)]"
            >
              Agenda una conversación
              <ArrowUpRight size={16} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="md:col-span-3">
              <p className="font-mono text-xs uppercase tracking-wider text-(--muted)">{col.title}</p>
              <ul className="mt-4 grid gap-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.href}>
                    {l.href.startsWith("http") ? (
                      <a href={l.href} target="_blank" rel="noopener noreferrer" className="text-(--text)">
                        {l.label}
                      </a>
                    ) : (
                      <Link href={l.href} className="text-(--text)">
                        {l.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="flex flex-col gap-2 border-t border-(--border) py-6 text-xs text-(--muted) sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs">
            © {year} {profile.identity.name} · {profile.identity.location}
          </p>
          <a href={`mailto:${profile.identity.email}`} className="hover:text-(--accent)">
            {profile.identity.email}
          </a>
        </div>
      </Container>
    </footer>
  );
}
