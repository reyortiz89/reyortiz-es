import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/data/profile";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: `Services | ${profile.identity.name}`,
  description: `Services offered by ${profile.identity.name}.`,
};

const REQUIRED_SERVICE_ORDER = [
  "Project Operations Officer",
  "Website Development & Custom Development",
  "Business Consultancy in Automation & Digitalization",
  "Marketing (Technical & GTM Support)",
  "Presales Lead",
];

export default function ServicesPage() {
  const servicesByName = new Map(profile.services.map((s) => [s.name, s] as const));
  const services = REQUIRED_SERVICE_ORDER.map((name) => servicesByName.get(name)).filter(Boolean);

  return (
    <PageShell
      title="Services"
      description="Outcome-oriented support across presales leadership, delivery operations, and technical execution."
    >
      <section aria-labelledby="services-list">
        <h2 id="services-list" className="sr-only">
          Services
        </h2>

        <div className="grid gap-6 md:grid-cols-2">
          {services.map((service) => {
            if (!service) return null;

            return (
              <article
                key={service.id}
                className="rounded-2xl border border-(--border) bg-(--surface) p-6 shadow-sm transition hover:-translate-y-px hover:shadow-md"
              >
                <header>
                  <p className="text-xs font-semibold tracking-wide text-(--muted)">Service</p>
                  <h3 className="mt-2 text-lg font-semibold tracking-tight text-(--text)">
                    {service.outcome}
                  </h3>
                  <p className="mt-2 text-sm font-medium text-(--text)">{service.name}</p>
                  <p className="mt-4 text-sm leading-7 text-(--muted)">{service.description}</p>
                </header>

                <div className="mt-6 grid gap-6">
                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-(--text)">
                      Typical deliverables
                    </h4>
                    <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-(--muted)">
                      {service.deliverables.map((d, i) => (
                        <li key={i}>{d}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-xs font-semibold tracking-wide text-(--text)">Who it’s for</h4>
                    <p className="mt-3 text-sm leading-7 text-(--muted)">{service.audience}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <section className="mt-14 border-t border-(--border) pt-10" aria-labelledby="services-cta">
        <h2 id="services-cta" className="text-xl font-semibold tracking-tight text-(--text)">
          Contact
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-7 text-(--muted)">
          If you want to explore one of these service areas, share your context and constraints.
          We’ll align on scope and next steps.
        </p>
        <p className="mt-6">
          <Link
            href="/contact"
            className="inline-flex h-11 items-center justify-center rounded-xl border border-[color-mix(in_srgb,var(--accent)_80%,var(--border))] bg-(--accent) px-5 text-sm font-medium text-white shadow-sm transition hover:bg-[color-mix(in_srgb,var(--accent)_90%,#000)]"
          >
            Contact
          </Link>
        </p>
      </section>
    </PageShell>
  );
}
