"use client";

import dynamic from "next/dynamic";

const DotsBackground = dynamic(
  () => import("@/components/lab/vanta/dots-background").then((mod) => mod.DotsBackground),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[30rem] w-full items-center justify-center font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Carregando Three.js…
      </div>
    ),
  },
);

export function LazyDotsBackground() {
  return <DotsBackground />;
}
