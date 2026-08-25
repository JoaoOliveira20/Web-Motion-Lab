"use client";

import { TsParticlesEngineProvider } from "@/components/lab/tsparticles/particles-provider";
import { RepulseField } from "@/components/lab/tsparticles/repulse-field";

export default function RepulseSection() {
  return (
    <TsParticlesEngineProvider>
      <RepulseField />
    </TsParticlesEngineProvider>
  );
}
