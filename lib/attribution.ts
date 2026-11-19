/**
 * First-touch attribution, kept in the browser so a lead can be traced back to
 * the campaign, referrer and page that brought the visitor in, even when the
 * form is filled several pages later. No cookies: it lives in localStorage.
 */

const KEY = "ro_first_touch";
const MAX_AGE_MS = 90 * 24 * 60 * 60 * 1000;

export type Attribution = {
  utm: Record<string, string>;
  referrer?: string;
  landingPage?: string;
};

type Stored = Attribution & { at: number };

function utmFrom(search: string) {
  return Object.fromEntries(
    [...new URLSearchParams(search).entries()].filter(([k]) => k.startsWith("utm_")).map(([k, v]) => [k, v.slice(0, 200)]),
  );
}

function read(): Stored | null {
  try {
    const stored = JSON.parse(window.localStorage.getItem(KEY) ?? "null") as Stored | null;
    return stored && Date.now() - stored.at < MAX_AGE_MS ? stored : null;
  } catch {
    return null;
  }
}

/** Records how the visitor arrived. A later visit with UTM parameters replaces an earlier one without. */
export function captureAttribution() {
  try {
    const utm = utmFrom(window.location.search);
    const existing = read();
    if (existing && (Object.keys(existing.utm).length > 0 || Object.keys(utm).length === 0)) return;
    const external = document.referrer && !document.referrer.startsWith(window.location.origin) ? document.referrer : "";
    const touch: Stored = {
      utm,
      referrer: external.slice(0, 500) || existing?.referrer,
      landingPage: existing?.landingPage ?? (window.location.origin + window.location.pathname).slice(0, 500),
      at: Date.now(),
    };
    window.localStorage.setItem(KEY, JSON.stringify(touch));
  } catch {
    // Storage blocked: the form still sends the UTM parameters of its own URL.
  }
}

/** Attribution to send with a lead: the stored first touch, with the current URL's UTM as fallback. */
export function getAttribution(): Attribution {
  const stored = read();
  const current = utmFrom(window.location.search);
  return {
    utm: stored && Object.keys(stored.utm).length ? stored.utm : current,
    referrer: stored?.referrer || undefined,
    landingPage: stored?.landingPage || undefined,
  };
}
