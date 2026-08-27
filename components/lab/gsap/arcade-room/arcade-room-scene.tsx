"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { experiments } from "@/data/experiments";
import { ArcadeCabinet } from "@/components/lab/gsap/arcade-room/arcade-cabinet";
import { cn } from "@/lib/cn";

type Glyph = "circle" | "square" | "triangle" | "diamond";

const CABINET_STYLES: Array<{ color: string; screenColor: string; glyph: Glyph }> = [
  { color: "#ff4d1c", screenColor: "#7ef7d0", glyph: "circle" },
  { color: "#3a7bd5", screenColor: "#ffd166", glyph: "square" },
  { color: "#2fae66", screenColor: "#ff8fa3", glyph: "triangle" },
  { color: "#b45cff", screenColor: "#7ef7d0", glyph: "diamond" },
];

const cabinets = experiments
  .filter((experiment) => experiment.library === "GSAP")
  .map((experiment, index) => ({
    experiment,
    style: CABINET_STYLES[index % CABINET_STYLES.length],
    side: (index % 2 === 0 ? -1 : 1) as -1 | 1,
  }));

const SPACING = 420;
const TOTAL_DEPTH = cabinets.length * SPACING;
const WALL_OFFSET = 210;
const WALL_ANGLE = 40;

function wrap(min: number, max: number, value: number) {
  const range = max - min;
  return min + (((value - min) % range) + range) % range;
}

interface ArcadeRoomSceneProps {
  className?: string;
}

export function ArcadeRoomScene({ className }: ArcadeRoomSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cabinetRefs = useRef<Array<HTMLDivElement | null>>([]);
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const active = cabinets.find((cabinet) => cabinet.experiment.slug === activeSlug)?.experiment ?? null;

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const depth = { value: 0 };
      const depthEased = { value: 0 };

      const render = () => {
        cabinetRefs.current.forEach((el, index) => {
          if (!el) return;
          const baseZ = -(index * SPACING);
          const z = wrap(-TOTAL_DEPTH, 0, baseZ + depthEased.value);
          const t = z / -TOTAL_DEPTH;
          let opacity = 1;
          if (t < 0.1) opacity = t / 0.1;
          else if (t > 0.88) opacity = (1 - t) / 0.12;
          const side = cabinets[index].side;
          el.style.transform = `translate(-50%, -50%) translateX(${side * WALL_OFFSET}px) translateZ(${z}px) rotateY(${-side * WALL_ANGLE}deg)`;
          el.style.opacity = String(Math.max(0, Math.min(1, opacity)));
        });
      };

      render();

      const handleWheel = (event: WheelEvent) => {
        event.preventDefault();
        depth.value += event.deltaY * 1.4;
        gsap.to(depthEased, {
          value: depth.value,
          duration: prefersReducedMotion ? 0 : 0.6,
          ease: "power2.out",
          onUpdate: render,
          overwrite: true,
        });
      };

      container.addEventListener("wheel", handleWheel, { passive: false });
      return () => container.removeEventListener("wheel", handleWheel);
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] },
  );

  useGSAP(
    () => {
      if (!active || !panelRef.current) return;
      gsap.fromTo(
        panelRef.current,
        { opacity: 0, y: 16, scale: prefersReducedMotion ? 1 : 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: prefersReducedMotion ? 0 : 0.3,
          ease: "power2.out",
        },
      );
    },
    { dependencies: [active, prefersReducedMotion] },
  );

  return (
    <div className={cn("relative overflow-hidden bg-[#0c0a14]", className)}>
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 42%, #3a2f52 0%, #1a1626 55%, #0c0a14 100%)",
        }}
      />

      <div
        ref={containerRef}
        className="relative h-full w-full touch-none select-none"
        style={{ perspective: "1000px" }}
      >
        <div
          className="pointer-events-none absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {cabinets.map(({ experiment, style }, index) => (
            <div
              key={experiment.slug}
              ref={(el) => {
                cabinetRefs.current[index] = el;
              }}
              className="pointer-events-auto absolute left-1/2 top-1/2 w-32"
              style={{ transformStyle: "preserve-3d" }}
            >
              <button
                type="button"
                onClick={() => setActiveSlug(experiment.slug)}
                className="group flex w-full flex-col items-center gap-2 text-center"
              >
                <ArcadeCabinet
                  color={style.color}
                  screenColor={style.screenColor}
                  glyph={style.glyph}
                  className="w-full transition-transform group-hover:scale-105"
                />
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#c9c3e0]">
                  {experiment.name}
                </span>
              </button>
            </div>
          ))}
        </div>

        <p className="pointer-events-none absolute inset-x-0 bottom-4 text-center font-mono text-[10px] uppercase tracking-[0.14em] text-[#c9c3e0]/70">
          role para avançar pelo corredor
        </p>
      </div>

      {active ? (
        <div className="absolute inset-0 flex items-end justify-center bg-black/50 p-4 sm:items-center">
          <div ref={panelRef} className="w-full max-w-sm border border-border bg-surface p-5">
            <div className="flex items-start justify-between gap-4">
              <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
                {active.name}
              </p>
              <button
                type="button"
                onClick={() => setActiveSlug(null)}
                className="font-mono text-xs text-muted transition-colors hover:text-foreground"
                aria-label="Fechar"
              >
                ✕
              </button>
            </div>
            <p className="mt-3 text-sm text-muted">{active.summary}</p>
            <a
              href={`/lab/${active.slug}`}
              className="mt-4 inline-flex border border-foreground px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent"
            >
              Ver laboratório →
            </a>
          </div>
        </div>
      ) : null}
    </div>
  );
}
