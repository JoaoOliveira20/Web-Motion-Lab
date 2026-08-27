"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { experiments } from "@/data/experiments";
import { ArcadeCabinet } from "@/components/lab/gsap/arcade-room/arcade-cabinet";
import { cn } from "@/lib/cn";

gsap.registerPlugin(ScrollTrigger);

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
  }));

const REPEATS = 3;

interface ArcadeRoomSceneProps {
  className?: string;
}

export function ArcadeRoomScene({ className }: ArcadeRoomSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const setRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const prefersReducedMotion = useReducedMotion();

  const active = cabinets.find((cabinet) => cabinet.experiment.slug === activeSlug)?.experiment ?? null;

  useGSAP(
    () => {
      const container = containerRef.current;
      const set = setRef.current;
      if (!container || !set) return;

      const setWidth = set.getBoundingClientRect().width;
      container.scrollLeft = setWidth;

      const correctWrap = () => {
        if (container.scrollLeft < setWidth * 0.5) {
          container.scrollLeft += setWidth;
        } else if (container.scrollLeft > setWidth * 1.5) {
          container.scrollLeft -= setWidth;
        }
      };

      const trigger = ScrollTrigger.create({
        scroller: container,
        horizontal: true,
        start: 0,
        end: "max",
        onUpdate: correctWrap,
      });

      const handleWheel = (event: WheelEvent) => {
        if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
        event.preventDefault();
        container.scrollLeft += event.deltaY;
      };
      container.addEventListener("wheel", handleWheel, { passive: false });

      if (!prefersReducedMotion) {
        gsap.utils.toArray<HTMLElement>(".cabinet-glyph").forEach((glyph, index) => {
          gsap.to(glyph, {
            opacity: 0.4,
            duration: 1 + (index % 3) * 0.3,
            ease: "sine.inOut",
            yoyo: true,
            repeat: -1,
            delay: (index % 5) * 0.2,
          });
        });
      }

      return () => {
        trigger.kill();
        container.removeEventListener("wheel", handleWheel);
      };
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
    <div className={cn("relative overflow-hidden bg-[#171225]", className)}>
      <div
        className="absolute inset-x-0 top-0"
        style={{ height: "60%", background: "linear-gradient(180deg, #241a3a 0%, #171225 100%)" }}
      />
      <div
        className="absolute inset-x-0 bottom-0"
        style={{
          height: "40%",
          background:
            "repeating-linear-gradient(90deg, #201a30 0px, #201a30 38px, #241d38 38px, #241d38 40px)",
        }}
      />

      <div
        ref={containerRef}
        className="relative h-full w-full overflow-x-auto overflow-y-hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        <div className="flex h-full">
          {Array.from({ length: REPEATS }).map((_, repeatIndex) => (
            <div
              key={repeatIndex}
              ref={repeatIndex === 1 ? setRef : undefined}
              className="flex h-full shrink-0 items-end gap-16 px-16 pb-8"
            >
              {cabinets.map(({ experiment, style }) => (
                <button
                  key={`${repeatIndex}-${experiment.slug}`}
                  type="button"
                  onClick={() => setActiveSlug(experiment.slug)}
                  className="group flex w-24 shrink-0 flex-col items-center gap-2 text-center"
                >
                  <ArcadeCabinet
                    color={style.color}
                    screenColor={style.screenColor}
                    glyph={style.glyph}
                    className="h-40 w-24 transition-transform group-hover:-translate-y-1"
                  />
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-[#c9c3e0]">
                    {experiment.name}
                  </span>
                </button>
              ))}
            </div>
          ))}
        </div>
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
