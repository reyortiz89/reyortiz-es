"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { readCart, useCartIds, writeCart } from "@/lib/cart";

type Item = { id: string; name: string | null; tagline: string | null; color: string | null; url: string | null; aisle: string; status: string };

export function CartList() {
  const ids = useCartIds();
  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    if (ids.length === 0) return;
    let cancelled = false;
    fetch(`/api/facings?ids=${ids.join(",")}`)
      .then((r) => r.json())
      .then((d: { facings: Item[] }) => { if (!cancelled) setItems(d.facings); })
      .catch(() => { if (!cancelled) setItems([]); });
    return () => { cancelled = true; };
  }, [ids]);

  const remove = async (id: string) => {
    writeCart(readCart().filter((x) => x !== id));
    setItems((prev) => prev?.filter((i) => i.id !== id) ?? null);
    await fetch("/api/cart", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ facingId: id, add: false }) });
  };

  if (ids.length === 0) return <p className="text-sm text-ink/50">Empty. <Link href="/" className="underline">Walk the aisle</Link>.</p>;
  if (items === null) return <p className="text-sm text-ink/50">Loading…</p>;
  if (items.length === 0) return <p className="text-sm text-ink/50">Empty. <Link href="/" className="underline">Walk the aisle</Link>.</p>;

  return (
    <ul className="flex flex-col gap-2">
      {items.map((i) => (
        <li key={i.id} className="flex items-center gap-4 rounded-lg bg-white border border-line p-3">
          <div className="w-10 h-12 rounded flex items-center justify-center font-display text-sm" style={{ backgroundColor: i.color ?? "#d9d4c7" }}>{(i.name ?? "?").slice(0, 2).toUpperCase()}</div>
          <div className="flex-1 min-w-0">
            <Link href={`/facing/${i.id}`} className="font-bold underline">{i.name ?? "Open facing"}</Link>
            <div className="text-xs text-ink/60 truncate">{i.tagline ?? i.aisle}</div>
          </div>
          {i.url && <a href={`/out/${i.id}`} target="_blank" rel="noopener sponsored" className="text-sm font-semibold text-orange underline">Visit ↗</a>}
          <button onClick={() => remove(i.id)} className="text-xs text-ink/50 hover:text-ink">Remove</button>
        </li>
      ))}
    </ul>
  );
}
