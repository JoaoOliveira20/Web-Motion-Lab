"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

const RADIUS = 108;

type ActionShape = "circle" | "square" | "triangle" | "diamond" | "plus" | "hexagon";

const actions: Array<{ label: string; shape: ActionShape }> = [
  { label: "Curtir", shape: "circle" },
  { label: "Compartilhar", shape: "diamond" },
  { label: "Editar", shape: "square" },
  { label: "Arquivar", shape: "hexagon" },
  { label: "Adicionar", shape: "plus" },
  { label: "Remover", shape: "triangle" },
];

function ActionIcon({ shape }: { shape: ActionShape }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {shape === "circle" ? <circle cx="12" cy="12" r="7" /> : null}
      {shape === "square" ? <rect x="5" y="5" width="14" height="14" rx="1" /> : null}
      {shape === "triangle" ? <path d="M12 5 L19 19 L5 19 Z" /> : null}
      {shape === "diamond" ? <path d="M12 4 L20 12 L12 20 L4 12 Z" /> : null}
      {shape === "plus" ? <path d="M12 5 V19 M5 12 H19" /> : null}
      {shape === "hexagon" ? (
        <path d="M12 3 L20 7.5 L20 16.5 L12 21 L4 16.5 L4 7.5 Z" />
      ) : null}
    </svg>
  );
}

export function RadialMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="relative flex h-72 w-72 items-center justify-center">
      <AnimatePresence>
        {isOpen
          ? actions.map((action, index) => {
              const angle = (index / actions.length) * Math.PI * 2 - Math.PI / 2;
              const x = Math.cos(angle) * RADIUS;
              const y = Math.sin(angle) * RADIUS;

              return (
                <motion.button
                  key={action.label}
                  type="button"
                  aria-label={action.label}
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                  animate={{ x, y, opacity: 1, scale: 1 }}
                  exit={{ x: 0, y: 0, opacity: 0, scale: 0.4 }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          scale: 1.18,
                          zIndex: 20,
                          transition: { type: "spring", stiffness: 400, damping: 18 },
                        }
                  }
                  transition={
                    shouldReduceMotion
                      ? { duration: 0 }
                      : { type: "spring", stiffness: 380, damping: 24, delay: index * 0.035 }
                  }
                  className="absolute flex h-11 w-11 items-center justify-center border border-border bg-surface text-muted transition-colors hover:border-accent hover:text-accent"
                >
                  <ActionIcon shape={action.shape} />
                </motion.button>
              );
            })
          : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Fechar menu radial" : "Abrir menu radial"}
        onClick={() => setIsOpen((value) => !value)}
        animate={{ rotate: isOpen ? 45 : 0 }}
        whileHover={
          shouldReduceMotion ? undefined : { scale: 1.12, transition: { duration: 0.15 } }
        }
        transition={{ duration: shouldReduceMotion ? 0 : 0.25 }}
        className="relative z-10 flex h-14 w-14 items-center justify-center border border-foreground bg-background text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <ActionIcon shape="plus" />
      </motion.button>
    </div>
  );
}
