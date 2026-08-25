"use client";

import dynamic from "next/dynamic";

const DirectScrollScene = dynamic(
  () =>
    import("@/components/lab/compose/lenis-three/direct-scroll-scene").then(
      (mod) => mod.DirectScrollScene,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[26rem] items-center justify-center border border-border font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Carregando Three.js…
      </div>
    ),
  },
);

export function LazyDirectScrollScene() {
  return <DirectScrollScene />;
}
