import { ImageResponse } from "next/og";
import { profile } from "@/content/profile";
import { routing, type Locale } from "@/i18n/routing";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Rey Ortiz";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "radial-gradient(circle at 85% 0%, rgba(198,242,78,0.28), transparent 55%), #09090b",
          color: "#f3f3ee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 30, fontWeight: 500 }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 28,
              background: "#f3f3ee",
              color: "#09090b",
              alignItems: "center",
              justifyContent: "center",
              fontStyle: "italic",
              fontFamily: "serif",
              fontSize: 34,
            }}
          >
            R
          </div>
          Rey Ortiz
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          <div style={{ fontSize: 68, fontWeight: 500, lineHeight: 1.05, letterSpacing: -2, maxWidth: 1020 }}>
            {profile.headline[locale]}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26, color: "#a1a19a" }}>
            <div style={{ display: "flex", width: 14, height: 14, borderRadius: 7, background: "#c6f24e" }} />
            reyortiz.es
          </div>
        </div>
      </div>
    ),
    size,
  );
}
