import { Resend } from "resend";
import { SITE_NAME, siteUrl } from "./site";
import { formatUsd, MATCH_WINDOW_HOURS } from "./pricing";

const from = process.env.EMAIL_FROM ?? "Claim the Shelf <onboarding@resend.dev>";

async function send(to: string, subject: string, html: string) {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log(`[email → ${to}] ${subject}\n${html}`);
    return;
  }
  const resend = new Resend(key);
  await resend.emails.send({ from, to, subject, html });
}

const wrap = (body: string) => `
<div style="font-family:system-ui,sans-serif;max-width:520px;margin:0 auto;color:#1a1a1a;line-height:1.5">
  <div style="font-weight:800;font-size:20px;color:#ff5a1f;letter-spacing:.04em;margin-bottom:16px">CLAIM THE SHELF</div>
  ${body}
  <p style="font-size:12px;color:#888;margin-top:28px">${SITE_NAME} · facings are a licence to display while the service operates — not property, not an investment, no traffic guaranteed. Shelf Credits are internal and cannot be withdrawn.</p>
</div>`;

const btn = (href: string, label: string) =>
  `<p><a href="${href}" style="display:inline-block;background:#ff5a1f;color:#fff;text-decoration:none;font-weight:700;padding:12px 18px;border-radius:8px">${label}</a></p>`;

export const emails = {
  async claimed(to: string, facingLabel: string, manageToken: string) {
    await send(to, `Your facing on the shelf is live`, wrap(`
      <p>Your facing <strong>${facingLabel}</strong> is on the shelf.</p>
      <p>Manage your listing, see your visits and clicks, and defend it if someone bids for it:</p>
      ${btn(siteUrl(`/manage/${manageToken}`), "Open my shelf panel")}
      <p style="font-size:13px;color:#555">Keep this link private — it is your login.</p>`));
  },

  async freeClaimLink(to: string, companyName: string, token: string) {
    await send(to, `Claim your free listing for ${companyName}`, wrap(`
      <p><strong>${companyName}</strong> is listed on the bottom shelf. Click below to claim it for free and control the listing:</p>
      ${btn(siteUrl(`/claim/${token}`), "Claim my listing")}
      <p style="font-size:13px;color:#555">Link valid for 24 hours. If you did not request this, ignore this email.</p>`));
  },

  async takeoverNoticeToIncumbent(to: string, facingLabel: string, bidCents: number, matchCents: number, deadline: Date, manageToken: string) {
    await send(to, `Someone wants your facing (${facingLabel})`, wrap(`
      <p>A company just bid <strong>${formatUsd(bidCents)}</strong> for your facing <strong>${facingLabel}</strong>.</p>
      <p>You have <strong>${MATCH_WINDOW_HOURS} hours</strong> (until ${deadline.toUTCString()}) to match by paying the difference of <strong>${formatUsd(matchCents)}</strong>. If you match, you keep the facing and its value rises to ${formatUsd(bidCents)}. If you don't, the facing changes hands and you receive its current value in Shelf Credits.</p>
      ${btn(siteUrl(`/manage/${manageToken}`), "Match the bid")}`));
  },

  async takeoverReceipt(to: string, facingLabel: string, bidCents: number, deadline: Date, manageToken: string) {
    await send(to, `Your bid for ${facingLabel} is in`, wrap(`
      <p>Your bid of <strong>${formatUsd(bidCents)}</strong> for <strong>${facingLabel}</strong> is registered. The current holder has until ${deadline.toUTCString()} to match.</p>
      <p>If they match, you get a full refund. If they don't, the facing is yours.</p>
      ${btn(siteUrl(`/manage/${manageToken}`), "Track my bid")}`));
  },

  async takeoverMatched(challengerEmail: string, incumbentEmail: string, facingLabel: string, bidCents: number) {
    await send(challengerEmail, `${facingLabel}: the holder matched your bid`, wrap(`
      <p>The holder of <strong>${facingLabel}</strong> matched your bid of ${formatUsd(bidCents)}. Your payment has been refunded in full.</p>
      <p>The facing is now worth ${formatUsd(bidCents)}. You can bid again at any time.</p>`));
    await send(incumbentEmail, `You kept ${facingLabel}`, wrap(`
      <p>You matched the bid. <strong>${facingLabel}</strong> stays yours and is now valued at ${formatUsd(bidCents)}.</p>`));
  },

  async takeoverCompleted(challengerEmail: string, incumbentEmail: string, facingLabel: string, bidCents: number, creditsCents: number, challengerToken: string, incumbentToken: string) {
    await send(challengerEmail, `${facingLabel} is yours`, wrap(`
      <p>The holder did not match. <strong>${facingLabel}</strong> is now yours at a value of ${formatUsd(bidCents)}.</p>
      ${btn(siteUrl(`/manage/${challengerToken}`), "Set up my listing")}`));
    await send(incumbentEmail, `You lost ${facingLabel}`, wrap(`
      <p><strong>${facingLabel}</strong> changed hands. You received <strong>${formatUsd(creditsCents)}</strong> in Shelf Credits, usable on any open facing.</p>
      ${btn(siteUrl(`/manage/${incumbentToken}`), "Use my credits")}`));
  },
};
