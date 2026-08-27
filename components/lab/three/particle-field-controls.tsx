"use client";

import { useEffect, useRef, useState } from "react";
import {
  particleFieldConfigFields,
  particleFieldPresets,
  type ParticleFieldConfig,
} from "@/components/lab/three/particle-field-config";

interface ParticleFieldControlsProps {
  config: ParticleFieldConfig;
  activePresetId: string | null;
  onPresetSelect: (presetId: string) => void;
  onFieldChange: (key: keyof ParticleFieldConfig, value: number) => void;
}

function GearIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3.5 V6 M12 18 V20.5 M20.5 12 H18 M6 12 H3.5 M17.66 6.34 L15.83 8.17 M8.17 15.83 L6.34 17.66 M17.66 17.66 L15.83 15.83 M8.17 8.17 L6.34 6.34" />
    </svg>
  );
}

export function ParticleFieldControls({
  config,
  activePresetId,
  onPresetSelect,
  onFieldChange,
}: ParticleFieldControlsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="absolute right-3 top-3 z-10">
      <button
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-label="Configurações do efeito"
        aria-expanded={isOpen}
        className="flex h-8 w-8 items-center justify-center border border-border bg-surface/90 text-muted transition-colors hover:text-accent"
      >
        <GearIcon />
      </button>

      {isOpen ? (
        <div className="absolute right-0 top-10 w-72 border border-border bg-surface/95 p-4">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Predefinições
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {particleFieldPresets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => onPresetSelect(preset.id)}
                className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] transition-colors ${
                  activePresetId === preset.id
                    ? "border-accent text-accent"
                    : "border-border text-muted hover:text-foreground"
                }`}
              >
                {preset.label}
              </button>
            ))}
          </div>

          <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
            Personalizar
          </p>
          <div className="mt-2 flex flex-col gap-3">
            {particleFieldConfigFields.map((field) => (
              <label key={field.key} className="flex flex-col gap-1">
                <span className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-muted">
                  {field.label}
                  <span className="text-foreground">{config[field.key].toFixed(2)}</span>
                </span>
                <input
                  type="range"
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  value={config[field.key]}
                  onChange={(event) => onFieldChange(field.key, Number(event.target.value))}
                  className="accent-accent"
                />
              </label>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
