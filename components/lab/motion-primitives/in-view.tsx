"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useInView,
  type Transition,
  type UseInViewOptions,
  type Variants,
} from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

interface InViewProps {
  children: ReactNode;
  variants?: Variants;
  transition?: Transition;
  viewOptions?: UseInViewOptions;
}

export function InView({
  children,
  variants = defaultVariants,
  transition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  viewOptions = { once: true, margin: "-10%" },
}: InViewProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, viewOptions);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? undefined : "hidden"}
      animate={prefersReducedMotion ? undefined : isInView ? "visible" : "hidden"}
      variants={prefersReducedMotion ? undefined : variants}
      transition={transition}
    >
      {children}
    </motion.div>
  );
}
