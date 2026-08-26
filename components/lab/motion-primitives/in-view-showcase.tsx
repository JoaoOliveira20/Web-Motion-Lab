"use client";

import { InView } from "@/components/lab/motion-primitives/in-view";

const items = [
  "Cada item observa a própria visibilidade com useInView.",
  "once: true garante que a animação não repete ao rolar de volta.",
  "margin negativa antecipa a revelação antes do item tocar a borda.",
];

export function InViewShowcase() {
  return (
    <div className="w-full">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        InView
      </p>
      <div className="mt-4 flex h-56 flex-col gap-24 overflow-y-auto p-4">
        {items.map((item, index) => (
          <InView
            key={item}
            transition={{
              duration: 0.5,
              delay: index * 0.05,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <div className="bg-surface p-5">
              <p className="font-mono text-xs text-accent">
                item {String(index + 1).padStart(2, "0")}
              </p>
              <p className="mt-2 text-sm text-muted">{item}</p>
            </div>
          </InView>
        ))}
        <div aria-hidden className="h-4" />
      </div>
    </div>
  );
}
