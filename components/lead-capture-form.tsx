"use client";

import { ArrowRight, Loader2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState, type FormEvent } from "react";
import { site } from "@/content/site";
import { Link } from "@/i18n/navigation";
import { companySizes } from "@/lib/lead-schema";
import { cn } from "@/lib/cn";
import { inputClass } from "./contact-form";
import { Turnstile, turnstileToken } from "./turnstile";
import { buttonVariants } from "./ui";

type Status = "idle" | "sending" | "error" | "rate_limited" | "invalid";

/**
 * Short lead form used by the assessments and the video library. Posts to
 * /api/leads with the given `source` and any extra payload (e.g. answers).
 */
export function LeadCaptureForm({
  source,
  submitLabel,
  phone = "optional",
  company = false,
  extra,
  onSuccess,
  compact = false,
}: {
  source: string;
  submitLabel: string;
  phone?: "required" | "optional" | "hidden";
  company?: boolean;
  extra?: Record<string, unknown>;
  onSuccess: (lead: { name: string; email: string }) => void;
  compact?: boolean;
}) {
  const t = useTranslations("contact.form");
  const locale = useLocale();
  const [status, setStatus] = useState<Status>("idle");
  const [invalid, setInvalid] = useState<string[]>([]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const search = new URLSearchParams(window.location.search);
    const utm = Object.fromEntries([...search.entries()].filter(([k]) => k.startsWith("utm_")));
    const lead = { name: String(data.get("name") ?? "").trim(), email: String(data.get("email") ?? "").trim() };

    // Flag every missing field at once; the server validates again.
    const missing = [
      lead.name.length < 2 && "name",
      !/^\S+@\S+\.\S+$/.test(lead.email) && "email",
      phone === "required" && String(data.get("phone") ?? "").replace(/\D/g, "").length < 6 && "phone",
      data.get("consent") !== "on" && "consent",
    ].filter((f): f is string => Boolean(f));
    if (missing.length) {
      setInvalid(missing);
      setStatus("invalid");
      return;
    }

    setStatus("sending");
    setInvalid([]);
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...lead,
          phone: data.get("phone") ?? undefined,
          company: data.get("company") ?? undefined,
          companySize: data.get("companySize") ?? undefined,
          consent: data.get("consent") === "on",
          website: data.get("website") || undefined,
          turnstileToken: turnstileToken(data),
          locale,
          source,
          pageUrl: window.location.href,
          utm,
          ...extra,
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; fields?: string[] };
      if (res.ok && json.ok) {
        setStatus("idle");
        onSuccess(lead);
      } else if (json.error === "invalid") {
        setInvalid(json.fields ?? []);
        setStatus("invalid");
      } else {
        setStatus(json.error === "rate_limited" ? "rate_limited" : "error");
      }
    } catch {
      setStatus("error");
    }
  }

  const bad = (name: string) => invalid.includes(name) || undefined;
  const field = cn(inputClass, compact && "mt-1.5 py-3");
  const label = "block text-sm font-medium text-foreground";

  return (
    <form onSubmit={onSubmit} noValidate className={compact ? "space-y-3.5" : "space-y-5"}>
      <div className={cn("grid gap-3.5", !compact && "gap-5 sm:grid-cols-2")}>
        <label className={label}>
          {t("name")}
          <input name="name" required minLength={2} autoComplete="name" aria-invalid={bad("name")} className={field} />
        </label>
        <label className={label}>
          {t("email")}
          <input name="email" type="email" required autoComplete="email" aria-invalid={bad("email")} className={field} />
        </label>
        {phone !== "hidden" && (
          <label className={label}>
            {t("phone")}{" "}
            {phone === "optional" && <span className="font-normal text-muted">({t("optional")})</span>}
            <input
              name="phone"
              type="tel"
              required={phone === "required"}
              autoComplete="tel"
              placeholder="+34 600 000 000"
              aria-invalid={bad("phone")}
              className={field}
            />
          </label>
        )}
        {company && (
          <>
            <label className={label}>
              {t("company")} <span className="font-normal text-muted">({t("optional")})</span>
              <input name="company" autoComplete="organization" className={field} />
            </label>
            <label className={label}>
              {t("companySize")} <span className="font-normal text-muted">({t("optional")})</span>
              <select name="companySize" defaultValue="" className={field}>
                <option value="">—</option>
                {companySizes.map((s) => (
                  <option key={s} value={s}>
                    {t(`sizes.${s}`)}
                  </option>
                ))}
              </select>
            </label>
          </>
        )}
      </div>

      {/* Honeypot, hidden from people and assistive tech. */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <label className={cn("flex items-start gap-3 text-xs leading-relaxed text-muted", bad("consent") && "text-danger")}>
        <input
          name="consent"
          type="checkbox"
          required
          aria-invalid={bad("consent")}
          className="mt-0.5 size-4 shrink-0 rounded border-border accent-[var(--foreground)]"
        />
        <span>
          {t.rich("consent", {
            link: (chunks) => (
              <Link
                href={{ pathname: "/legal/[slug]", params: { slug: "privacidad" } }}
                target="_blank"
                className="text-foreground underline underline-offset-2"
              >
                {chunks}
              </Link>
            ),
          })}
        </span>
      </label>

      <Turnstile locale={locale} />

      {status !== "idle" && status !== "sending" && (
        <p role="alert" className="text-sm text-danger">
          {status === "invalid" ? t("invalid") : status === "rate_limited" ? t("rateLimited") : t("error", { email: site.email })}
        </p>
      )}

      <button type="submit" disabled={status === "sending"} className={cn(buttonVariants.primary, "w-full py-4")}>
        {status === "sending" ? t("sending") : submitLabel}
        {status === "sending" ? (
          <Loader2 className="size-4 animate-spin" aria-hidden />
        ) : (
          <ArrowRight className="size-4" aria-hidden />
        )}
      </button>
    </form>
  );
}
