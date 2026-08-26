"use client";

import dynamic from "next/dynamic";

const RepulseSection = dynamic(
  () => import("@/components/lab/tsparticles/repulse-section"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[21.5rem] w-full items-center justify-center font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Carregando engine…
      </div>
    ),
  },
);

export function LazyRepulseField() {
  return <RepulseSection />;
}
