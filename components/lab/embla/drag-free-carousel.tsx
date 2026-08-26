"use client";

import useEmblaCarousel from "embla-carousel-react";
import { libraries } from "@/data/libraries";

export function DragFreeCarousel() {
  const [emblaRef] = useEmblaCarousel({ dragFree: true, containScroll: "trimSnaps" });

  return (
    <div className="w-full">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        dragFree: true
      </p>
      <p className="mt-6 text-sm text-muted">
        Sem pontos de parada — arraste e solte com inércia livre, como um
        scroll horizontal comum.
      </p>
      <div className="mt-6 overflow-hidden" ref={emblaRef}>
        <div className="flex gap-3">
          {libraries.map((library) => (
            <div
              key={library.slug}
              className="min-w-0 flex-[0_0_auto] border border-border bg-surface px-4 py-3"
            >
              <p className="whitespace-nowrap font-mono text-xs uppercase tracking-[0.1em] text-muted">
                {library.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
