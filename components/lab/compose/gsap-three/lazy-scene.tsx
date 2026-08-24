"use client";

import dynamic from "next/dynamic";

const ScrollCameraScene = dynamic(
  () =>
    import("@/components/lab/compose/gsap-three/scroll-camera-scene").then(
      (mod) => mod.ScrollCameraScene,
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

export function LazyScrollCameraScene() {
  return <ScrollCameraScene />;
}
