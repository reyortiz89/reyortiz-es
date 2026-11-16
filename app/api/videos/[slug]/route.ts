import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getPlayable, VIDEO_ACCESS_COOKIE } from "@/lib/video-sources";

/**
 * Hands out the playable URL of a video to visitors who already registered.
 * This is a lead gate, not DRM: use Vimeo with domain-restricted embeds to
 * keep the video itself private.
 */
export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const store = await cookies();
  if (store.get(VIDEO_ACCESS_COOKIE)?.value !== "1") {
    return NextResponse.json({ ok: false, error: "locked" }, { status: 401 });
  }
  const playable = getPlayable(slug);
  if (!playable) return NextResponse.json({ ok: false, error: "not_available" }, { status: 404 });
  return NextResponse.json({ ok: true, ...playable }, { headers: { "Cache-Control": "private, no-store" } });
}
