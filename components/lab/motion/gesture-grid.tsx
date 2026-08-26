"use client";

import { motion, useReducedMotion } from "motion/react";

const cards = [
  {
    label: "whileHover",
    detail: "Escala ao passar o ponteiro",
    gesture: { whileHover: { scale: 1.04 } },
  },
  {
    label: "whileTap",
    detail: "Escala ao pressionar",
    gesture: { whileTap: { scale: 0.96 } },
  },
  {
    label: "whileFocus",
    detail: "Escala ao focar via teclado",
    gesture: { whileFocus: { scale: 1.04 } },
  },
];

export function GestureGrid() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <motion.button
          key={card.label}
          type="button"
          {...(shouldReduceMotion ? {} : card.gesture)}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex flex-col items-start gap-2 border border-border bg-surface p-5 text-left"
        >
          <span className="font-mono text-xs text-accent">{card.label}</span>
          <span className="text-sm text-muted">{card.detail}</span>
        </motion.button>
      ))}
    </div>
  );
}
