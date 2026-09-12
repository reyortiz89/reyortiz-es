"use client";

import { useState } from "react";
import { formatUsd } from "@/lib/pricing";

type Props = {
  facingId: string;
  status: "OPEN" | "CLAIMED" | "UNCLAIMED";
  priceCents: number;
  takeoverCents: number;
  pendingUntil: string | null;
  freeDomain: string | null;
  aisleOpen: boolean;
};

async function startCheckout(body: object) {
  const res = await fetch("/api/checkout", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(body) });
  const data = (await res.json()) as { url?: string; error?: string };
  if (!res.ok || !data.url) throw new Error(data.error ?? "Checkout failed");
  window.location.href = data.url;
}

export function ClaimActions({ facingId, status, priceCents, takeoverCents, pendingUntil, freeDomain, aisleOpen }: Props) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const go = async (kind: "claim" | "takeover") => {
    setBusy(true);
    setError(null);
    try {
      await startCheckout({ facingId, kind });
    } catch (e) {
      setError((e as Error).message);
      setBusy(false);
    }
  };

  const claimFree = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const res = await fetch("/api/claim-free", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ facingId, email }) });
    const data = (await res.json()) as { error?: string };
    setBusy(false);
    if (!res.ok) setError(data.error ?? "Could not send the link");
    else setSent(true);
  };

  if (!aisleOpen) {
    return <div className="rounded-lg border border-dashed border-ink/30 p-4 text-sm text-ink/60">This aisle opens when the previous one is 80% full.</div>;
  }

  const btn = "w-full rounded-lg bg-orange text-white font-display text-xl tracking-[.08em] py-3 disabled:opacity-50";

  if (status === "OPEN") {
    return (
      <div className="flex flex-col gap-2">
        <button className={btn} disabled={busy} onClick={() => go("claim")}>
          CLAIM THIS FACING · {formatUsd(priceCents)}
        </button>
        <p className="text-[11px] text-ink/55 text-center">One-time payment. Yours until someone outbids you at 1.25× and you choose not to match.</p>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (status === "UNCLAIMED") {
    return (
      <div className="flex flex-col gap-3">
        <form onSubmit={claimFree} className="flex flex-col gap-2 rounded-lg border border-line bg-white p-3">
          <div className="text-xs font-bold uppercase tracking-wider text-ink/60">Is this your company? Claim it free</div>
          {sent ? (
            <p className="text-sm">Check your inbox — we sent a claim link to <strong>{email}</strong>.</p>
          ) : (
            <>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={`you@${freeDomain ?? "yourcompany.com"}`}
                className="rounded border border-line px-3 py-2 text-sm"
              />
              <button className="rounded bg-ink text-cream font-bold text-sm py-2 disabled:opacity-50" disabled={busy}>
                Send claim link
              </button>
              <p className="text-[11px] text-ink/55">Must be an email at {freeDomain ?? "the company's domain"}. Free listings sit on the lower shelves; upgrade to eye level any time.</p>
            </>
          )}
        </form>
        <button className={btn} disabled={busy} onClick={() => go("claim")}>
          NOT YOURS? TAKE THE FACING · {formatUsd(priceCents)}
        </button>
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  if (pendingUntil) {
    return (
      <div className="rounded-lg border border-butter bg-butter/20 p-4 text-sm">
        <div className="font-bold">A bid is pending on this facing.</div>
        <div className="text-ink/70">The holder has until {new Date(pendingUntil).toUTCString()} to match. Check back after that.</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-sm"><span className="text-ink/70">Current value</span><strong>{formatUsd(priceCents)}</strong></div>
      <div className="flex justify-between text-sm"><span className="text-ink/70">Take it over (1.25×)</span><strong className="text-orange text-lg">{formatUsd(takeoverCents)}</strong></div>
      <button className={btn} disabled={busy} onClick={() => go("takeover")}>
        TAKE THIS FACING
      </button>
      <p className="text-[11px] text-ink/55 text-center">The holder gets 72 h to match. If they do, you are refunded in full. If not, the facing is yours.</p>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
