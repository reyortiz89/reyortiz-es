import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";

export const alt = `${profile.identity.name} | ${profile.identity.title}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default social card for every page (LinkedIn, X, WhatsApp previews).
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(135deg, #0b1220 0%, #12203a 100%)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 72, fontWeight: 700 }}>{profile.identity.name}</div>
        <div style={{ fontSize: 40, marginTop: 24, color: "#9fb4d8" }}>{profile.identity.title}</div>
        <div style={{ fontSize: 28, marginTop: 48, color: "#6f86ad" }}>reyortiz.es</div>
      </div>
    ),
    size,
  );
}
