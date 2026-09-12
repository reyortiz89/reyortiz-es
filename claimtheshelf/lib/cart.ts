"use client";

import { useSyncExternalStore } from "react";

const KEY = "cts_cart";
const EMPTY: string[] = [];
let cachedRaw: string | null = null;
let cached: string[] = EMPTY;

export function readCart(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw === cachedRaw) return cached;
    cachedRaw = raw;
    cached = raw ? (JSON.parse(raw) as string[]) : EMPTY;
    return cached;
  } catch {
    return EMPTY;
  }
}

export function writeCart(ids: string[]) {
  try {
    localStorage.setItem(KEY, JSON.stringify(ids));
  } catch {
    /* private mode etc. */
  }
  window.dispatchEvent(new Event("cts-cart"));
}

function subscribe(cb: () => void) {
  window.addEventListener("cts-cart", cb);
  window.addEventListener("storage", cb);
  return () => {
    window.removeEventListener("cts-cart", cb);
    window.removeEventListener("storage", cb);
  };
}

/** Cart ids kept in this browser; empty during SSR. */
export function useCartIds() {
  return useSyncExternalStore(subscribe, readCart, () => EMPTY);
}
