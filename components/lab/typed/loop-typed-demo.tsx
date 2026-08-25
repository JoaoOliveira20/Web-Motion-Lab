"use client";

import { useMemo, useRef } from "react";
import type { TypedOptions } from "typed.js";
import { useTyped } from "@/hooks/use-typed";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const strings = [
  "escolher a biblioteca certa.",
  "comparar GSAP e Motion.",
  "testar scroll suave com Lenis.",
  "documentar o que funciona.",
];

export function LoopTypedDemo() {
  const targetRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const options = useMemo<TypedOptions>(
    () => ({
      strings,
      typeSpeed: 35,
      backSpeed: 20,
      backDelay: 1400,
      loop: true,
      showCursor: true,
      cursorChar: "_",
    }),
    [],
  );

  useTyped(prefersReducedMotion ? { current: null } : targetRef, options);

  return (
    <div className="aspect-[1.618/1] overflow-y-auto border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        new Typed(elemento, options)
      </p>
      <p className="mt-8 min-h-[3.5rem] font-display text-2xl font-light">
        Este laboratório existe para{" "}
        {prefersReducedMotion ? (
          <span>{strings[0]}</span>
        ) : (
          <span ref={targetRef} />
        )}
      </p>
    </div>
  );
}
