"use client";

import createGlobe from "cobe";
import { useReducedMotion } from "motion/react";
import { useEffect, useRef } from "react";
import { useTheme } from "../ThemeProvider";

export type GlobeLocation = { name: string; location: [number, number] };

/**
 * Draggable WebGL dot globe (cobe) with markers for each place and arcs from the home base.
 * Spins slowly on its own; dragging horizontally rotates it.
 */
export function Globe({ locations, home }: { locations: GlobeLocation[]; home: [number, number] }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef<number | null>(null);
  const dragOffset = useRef(0);
  const { theme } = useTheme();
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dark = theme === "dark";
    let width = canvas.offsetWidth;
    let phi = 0.6;
    let frame = 0;

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi,
      theta: 0.25,
      dark: dark ? 1 : 0,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: dark ? 5 : 8,
      baseColor: dark ? [0.15, 0.2, 0.32] : [1, 1, 1],
      markerColor: [0.23, 0.51, 0.96],
      glowColor: dark ? [0.12, 0.18, 0.35] : [0.92, 0.94, 0.98],
      markers: locations.map((l) => ({ location: l.location, size: 0.06 })),
      arcs: locations
        .filter((l) => l.location[0] !== home[0] || l.location[1] !== home[1])
        .map((l) => ({ from: home, to: l.location })),
      arcColor: [0.22, 0.74, 0.97],
      arcWidth: 0.6,
      arcHeight: 0.35,
      opacity: 0.95,
    });

    const onResize = () => {
      width = canvas.offsetWidth;
      globe.update({ width: width * 2, height: width * 2 });
    };
    window.addEventListener("resize", onResize);

    const tick = () => {
      if (pointer.current === null && !reduceMotion) phi += 0.003;
      globe.update({ phi: phi + dragOffset.current });
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    canvas.style.opacity = "1";

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      globe.destroy();
    };
  }, [home, locations, reduceMotion, theme]);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[520px]">
      <canvas
        ref={canvasRef}
        aria-label={`Globo interactivo con ${locations.map((l) => l.name).join(", ")}`}
        role="img"
        className="h-full w-full cursor-grab opacity-0 transition-opacity duration-700 active:cursor-grabbing"
        style={{ contain: "layout paint size", touchAction: "pan-y" }}
        onPointerDown={(e) => {
          pointer.current = e.clientX;
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerUp={() => (pointer.current = null)}
        onPointerCancel={() => (pointer.current = null)}
        onPointerMove={(e) => {
          if (pointer.current === null) return;
          const delta = e.clientX - pointer.current;
          pointer.current = e.clientX;
          dragOffset.current += delta / 200;
        }}
      />
    </div>
  );
}
