"use client";

import { useState } from "react";
import { formatUsd } from "@/lib/pricing";

export function MatchButton({ facingId, takeoverId, ownerToken, matchCents, creditsCents }: { facingId: string; takeoverId: string; ownerToken: string; matchCents: number; creditsCents: number }) {
  const [busy, setBusy] = useState(false);
  const [useCredits, setUseCredits] = useState(creditsCents > 0);
  const [error, setError] = useState<string | null>(null);

  const go = async () => {
    setBusy(true);
    setError(null);
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ facingId, kind: "match", takeoverId, ownerToken, useCredits }),
    });
    const data = (await res.json()) as { url?: string; error?: string };
    if (!res.ok || !data.url) {
      setError(data.error ?? "Could not start checkout");
      setBusy(false);
      return;
    }
    window.location.href = data.url;
  };

  return (
    <div className="flex flex-col gap-2">
      {creditsCents > 0 && (
        <label className="flex items-center gap-2 text-xs">
          <input type="checkbox" checked={useCredits} onChange={(e) => setUseCredits(e.target.checked)} />
          Apply my {formatUsd(creditsCents)} in Shelf Credits
        </label>
      )}
      <button onClick={go} disabled={busy} className="rounded-lg bg-butter text-ink font-display text-xl tracking-wider py-2.5 disabled:opacity-50">
        MATCH · PAY {formatUsd(matchCents)}
      </button>
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
