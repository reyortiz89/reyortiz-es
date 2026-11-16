import { ImageResponse } from "next/og";
import { getAllPosts, getPost, type PostType } from "@/lib/blog";
import { blogLocale } from "@/lib/blog-meta";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Blog · Rey Ortiz";
export const revalidate = 3600;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ locale: blogLocale, slug: post.slug }));
}

const lime = "#c6f24e";
const ink = "#09090b";
const paper = "#f3f3ee";

/** Decorative motif per post type, drawn with plain shapes so the cover needs no external assets. */
function Motif({ type }: { type: PostType }) {
  if (type === "noticia") {
    // A pulse of concentric rings: "what's new".
    return (
      <div style={{ display: "flex", position: "absolute", right: -140, top: -140, width: 620, height: 620 }}>
        {[620, 470, 320, 170].map((d, i) => (
          <div
            key={d}
            style={{
              position: "absolute",
              left: (620 - d) / 2,
              top: (620 - d) / 2,
              width: d,
              height: d,
              borderRadius: d,
              border: `2px solid rgba(198,242,78,${0.14 + i * 0.12})`,
            }}
          />
        ))}
        <div style={{ position: "absolute", left: 290, top: 290, width: 40, height: 40, borderRadius: 40, background: lime }} />
      </div>
    );
  }
  if (type === "guia") {
    // Stepped roadmap bars.
    return (
      <div style={{ display: "flex", position: "absolute", right: 72, top: 72, flexDirection: "column", gap: 18 }}>
        {[180, 260, 340, 420].map((w, i) => (
          <div key={w} style={{ display: "flex", alignItems: "center", gap: 16, marginLeft: 420 - w }}>
            <div style={{ display: "flex", width: 34, height: 34, borderRadius: 34, background: i === 3 ? lime : "rgba(243,243,238,0.12)", color: i === 3 ? ink : "#a1a19a", fontSize: 18, alignItems: "center", justifyContent: "center" }}>
              {i + 1}
            </div>
            <div style={{ width: w - 50, height: 14, borderRadius: 14, background: i === 3 ? lime : "rgba(243,243,238,0.16)" }} />
          </div>
        ))}
      </div>
    );
  }
  // Rising bars: results and cases.
  return (
    <div style={{ display: "flex", position: "absolute", right: 72, top: 72, alignItems: "flex-end", gap: 16, height: 260 }}>
      {[90, 130, 110, 180, 240].map((h, i) => (
        <div key={i} style={{ width: 46, height: h, borderRadius: 12, background: i === 4 ? lime : "rgba(243,243,238,0.14)" }} />
      ))}
    </div>
  );
}

export default async function PostCover({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  const title = post?.title ?? "Blog";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
          padding: 72,
          background: `radial-gradient(circle at 90% 10%, rgba(198,242,78,0.22), transparent 50%), ${ink}`,
          color: paper,
          fontFamily: "sans-serif",
        }}
      >
        <Motif type={post?.type ?? "guia"} />
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 22, letterSpacing: 4, textTransform: "uppercase", color: "#a1a19a" }}>
          <div style={{ display: "flex", width: 12, height: 12, borderRadius: 12, background: lime }} />
          {post?.category ?? "Blog"}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 30 }}>
          <div style={{ fontSize: title.length > 70 ? 54 : 64, fontWeight: 500, lineHeight: 1.08, letterSpacing: -2, maxWidth: 980 }}>
            {title}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 24, color: "#a1a19a" }}>
            <div
              style={{
                display: "flex",
                width: 44,
                height: 44,
                borderRadius: 22,
                background: paper,
                color: ink,
                alignItems: "center",
                justifyContent: "center",
                fontStyle: "italic",
                fontFamily: "serif",
                fontSize: 26,
              }}
            >
              R
            </div>
            Rey Ortiz · reyortiz.es/blog
          </div>
        </div>
      </div>
    ),
    size,
  );
}
