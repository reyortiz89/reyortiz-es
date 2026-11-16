import "server-only";

/**
 * Where each video is hosted. Kept out of the public repo: set VIDEO_SOURCES in
 * Vercel as JSON, either just the link or the link plus its duration:
 *   {"meta-ads-claude":"https://vimeo.com/123456789",
 *    "ai-content-calendar":{"url":"https://vimeo.com/987654321","duration":"12 min"}}
 * Supported: Vimeo (recommended, private + domain-restricted), YouTube
 * (unlisted), Loom, or a direct .mp4/.webm file URL.
 */
export type Playable = { kind: "iframe" | "file"; src: string };

type Source = { url: string; duration?: string };

function sources(): Record<string, Source> {
  let parsed: unknown;
  try {
    parsed = JSON.parse(process.env.VIDEO_SOURCES || "{}");
  } catch {
    console.error("[videos] VIDEO_SOURCES is not valid JSON");
    return {};
  }
  if (!parsed || typeof parsed !== "object") return {};
  const out: Record<string, Source> = {};
  for (const [slug, value] of Object.entries(parsed as Record<string, unknown>)) {
    if (typeof value === "string" && value.trim()) out[slug] = { url: value.trim() };
    else if (value && typeof value === "object" && typeof (value as Source).url === "string" && (value as Source).url.trim()) {
      const { url, duration } = value as Source;
      out[slug] = { url: url.trim(), duration: typeof duration === "string" ? duration.trim().slice(0, 20) : undefined };
    }
  }
  return out;
}

/** Videos that have a source, with the duration to show on the cover. */
export function publishedVideos(): Record<string, { duration?: string }> {
  return Object.fromEntries(
    Object.entries(sources())
      .filter(([slug]) => getPlayable(slug))
      .map(([slug, s]) => [slug, s.duration ? { duration: s.duration } : {}]),
  );
}

export function getPlayable(slug: string): Playable | null {
  const raw = sources()[slug]?.url;
  if (!raw) return null;
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    return null;
  }
  const host = url.hostname.replace(/^www\./, "");

  if (host === "youtu.be" || host.endsWith("youtube.com")) {
    const id =
      host === "youtu.be"
        ? url.pathname.slice(1)
        : url.searchParams.get("v") ?? url.pathname.split("/").filter(Boolean).pop();
    if (!id) return null;
    return {
      kind: "iframe",
      src: `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0&modestbranding=1&playsinline=1`,
    };
  }

  if (host.endsWith("vimeo.com")) {
    // vimeo.com/ID, vimeo.com/ID/HASH (unlisted) or player.vimeo.com/video/ID?h=HASH
    const parts = url.pathname.split("/").filter(Boolean);
    const id = parts.find((p) => /^\d+$/.test(p));
    if (!id) return null;
    const hash = url.searchParams.get("h") ?? parts[parts.indexOf(id) + 1];
    const params = new URLSearchParams({ autoplay: "1", title: "0", byline: "0", portrait: "0" });
    if (hash && /^[a-z0-9]+$/i.test(hash)) params.set("h", hash);
    return { kind: "iframe", src: `https://player.vimeo.com/video/${id}?${params}` };
  }

  if (host.endsWith("loom.com")) {
    const id = url.pathname.split("/").filter(Boolean).pop();
    if (!id) return null;
    return { kind: "iframe", src: `https://www.loom.com/embed/${encodeURIComponent(id)}?autoplay=1&hide_owner=true` };
  }

  if (/\.(mp4|webm|mov)$/i.test(url.pathname)) return { kind: "file", src: url.toString() };

  return null;
}

/** Cookie set once a visitor registers; unlocks every video in that browser. */
export const VIDEO_ACCESS_COOKIE = "ro_video_access";
