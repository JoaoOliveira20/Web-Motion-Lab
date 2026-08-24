"use client";

import { useMemo } from "react";
import { Particles } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useCssVariable } from "@/hooks/use-css-variable";

export function GrabField() {
  const prefersReducedMotion = useReducedMotion();
  const muted = useCssVariable("--muted", "#918f88");

  const options = useMemo<ISourceOptions>(
    () => ({
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: { value: 45 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 2 } },
        move: {
          enable: !prefersReducedMotion,
          speed: 0.6,
          direction: "none",
          outModes: { default: "out" },
        },
        paint: { fill: { color: { value: muted } } },
      },
      interactivity: prefersReducedMotion
        ? { events: { onHover: { enable: false } } }
        : {
            events: {
              onHover: { enable: true, mode: "grab" },
            },
            modes: {
              grab: { distance: 140, links: { opacity: 0.5 } },
            },
          },
    }),
    [prefersReducedMotion, muted],
  );

  return (
    <div className="border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        hover: grab
      </p>
      <div className="mt-6 h-64 bg-surface">
        <Particles id="grab-field" options={options} className="h-full w-full" />
      </div>
      <p className="mt-2 font-mono text-[10px] text-accent">
        sem links entre partículas — as linhas só aparecem do cursor
      </p>
    </div>
  );
}
