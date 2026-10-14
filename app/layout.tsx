import type { ReactNode } from "react";
import "./globals.css";

// The <html> element lives in app/[locale]/layout.tsx so it can carry the right `lang`.
export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
