"use client";

import "lenis/dist/lenis.css";
import { useRef, type RefObject } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

const panels = [
  { title: "01", detail: "lenis.on('scroll', ScrollTrigger.update) mantém as duas em sincronia." },
  { title: "02", detail: "gsap.ticker substitui o requestAnimationFrame interno do Lenis." },
  { title: "03", detail: "autoRaf: false evita dois loops de render competindo." },
  { title: "04", detail: "scrub liga a barra de progresso diretamente à posição interpolada." },
];

function GsapSync({
  prefersReducedMotion,
  progressBarRef,
}: {
  prefersReducedMotion: boolean;
  progressBarRef: RefObject<HTMLDivElement | null>;
}) {
  const lenis = useLenis();

  useGSAP(
    () => {
      if (prefersReducedMotion) {
        gsap.set("[data-lenis-panel]", { opacity: 1, y: 0 });
        return;
      }

      if (!lenis) return;

      const scroller = lenis.rootElement;
      const update = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(update);
      gsap.ticker.lagSmoothing(0);
      lenis.on("scroll", ScrollTrigger.update);

      gsap.set("[data-lenis-panel]", { opacity: 0, y: 24 });

      gsap.utils.toArray<HTMLElement>("[data-lenis-panel]").forEach((panel) => {
        gsap.to(panel, {
          opacity: 1,
          y: 0,
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

      return () => {
        gsap.ticker.remove(update);
      };
    },
    { dependencies: [prefersReducedMotion, lenis] },
  );

  return null;
}

export function SyncedScroller() {
  const progressBarRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Lenis (scroll) + GSAP (ScrollTrigger)
      </p>

      <div className="mt-4 h-1 w-full bg-border">
        <div
          ref={progressBarRef}
          className="h-full w-full origin-left scale-x-0 bg-accent"
        />
      </div>

      <ReactLenis
        root={false}
        options={{ autoRaf: false }}
        className="mt-4 block h-72 overflow-y-auto overflow-x-hidden p-4"
      >
        <GsapSync
          prefersReducedMotion={prefersReducedMotion}
          progressBarRef={progressBarRef}
        />
        <div className="flex flex-col gap-24">
          {panels.map((panel) => (
            <div key={panel.title} data-lenis-panel className="bg-surface p-5">
              <p className="font-mono text-xs text-accent">{panel.title}</p>
              <p className="mt-2 text-sm text-muted">{panel.detail}</p>
            </div>
          ))}
          <div aria-hidden className="h-4" />
        </div>
      </ReactLenis>
    </div>
  );
}
