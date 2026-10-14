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
          background: "linear-gradient(135deg, #070b14 0%, #13204a 60%, #1a3fb8 100%)",
          color: "#e8edf5",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20, fontSize: 32, fontWeight: 700 }}>
          <div
            style={{
              display: "flex",
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "#5b84ff",
              color: "#070b14",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            RO
          </div>
          Rey Ortiz
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div style={{ fontSize: 64, fontWeight: 700, lineHeight: 1.1, maxWidth: 1000 }}>{profile.headline[locale]}</div>
          <div style={{ fontSize: 28, color: "#9aa6b8" }}>reyortiz.es</div>
        </div>
      </div>
    ),
    size,
  );
}
