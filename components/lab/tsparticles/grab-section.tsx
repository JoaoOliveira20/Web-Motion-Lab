"use client";

import { TsParticlesEngineProvider } from "@/components/lab/tsparticles/particles-provider";
import { GrabField } from "@/components/lab/tsparticles/grab-field";

export default function GrabSection() {
  return (
    <TsParticlesEngineProvider>
      <GrabField />
    </TsParticlesEngineProvider>
  );
}
