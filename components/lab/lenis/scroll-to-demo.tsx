"use client";

import "lenis/dist/lenis.css";
import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const sections = ["A", "B", "C"];

function ScrollToControls() {
  const lenis = useLenis();

  return (
    <div className="sticky top-0 z-10 mb-4 flex gap-2 bg-surface p-2">
      {sections.map((section) => (
        <button
          key={section}
          type="button"
          onClick={() =>
            lenis?.scrollTo(`#lenis-section-${section}`, { offset: -8 })
          }
          className="border border-foreground px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:border-accent hover:text-accent"
        >
          {section}
        </button>
      ))}
    </div>
  );
}

function TargetSections() {
  return (
    <div className="flex flex-col gap-6">
      {sections.map((section) => (
        <div
          key={section}
          id={`lenis-section-${section}`}
          className="flex h-24 items-center bg-surface px-5"
        >
          <p className="font-mono text-xs text-accent">Seção {section}</p>
        </div>
      ))}
    </div>
  );
}

export function ScrollToDemo() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        lenis.scrollTo()
      </p>

      {prefersReducedMotion ? (
        <>
          <p className="mt-4 text-sm text-muted">
            Navegação programática desligada com &quot;reduzir
            movimento&quot; ativo; role manualmente na área abaixo.
          </p>
          <div className="mt-4 h-56 overflow-y-auto">
            <TargetSections />
          </div>
        </>
      ) : (
        <ReactLenis root={false} className="mt-4 block h-56 overflow-y-auto">
          <ScrollToControls />
          <TargetSections />
        </ReactLenis>
      )}
    </div>
  );
}
