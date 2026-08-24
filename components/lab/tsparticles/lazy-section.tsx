"use client";

import dynamic from "next/dynamic";

const TsParticlesSection = dynamic(
  () => import("@/components/lab/tsparticles/tsparticles-section"),
  {
    ssr: false,
    loading: () => (
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="flex h-[21.5rem] items-center justify-center border border-border font-mono text-xs uppercase tracking-[0.14em] text-muted">
          Carregando engine…
        </div>
        <div className="flex h-[21.5rem] items-center justify-center border border-border font-mono text-xs uppercase tracking-[0.14em] text-muted">
          Carregando engine…
        </div>
      </div>
    ),
  },
);

export function TsParticlesLazySection() {
  return <TsParticlesSection />;
}
