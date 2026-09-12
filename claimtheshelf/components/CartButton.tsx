"use client";

import Link from "next/link";
import { useCartIds } from "@/lib/cart";

export function CartButton() {
  const count = useCartIds().length;
  return (
    <Link href="/cart" className="flex items-center gap-2 border-[1.5px] border-ink rounded-full px-3.5 py-1.5 hover:bg-ink hover:text-cream transition-colors">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 4h2l2.5 11h11L21 7H7"></path><circle cx="9" cy="19" r="1.5"></circle><circle cx="17" cy="19" r="1.5"></circle></svg>
      Cart{count > 0 ? ` (${count})` : ""}
    </Link>
  );
}
