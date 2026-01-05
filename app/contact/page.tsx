"use client";

import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { PageShell } from "@/components/PageShell";
import { useState } from "react";

export const metadata: Metadata = {
  title: `Contact | ${profile.identity.name}`,
  description: `Contact ${profile.identity.name}.`,
};

export default function ContactPage() {
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSending(true);
    setStatus("idle");
    setErrorMessage("");

    const form = e.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      message: String(formData.get("message") || "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await res.json().catch(() => null)) as null | { ok?: boolean; error?: string };

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || "Failed to send message");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Failed to send message");
    } finally {
      setIsSending(false);
    }
  }

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
            onSubmit={onSubmit}
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
                  required
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
                  required
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
                  required
                />
              </div>

              <div className="flex items-center justify-between gap-3">
                <p className="text-xs text-(--muted)">
                  {status === "success" && "Message sent. Ill reply soon."}
                  {status === "error" && (errorMessage || "Something went wrong. Try again.")}
                  {status === "idle" && "Messages are sent via email."}
                </p>
                <button
                  className="inline-flex h-11 items-center justify-center rounded-xl border border-[color-mix(in_srgb,var(--accent)_80%,var(--border))] bg-(--accent) px-5 text-sm font-medium text-white shadow-sm transition hover:bg-[color-mix(in_srgb,var(--accent)_90%,#000)] disabled:cursor-not-allowed disabled:opacity-60"
                  type="submit"
                  disabled={isSending}
                >
                  {isSending ? "Sending..." : "Send"}
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </PageShell>
  );
}
