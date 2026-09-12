# Claim the Shelf

A supermarket shelf for software companies. Companies claim permanent facings; eye level is the expensive shelf; any rival can bid 1.25× for a facing and the holder gets 72 h to match. Every facing shows real views, clicks and "in carts".

## Stack

Next.js 16 (App Router) · Prisma 6 + Postgres · Stripe Checkout · Resend · Tailwind v4. Deploys on Vercel with the **root directory set to `claimtheshelf`**.

## Run locally

```bash
cd claimtheshelf
cp .env.example .env         # fill DATABASE_URL, STRIPE_*, RESEND_API_KEY
npm install
npm run db:push               # creates the tables
npm run db:seed               # 3 aisles × 48 facings (SaaS open, Marketing + AI locked) and free listings
npm run dev
```

Free listings: copy `prisma/listings.example.json` to `prisma/listings.json` and fill it with the real companies you selected (`aisle`, `name`, `url`, `tagline`). The seed places them on the bottom shelf (then middle) as **UNCLAIMED**; the company can claim its box for free with an email at its own domain. `listings.json` is git-ignored.

## Stripe

- Create a webhook endpoint pointing at `/api/stripe/webhook` for `checkout.session.completed` and `checkout.session.async_payment_succeeded`; put its signing secret in `STRIPE_WEBHOOK_SECRET`.
- Locally: `stripe listen --forward-to localhost:3000/api/stripe/webhook`.
- Set `STRIPE_TAX=true` once Stripe Tax is enabled on the account: checkout then collects billing address + VAT ID and applies tax automatically.
- Checkout collects company name, website and tagline as custom fields; they are applied to the facing when the payment settles.

## Money flow

| Action | Who pays | Amount | On success |
|---|---|---|---|
| Claim | buyer | current price | facing → CLAIMED, owner gets manage link by email |
| Takeover bid | challenger | 1.25 × current | Takeover PENDING, holder emailed, 72 h deadline |
| Match | holder | bid − current | Takeover MATCHED, challenger refunded, value = bid |
| No match | — | — | cron/lazy resolve: facing → challenger, holder gets previous value in Shelf Credits |

Shelf Credits are applied at checkout from the manage panel as a one-off Stripe coupon and deducted on payment. They are never refundable.

## Cron

`vercel.json` calls `/api/cron/resolve-takeovers` hourly (Hobby plans allow daily — expired takeovers are also resolved lazily whenever a facing or manage page renders). Send `Authorization: Bearer $CRON_SECRET`; Vercel does this automatically for cron jobs when `CRON_SECRET` is set.

## Owner access

There are no passwords. Each owner has a `manageToken`; `/manage/<token>` is their panel and is emailed on every purchase. Treat it as a login link.

## Legal posture (baked into the UI and emails)

Facings are a licence to display while the service operates — not property, not an investment, no traffic guaranteed. Every coloured box is labelled a sponsored placement. Free listings are labelled "unclaimed" and can be removed on request within 24 h. Terms are at `/terms` and acceptance is required at checkout.
