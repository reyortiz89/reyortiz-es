"use client";

import Script from "next/script";
import { useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, options: Record<string, unknown>) => string;
      remove: (id: string) => void;
    };
  }
}

export const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

/**
 * Cloudflare Turnstile, rendered explicitly so it also works inside dialogs and
 * hidden tabs. It adds a hidden `cf-turnstile-response` input to the form.
 * Renders nothing until NEXT_PUBLIC_TURNSTILE_SITE_KEY is set.
 */
export function Turnstile({ locale }: { locale: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready || !ref.current || !window.turnstile || !turnstileSiteKey) return;
    const id = window.turnstile.render(ref.current, { sitekey: turnstileSiteKey, language: locale });
    return () => window.turnstile?.remove(id);
  }, [ready, locale]);

  if (!turnstileSiteKey) return null;
  return (
    <>
      <Script
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        onReady={() => setReady(true)}
      />
      <div ref={ref} />
    </>
  );
}

/** Reads the token Turnstile put in the form, if any. */
export function turnstileToken(data: FormData) {
  return (data.get("cf-turnstile-response") as string | null) || undefined;
}
