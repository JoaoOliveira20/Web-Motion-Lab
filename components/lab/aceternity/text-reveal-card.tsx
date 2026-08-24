"use client";

import { useEffect, useRef, useState, memo, type ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface TextRevealCardProps {
  text: string;
  revealText: string;
  children?: ReactNode;
  className?: string;
}

export function TextRevealCard({
  text,
  revealText,
  children,
  className,
}: TextRevealCardProps) {
  const [widthPercentage, setWidthPercentage] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [left, setLeft] = useState(0);
  const [localWidth, setLocalWidth] = useState(0);
  const [isPointerOver, setIsPointerOver] = useState(false);

  useEffect(() => {
    if (cardRef.current) {
      const rect = cardRef.current.getBoundingClientRect();
      setLeft(rect.left);
      setLocalWidth(rect.width);
    }
  }, []);

  const updateFromClientX = (clientX: number) => {
    const relativeX = clientX - left;
    setWidthPercentage((relativeX / localWidth) * 100);
  };

  const rotateDeg = (widthPercentage - 50) * 0.1;

  return (
    <div
      onPointerEnter={() => setIsPointerOver(true)}
      onPointerLeave={() => {
        setIsPointerOver(false);
        setWidthPercentage(0);
      }}
      onPointerMove={(event) => updateFromClientX(event.clientX)}
      ref={cardRef}
      className={cn(
        "relative w-full overflow-hidden border border-border bg-surface p-8",
        className,
      )}
    >
      {children}

      <div className="relative flex h-32 items-center overflow-hidden">
        <motion.div
          animate={{
            clipPath: `inset(0 ${100 - widthPercentage}% 0 0)`,
            opacity: isPointerOver ? (widthPercentage > 0 ? 1 : 0) : undefined,
          }}
          transition={isPointerOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute z-20 w-full bg-surface will-change-transform"
        >
          <p className="bg-gradient-to-b from-foreground to-muted bg-clip-text py-6 font-display text-3xl font-light text-transparent sm:text-4xl">
            {revealText}
          </p>
        </motion.div>

        <motion.div
          animate={{
            left: `${widthPercentage}%`,
            rotate: `${rotateDeg}deg`,
            opacity: widthPercentage > 0 ? 1 : 0,
          }}
          transition={isPointerOver ? { duration: 0 } : { duration: 0.4 }}
          className="absolute z-50 h-32 w-px bg-accent will-change-transform"
        />

        <div className="overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,white,transparent)]">
          <p className="bg-border bg-clip-text py-6 font-display text-3xl font-light text-transparent sm:text-4xl">
            {text}
          </p>
          <MemoizedStars />
        </div>
      </div>
    </div>
  );
}

export function TextRevealCardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h3 className={cn("text-lg text-foreground", className)}>{children}</h3>;
}

export function TextRevealCardDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn("mt-1 text-sm text-muted", className)}>{children}</p>;
}

interface StarConfig {
  startTop: number;
  startLeft: number;
  endTop: number;
  endLeft: number;
  opacity: number;
  duration: number;
}

function createStarConfigs(count: number): StarConfig[] {
  return Array.from({ length: count }, () => ({
    startTop: Math.random() * 100,
    startLeft: Math.random() * 100,
    endTop: Math.random() * 100,
    endLeft: Math.random() * 100,
    opacity: Math.random(),
    duration: Math.random() * 10 + 20,
  }));
}

const Stars = () => {
  const [stars] = useState(() => createStarConfigs(40));
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0" aria-hidden>
      {stars.map((star, index) => (
        <motion.span
          key={index}
          animate={
            prefersReducedMotion
              ? undefined
              : {
                  top: `${star.endTop}%`,
                  left: `${star.endLeft}%`,
                  opacity: star.opacity,
                  scale: [1, 1.2, 0],
                }
          }
          transition={{
            duration: star.duration,
            repeat: Infinity,
            ease: "linear",
          }}
          style={{
            position: "absolute",
            top: `${star.startTop}%`,
            left: `${star.startLeft}%`,
            width: 2,
            height: 2,
            backgroundColor: "var(--muted)",
            borderRadius: "9999px",
          }}
        />
      ))}
    </div>
  );
};

const MemoizedStars = memo(Stars);
