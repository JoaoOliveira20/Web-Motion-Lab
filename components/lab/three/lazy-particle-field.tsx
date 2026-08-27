"use client";

import dynamic from "next/dynamic";

const ParticleFieldScene = dynamic(
  () =>
    import("@/components/lab/three/particle-field-scene").then((mod) => mod.ParticleFieldScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[26rem] w-full items-center justify-center font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Carregando Three.js…
      </div>
    ),
  },
);

interface LazyParticleFieldProps {
  className?: string;
}

export function LazyParticleField({ className }: LazyParticleFieldProps) {
  return <ParticleFieldScene className={className} />;
}
