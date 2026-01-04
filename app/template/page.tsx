import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Template",
};

export default function TemplatePage() {
  // Temporary helper route to validate the shipped template HTML/CSS/JS.
  // Remove once the Next.js pages are rebuilt to match this template.
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <iframe
        title="Template preview"
        src="/template/index.html"
        style={{ width: "100%", height: "100%", border: 0 }}
      />
    </div>
  );
}
