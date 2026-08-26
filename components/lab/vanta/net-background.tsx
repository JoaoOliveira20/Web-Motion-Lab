"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import type NET from "vanta/dist/vanta.net.min.js";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useCssVariable } from "@/hooks/use-css-variable";
import { hexStringToNumber } from "@/lib/color";
import { exposeThreeGlobally } from "@/lib/vanta-three-global";

type VantaInstance = ReturnType<typeof NET>;

export function NetBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const foreground = useCssVariable("--foreground", "#f4f3ef");
  const surface = useCssVariable("--surface", "#131312");

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    let effect: VantaInstance | undefined;
    let cancelled = false;

    exposeThreeGlobally(THREE);

    import("vanta/dist/vanta.net.min.js").then(({ default: NET }) => {
      if (cancelled || !containerRef.current) return;

      effect = NET({
        el: containerRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200,
        minWidth: 200,
        scale: 1,
        scaleMobile: 1,
        color: hexStringToNumber(foreground),
        backgroundColor: hexStringToNumber(surface),
        points: 8,
        maxDistance: 22,
        spacing: 18,
        showDots: false,
      });
    });

    return () => {
      cancelled = true;
      effect?.destroy();
    };
  }, [prefersReducedMotion, foreground, surface]);

  return (
    <div className="w-full">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        VANTA.NET
      </p>
      <div ref={containerRef} className="mt-6 h-96 bg-surface">
        {prefersReducedMotion ? (
          <div className="flex h-full items-center justify-center font-mono text-xs text-muted">
            Desligado com &quot;reduzir movimento&quot; ativo
          </div>
        ) : null}
      </div>
    </div>
  );
}
