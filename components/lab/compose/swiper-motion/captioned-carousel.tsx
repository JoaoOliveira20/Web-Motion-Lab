"use client";

import "swiper/css";
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper/types";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const slides = [
  { title: "Módulos", caption: "Swiper resolve navegação e paginação prontas." },
  { title: "Eventos", caption: "onSlideChange expõe o índice ativo para fora do carrossel." },
  { title: "Legenda", caption: "A Motion anima a troca de texto fora do DOM do Swiper." },
];

export function CaptionedCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const handleSlideChange = (swiper: SwiperClass) => {
    setActiveIndex(swiper.activeIndex);
  };

  return (
    <div className="border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Swiper (slides) + Motion (legenda)
      </p>

      <div className="mt-6">
        <Swiper onSlideChange={handleSlideChange} spaceBetween={16}>
          {slides.map((slide) => (
            <SwiperSlide key={slide.title}>
              <div className="flex h-48 items-center justify-center border border-border bg-surface">
                <p className="font-display text-2xl font-light">{slide.title}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="mt-6 h-16 border-t border-border pt-4">
        <AnimatePresence mode="wait">
          <motion.p
            key={activeIndex}
            initial={prefersReducedMotion ? undefined : { opacity: 0, y: 8 }}
            animate={prefersReducedMotion ? undefined : { opacity: 1, y: 0 }}
            exit={prefersReducedMotion ? undefined : { opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="text-sm text-muted"
          >
            {slides[activeIndex]?.caption}
          </motion.p>
        </AnimatePresence>
      </div>
    </div>
  );
}
