"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type Theme = "light" | "dark";

type ThemeContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getPreferredTheme(): Theme {
  if (typeof window === "undefined") return "light";

  const stored = window.localStorage.getItem("theme");
  if (stored === "light" || stored === "dark") return stored;

  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)")?.matches;
  return prefersDark ? "dark" : "light";
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Initialize with "light" to match SSR output and avoid hydration mismatch
  const [theme, setThemeState] = useState<Theme>("light");

  const applyThemeToDom = useCallback((next: Theme) => {
    document.documentElement.dataset.theme = next;
  }, []);

  const setTheme = useCallback(
    (next: Theme) => {
      setThemeState(next);

      try {
        window.localStorage.setItem("theme", next);
      } catch {
        // ignore
      }

      applyThemeToDom(next);
    },
    [applyThemeToDom]
  );

  const toggleTheme = useCallback(() => {
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  // Sync with localStorage/preference after hydration completes
  // This needs to run only once after the component mounts to avoid hydration mismatches
  useEffect(() => {
    const actualTheme = getPreferredTheme();
    if (actualTheme !== "light") {
      setThemeState(actualTheme);
      applyThemeToDom(actualTheme);
    }
    // Run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return (
    <ThemeContext.Provider value={value}>
      {/* Suppress hydration warnings for theme attribute changes */}
      <div suppressHydrationWarning>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return ctx;
}
