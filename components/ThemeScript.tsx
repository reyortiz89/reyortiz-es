import React from "react";

/**
 * Inline theme bootstrap to avoid flash on reload.
 * Reads localStorage.theme, otherwise uses OS preference.
 * Sets <html data-theme="light|dark"> before React hydration.
 */
export function ThemeScript() {
  const code = `(() => {
  try {
    const stored = localStorage.getItem('theme');
    const preferred = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = stored === 'light' || stored === 'dark' ? stored : preferred;
    document.documentElement.dataset.theme = theme;
  } catch (e) {
    document.documentElement.dataset.theme = 'light';
  }
})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
