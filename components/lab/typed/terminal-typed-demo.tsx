"use client";

import { useMemo, useRef, useState } from "react";
import type { TypedOptions } from "typed.js";
import { useTyped } from "@/hooks/use-typed";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const commands = [
  "pnpm add motion",
  "pnpm add gsap @gsap/react",
  "pnpm add lenis",
  "pnpm add rough-notation",
];

export function TerminalTypedDemo() {
  const targetRef = useRef<HTMLSpanElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const options = useMemo<TypedOptions>(
    () => ({
      strings: commands,
      typeSpeed: 40,
      backSpeed: 25,
      backDelay: 1200,
      loop: true,
      showCursor: true,
      cursorChar: "▍",
    }),
    [],
  );

  const instanceRef = useTyped(
    prefersReducedMotion ? { current: null } : targetRef,
    options,
  );

  const handleToggle = () => {
    instanceRef.current?.toggle();
    setIsPaused((value) => !value);
  };

  const handleReset = () => {
    instanceRef.current?.reset(true);
    setIsPaused(false);
  };

  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          controle imperativo
        </p>
        {prefersReducedMotion ? null : (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleToggle}
              className="border border-foreground px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:border-accent hover:text-accent"
            >
              {isPaused ? "Retomar" : "Pausar"}
            </button>
            <button
              type="button"
              onClick={handleReset}
              className="border border-foreground px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:border-accent hover:text-accent"
            >
              Reiniciar
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 bg-surface p-5 font-mono text-sm">
        <span className="text-muted">$ </span>
        {prefersReducedMotion ? (
          <span>{commands[0]}</span>
        ) : (
          <span ref={targetRef} />
        )}
      </div>
    </div>
  );
}
