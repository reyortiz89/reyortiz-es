import Link from "next/link";

// Requests outside any locale (rare, the proxy redirects almost everything).
export default function GlobalNotFound() {
  return (
    <html lang="es">
      <body style={{ fontFamily: "system-ui, sans-serif", padding: "4rem 1.5rem" }}>
        <h1>404</h1>
        <p>
          <Link href="/es">Volver al inicio</Link> · <Link href="/en">Back to home</Link>
        </p>
      </body>
    </html>
  );
}
