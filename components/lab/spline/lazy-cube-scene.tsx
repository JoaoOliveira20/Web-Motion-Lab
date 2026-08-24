"use client";

import dynamic from "next/dynamic";

const CubeScene = dynamic(
  () => import("@/components/lab/spline/cube-scene").then((mod) => mod.CubeScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[26rem] items-center justify-center border border-border font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Carregando runtime do Spline…
      </div>
    ),
  },
);

export function LazyCubeScene() {
  return <CubeScene />;
}
