import { site } from "@/data/site";
import { TextCycler } from "../ui/TextCycler";

/**
 * Full-height photo hero with Rey's name and the rotating roles from the original site.
 */
export function Hero() {
  return (
    <section id="hero" className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-(--sidebar)">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={encodeURI(site.hero.image)}
        alt={site.identity.name}
        className="absolute inset-0 -z-20 h-full w-full animate-[hero-zoom_18s_ease-out_both] object-cover"
        style={{ objectPosition: "center 20%" }}
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-r from-black/75 via-black/45 to-black/10" />
      <div aria-hidden className="dot-grid absolute inset-0 -z-10 opacity-40 [--dot:rgba(255,255,255,0.12)]" />

      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10">
        <h1 className="animate-[hero-in_0.9s_ease-out_both] font-display text-5xl font-bold tracking-tight text-white sm:text-7xl">
          {site.hero.title}
        </h1>
        <p className="mt-4 animate-[hero-in_0.9s_0.15s_ease-out_both] text-2xl text-white/90 sm:text-3xl">
          {site.hero.prefix}{" "}
          <TextCycler words={[...site.hero.roles]} className="border-b-2 border-(--accent-2) font-semibold text-white" />
        </p>
      </div>

      <a
        href="#about"
        aria-label={site.nav.about}
        className="absolute bottom-8 left-1/2 flex h-12 w-7 -translate-x-1/2 justify-center rounded-full border-2 border-white/60 pt-2 hover:border-white"
      >
        <span className="h-2 w-1 animate-[scroll-dot_1.6s_ease-in-out_infinite] rounded-full bg-white" />
      </a>
    </section>
  );
}
