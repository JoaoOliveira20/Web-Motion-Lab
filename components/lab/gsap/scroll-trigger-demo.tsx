"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  { title: "Elemento 1", detail: "Entra ao cruzar o topo do scroller" },
  { title: "Elemento 2", detail: "Entra com leve atraso" },
  { title: "Elemento 3", detail: "Entra por último" },
];

export function ScrollTriggerDemo() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      if (prefersReducedMotion) {
        gsap.set("[data-panel]", { opacity: 1, x: 0 });
        return;
      }

      gsap.set("[data-panel]", { opacity: 0, x: 24 });

      gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((panel) => {
        gsap.to(panel, {
          opacity: 1,
          x: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            scroller,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        });
      });

      gsap.to(progressBarRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: scroller,
          scroller,
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    },
    { scope: scrollerRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <div className="border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        ScrollTrigger
      </p>

      <div className="mt-4 h-1 w-full bg-border">
        <div
          ref={progressBarRef}
          className="h-full w-full origin-left scale-x-0 bg-accent"
        />
      </div>

      <div
        ref={scrollerRef}
        className="mt-4 flex h-56 flex-col gap-24 overflow-y-auto overflow-x-hidden p-4"
      >
        {panels.map((panel) => (
          <div key={panel.title} data-panel className="bg-surface p-5">
            <p className="font-mono text-xs text-accent">{panel.title}</p>
            <p className="mt-2 text-sm text-muted">{panel.detail}</p>
          </div>
        ))}
        <div aria-hidden className="h-4" />
      </div>
    </div>
  );
}
