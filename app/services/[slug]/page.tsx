import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, CheckCircle2, ChevronRight } from "lucide-react";
import { site } from "@/data/site";

type Params = { slug: string };

function findService(slug: string) {
  return site.services.items.find((s) => s.slug === slug);
}

export function generateStaticParams(): Params[] {
  return site.services.items.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const service = findService((await params).slug);
  if (!service) return {};
  return {
    title: service.title,
    description: service.intro,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServicePage({ params }: { params: Promise<Params> }) {
  const service = findService((await params).slug);
  if (!service) notFound();

  return (
    <>
      <header className="relative isolate overflow-hidden bg-(--sidebar) py-14 text-white">
        <div aria-hidden className="dot-grid absolute inset-0 -z-10 opacity-60 [--dot:rgba(255,255,255,0.1)]" />
        <div aria-hidden className="absolute -right-24 -top-24 -z-10 h-72 w-72 rounded-full bg-(--accent-2) opacity-30 blur-3xl" />
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-6 sm:px-10 lg:flex-row lg:items-center lg:justify-between">
          <h1 className="animate-[hero-in_0.7s_ease-out_both] text-3xl font-bold sm:text-4xl">{service.title}</h1>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1 text-sm text-white/70">
              <li>
                <Link href="/" className="hover:text-white">{site.nav.home}</Link>
              </li>
              <li aria-hidden><ChevronRight size={14} /></li>
              <li aria-current="page" className="text-white">Service</li>
            </ol>
          </nav>
        </div>
      </header>

      <section className="py-16">
        <div className="mx-auto grid max-w-6xl gap-10 px-6 sm:px-10 lg:grid-cols-3">
          <aside className="reveal lg:sticky lg:top-8 lg:self-start">
            <nav aria-label={site.nav.services} className="flex flex-col gap-2 rounded-3xl border border-(--border) bg-(--surface) p-4">
              {site.services.items.map((s) => {
                const active = s.slug === service.slug;
                return (
                  <Link
                    key={s.slug}
                    href={`/services/${s.slug}`}
                    aria-current={active ? "page" : undefined}
                    className={
                      "group flex items-center justify-between gap-3 rounded-xl px-4 py-3 text-[15px] font-medium transition " +
                      (active
                        ? "bg-(--accent-2) text-white hover:text-white"
                        : "text-(--text) hover:bg-(--bg) hover:pl-5")
                    }
                  >
                    {s.title}
                    <ChevronRight size={16} className={active ? "" : "opacity-0 transition-opacity group-hover:opacity-100"} />
                  </Link>
                );
              })}
            </nav>
            <h2 className="mt-8 text-xl font-bold text-(--text)">{service.tagline}</h2>
            <p className="mt-3">{service.intro}</p>
          </aside>

          <div className="lg:col-span-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/services.jpg" alt="" className="reveal w-full rounded-3xl object-cover shadow-lg" />
            <div className="mt-8 space-y-5">
              {service.blocks.map((b, i) => {
                if (b.type === "heading")
                  return <h2 key={i} className="reveal pt-2 text-2xl font-bold text-(--text)">{b.text}</h2>;
                if (b.type === "list")
                  return (
                    <ul key={i} className="reveal space-y-3">
                      {b.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <CheckCircle2 size={20} className="mt-0.5 shrink-0 text-(--accent-2)" />
                          <span className="text-(--muted)">{item}</span>
                        </li>
                      ))}
                    </ul>
                  );
                return <p key={i} className="reveal">{b.text}</p>;
              })}
            </div>

            <section aria-labelledby="related-title" className="reveal mt-10 rounded-3xl border border-(--border) bg-(--surface) p-6 sm:p-8">
              <h2 id="related-title" className="text-xl font-bold text-(--text)">{service.related.title}</h2>
              <p className="mt-2 text-sm">{service.related.note}</p>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {service.related.items.map((r) => (
                  <li key={r.slug}>
                    <Link
                      href={`/?case=${r.slug}#portfolio`}
                      className="group block h-full rounded-2xl border border-(--border) bg-(--bg) p-5 transition hover:-translate-y-1 hover:border-(--accent-2) hover:shadow-lg"
                    >
                      <span className="flex items-start justify-between gap-2">
                        <span className="font-bold text-(--text) group-hover:text-(--accent)">{r.name}</span>
                        <ArrowUpRight size={16} className="mt-1 shrink-0 text-(--accent-2) transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-(--muted)">{r.summary}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </div>
      </section>
    </>
  );
}
