"use client";

/**
 * Contact section: the three info items from the original site and the message form,
 * which posts to /api/contact (name, email, subject, message).
 */
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { site } from "@/data/site";
import { SectionTitle } from "./SectionTitle";

const infoIcons = [MapPin, Phone, Mail];

function infoHref(label: string, value: string) {
  if (label.startsWith("Call")) return `tel:${value.replace(/\s+/g, "")}`;
  if (label.startsWith("Email")) return `mailto:${value}`;
  return undefined;
}

const inputClass =
  "peer w-full rounded-xl border border-(--border) bg-(--bg) px-4 pb-2.5 pt-6 text-(--text) outline-none transition placeholder:text-transparent focus:border-(--accent-2) focus:shadow-[0_0_0_4px_var(--ring)]";
const labelClass =
  "pointer-events-none absolute left-4 top-2 text-xs font-medium text-(--muted) transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-[15px] peer-focus:top-2 peer-focus:text-xs peer-focus:text-(--accent-2)";

export function Contact() {
  const { contact } = site;
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => null)) as null | { ok?: boolean; error?: string };
      if (!res.ok || !json?.ok) throw new Error(json?.error || "Failed to send message");
      form.reset();
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Failed to send message");
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="py-24">
      <div className="mx-auto max-w-6xl px-6 sm:px-10">
        <SectionTitle id="contact-title" title={contact.title} />

        <div className="grid gap-8 lg:grid-cols-5">
          <ul className="reveal space-y-4 rounded-3xl border border-(--border) bg-(--surface) p-7 lg:col-span-2">
            {contact.info.map((item, i) => {
              const Icon = infoIcons[i] ?? Mail;
              const href = infoHref(item.label, item.value);
              const body = (
                <>
                  <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-(--glow) text-(--accent-2) transition-colors duration-300 group-hover:bg-(--accent-2) group-hover:text-white">
                    <Icon size={20} />
                  </span>
                  <span>
                    <span className="block text-lg font-bold text-(--text)">{item.label}</span>
                    <span className="block text-[15px] text-(--muted)">{item.value}</span>
                  </span>
                </>
              );
              return (
                <li key={item.label}>
                  {href ? (
                    <a href={href} className="group flex items-center gap-4 rounded-2xl p-2 hover:bg-(--bg)">
                      {body}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-4 p-2">{body}</div>
                  )}
                </li>
              );
            })}
          </ul>

          <div className="reveal relative overflow-hidden rounded-3xl border border-(--border) bg-(--surface) p-7 lg:col-span-3">
            <form onSubmit={onSubmit} className="grid gap-4 sm:grid-cols-2">
              <div className="relative">
                <input id="name" name="name" required placeholder=" " autoComplete="name" className={inputClass} />
                <label htmlFor="name" className={labelClass}>{contact.fields.name}</label>
              </div>
              <div className="relative">
                <input id="email" name="email" type="email" required placeholder=" " autoComplete="email" className={inputClass} />
                <label htmlFor="email" className={labelClass}>{contact.fields.email}</label>
              </div>
              <div className="relative sm:col-span-2">
                <input id="subject" name="subject" required placeholder=" " className={inputClass} />
                <label htmlFor="subject" className={labelClass}>{contact.fields.subject}</label>
              </div>
              <div className="relative sm:col-span-2">
                <textarea id="message" name="message" required rows={7} placeholder=" " className={inputClass + " resize-y"} />
                <label htmlFor="message" className={labelClass}>{contact.fields.message}</label>
              </div>

              <div className="flex flex-col items-center gap-3 sm:col-span-2">
                {status === "error" ? (
                  <p role="alert" className="text-sm text-red-500">{error}</p>
                ) : null}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex items-center gap-2 rounded-full bg-(--accent-2) px-8 py-3 font-semibold text-white shadow-lg shadow-(--glow) transition hover:-translate-y-0.5 hover:bg-(--accent) disabled:opacity-70"
                >
                  {status === "sending" ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />}
                  {contact.submit}
                </button>
              </div>
            </form>

            <AnimatePresence>
              {status === "sent" ? (
                <motion.div
                  role="status"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-(--surface) p-8 text-center"
                >
                  <motion.span initial={{ scale: 0.4 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
                    <CheckCircle2 size={56} className="text-(--success)" />
                  </motion.span>
                  <p className="text-lg font-semibold text-(--text)">{contact.sent}</p>
                  <button type="button" onClick={() => setStatus("idle")} className="text-sm text-(--accent) underline">
                    OK
                  </button>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
