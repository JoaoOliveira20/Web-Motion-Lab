"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { SpotlightCard } from "@/components/lab/react-bits/spotlight-card";

const items = [
  { id: "motion", name: "Motion", category: "Animation" },
  { id: "gsap", name: "GSAP", category: "Animation" },
  { id: "react-bits", name: "React Bits", category: "UI" },
  { id: "magic-ui", name: "Magic UI", category: "UI" },
  { id: "three", name: "Three.js", category: "3D" },
  { id: "spline", name: "Spline", category: "3D" },
  { id: "tsparticles", name: "tsParticles", category: "Visual" },
  { id: "vanta", name: "Vanta", category: "Visual" },
];

const categories = ["Todos", "Animation", "UI", "3D", "Visual"];

export function FilterableGallery() {
  const [filter, setFilter] = useState("Todos");
  const prefersReducedMotion = useReducedMotion();
  const visible = items.filter(
    (item) => filter === "Todos" || item.category === filter,
  );

  return (
    <div className="border border-border p-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          AnimatePresence + SpotlightCard
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setFilter(category)}
            className={`border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] transition-colors ${
              filter === category
                ? "border-accent text-accent"
                : "border-foreground hover:border-accent hover:text-accent"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnimatePresence mode="popLayout">
          {visible.map((item) => (
            <motion.div
              key={item.id}
              layout={!prefersReducedMotion}
              initial={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.9 }}
              animate={prefersReducedMotion ? undefined : { opacity: 1, scale: 1 }}
              exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard className="flex h-28 flex-col justify-center">
                <p className="font-mono text-xs uppercase tracking-[0.1em] text-accent">
                  {item.category}
                </p>
                <p className="mt-2 font-display text-lg font-light">
                  {item.name}
                </p>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
