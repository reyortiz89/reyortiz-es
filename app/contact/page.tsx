import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: `Contact | ${profile.identity.name}`,
  description: `Contact ${profile.identity.name}.`,
};

export default function ContactPage() {
  return (
    <PageShell
      title="Contact"
      description="For projects, consulting, or collaboration, share a short brief and Ill reply with next steps."
    >
      <div className="grid gap-10 md:grid-cols-12">
        <section className="md:col-span-5" aria-labelledby="contact-details">
          <h2 id="contact-details" className="text-xl font-semibold tracking-tight text-(--text)">
            Details
          </h2>

          <div className="mt-6 rounded-2xl border border-(--border) bg-(--surface) p-6 text-sm shadow-sm">
            <ul className="space-y-4">
              <li>
                <p className="font-medium text-(--text)">Email</p>
                <a className="mt-1 block text-(--muted) hover:text-(--accent)" href={`mailto:${profile.identity.email}`}>
                  {profile.identity.email}
                </a>
              </li>
              <li>
                <p className="font-medium text-(--text)">WhatsApp</p>
                <a className="mt-1 block text-(--muted) hover:text-(--accent)" href="#">
                  Placeholder link
                </a>
              </li>
              <li>
                <p className="font-medium text-(--text)">LinkedIn</p>
                <a className="mt-1 block text-(--muted) hover:text-(--accent)" href="#">
                  Placeholder link
                </a>
              </li>
              <li>
                <p className="font-medium text-(--text)">Location</p>
                <p className="mt-1 text-(--muted)">{profile.identity.location}</p>
              </li>
            </ul>
          </div>

          <p className="mt-6 text-sm leading-7 text-(--muted)">
            If you prefer, email is the fastest path. For urgent asks, WhatsApp is acceptable.
          </p>
        </section>

        <section className="md:col-span-7" aria-labelledby="contact-form">
          <h2 id="contact-form" className="text-xl font-semibold tracking-tight text-(--text)">
            Message
          </h2>

          <form
            className="mt-6 rounded-2xl border border-(--border) bg-(--surface) p-6 shadow-sm"
            action="#"
            method="post"
          >
            <div className="grid gap-5">
              <div>
                <label className="text-sm font-medium text-(--text)" htmlFor="name">
                  Name
                </label>
                <input
                  className="mt-2 w-full rounded-xl border border-(--border) bg-[color-mix(in_srgb,var(--bg)_85%,var(--surface))] px-3 py-3 text-sm text-(--text) shadow-sm focus:outline-none focus-visible:shadow-[0_0_0_4px_var(--ring)]"
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-(--text)" htmlFor="email">
                  Email
                </label>
                <input
                  className="mt-2 w-full rounded-xl border border-(--border) bg-[color-mix(in_srgb,var(--bg)_85%,var(--surface))] px-3 py-3 text-sm text-(--text) shadow-sm focus:outline-none focus-visible:shadow-[0_0_0_4px_var(--ring)]"
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-(--text)" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="mt-2 min-h-40 w-full resize-y rounded-xl border border-(--border) bg-[color-mix(in_srgb,var(--bg)_85%,var(--surface))] px-3 py-3 text-sm text-(--text) shadow-sm focus:outline-none focus-visible:shadow-[0_0_0_4px_var(--ring)]"
                  id="message"
                  name="message"
                  rows={6}
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-(--muted)">No backend yet  UI only.</p>
                <button
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-[color-mix(in_srgb,var(--accent)_80%,var(--border))] bg-(--accent) px-5 text-sm font-medium text-white shadow-sm transition hover:bg-[color-mix(in_srgb,var(--accent)_90%,#000)]"
                  type="submit"
                >
                  Send
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </PageShell>
  );
}
