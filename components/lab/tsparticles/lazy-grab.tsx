"use client";

import dynamic from "next/dynamic";

const GrabSection = dynamic(
  () => import("@/components/lab/tsparticles/grab-section"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[21.5rem] w-full items-center justify-center font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Carregando engine…
      </div>
    ),
  },
);

export function LazyGrabField() {
  return <GrabSection />;
}
