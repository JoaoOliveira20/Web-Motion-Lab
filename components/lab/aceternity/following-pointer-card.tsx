"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useMotionValue, type MotionValue } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/cn";

interface FollowerPointerCardProps {
  children: ReactNode;
  className?: string;
  label: string;
}

export function FollowerPointerCard({
  children,
  className,
  label,
}: FollowerPointerCardProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const rectRef = useRef<DOMRect | null>(null);
  const [isInside, setIsInside] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (ref.current) {
      rectRef.current = ref.current.getBoundingClientRect();
    }
  }, []);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !rectRef.current) return;
    x.set(event.clientX - rectRef.current.left);
    y.set(event.clientY - rectRef.current.top);
  };

  return (
    <div
      onPointerEnter={() => !prefersReducedMotion && setIsInside(true)}
      onPointerLeave={() => setIsInside(false)}
      onPointerMove={handlePointerMove}
      ref={ref}
      style={{ cursor: prefersReducedMotion ? "default" : "none" }}
      className={cn("relative", className)}
    >
      <AnimatePresence>
        {isInside ? <FollowerPointer x={x} y={y} label={label} /> : null}
      </AnimatePresence>
      {children}
    </div>
  );
}

function FollowerPointer({
  x,
  y,
  label,
}: {
  x: MotionValue<number>;
  y: MotionValue<number>;
  label: string;
}) {
  return (
    <motion.div
      className="pointer-events-none absolute z-50"
      style={{ top: y, left: x }}
      initial={{ scale: 1, opacity: 1 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
    >
      <svg
        stroke="var(--accent)"
        fill="var(--accent)"
        strokeWidth="1"
        viewBox="0 0 16 16"
        className="h-5 w-5 -translate-x-3 -translate-y-2.5 -rotate-[70deg]"
      >
        <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
      </svg>
      <div className="ml-4 min-w-max whitespace-nowrap border border-foreground bg-background px-2 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-accent">
        {label}
      </div>
    </motion.div>
  );
}
