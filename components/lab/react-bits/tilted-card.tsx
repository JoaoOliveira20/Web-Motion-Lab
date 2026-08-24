"use client";

import { type ReactNode, type PointerEvent as ReactPointerEvent, useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/cn";

const springValues = { damping: 30, stiffness: 100, mass: 2 };

interface TiltedCardProps {
  children: ReactNode;
  caption: string;
  className?: string;
  rotateAmplitude?: number;
}

export function TiltedCard({
  children,
  caption,
  className,
  rotateAmplitude = 12,
}: TiltedCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), springValues);
  const rotateY = useSpring(useMotionValue(0), springValues);
  const captionOpacity = useSpring(0);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const offsetX = event.clientX - rect.left - rect.width / 2;
    const offsetY = event.clientY - rect.top - rect.height / 2;

    rotateX.set((offsetY / (rect.height / 2)) * -rotateAmplitude);
    rotateY.set((offsetX / (rect.width / 2)) * rotateAmplitude);
    x.set(event.clientX - rect.left);
    y.set(event.clientY - rect.top);
  };

  const handlePointerEnter = () => {
    if (prefersReducedMotion) return;
    captionOpacity.set(1);
  };

  const handlePointerLeave = () => {
    captionOpacity.set(0);
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <div
      ref={ref}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={cn("relative", className)}
      style={{ perspective: 800 }}
    >
      <motion.div
        style={prefersReducedMotion ? undefined : { rotateX, rotateY }}
        className="flex h-full w-full flex-col justify-end border border-border bg-surface p-6"
      >
        {children}
      </motion.div>

      {prefersReducedMotion ? null : (
        <motion.span
          style={{ x, y, opacity: captionOpacity }}
          className="pointer-events-none absolute left-0 top-0 -translate-y-1/2 whitespace-nowrap border border-foreground bg-background px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-accent"
        >
          {caption}
        </motion.span>
      )}
    </div>
  );
}
