"use client";

import { TsParticlesEngineProvider } from "@/components/lab/tsparticles/particles-provider";
import { RepulseField } from "@/components/lab/tsparticles/repulse-field";
import { GrabField } from "@/components/lab/tsparticles/grab-field";

export default function TsParticlesSection() {
  return (
    <TsParticlesEngineProvider>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RepulseField />
        <GrabField />
      </div>
    </TsParticlesEngineProvider>
  );
}
