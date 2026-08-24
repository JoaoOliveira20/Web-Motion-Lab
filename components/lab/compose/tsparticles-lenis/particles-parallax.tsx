"use client";

import "lenis/dist/lenis.css";
import { useRef } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { Particles } from "@tsparticles/react";
import type { ISourceOptions } from "@tsparticles/engine";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useCssVariable } from "@/hooks/use-css-variable";
import { TsParticlesEngineProvider } from "@/components/lab/tsparticles/particles-provider";

const sections = [
  { title: "01", detail: "As partículas ficam num contêiner próprio, atrás do conteúdo." },
  { title: "02", detail: "O Lenis controla o scroll do conteúdo; as partículas se movem em outra velocidade." },
  { title: "03", detail: "Nenhuma das duas bibliotecas sabe que a outra existe — o parallax é código nosso." },
];

function ParallaxSync({
  layerRef,
}: {
  layerRef: React.RefObject<HTMLDivElement | null>;
}) {
  useLenis((lenis) => {
    const layer = layerRef.current;
    if (!layer) return;
    layer.style.transform = `translateY(${lenis.scroll * 0.4}px)`;
  });

  return null;
}

export function ParticlesParallax() {
  const layerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const accent = useCssVariable("--accent", "#ff4d1c");

  const options: ISourceOptions = {
    fpsLimit: 60,
    detectRetina: true,
    fullScreen: { enable: false },
    particles: {
      number: { value: 40 },
      shape: { type: "circle" },
      size: { value: { min: 1, max: 2 } },
      move: { enable: !prefersReducedMotion, speed: 0.4, direction: "none" },
      paint: { fill: { color: { value: accent } } },
      opacity: { value: 0.5 },
    },
    interactivity: { events: { onHover: { enable: false }, onClick: { enable: false } } },
  };

  return (
    <div className="border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        tsParticles (fundo) + Lenis (progresso de scroll)
      </p>

      <div className="relative mt-6 h-72 overflow-hidden bg-surface">
        <div ref={layerRef} className="absolute inset-0 -top-20 z-0 h-[140%]">
          <TsParticlesEngineProvider>
            <Particles id="parallax-field" options={options} className="h-full w-full" />
          </TsParticlesEngineProvider>
        </div>

        <ReactLenis
          root={false}
          className="relative z-10 block h-full overflow-y-auto overflow-x-hidden"
        >
          <ParallaxSync layerRef={layerRef} />
          <div className="flex flex-col gap-24 p-6">
            {sections.map((section) => (
              <div key={section.title} className="border border-border bg-background/90 p-5 backdrop-blur-sm">
                <p className="font-mono text-xs text-accent">{section.title}</p>
                <p className="mt-2 text-sm text-muted">{section.detail}</p>
              </div>
            ))}
            <div aria-hidden className="h-4" />
          </div>
        </ReactLenis>
      </div>
    </div>
  );
}
