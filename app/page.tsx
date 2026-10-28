import type { Metadata } from "next";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: { absolute: `${profile.identity.name} | ${profile.identity.title}` },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        title="Template home"
        src="/template/index.html"
        style={{ width: "100%", height: "100%", border: 0 }}
      />
    </div>
  );
}
