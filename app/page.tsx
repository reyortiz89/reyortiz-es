import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home",
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
