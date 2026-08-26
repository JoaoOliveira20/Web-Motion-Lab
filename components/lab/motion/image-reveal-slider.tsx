"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useTransform } from "motion/react";
import { DogMark } from "@/components/lab/motion/dog-mark";

export function ImageRevealSlider() {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasInitialized = useRef(false);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new ResizeObserver(([entry]) => {
      const nextWidth = entry.contentRect.width;
      setWidth(nextWidth);
      if (!hasInitialized.current) {
        x.set(nextWidth / 2);
        hasInitialized.current = true;
      }
    });

    observer.observe(container);
    return () => observer.disconnect();
  }, [x]);

  const clipPath = useTransform(x, (value) =>
    width > 0 ? `inset(0 ${100 - (value / width) * 100}% 0 0)` : "inset(0 50% 0 0)",
  );

  return (
    <div
      ref={containerRef}
      className="relative aspect-[4/3] w-full max-w-md select-none overflow-hidden bg-surface"
    >
      <div className="absolute inset-0 flex items-center justify-center p-10">
        <DogMark variant="sketch" className="h-full w-full" />
      </div>

      <motion.div
        className="absolute inset-0 flex items-center justify-center p-10"
        style={{ clipPath }}
      >
        <DogMark variant="solid" className="h-full w-full" />
      </motion.div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: width }}
        dragElastic={0}
        dragMomentum={false}
        style={{ x }}
        className="absolute top-0 left-0 -ml-4 flex h-full w-8 touch-none cursor-ew-resize items-center justify-center"
      >
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-foreground" />
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-foreground bg-background">
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4 text-foreground"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              d="M6 4L2 8l4 4M10 4l4 4-4 4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
