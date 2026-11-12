"use client";

import { track } from "@vercel/analytics";
import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Stores the visitor's first touch and reports clicks on elements marked with data-track. */
export function AttributionTracker() {
  useEffect(() => {
    captureAttribution();
    function onClick(e: MouseEvent) {
      const el = (e.target as Element | null)?.closest?.("[data-track]");
      const name = el?.getAttribute("data-track");
      if (name) track(name, { page: window.location.pathname });
    }
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
