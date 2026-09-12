"use client";

import { useState } from "react";
import { readCart, useCartIds, writeCart } from "@/lib/cart";

export function SaveButton({ facingId, initialCount }: { facingId: string; initialCount: number }) {
  const saved = useCartIds().includes(facingId);
  const [count, setCount] = useState(initialCount);

  const toggle = async () => {
    const ids = readCart();
    const next = saved ? ids.filter((i) => i !== facingId) : [...ids, facingId];
    writeCart(next);
    const res = await fetch("/api/cart", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ facingId, add: !saved }) });
    if (res.ok) setCount(((await res.json()) as { inCarts: number }).inCarts);
  };

  return (
    <button onClick={toggle} className={`flex items-center gap-2 rounded-full border-[1.5px] px-3.5 py-1.5 text-sm font-semibold ${saved ? "bg-ink text-cream border-ink" : "border-ink hover:bg-ink hover:text-cream"}`}>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.5 11h11L21 7H7"></path><circle cx="9" cy="19" r="1.5"></circle><circle cx="17" cy="19" r="1.5"></circle></svg>
      {saved ? "In your cart" : "Add to cart"}
      <span className="opacity-60">· {count}</span>
    </button>
  );
}
