"use client";

import { useMemo, useRef } from "react";
import type { TypedOptions } from "typed.js";
import { useTyped } from "@/hooks/use-typed";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { libraries } from "@/data/libraries";

export function ShowcaseHero() {
  const targetRef = useRef<HTMLSpanElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const options = useMemo<TypedOptions>(
    () => ({
      strings: libraries.map((library) => library.name),
      typeSpeed: 45,
      backSpeed: 25,
      backDelay: 900,
      loop: true,
      showCursor: true,
      cursorChar: "_",
    }),
    [],
  );

  useTyped(prefersReducedMotion ? { current: null } : targetRef, options);

  return (
    <section className="border-b border-border pb-20 pt-16 md:pt-24">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
        Fase 6 · Showcase
      </p>
      <h1 className="mt-6 max-w-3xl font-display text-display font-light leading-[1.05] tracking-tight">
        Dezesseis bibliotecas. Uma escolha por vez.
      </h1>
      <p className="mt-8 max-w-xl text-lg text-muted md:text-xl">
        Este laboratório testou{" "}
        {prefersReducedMotion ? (
          <span className="text-foreground">{libraries[0].name}</span>
        ) : (
          <span ref={targetRef} className="text-foreground" />
        )}{" "}
        e outras quinze ferramentas — cada uma isolada primeiro, depois
        combinada com outra, para decidir qual usar quando o problema
        aparecer de verdade.
      </p>
    </section>
  );
}
