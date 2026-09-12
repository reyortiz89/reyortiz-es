import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 pt-20 text-center">
      <h1 className="font-display text-6xl tracking-wide">EMPTY SHELF.</h1>
      <p className="mt-2 text-ink/70">That page isn&apos;t here. <Link href="/" className="underline">Back to the aisle</Link>.</p>
    </div>
  );
}
