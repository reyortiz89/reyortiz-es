import { CONTACT_EMAIL } from "@/lib/site";

export const metadata = { title: "Terms" };

export default function Terms() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-8 pt-8 flex flex-col gap-3 text-sm [&_h2]:font-bold [&_h2]:text-base [&_h2]:mt-3 [&_p]:text-ink/80">
      <h1 className="font-display text-5xl tracking-wide">TERMS OF SERVICE</h1>
      <p className="text-xs text-ink/50">Plain-language summary first; the full terms follow. Review with your lawyer before launch — this is a starting draft, not legal advice.</p>

      <h2>What you buy</h2>
      <p>
        A <strong>facing</strong> is a licence to display a name, a tagline, a colour and a link in a fixed position on claimtheshelf.com for as long as the service operates and you hold the facing.
        It is <strong>not</strong> property, a domain, an NFT, a security or an investment. It carries no expectation of profit and no right to resale for money.
      </p>

      <h2>Takeovers and matching</h2>
      <p>
        Any person may bid for a held facing by paying 1.25× its current value. The holder is notified and has 72 hours to match by paying the difference. If the holder matches, the bidder is refunded in full and the facing&apos;s value becomes the bid.
        If the holder does not match, the facing transfers to the bidder and the previous holder receives the facing&apos;s previous value as <strong>Shelf Credits</strong>.
      </p>

      <h2>Shelf Credits</h2>
      <p>Shelf Credits are an internal discount balance usable only on claimtheshelf.com. They cannot be withdrawn, transferred or redeemed for money, and expire if the service closes.</p>

      <h2>No traffic guarantee</h2>
      <p>We publish real visit and click counts for each facing. We make no promise about how many visits, clicks, leads or sales a facing will generate.</p>

      <h2>Free listings</h2>
      <p>
        We may list a company&apos;s name, website and a short description on the lower shelves without charge, labelled &quot;unclaimed&quot;, so that the company can claim and control it for free with an email at its own domain.
        A free listing is a placement, never an endorsement or a statement of any relationship. Any company may have its listing removed by writing to {CONTACT_EMAIL}; we act within 24 hours.
      </p>

      <h2>Content rules</h2>
      <p>No adult content, weapons, drugs, gambling, scams, hate, impersonation or trademark abuse. Listings are reviewed before publication; we may remove a facing that breaks these rules and refund the last payment at our discretion.</p>

      <h2>Sponsored placement</h2>
      <p>Every coloured facing is a paid placement and is labelled as such. Position on the shelf is bought, not earned by merit.</p>

      <h2>Refunds and withdrawal</h2>
      <p>Because a facing is displayed immediately after payment, you expressly agree at checkout that the service begins at once and waive the 14-day right of withdrawal where applicable. Refunds are otherwise made only as described in the takeover rules.</p>

      <h2>Service changes</h2>
      <p>We may change prices for new facings, add aisles or shelves, or discontinue the service. If the service closes, held facings and credits end without compensation.</p>

      <h2>Law</h2>
      <p>Operated from Spain; Spanish law applies. Consumers keep any rights their local law grants that cannot be waived.</p>
    </div>
  );
}
