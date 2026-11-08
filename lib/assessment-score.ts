import type { Assessment } from "@/content/assessments";
import type { Locale } from "@/i18n/routing";

/** Answers keyed by question id (scored 0–3) or context id (option index). */
export type Answers = Record<string, number>;

export type AssessmentResult = {
  score: number;
  level: { label: string; text: string };
  /** 1–5 for the maturity assessment. */
  levelNumber: number;
  areas: { key: string; label: string; score: number; advice: string }[];
  /** Lowest-scoring practices, most urgent first. */
  priorities: string[];
  /** Only for the automation audit, when the context questions were answered. */
  estimate?: { hoursMonth: number; eurosYear: number };
};

/** Hourly cost used for the savings estimate. Shown next to the figure. */
export const HOURLY_COST = 25;

const pct = (sum: number, count: number) => (count ? Math.round((sum / (count * 3)) * 100) : 0);

export function scoreAssessment(assessment: Assessment, answers: Answers, locale: Locale): AssessmentResult {
  const scored = assessment.questions.filter((q) => typeof answers[q.id] === "number");
  const score = pct(
    scored.reduce((s, q) => s + clamp(answers[q.id]), 0),
    assessment.questions.length,
  );

  const areas = assessment.areas.map((area) => {
    const qs = assessment.questions.filter((q) => q.area === area.key);
    return {
      key: area.key,
      label: area.label[locale],
      score: pct(qs.reduce((s, q) => s + clamp(answers[q.id] ?? 0), 0), qs.length),
      advice: area.advice[locale],
    };
  });

  const level = [...assessment.levels].reverse().find((l) => score >= l.min) ?? assessment.levels[0];
  const levelNumber = assessment.levels.indexOf(level) + 1;

  const priorities = assessment.questions
    .map((q, i) => ({ q, i, value: clamp(answers[q.id] ?? 0) }))
    .filter(({ value }) => value < 3)
    .sort((a, b) => a.value - b.value || a.i - b.i)
    .slice(0, 5)
    .map(({ q }) => q.priority[locale]);

  let estimate: AssessmentResult["estimate"];
  const people = assessment.context?.find((c) => c.id === "people")?.options[answers.people]?.value;
  const hours = assessment.context?.find((c) => c.id === "hours")?.options[answers.hours]?.value;
  if (people && hours) {
    // Between 30 % (already automated) and 80 % (fully manual) of repetitive work can usually be automated.
    const automatable = 0.3 + 0.5 * (1 - score / 100);
    const hoursMonth = Math.max(5, Math.round((people * hours * 4.33 * automatable) / 5) * 5);
    estimate = { hoursMonth, eurosYear: Math.round((hoursMonth * 12 * HOURLY_COST) / 100) * 100 };
  }

  return {
    score,
    level: { label: level.label[locale], text: level.text[locale] },
    levelNumber,
    areas,
    priorities,
    estimate,
  };
}

function clamp(value: number) {
  return Math.max(0, Math.min(3, Math.round(value)));
}
