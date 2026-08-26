"use client";

import { useEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Marquee } from "@/components/lab/magic-ui/marquee";
import { libraries } from "@/data/libraries";

const coverSlugs = ["motion", "gsap", "lenis", "three", "spline", "tsparticles"];

const covers = coverSlugs
  .map((slug) => libraries.find((library) => library.slug === slug))
  .filter((library): library is NonNullable<typeof library> => Boolean(library));

function TickerSection({
  index,
  containerRef,
  onActive,
  children,
}: {
  index: number;
  containerRef: RefObject<HTMLDivElement | null>;
  onActive: (index: number) => void;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { root: containerRef, amount: 0.6 });

  useEffect(() => {
    if (isInView) onActive(index);
  }, [isInView, index, onActive]);

  return (
    <div
      ref={ref}
      className="flex h-full shrink-0 snap-center items-center justify-center"
    >
      {children}
    </div>
  );
}

export function ScrollTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const active = covers[activeIndex];

  return (
    <div className="w-full">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        useInView(root) · scroll-snap
      </p>

      <div className="relative mt-6 h-[26rem] overflow-hidden border border-border">
        <div className="pointer-events-none absolute inset-0 flex items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={shouldReduceMotion ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={shouldReduceMotion ? undefined : { opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              <Marquee repeat={3} className="[--duration:16s]">
                <span className="font-display text-4xl font-light uppercase tracking-tight text-accent/20 sm:text-6xl">
                  {active.name}
                </span>
              </Marquee>
            </motion.div>
          </AnimatePresence>
        </div>

        <div
          ref={containerRef}
          className="relative z-10 h-full snap-y snap-mandatory overflow-y-auto"
        >
          {covers.map((library, index) => (
            <TickerSection
              key={library.slug}
              index={index}
              containerRef={containerRef}
              onActive={setActiveIndex}
            >
              <div className="flex h-48 w-40 flex-col items-center justify-center gap-2 border border-foreground bg-background px-4 text-center">
                <span className="font-display text-xl font-light">
                  {library.name}
                </span>
                <span className="text-xs text-muted">{library.purpose}</span>
              </div>
            </TickerSection>
          ))}
        </div>
      </div>

      <p className="mt-3 text-right font-mono text-[10px] text-muted">
        {String(activeIndex + 1).padStart(2, "0")} / {String(covers.length).padStart(2, "0")}
      </p>
    </div>
  );
}
