"use client";

import { useRef, useState } from "react";
import { Lottie, type LottieHandle } from "lottie-react";

const speeds = [0.5, 1, 2];

export function ControlledDemo() {
  const lottieRef = useRef<LottieHandle>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = () => {
    if (isPlaying) {
      lottieRef.current?.pause();
    } else {
      lottieRef.current?.play();
    }
    setIsPlaying((value) => !value);
  };

  return (
    <div className="border border-border p-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {"lottieRef · controle imperativo"}
        </p>
        <div className="flex gap-2">
          {speeds.map((speed) => (
            <button
              key={speed}
              type="button"
              onClick={() => lottieRef.current?.setSpeed(speed)}
              className="border border-foreground px-2 py-1 font-mono text-xs uppercase tracking-[0.1em] transition-colors hover:border-accent hover:text-accent"
            >
              {speed}x
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6 h-56 overflow-hidden bg-surface">
        <Lottie
          src="/lottie/ripple.json"
          lottieRef={lottieRef}
          autoplay={false}
          loop
          className="h-full w-full"
        />
      </div>

      <button
        type="button"
        onClick={handleToggle}
        className="mt-4 border border-foreground px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent"
      >
        {isPlaying ? "Pausar" : "Tocar"}
      </button>
    </div>
  );
}
