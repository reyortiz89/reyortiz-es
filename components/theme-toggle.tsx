"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

const order = ["light", "dark", "system"] as const;
type Mode = (typeof order)[number];

const icons = { light: Sun, dark: Moon, system: Monitor } satisfies Record<Mode, unknown>;

// True only after hydration, so the server and first client render match.
function useMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const t = useTranslations("theme");
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const current: Mode = mounted && order.includes(theme as Mode) ? (theme as Mode) : "system";
  const next = order[(order.indexOf(current) + 1) % order.length];
  const Icon = icons[current];

  return (
    <button
      type="button"
      onClick={() => setTheme(next)}
      className="inline-flex size-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-foreground"
      aria-label={`${t("label")}: ${t(current)} → ${t(next)}`}
      title={`${t("label")}: ${t(current)}`}
    >
      <Icon className="size-[18px]" aria-hidden />
    </button>
  );
}
