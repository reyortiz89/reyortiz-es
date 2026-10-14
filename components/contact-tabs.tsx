"use client";

import { CalendarDays, MessageSquareText } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Switches the contact page between booking a call and sending a message. */
export function ContactTabs({
  bookLabel,
  messageLabel,
  booking,
  form,
}: {
  bookLabel: string;
  messageLabel: string;
  booking: ReactNode;
  form: ReactNode;
}) {
  const [tab, setTab] = useState<"book" | "message">("book");

  // Deep link: /contact#message opens the form directly.
  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === "#message") setTab("message");
      if (window.location.hash === "#agenda") setTab("book");
    };
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, []);

  const tabs = [
    { key: "book", label: bookLabel, icon: CalendarDays },
    { key: "message", label: messageLabel, icon: MessageSquareText },
  ] as const;

  return (
    <div>
      <div role="tablist" className="mb-4 inline-flex w-full rounded-full border border-border bg-surface p-1 sm:w-auto">
        {tabs.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            role="tab"
            id={`tab-${key}`}
            aria-selected={tab === key}
            aria-controls={`panel-${key}`}
            onClick={() => setTab(key)}
            className={cn(
              "inline-flex flex-1 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-colors sm:flex-none",
              tab === key ? "bg-foreground text-background" : "text-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4" aria-hidden />
            {label}
          </button>
        ))}
      </div>
      <div id="panel-book" role="tabpanel" aria-labelledby="tab-book" hidden={tab !== "book"}>
        {booking}
      </div>
      <div id="panel-message" role="tabpanel" aria-labelledby="tab-message" hidden={tab !== "message"}>
        {form}
      </div>
    </div>
  );
}
