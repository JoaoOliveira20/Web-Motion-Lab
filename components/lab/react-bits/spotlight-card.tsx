"use client";

import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/cn";

interface SpotlightCardProps {
  children: ReactNode;
  className?: string;
  spotlightColor?: string;
}

export function SpotlightCard({
  children,
  className,
  spotlightColor = "color-mix(in srgb, var(--accent) 40%, transparent)",
}: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
    card.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      style={{ "--spotlight-color": spotlightColor } as React.CSSProperties}
      className={cn(
        "group relative overflow-hidden border border-border bg-surface p-6",
        "before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-500",
        "before:[background:radial-gradient(circle_at_var(--mouse-x,50%)_var(--mouse-y,50%),var(--spotlight-color),transparent_70%)]",
        "hover:before:opacity-100 focus-within:before:opacity-100",
        className,
      )}
    >
      {children}
    </div>
  );
}
