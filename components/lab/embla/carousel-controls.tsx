interface CarouselControlsProps {
  selectedIndex: number;
  scrollSnaps: number[];
  onPrev: () => void;
  onNext: () => void;
  onDotClick: (index: number) => void;
}

export function CarouselControls({
  selectedIndex,
  scrollSnaps,
  onPrev,
  onNext,
  onDotClick,
}: CarouselControlsProps) {
  return (
    <div className="mt-4 flex items-center justify-between">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onPrev}
          aria-label="Slide anterior"
          className="border border-foreground px-3 py-1.5 font-mono text-xs transition-colors hover:border-accent hover:text-accent"
        >
          ←
        </button>
        <button
          type="button"
          onClick={onNext}
          aria-label="Próximo slide"
          className="border border-foreground px-3 py-1.5 font-mono text-xs transition-colors hover:border-accent hover:text-accent"
        >
          →
        </button>
      </div>
      <div className="flex gap-2" role="tablist" aria-label="Navegação de slides">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === selectedIndex}
            aria-label={`Ir para o slide ${index + 1}`}
            onClick={() => onDotClick(index)}
            className={
              index === selectedIndex
                ? "h-1.5 w-5 bg-accent"
                : "h-1.5 w-1.5 bg-border transition-colors hover:bg-muted"
            }
          />
        ))}
      </div>
    </div>
  );
}
