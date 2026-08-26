"use client";

import { Lottie } from "lottie-react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function AutoplayDemo() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="w-full">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        {"<Lottie autoplay loop />"}
      </p>
      <div className="mt-6 flex h-56 items-center justify-center bg-surface">
        <Lottie
          src="/lottie/ripple.json"
          autoplay={!prefersReducedMotion}
          loop={!prefersReducedMotion}
          className="h-full w-full"
        />
      </div>
      {prefersReducedMotion ? (
        <p className="mt-4 text-sm text-muted">
          Com &quot;reduzir movimento&quot; ativo, a animação carrega
          parada no primeiro frame em vez de tocar em loop.
        </p>
      ) : null}
    </div>
  );
}
