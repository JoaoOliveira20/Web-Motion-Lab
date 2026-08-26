"use client";

import { Magnetic } from "@/components/lab/motion-primitives/magnetic";

const buttons = [
  { label: "range 60", range: 60, intensity: 0.5 },
  { label: "range 100", range: 100, intensity: 0.6 },
  { label: "range 160", range: 160, intensity: 0.4 },
];

export function MagneticShowcase() {
  return (
    <div className="w-full">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Magnetic
      </p>
      <div className="mt-8 flex flex-wrap items-center gap-8 py-6">
        {buttons.map((button) => (
          <Magnetic key={button.label} range={button.range} intensity={button.intensity}>
            <div className="border border-foreground px-5 py-3 font-mono text-xs uppercase tracking-[0.1em]">
              {button.label}
            </div>
          </Magnetic>
        ))}
      </div>
    </div>
  );
}
