"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Linkedin, Loader2, Mail, MapPin, MessageCircle, Send } from "lucide-react";
import { profile } from "@/data/profile";

export function ContactForm() {
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
      // Server errors are technical and in English; the UI shows its own Spanish message.
      console.error(err);
      setErrorMessage("");
    } finally {
      setIsSending(false);
    }
  }

  const whatsapp = `https://wa.me/${profile.identity.phone.replace(/\D/g, "")}`;
  const channels = [
    { icon: Mail, label: "Email", value: profile.identity.email, href: `mailto:${profile.identity.email}` },
    { icon: MessageCircle, label: "WhatsApp", value: profile.identity.phone, href: whatsapp },
    { icon: Linkedin, label: "LinkedIn", value: "Conectemos", href: profile.social.linkedin },
    { icon: MapPin, label: "Ubicación", value: profile.identity.location },
  ];
  const field =
    "mt-2 w-full rounded-xl border border-(--border) bg-(--bg) px-4 py-3 text-sm text-(--text) transition placeholder:text-(--muted) focus:border-(--accent) focus:outline-none focus-visible:shadow-[0_0_0_4px_var(--ring)]";

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <section className="lg:col-span-5" aria-labelledby="contact-details">
        <h2 id="contact-details" className="text-xl font-semibold tracking-tight text-(--text)">
          Otras formas de contacto
        </h2>
        <ul className="mt-6 grid gap-3">
          {channels.map((c) => {
            const content = (
              <>
                <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[color-mix(in_srgb,var(--accent)_12%,transparent)] text-(--accent)">
                  <c.icon size={18} />
                </span>
                <span className="min-w-0">
                  <span className="block text-sm font-medium text-(--text)">{c.label}</span>
                  <span className="block truncate text-sm text-(--muted)">{c.value}</span>
                </span>
              </>
            );
            return (
              <li key={c.label}>
                {c.href ? (
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="flex items-center gap-4 rounded-2xl border border-(--border) bg-(--surface) p-4 transition hover:-translate-y-px hover:border-[color-mix(in_srgb,var(--accent)_40%,var(--border))]"
                  >
                    {content}
                  </a>
                ) : (
                  <div className="flex items-center gap-4 rounded-2xl border border-(--border) bg-(--surface) p-4">{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="lg:col-span-7" aria-labelledby="contact-form">
        <h2 id="contact-form" className="text-xl font-semibold tracking-tight text-(--text)">
          Escríbeme
        </h2>

        <AnimatePresence mode="wait" initial={false}>
          {status === "success" ? (
            <motion.div
              key="success"
              role="status"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6 flex flex-col items-center rounded-2xl border border-(--border) bg-(--surface) px-6 py-14 text-center"
            >
              <svg viewBox="0 0 52 52" className="h-16 w-16" aria-hidden>
                <motion.circle
                  cx="26" cy="26" r="24" fill="none" stroke="var(--success)" strokeWidth="3"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.5 }}
                />
                <motion.path
                  d="M15 27l7 7 15-15" fill="none" stroke="var(--success)" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.35 }}
                />
              </svg>
              <p className="mt-5 text-lg font-semibold text-(--text)">Mensaje enviado</p>
              <p className="mt-1 text-sm">Gracias. Te respondo en menos de 48 horas.</p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm font-medium text-(--accent)"
              >
                Enviar otro mensaje
              </button>
            </motion.div>
          ) : (
            <motion.form
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-6 grid gap-5 rounded-2xl border border-(--border) bg-(--surface) p-6 sm:p-8"
              onSubmit={onSubmit}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-(--text)" htmlFor="name">
                    Nombre
                  </label>
                  <input className={field} id="name" name="name" type="text" autoComplete="name" placeholder="Tu nombre" required />
                </div>
                <div>
                  <label className="text-sm font-medium text-(--text)" htmlFor="email">
                    Email
                  </label>
                  <input className={field} id="email" name="email" type="email" autoComplete="email" placeholder="tu@empresa.com" required />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-(--text)" htmlFor="message">
                  ¿En qué te puedo ayudar?
                </label>
                <textarea
                  className={field + " min-h-40 resize-y"}
                  id="message"
                  name="message"
                  rows={6}
                  placeholder="Cuéntame tu empresa, el reto y en qué plazo te gustaría avanzar."
                  required
                />
              </div>

              <motion.div
                className="flex flex-wrap items-center justify-between gap-3"
                animate={status === "error" ? { x: [0, -8, 8, -5, 5, 0] } : { x: 0 }}
                transition={{ duration: 0.4 }}
              >
                <p className={"text-xs " + (status === "error" ? "text-red-500" : "text-(--muted)")} role={status === "error" ? "alert" : undefined}>
                  {status === "error"
                    ? errorMessage || "No se pudo enviar. Inténtalo de nuevo o escríbeme por email."
                    : "Respondo personalmente a cada mensaje."}
                </p>
                <button
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-(--accent) px-6 text-sm font-medium text-white transition hover:-translate-y-px hover:shadow-[0_10px_30px_-8px_var(--accent)] disabled:cursor-not-allowed disabled:opacity-60"
                  type="submit"
                  disabled={isSending}
                >
                  {isSending ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                  {isSending ? "Enviando…" : "Enviar mensaje"}
                </button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
