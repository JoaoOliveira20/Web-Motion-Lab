"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const steps = ["Fetch", "Parse", "Transform", "Render", "Commit"];

export function TimelineDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>("[data-timeline-step]");

      if (prefersReducedMotion) {
        gsap.set(targets, { opacity: 1, scaleY: 1 });
        return;
      }

      gsap.set(targets, { opacity: 0.15, scaleY: 0.3, transformOrigin: "bottom" });

      timelineRef.current = gsap
        .timeline({
          paused: true,
          onStart: () => setIsPlaying(true),
          onComplete: () => setIsPlaying(false),
        })
        .to(targets, {
          opacity: 1,
          scaleY: 1,
          duration: 0.5,
          stagger: 0.18,
          ease: "power3.out",
        });
    },
    { scope: containerRef, dependencies: [prefersReducedMotion] },
  );

  const handlePlay = () => {
    timelineRef.current?.restart();
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          gsap.timeline()
        </p>
        <button
          type="button"
          onClick={handlePlay}
          disabled={isPlaying}
          className="border border-foreground px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent disabled:opacity-40"
        >
          {isPlaying ? "Executando" : "Rodar timeline"}
        </button>
      </div>

      <div className="mt-8 flex h-32 items-end gap-3 overflow-hidden">
        {steps.map((step) => (
          <div
            key={step}
            data-timeline-step
            className="flex h-full flex-1 flex-col justify-end gap-2 bg-surface p-3"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-muted">
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
