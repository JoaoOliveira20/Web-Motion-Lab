"use client";

import "swiper/css";
import "swiper/css/effect-cards";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards } from "swiper/modules";

const phases = [
  "Fase 0 — Fundação",
  "Fase 1 — Motion",
  "Fase 2 — UI",
  "Fase 3 — Conteúdo visual",
];

export function EffectCardsDemo() {
  return (
    <div className="w-full">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        EffectCards
      </p>
      <div className="mt-6 flex h-96 items-center justify-center">
        <Swiper
          modules={[EffectCards]}
          effect="cards"
          grabCursor
          className="h-full w-64"
        >
          {phases.map((phase) => (
            <SwiperSlide
              key={phase}
              className="flex items-center justify-center border border-border bg-surface p-4 text-center"
            >
              <p className="font-mono text-xs text-accent">{phase}</p>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
