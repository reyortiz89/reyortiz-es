import Link from "next/link";
import { CartButton } from "./CartButton";

export function Header() {
  return (
    <header className="sticky top-0 z-30 bg-cream/90 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-7xl px-4 sm:px-8 h-16 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-baseline gap-3">
          <span className="font-display text-3xl tracking-wider text-orange leading-none">CLAIM THE SHELF</span>
          <span className="hidden sm:inline text-xs text-ink/60">eye level is buy level</span>
        </Link>
        <nav className="flex items-center gap-3 sm:gap-5 text-sm font-semibold">
          <Link href="/#how" className="hidden sm:inline hover:underline">How it works</Link>
          <Link href="/stats" className="hidden sm:inline hover:underline">Live stats</Link>
          <CartButton />
        </nav>
      </div>
    </header>
  );
}
