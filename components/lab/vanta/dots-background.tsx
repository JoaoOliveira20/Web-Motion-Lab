"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import DOTS from "vanta/dist/vanta.dots.min.js";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useCssVariable } from "@/hooks/use-css-variable";
import { hexStringToNumber } from "@/lib/color";

export function DotsBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const accent = useCssVariable("--accent", "#ff4d1c");
  const muted = useCssVariable("--muted", "#918f88");
  const surface = useCssVariable("--surface", "#131312");

  useEffect(() => {
    if (prefersReducedMotion || !containerRef.current) return;

    const effect = DOTS({
      el: containerRef.current,
      THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200,
      minWidth: 200,
      scale: 1,
      scaleMobile: 1,
      color: hexStringToNumber(accent),
      color2: hexStringToNumber(muted),
      backgroundColor: hexStringToNumber(surface),
      size: 2.4,
      spacing: 28,
      showLines: true,
    });

    return () => effect.destroy();
  }, [prefersReducedMotion, accent, muted, surface]);

  return (
    <div className="border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        VANTA.DOTS
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
