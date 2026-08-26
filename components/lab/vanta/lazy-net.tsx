"use client";

import dynamic from "next/dynamic";

const NetBackground = dynamic(
  () => import("@/components/lab/vanta/net-background").then((mod) => mod.NetBackground),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[30rem] w-full items-center justify-center font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Carregando Three.js…
      </div>
    ),
  },
);

export function LazyNetBackground() {
  return <NetBackground />;
}
