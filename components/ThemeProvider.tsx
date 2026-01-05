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
  // Initialize with undefined to read from DOM after hydration
  const [theme, setThemeState] = useState<Theme | undefined>(undefined);
  const [mounted, setMounted] = useState(false);

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
    if (!theme) return;
    setTheme(theme === "dark" ? "light" : "dark");
  }, [setTheme, theme]);

  // Read the theme from DOM after hydration to match what ThemeScript set
  useEffect(() => {
    const currentTheme = (document.documentElement.dataset.theme as Theme) || getPreferredTheme();
    setThemeState(currentTheme);
    setMounted(true);
  }, []);

  const value = useMemo(() => ({ 
    theme: theme || "light", 
    setTheme, 
    toggleTheme 
  }), [theme, setTheme, toggleTheme]);

  // Don't render children until theme is initialized to prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
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
