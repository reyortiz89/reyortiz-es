"use client";

import { Play } from "lucide-react";
import { useState } from "react";

/**
 * Lightweight YouTube embed: shows the thumbnail and only loads the (privacy-enhanced) player
 * when clicked, so a post with videos stays fast and sets no YouTube cookies until then.
 */
export function YouTube({ id, title, caption }: { id: string; title: string; caption?: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="post-figure">
      <div className="relative aspect-video overflow-hidden rounded-2xl border border-border bg-ink">
        {playing ? (
          <iframe
            className="absolute inset-0 size-full"
            src={`https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            className="group absolute inset-0 size-full cursor-pointer"
            aria-label={`Reproducir vídeo: ${title}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- remote thumbnail, no optimisation needed */}
            <img
              src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`}
              alt=""
              loading="lazy"
              className="absolute inset-0 size-full object-cover opacity-80 transition-opacity group-hover:opacity-100"
            />
            <span className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <span className="absolute left-1/2 top-1/2 grid size-16 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-accent text-accent-foreground shadow-xl transition-transform group-hover:scale-110">
              <Play className="size-6 translate-x-0.5 fill-current" aria-hidden />
            </span>
            <span className="absolute inset-x-5 bottom-4 text-left text-sm font-medium text-white">{title}</span>
          </button>
        )}
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
