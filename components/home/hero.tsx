"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/layout/container";

const headlineLines = ["WEB", "MOTION", "LAB"];

export function Hero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden border-b border-border pb-20 pt-16 md:pt-24">
      <Container>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Laboratório experimental de front-end
        </p>

        <h1 className="mt-6 font-display text-hero font-light leading-[0.92] tracking-tight">
          {headlineLines.map((line, index) => (
            <motion.span
              key={line}
              className="block"
              initial={shouldReduceMotion ? undefined : { y: "110%" }}
              animate={shouldReduceMotion ? undefined : { y: "0%" }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{ overflow: "hidden" }}
            >
              {line}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="mt-8 max-w-xl text-lg text-muted md:text-xl"
          initial={shouldReduceMotion ? undefined : { opacity: 0, y: 16 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Experimentos isolados com as principais bibliotecas de animação,
          UI, scroll, partículas e 3D do front-end moderno — para entender
          qual ferramenta escolher, não quantas dá para acumular.
        </motion.p>
      </Container>
    </section>
  );
}
