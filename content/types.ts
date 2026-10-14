import type { Locale } from "@/i18n/routing";

/** A string written in both site languages. */
export type L = Record<Locale, string>;
export type LList = Record<Locale, string[]>;

export function tr<T>(value: Record<Locale, T>, locale: Locale): T {
  return value[locale];
}
