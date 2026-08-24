"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useEmblaControls } from "@/components/lab/embla/use-embla-controls";
import { CarouselControls } from "@/components/lab/embla/carousel-controls";

const slides = [
  { title: "01", detail: "scrollSnaps() lista os pontos de parada disponíveis." },
  { title: "02", detail: "selectedScrollSnap() diz qual está ativo agora." },
  { title: "03", detail: "O evento 'select' sincroniza a UI com o scroll real." },
  { title: "04", detail: "Setas e pontos são construídos à mão, não vêm prontos." },
];

export function SnapCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const { selectedIndex, scrollSnaps, scrollPrev, scrollNext, scrollTo } =
    useEmblaControls(emblaApi);

  return (
    <div className="border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        useEmblaCarousel() · snap
      </p>
      <div className="mt-6 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {slides.map((slide) => (
            <div key={slide.title} className="min-w-0 flex-[0_0_80%] sm:flex-[0_0_60%]">
              <div className="flex h-32 flex-col justify-between border border-border bg-surface p-5">
                <p className="font-mono text-xs text-accent">{slide.title}</p>
                <p className="text-sm text-muted">{slide.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CarouselControls
        selectedIndex={selectedIndex}
        scrollSnaps={scrollSnaps}
        onPrev={scrollPrev}
        onNext={scrollNext}
        onDotClick={scrollTo}
      />
    </div>
  );
}
