"use client";

import { CheckCircle2, Loader2, Send } from "lucide-react";
import Script from "next/script";
import { useLocale, useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { Link } from "@/i18n/navigation";
import { companySizes } from "@/lib/lead-schema";
import { cn } from "@/lib/cn";
import { buttonVariants } from "./ui";

type Status = "idle" | "sending" | "success" | "error" | "rate_limited" | "invalid";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

const inputClass =
  "mt-2 block w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted/70 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring aria-invalid:border-danger";

export function ContactForm({
  email,
  interests,
}: {
  email: string;
  interests: { value: string; label: string }[];
}) {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<string[]>([]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const search = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries([...search.entries()].filter(([k]) => k.startsWith("utm_")));

    setStatus("sending");
    setInvalid([]);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone"),
          company: data.get("company"),
          companySize: data.get("companySize"),
          interest: data.get("interest"),
          message: data.get("message"),
          consent: data.get("consent") === "on",
          website: data.get("website") || undefined,
          turnstileToken: data.get("cf-turnstile-response") || undefined,
          locale,
          source: "contact",
          pageUrl: window.location.href,
          utm,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: string[] };
      if (res.ok && json.ok) {
        setStatus("success");
        form.reset();
      } else if (json.error === "invalid") {
        setInvalid(json.fields ?? []);
        setStatus("invalid");
      } else if (json.error === "rate_limited") {
        setStatus("rate_limited");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex gap-3 rounded-2xl border border-success/40 bg-success/10 p-6 text-foreground">
        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden />
        <p>{t("success")}</p>
      </div>
    );
  }

  const bad = (name: string) => invalid.includes(name) || undefined;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="block text-sm font-medium">
          {t("name")}
          <input name="name" required minLength={2} autoComplete="name" aria-invalid={bad("name")} className={inputClass} />
        </label>
        <label className="block text-sm font-medium">
          {t("email")}
          <input name="email" type="email" required autoComplete="email" aria-invalid={bad("email")} className={inputClass} />
        </label>
        <label className="block text-sm font-medium">
          {t("phone")} <span className="font-normal text-muted">({t("optional")})</span>
          <input name="phone" type="tel" autoComplete="tel" aria-invalid={bad("phone")} className={inputClass} />
        </label>
        <label className="block text-sm font-medium">
          {t("company")} <span className="font-normal text-muted">({t("optional")})</span>
          <input name="company" autoComplete="organization" className={inputClass} />
        </label>
        <label className="block text-sm font-medium">
          {t("companySize")} <span className="font-normal text-muted">({t("optional")})</span>
          <select name="companySize" defaultValue="" className={inputClass}>
            <option value="">—</option>
            {companySizes.map((s) => (
              <option key={s} value={s}>
                {t(`sizes.${s}`)}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm font-medium">
          {t("interest")}
          <select name="interest" defaultValue="" className={inputClass}>
            <option value="">—</option>
            {interests.map((i) => (
              <option key={i.value} value={i.value}>
                {i.label}
              </option>
            ))}
            <option value="other">{t("interestOther")}</option>
          </select>
        </label>
      </div>

      <label className="block text-sm font-medium">
        {t("message")}
        <textarea
          name="message"
          required
          minLength={10}
          rows={5}
          placeholder={t("messagePlaceholder")}
          aria-invalid={bad("message")}
          className={inputClass}
        />
      </label>

      {/* Honeypot, hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className="flex items-start gap-3 text-sm text-muted">
        <input
          name="consent"
          type="checkbox"
          required
          aria-invalid={bad("consent")}
          className="mt-0.5 size-4 rounded border-border accent-[var(--primary)]"
        />
        <span>
          {t.rich("consent", {
            link: (chunks) => (
              <Link
                href={{ pathname: "/legal/[slug]", params: { slug: "privacidad" } }}
                className="text-primary underline underline-offset-2"
              >
                {chunks}
              </Link>
            ),
          })}
        </span>
      </label>

      {turnstileSiteKey && (
        <>
          <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer />
          <div className="cf-turnstile" data-sitekey={turnstileSiteKey} data-language={locale} />
        </>
      )}

      {(status === "error" || status === "invalid" || status === "rate_limited") && (
        <p role="alert" className="text-sm text-danger">
          {status === "invalid" ? t("invalid") : status === "rate_limited" ? t("rateLimited") : t("error", { email })}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className={cn(buttonVariants.primary, "w-full sm:w-auto")}>
        {status === "sending" ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <Send className="size-4" aria-hidden />
        )}
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
