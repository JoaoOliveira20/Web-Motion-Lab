"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export function PresenceDemo() {
  const [isOpen, setIsOpen] = useState(true);
  const panelId = useId();
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="border border-border p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          AnimatePresence
        </p>
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={() => setIsOpen((value) => !value)}
          className="border border-foreground px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent"
        >
          {isOpen ? "Fechar painel" : "Abrir painel"}
        </button>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            id={panelId}
            key="panel"
            initial={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            style={{ overflow: "hidden" }}
          >
            <p className="mt-6 text-sm text-muted">
              Este painel monta e desmonta do DOM. AnimatePresence intercepta
              a saída do elemento e espera a animação de exit terminar antes
              de removê-lo — algo que o React sozinho não oferece.
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
