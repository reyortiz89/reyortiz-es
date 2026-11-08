"use client";

import { ArrowLeft, ArrowRight, Check, Lock, Mail, RotateCcw } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Assessment } from "@/content/assessments";
import { getService } from "@/content/services";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import { scoreAssessment, HOURLY_COST, type Answers } from "@/lib/assessment-score";
import { cn } from "@/lib/cn";
import { BookCallButton } from "./book-call";
import { LeadCaptureForm } from "./lead-capture-form";
import { RadarChart } from "./radar-chart";

type Step = { id: string; eyebrow: string; text: string; options: string[] };

const letters = ["A", "B", "C", "D"];

export function AssessmentRunner({ assessment }: { assessment: Assessment }) {
  const t = useTranslations("assessments");
  const locale = useLocale() as Locale;
  const [answers, setAnswers] = useState<Answers>({});
  const [step, setStep] = useState(0);
  const [unlockedFor, setUnlockedFor] = useState<string | null>(null);
  const top = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const steps: Step[] = useMemo(
    () => [
      ...assessment.questions.map((q) => ({
        id: q.id,
        eyebrow: assessment.areas.find((a) => a.key === q.area)?.label[locale] ?? "",
        text: q.text[locale],
        options: q.options.map((o) => o.label[locale]),
      })),
      ...(assessment.context ?? []).map((c) => ({
        id: c.id,
        eyebrow: t("context"),
        text: c.text[locale],
        options: c.options.map((o) => o.label[locale]),
      })),
    ],
    [assessment, locale, t],
  );

  const done = step >= steps.length;
  const result = useMemo(() => (done ? scoreAssessment(assessment, answers, locale) : null), [done, assessment, answers, locale]);

  useEffect(() => () => clearTimeout(timer.current), []);

  function choose(index: number) {
    const current = steps[step];
    // Questions store the option's score; context questions store the option index.
    const question = assessment.questions.find((q) => q.id === current.id);
    setAnswers((a) => ({ ...a, [current.id]: question ? question.options[index].score : index }));
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      setStep((s) => s + 1);
      if (step + 1 >= steps.length) top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 220);
  }

  function restart() {
    setAnswers({});
    setStep(0);
    setUnlockedFor(null);
    top.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const service = getService(assessment.service);

  if (!done) {
    const current = steps[step];
    const selected = answers[current.id];
    const question = assessment.questions.find((q) => q.id === current.id);
    const isSelected = (i: number) =>
      selected !== undefined && (question ? question.options[i].score === selected : i === selected);

    return (
      <div ref={top} className="scroll-mt-28 rounded-[2rem] border border-border bg-surface p-6 shadow-2xl shadow-black/5 sm:p-10">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="font-medium text-accent-ink">{current.eyebrow}</span>
          <span className="tabular-nums text-muted">{t("questionOf", { current: step + 1, total: steps.length })}</span>
        </div>
        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-surface-2">
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-500"
            style={{ width: `${(step / steps.length) * 100}%` }}
          />
        </div>

        <fieldset key={current.id} className="mt-10 animate-[fade-up_0.4s_ease-out]">
          <legend className="text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl">{current.text}</legend>
          <div className="mt-8 grid gap-3">
            {current.options.map((label, i) => (
              <button
                key={label}
                type="button"
                role="radio"
                aria-checked={isSelected(i)}
                onClick={() => choose(i)}
                className={cn(
                  "group flex items-center gap-4 rounded-2xl border px-4 py-4 text-left transition-all sm:px-5",
                  isSelected(i)
                    ? "border-foreground bg-foreground text-background"
                    : "border-border bg-background hover:-translate-y-0.5 hover:border-foreground/30",
                )}
              >
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-lg font-mono text-xs transition-colors",
                    isSelected(i) ? "bg-accent text-accent-foreground" : "bg-surface-2 text-muted group-hover:text-foreground",
                  )}
                >
                  {isSelected(i) ? <Check className="size-4" aria-hidden /> : letters[i]}
                </span>
                <span className="leading-snug">{label}</span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-8 flex items-center justify-between">
          <button
            type="button"
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground disabled:opacity-0"
          >
            <ArrowLeft className="size-4" aria-hidden />
            {t("back")}
          </button>
          {selected !== undefined && (
            <button
              type="button"
              onClick={() => setStep((s) => s + 1)}
              className="inline-flex items-center gap-2 text-sm font-medium text-foreground"
            >
              {t("next")}
              <ArrowRight className="size-4" aria-hidden />
            </button>
          )}
        </div>
      </div>
    );
  }

  if (!result) return null;
  const weakest = [...result.areas].sort((a, b) => a.score - b.score).slice(0, 2);
  const ring = 2 * Math.PI * 52;

  return (
    <div ref={top} className="scroll-mt-28 space-y-4">
      {/* Score */}
      <div className="grid gap-8 rounded-[2rem] border border-border bg-surface p-6 sm:p-10 lg:grid-cols-[auto_1fr] lg:items-center">
        <div className="relative mx-auto size-44">
          <svg viewBox="0 0 120 120" className="size-44 -rotate-90">
            <circle cx="60" cy="60" r="52" fill="none" stroke="var(--surface-2)" strokeWidth="10" />
            <circle
              cx="60"
              cy="60"
              r="52"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={ring}
              strokeDashoffset={ring * (1 - result.score / 100)}
              className="transition-[stroke-dashoffset] duration-1000"
            />
          </svg>
          <div className="absolute inset-0 grid place-items-center text-center">
            <div>
              <p className="text-5xl font-medium tracking-[-0.04em]">{result.score}</p>
              <p className="text-xs text-muted">{t("outOf")}</p>
            </div>
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">{t("resultTitle")}</p>
          <h2 className="mt-2 text-3xl font-medium tracking-tight sm:text-4xl">{result.level.label}</h2>
          <p className="mt-3 max-w-xl text-pretty text-lg leading-relaxed text-muted">{result.level.text}</p>
        </div>
      </div>

      {/* Areas */}
      <div className="grid gap-4 lg:grid-cols-2">
        {assessment.kind === "maturity" && (
          <div className="rounded-[2rem] border border-border bg-surface p-6 sm:p-8">
            <RadarChart items={result.areas} className="mx-auto w-full max-w-md" />
          </div>
        )}
        <div className={cn("rounded-[2rem] border border-border bg-surface p-6 sm:p-8", assessment.kind === "audit" && "lg:col-span-2")}>
          <p className="text-xs uppercase tracking-[0.16em] text-muted">{t("byArea")}</p>
          <ul className={cn("mt-6 grid gap-5", assessment.kind === "audit" && "lg:grid-cols-2 lg:gap-x-12")}>
            {result.areas.map((area) => (
              <li key={area.key}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium">{area.label}</span>
                  <span className="tabular-nums text-muted">{area.score}</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-surface-2">
                  <div
                    className={cn("h-full rounded-full", area.score < 50 ? "bg-foreground/30" : "bg-accent")}
                    style={{ width: `${Math.max(3, area.score)}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Full report, unlocked with the lead form */}
      {!unlockedFor ? (
        <div className="relative overflow-hidden rounded-[2rem] bg-ink p-6 text-ink-foreground sm:p-10">
          <div aria-hidden className="grain absolute inset-0" />
          <div aria-hidden className="absolute -right-24 -top-24 size-72 rounded-full bg-accent/25 blur-3xl" />
          <div className="relative grid gap-10 lg:grid-cols-2">
            <div>
              <span className="grid size-11 place-items-center rounded-2xl bg-accent text-accent-foreground">
                <Lock className="size-5" aria-hidden />
              </span>
              <h2 className="mt-6 text-3xl font-medium tracking-tight sm:text-4xl">{t("gateTitle")}</h2>
              <p className="mt-3 text-pretty text-lg leading-relaxed text-ink-foreground/70">{t("gateText")}</p>
              <ul className="mt-6 space-y-3">
                {(t.raw(assessment.kind === "audit" ? "gateItemsAudit" : "gateItemsMaturity") as string[]).map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <Check className="size-4 shrink-0 text-accent" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl bg-background p-6 text-foreground">
              <LeadCaptureForm
                source={`assessment:${assessment.slug}`}
                submitLabel={t("gateSubmit")}
                company
                compact
                extra={{ assessment: { slug: assessment.slug, answers } }}
                onSuccess={(lead) => setUnlockedFor(lead.email)}
              />
            </div>
          </div>
        </div>
      ) : (
        <>
          <p className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-5 py-4 text-sm">
            <Mail className="size-4 shrink-0 text-accent-ink" aria-hidden />
            {t("emailed", { email: unlockedFor })}
          </p>

          <div className="grid gap-4 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-border bg-surface p-6 sm:p-8">
              <p className="text-xs uppercase tracking-[0.16em] text-muted">{t("priorities")}</p>
              <ol className="mt-6 space-y-4">
                {result.priorities.map((p, i) => (
                  <li key={p} className="flex items-start gap-4">
                    <span className="font-display text-3xl leading-none text-accent-ink">{i + 1}</span>
                    <span className="pt-1 text-lg leading-snug">{p}</span>
                  </li>
                ))}
              </ol>
            </div>
            <div className="space-y-4">
              {result.estimate && (
                <div className="rounded-[2rem] bg-accent p-6 text-accent-foreground sm:p-8">
                  <p className="text-xs uppercase tracking-[0.16em] text-accent-foreground/70">{t("estimateTitle")}</p>
                  <p className="mt-4 text-5xl font-medium tracking-[-0.04em]">
                    {t("hoursMonth", { hours: result.estimate.hoursMonth })}
                  </p>
                  <p className="mt-2 text-xl">
                    {t("eurosYear", { amount: result.estimate.eurosYear.toLocaleString(locale === "es" ? "es-ES" : "en-US") })}
                  </p>
                  <p className="mt-4 text-sm text-accent-foreground/70">{t("estimateNote", { cost: HOURLY_COST })}</p>
                </div>
              )}
              <div className="rounded-[2rem] border border-border bg-surface p-6 sm:p-8">
                <p className="text-xs uppercase tracking-[0.16em] text-muted">{t("whereToStart")}</p>
                <div className="mt-5 space-y-4">
                  {weakest.map((area) => (
                    <p key={area.key} className="text-pretty leading-relaxed">
                      <strong className="font-medium">{area.label}.</strong>{" "}
                      <span className="text-muted">{area.advice}</span>
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start justify-between gap-6 rounded-[2rem] border border-border bg-surface p-6 sm:flex-row sm:items-center sm:p-8">
            <div>
              <p className="text-xl font-medium tracking-tight">{t("reviewTitle")}</p>
              <p className="mt-1 text-muted">{t("reviewText")}</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <BookCallButton>{t("reviewCta")}</BookCallButton>
              {service && (
                <Link
                  href={{ pathname: "/services/[slug]", params: { slug: service.slug } }}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3.5 text-sm font-medium transition-colors hover:border-foreground/30"
                >
                  {service.title[locale]}
                </Link>
              )}
            </div>
          </div>
        </>
      )}

      <button
        type="button"
        onClick={restart}
        className="inline-flex items-center gap-2 px-1 py-2 text-sm text-muted transition-colors hover:text-foreground"
      >
        <RotateCcw className="size-4" aria-hidden />
        {t("restart")}
      </button>
    </div>
  );
}
