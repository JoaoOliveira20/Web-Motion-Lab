"use client";

import { useMemo } from "react";
import { Particles } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useCssVariable } from "@/hooks/use-css-variable";

export function RepulseField() {
  const prefersReducedMotion = useReducedMotion();
  const accent = useCssVariable("--accent", "#ff4d1c");
  const foreground = useCssVariable("--foreground", "#f4f3ef");

  const options = useMemo<ISourceOptions>(
    () => ({
      fpsLimit: 60,
      detectRetina: true,
      fullScreen: { enable: false },
      particles: {
        number: { value: 60 },
        shape: { type: "circle" },
        size: { value: { min: 1, max: 3 } },
        move: {
          enable: !prefersReducedMotion,
          speed: 1.2,
          direction: "none",
          outModes: { default: "out" },
        },
        paint: { fill: { color: { value: accent } } },
        links: {
          enable: true,
          distance: 120,
          color: foreground,
          opacity: 0.25,
          width: 1,
        },
      },
      interactivity: prefersReducedMotion
        ? { events: { onHover: { enable: false }, onClick: { enable: false } } }
        : {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
            },
            modes: {
              repulse: { distance: 100, duration: 0.4 },
              push: { quantity: 3 },
            },
          },
    }),
    [prefersReducedMotion, accent, foreground],
  );

  return (
    <div className="border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        hover: repulse · click: push
      </p>
      <div className="mt-6 h-64 bg-surface">
        <Particles id="repulse-field" options={options} className="h-full w-full" />
      </div>
    </div>
  );
}
