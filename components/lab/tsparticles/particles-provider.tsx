"use client";

import { type ReactNode } from "react";
import { ParticlesProvider } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { Engine } from "@tsparticles/engine";

async function initEngine(engine: Engine) {
  await loadSlim(engine);
}

export function TsParticlesEngineProvider({ children }: { children: ReactNode }) {
  return <ParticlesProvider init={initEngine}>{children}</ParticlesProvider>;
}
