"use client";

import dynamic from "next/dynamic";

const ParticlesParallax = dynamic(
  () =>
    import("@/components/lab/compose/tsparticles-lenis/particles-parallax").then(
      (mod) => mod.ParticlesParallax,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[22rem] items-center justify-center border border-border font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Carregando engine…
      </div>
    ),
  },
);

export function LazyParticlesParallax() {
  return <ParticlesParallax />;
}
