"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Lottie, type LottieHandle } from "lottie-react";

export function HoverPlayIcon() {
  const lottieRef = useRef<LottieHandle>(null);
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        whileHover (Motion) → play()/pause() (lottieRef)
      </p>

      <div className="mt-6 flex justify-center">
        <motion.div
          whileHover={prefersReducedMotion ? undefined : { scale: 1.05 }}
          whileTap={prefersReducedMotion ? undefined : { scale: 0.97 }}
          onHoverStart={() => lottieRef.current?.play()}
          onHoverEnd={() => lottieRef.current?.pause()}
          className="h-48 w-48 border border-border bg-surface"
        >
          <Lottie
            src="/lottie/ripple.json"
            lottieRef={lottieRef}
            autoplay={false}
            loop
            className="h-full w-full"
          />
        </motion.div>
      </div>

      <p className="mt-4 text-center text-xs text-muted">
        passe o mouse sobre o cartão
      </p>
    </div>
  );
}
