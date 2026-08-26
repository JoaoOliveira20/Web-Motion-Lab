"use client";

import dynamic from "next/dynamic";

const CubeScene = dynamic(
  () => import("@/components/lab/spline/cube-scene").then((mod) => mod.CubeScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[40rem] w-full items-center justify-center font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Carregando runtime do Spline…
      </div>
    ),
  },
);

export function LazyCubeScene() {
  return <CubeScene />;
}
