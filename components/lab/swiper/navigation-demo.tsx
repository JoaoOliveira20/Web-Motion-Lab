"use client";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

const categories = [
  { name: "Scroll", detail: "Lenis controla a interpolação da posição de rolagem." },
  { name: "Animation", detail: "Motion e GSAP resolvem timing e sequenciamento." },
  { name: "UI", detail: "Bibliotecas de cópia adaptadas aos tokens do projeto." },
  { name: "3D", detail: "Three.js e Spline, ainda na Fase 4." },
  { name: "Carousel", detail: "Este próprio experimento — Swiper vs. Embla." },
];

export function NavigationDemo() {
  return (
    <div className="border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Navigation + Pagination
      </p>
      <div
        className="mt-6"
        style={{ "--swiper-theme-color": "var(--accent)" } as React.CSSProperties}
      >
        <Swiper
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          spaceBetween={16}
          slidesPerView={1.15}
          breakpoints={{ 640: { slidesPerView: 2.2 } }}
          className="pb-10"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.name}>
              <div className="flex h-40 flex-col justify-between border border-border bg-surface p-5">
                <p className="font-mono text-xs text-accent">{category.name}</p>
                <p className="text-sm text-muted">{category.detail}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
