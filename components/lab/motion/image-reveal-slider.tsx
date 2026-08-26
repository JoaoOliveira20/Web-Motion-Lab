"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useTransform } from "motion/react";

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
      className="relative aspect-[3/4] w-full max-w-md select-none overflow-hidden bg-surface"
    >
      <Image
        src="/dog-portrait.png"
        alt="Retrato em aquarela de um cachorro, em preto e branco"
        fill
        sizes="(min-width: 640px) 28rem, 100vw"
        className="object-cover grayscale"
      />

      <motion.div className="absolute inset-0" style={{ clipPath }}>
        <Image
          src="/dog-portrait.png"
          alt="Retrato em aquarela de um cachorro, colorido"
          fill
          sizes="(min-width: 640px) 28rem, 100vw"
          className="object-cover"
        />
      </motion.div>

      <motion.div
        drag="x"
        dragConstraints={{ left: 0, right: width }}
        dragElastic={0}
        dragMomentum={false}
        style={{ x }}
        className="absolute top-0 left-0 -ml-4 flex h-full w-8 touch-none cursor-ew-resize items-center justify-center"
      >
        <div className="absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-accent" />
        <div className="relative flex h-10 w-10 items-center justify-center rounded-full border-2 border-accent bg-background">
          <svg
            viewBox="0 0 16 16"
            className="h-4 w-4 text-accent"
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
