# reyortiz.es

Professional site of Rey Ortiz: technology consulting, automation, AI and custom software for companies. Bilingual (ES/EN), light and dark theme, built to generate leads.

## Stack

- Next.js 16 (App Router, static generation) · React 19 · TypeScript
- Tailwind CSS 4 with design tokens in `app/globals.css`
- `next-intl` for ES/EN with translated URLs (`/es/servicios`, `/en/services`)
- `next-themes` for light / dark / system theme
- Lead API (`app/api/leads`) → Closeby webhook + SMTP (Closeby account), honeypot, rate limit and optional Cloudflare Turnstile
- Vercel Web Analytics (cookieless)

## Where things live

| What | Where |
|---|---|
| Contact details, social links, booking URL | `content/site.ts` |
| Bio, experience, education | `content/profile.ts` |
| Services (ES/EN) | `content/services.ts` |
| Case studies (ES/EN) | `content/cases.ts` |
| Legal pages | `content/legal.ts` |
| UI texts | `messages/es.json`, `messages/en.json` |
| Routes and translated paths | `i18n/routing.ts` |
| Lead delivery (Closeby, SMTP) | `lib/leads.ts`, `lib/lead-schema.ts` |

## Development

```bash
npm install
cp .env.example .env.local   # fill in what you need
npm run dev                  # http://localhost:3000 → redirects to /es or /en
npm run lint
npm run build
```

## Environment variables

See `.env.example`. Without SMTP or Closeby configured, the contact form works in development (leads are only logged) and returns an error in production so no lead is silently lost.

Before going live on the Closeby SMTP, make sure the sending domain has SPF, DKIM and DMARC records so emails don't land in spam.
