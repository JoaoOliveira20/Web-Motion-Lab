"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min.js";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useCssVariable } from "@/hooks/use-css-variable";
import { hexStringToNumber } from "@/lib/color";
import { exposeThreeGlobally } from "@/lib/vanta-three-global";

export function NetBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const foreground = useCssVariable("--foreground", "#f4f3ef");
  const surface = useCssVariable("--surface", "#131312");

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    exposeThreeGlobally(THREE);

    const effect = NET({
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

    return () => effect.destroy();
  }, [prefersReducedMotion, foreground, surface]);

  return (
    <div className="border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        VANTA.NET
      </p>
      <div ref={containerRef} className="mt-6 h-64 bg-surface">
        {prefersReducedMotion ? (
          <div className="flex h-full items-center justify-center font-mono text-xs text-muted">
            Desligado com &quot;reduzir movimento&quot; ativo
          </div>
        ) : null}
      </div>
    </div>
  );
}
