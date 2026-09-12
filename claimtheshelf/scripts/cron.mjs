// Railway cron service: hits the app's takeover-resolution endpoint and exits.
// Env: APP_URL (public URL of the web service), CRON_SECRET (same value as the web service).
const base = (process.env.APP_URL ?? process.env.NEXT_PUBLIC_SITE_URL ?? "").replace(/\/$/, "");
const secret = process.env.CRON_SECRET;
if (!base || !secret) {
  console.error("APP_URL and CRON_SECRET are required");
  process.exit(1);
}
const res = await fetch(`${base}/api/cron/resolve-takeovers`, { headers: { authorization: `Bearer ${secret}` } });
const body = await res.text();
console.log(res.status, body);
process.exit(res.ok ? 0 : 1);
