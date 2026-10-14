# reyortiz.es

Professional site of Rey Ortiz: technology consulting, automation, AI and custom software for companies. Bilingual (ES/EN), light and dark theme, built to generate leads.

## Stack

- Next.js 16 (App Router, static generation) · React 19 · TypeScript
- Tailwind CSS 4 with design tokens in `app/globals.css` · Geist + Instrument Serif · `motion` for scroll reveals
- `next-intl` for ES/EN with translated URLs (`/es/servicios`, `/en/services`)
- `next-themes` for light / dark / system theme
- Lead API (`app/api/leads`) → email via SMTP (Namecheap Private Email, rey@closevibe.com), optional CRM webhook, honeypot, rate limit and optional Cloudflare Turnstile
- Vercel Web Analytics (cookieless)

## Where things live

| What | Where |
|---|---|
| Contact details, social links, Calendly URL | `content/site.ts` |
| Bio, experience, education | `content/profile.ts` |
| Services (ES/EN) | `content/services.ts` |
| Case studies (ES/EN) | `content/cases.ts` |
| Legal pages | `content/legal.ts` |
| UI texts | `messages/es.json`, `messages/en.json` |
| Routes and translated paths | `i18n/routing.ts` |
| Lead delivery (SMTP, optional webhook) | `lib/leads.ts`, `lib/lead-schema.ts` |

## Development

```bash
npm install
cp .env.example .env.local   # fill in what you need
npm run dev                  # http://localhost:3000 → redirects to /es or /en
npm run lint
npm run build
```

## Environment variables

See `.env.example`. In Vercel the minimum to make the contact form work is `SMTP_PASS` (host, port and user default to Namecheap Private Email and rey@closevibe.com). `NEXT_PUBLIC_CALENDLY_URL` overrides the booking page that is embedded on `/contact` and the home page and opened by every "Book a call" button (default: the Closevibe agenda). `NEXT_PUBLIC_*` values are baked in at build time, so redeploy after changing them.

Without SMTP configured, the contact form works in development (leads are only logged) and returns an error in production so no lead is silently lost.

Before going live, make sure closevibe.com has SPF, DKIM and DMARC records for Private Email so emails don't land in spam.
