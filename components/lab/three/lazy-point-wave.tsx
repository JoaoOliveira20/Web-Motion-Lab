"use client";

import dynamic from "next/dynamic";

const PointWaveScene = dynamic(
  () =>
    import("@/components/lab/three/point-wave-scene").then((mod) => mod.PointWaveScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[30rem] items-center justify-center border border-border font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Carregando Three.js…
      </div>
    ),
  },
);

export function LazyPointWaveScene() {
  return <PointWaveScene />;
}
