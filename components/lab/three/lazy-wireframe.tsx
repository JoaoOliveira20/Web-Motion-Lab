"use client";

import dynamic from "next/dynamic";

const WireframeScene = dynamic(
  () =>
    import("@/components/lab/three/wireframe-scene").then((mod) => mod.WireframeScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[30rem] w-full items-center justify-center font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Carregando Three.js…
      </div>
    ),
  },
);

export function LazyWireframeScene() {
  return <WireframeScene />;
}
