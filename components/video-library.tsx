"use client";

import { ArrowRight, Bell, Check, Clock, Loader2, Play, X } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { videoCategories, videos, type Video, type VideoCategory } from "@/content/videos";
import type { Locale } from "@/i18n/routing";
import { cn } from "@/lib/cn";
import { LeadCaptureForm } from "./lead-capture-form";
import { VideoMock } from "./video-mock";

type Published = Record<string, { duration?: string }>;
type Playable = { kind: "iframe" | "file"; src: string };
type Modal =
  | { mode: "gate" | "waitlist"; video: Video }
  | { mode: "done"; video: Video; email: string }
  | { mode: "player"; video: Video; playable: Playable };

const palettes = ["ink", "lime", "stone"] as const;
const card =
  "group relative overflow-hidden border border-border bg-surface text-left transition-all hover:border-foreground/20 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-foreground";
/** Makes the title's button cover the whole card. */
const stretched = "text-left outline-none after:absolute after:inset-0 after:z-20 after:content-['']";
const WAITLIST_KEY = "ro_video_waitlist";

function episode(video: Video) {
  return String(videos.indexOf(video) + 1).padStart(2, "0");
}

function readWaitlist(): string[] {
  try {
    return JSON.parse(localStorage.getItem(WAITLIST_KEY) || "[]") as string[];
  } catch {
    return [];
  }
}

/**
 * The video library: animated covers, a category filter and the flow
 * click → short form (once) → video playing. Videos without a source yet
 * open a waitlist form instead.
 */
export function VideoLibrary({ published }: { published: Published }) {
  const t = useTranslations("videos");
  const locale = useLocale() as Locale;
  const [category, setCategory] = useState<VideoCategory | "all">("all");
  const [modal, setModal] = useState<Modal | null>(null);
  const [loading, setLoading] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const list = category === "all" ? videos : videos.filter((v) => v.category === category);
  const [featured, ...rest] = list;
  const isPublished = (v: Video) => Boolean(published[v.slug]);

  async function play(video: Video) {
    setLoading(video.slug);
    setError(null);
    try {
      const res = await fetch(`/api/videos/${video.slug}`, { cache: "no-store" });
      if (res.status === 401) return setModal({ mode: "gate", video });
      const json = (await res.json()) as { ok?: boolean } & Partial<Playable>;
      if (res.ok && json.ok && json.src && json.kind) {
        return setModal({ mode: "player", video, playable: { kind: json.kind, src: json.src } });
      }
      setError(video.slug);
    } catch {
      setError(video.slug);
    } finally {
      setLoading(null);
    }
  }

  function open(video: Video) {
    if (isPublished(video)) return play(video);
    if (readWaitlist().includes(video.slug)) return setModal({ mode: "done", video, email: "" });
    setModal({ mode: "waitlist", video });
  }

  function onRegistered(video: Video, email: string) {
    if (isPublished(video)) return play(video);
    try {
      localStorage.setItem(WAITLIST_KEY, JSON.stringify([...new Set([...readWaitlist(), video.slug])]));
    } catch {}
    setModal({ mode: "done", video, email });
  }

  const cover = (video: Video, inDialog = false, className?: string) => (
    <VideoMock
      visual={video.visual}
      palette={palettes[videos.indexOf(video) % palettes.length]}
      ai={t("ai")}
      play={!inDialog}
      topLeft={`EP ${episode(video)} · ${t(`categories.${video.category}`)}`}
      topRight={
        inDialog ? null : isPublished(video) ? (
          <span className="inline-flex items-center gap-[1cqw]">
            <Clock className="size-[2.4cqw]" aria-hidden />
            {published[video.slug].duration ?? t("watch")}
          </span>
        ) : (
          t("comingSoon")
        )
      }
      className={className}
    />
  );

  const action = (video: Video, big = false) => (
    <span
      aria-hidden
      className={cn(
        "inline-flex items-center gap-2 font-medium",
        big ? "rounded-full bg-foreground px-6 py-3.5 text-sm text-background" : "text-sm",
      )}
    >
      {loading === video.slug ? (
        <Loader2 className="size-4 animate-spin" aria-hidden />
      ) : isPublished(video) ? (
        <Play className="size-4 fill-current" aria-hidden />
      ) : (
        <Bell className="size-4" aria-hidden />
      )}
      {isPublished(video) ? t("watch") : t("notify")}
      {big && <ArrowRight className="size-4" aria-hidden />}
    </span>
  );

  return (
    <div>
      <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:px-0" role="tablist">
        {(["all", ...videoCategories] as const).map((c) => {
          const count = c === "all" ? videos.length : videos.filter((v) => v.category === c).length;
          return (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={category === c}
              onClick={() => setCategory(c)}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-sm transition-colors",
                category === c
                  ? "border-foreground bg-foreground text-background"
                  : "border-border bg-surface text-muted hover:border-foreground/30 hover:text-foreground",
              )}
            >
              {c === "all" ? t("all") : t(`categories.${c}`)}
              <span className={cn("tabular-nums text-xs", category === c ? "text-background/60" : "text-muted/70")}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {featured && (
        <article className={cn(card, "mt-8 grid rounded-[2rem] lg:grid-cols-[1.35fr_1fr]")}>
          {cover(featured, false, "lg:aspect-auto")}
          <div className="flex flex-col p-6 sm:p-10">
            <p className="text-xs uppercase tracking-[0.16em] text-muted">
              {t("featured")} · {t(`categories.${featured.category}`)}
            </p>
            <h2 className="mt-4 text-balance text-3xl font-medium leading-tight tracking-tight sm:text-4xl">
              <button type="button" onClick={() => open(featured)} className={stretched}>
                {featured.title[locale]}
              </button>
            </h2>
            <p className="mt-4 text-pretty leading-relaxed text-muted">{featured.summary[locale]}</p>
            <ul className="mt-6 space-y-2.5 text-sm">
              {featured.takeaways[locale].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent-ink" aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-auto pt-8">{action(featured, true)}</div>
            {error === featured.slug && <p className="mt-3 text-sm text-danger">{t("unavailable")}</p>}
          </div>
        </article>
      )}

      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((video) => (
          <li key={video.slug}>
            <article className={cn(card, "flex h-full flex-col rounded-3xl hover:-translate-y-1")}>
              {cover(video)}
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-balance text-lg font-medium leading-snug tracking-tight">
                  <button type="button" onClick={() => open(video)} className={stretched}>
                    {video.title[locale]}
                  </button>
                </h3>
                <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">{video.summary[locale]}</p>
                <div className="mt-5">{action(video)}</div>
                {error === video.slug && <p className="mt-2 text-sm text-danger">{t("unavailable")}</p>}
              </div>
            </article>
          </li>
        ))}
      </ul>

      <VideoDialog modal={modal} onClose={() => setModal(null)}>
        {modal && (modal.mode === "gate" || modal.mode === "waitlist") && (
          <div className="overflow-hidden rounded-[1.75rem] bg-background">
            {cover(modal.video, true)}
            <div className="p-6 sm:p-7">
              <p className="text-sm text-muted">{modal.video.title[locale]}</p>
              <h2 className="mt-2 text-2xl font-medium tracking-tight">
                {modal.mode === "gate" ? t("gateTitle") : t("waitTitle")}
              </h2>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-muted">
                {modal.mode === "gate" ? t("gateText") : t("waitText")}
              </p>
              <div className="mt-5">
                <LeadCaptureForm
                  source={`${modal.mode === "gate" ? "video" : "video-waitlist"}:${modal.video.slug}`}
                  submitLabel={modal.mode === "gate" ? t("gateSubmit") : t("waitSubmit")}
                  phone="required"
                  compact
                  onSuccess={(lead) => onRegistered(modal.video, lead.email)}
                />
              </div>
            </div>
          </div>
        )}

        {modal?.mode === "done" && (
          <div className="rounded-[1.75rem] bg-background p-7 text-center sm:p-9">
            <span className="mx-auto grid size-14 place-items-center rounded-full bg-accent text-accent-foreground">
              <Check className="size-6" aria-hidden />
            </span>
            <h2 className="mt-5 text-2xl font-medium tracking-tight">{t("doneTitle")}</h2>
            <p className="mt-2 text-pretty leading-relaxed text-muted">
              {modal.email ? t("doneText", { email: modal.email }) : t("doneAgain")}
            </p>
            <p className="mt-5 text-sm font-medium">{modal.video.title[locale]}</p>
          </div>
        )}

        {modal?.mode === "player" && (
          <div className="overflow-hidden rounded-[1.75rem] bg-black text-white">
            <div className="aspect-video">
              {modal.playable.kind === "iframe" ? (
                <iframe
                  src={modal.playable.src}
                  title={modal.video.title[locale]}
                  allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
                  allowFullScreen
                  className="size-full"
                />
              ) : (
                <video src={modal.playable.src} autoPlay controls playsInline className="size-full" />
              )}
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5">
              <p className="font-medium">
                <span className="text-white/50">EP {episode(modal.video)} · </span>
                {modal.video.title[locale]}
              </p>
            </div>
          </div>
        )}
      </VideoDialog>
    </div>
  );
}

function VideoDialog({ modal, onClose, children }: { modal: Modal | null; onClose: () => void; children: ReactNode }) {
  const t = useTranslations("videos");
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (modal && !dialog.open) dialog.showModal();
    if (!modal && dialog.open) dialog.close();
  }, [modal]);

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className={cn(
        "m-auto w-[calc(100%-1.5rem)] overflow-visible bg-transparent p-0 text-foreground backdrop:bg-black/70 backdrop:backdrop-blur-sm open:animate-fade-up",
        modal?.mode === "player" ? "max-w-5xl" : "max-w-md",
      )}
    >
      <div className="relative max-h-[calc(100dvh-2rem)] overflow-y-auto rounded-[1.75rem]">
        {children}
        <button
          type="button"
          onClick={onClose}
          aria-label={t("close")}
          className="absolute right-3 top-3 z-20 grid size-9 place-items-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-black/80"
        >
          <X className="size-4" aria-hidden />
        </button>
      </div>
    </dialog>
  );
}
