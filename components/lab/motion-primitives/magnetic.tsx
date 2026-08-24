"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, type SpringOptions } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const DEFAULT_SPRING: SpringOptions = { stiffness: 26.7, damping: 4.1, mass: 0.2 };

interface MagneticProps {
  children: ReactNode;
  intensity?: number;
  range?: number;
  springOptions?: SpringOptions;
}

export function Magnetic({
  children,
  intensity = 0.6,
  range = 100,
  springOptions = DEFAULT_SPRING,
}: MagneticProps) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, springOptions);
  const springY = useSpring(y, springOptions);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const calculateDistance = (event: MouseEvent) => {
      const element = ref.current;
      if (!element) return;

      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = event.clientX - centerX;
      const distanceY = event.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (isHovered && distance <= range) {
        const scale = 1 - distance / range;
        x.set(distanceX * intensity * scale);
        y.set(distanceY * intensity * scale);
      } else {
        x.set(0);
        y.set(0);
      }
    };

    document.addEventListener("mousemove", calculateDistance);
    return () => document.removeEventListener("mousemove", calculateDistance);
  }, [isHovered, intensity, range, prefersReducedMotion, x, y]);

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
      }}
      style={prefersReducedMotion ? undefined : { x: springX, y: springY }}
      className="inline-block"
    >
      {children}
    </motion.div>
  );
}
