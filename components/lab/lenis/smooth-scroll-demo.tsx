"use client";

import "lenis/dist/lenis.css";
import { useState } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const panels = [
  {
    title: "01",
    detail:
      "Lenis intercepta o evento de wheel/touch e interpola o valor de scroll ao longo do tempo, em vez de aplicá-lo direto.",
  },
  {
    title: "02",
    detail:
      "O scroll nativo continua existindo — Lenis sincroniza scrollTop a cada frame, não substitui o navegador.",
  },
  {
    title: "03",
    detail:
      "useLenis() dá acesso à instância ativa a partir de qualquer componente descendente do provider.",
  },
];

function PanelList() {
  return (
    <div className="flex flex-col gap-4">
      {panels.map((panel) => (
        <div key={panel.title} className="bg-surface p-5">
          <p className="font-mono text-xs text-accent">{panel.title}</p>
          <p className="mt-2 text-sm text-muted">{panel.detail}</p>
        </div>
      ))}
    </div>
  );
}

function ProgressReadout() {
  const [progress, setProgress] = useState(0);
  useLenis((lenis) => setProgress(lenis.progress));

  return (
    <div className="sticky top-0 z-10 -mx-5 mb-4 bg-surface px-5 py-2 font-mono text-xs text-accent">
      progresso: {(progress * 100).toFixed(0)}%
    </div>
  );
}

export function SmoothScrollDemo() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Lenis · scroll suave
      </p>

      {prefersReducedMotion ? (
        <>
          <p className="mt-4 text-sm text-muted">
            Sistema com &quot;reduzir movimento&quot; ativado — o scroll
            suave foi desligado; a área abaixo usa rolagem nativa.
          </p>
          <div className="mt-4 h-56 overflow-y-auto p-5">
            <PanelList />
          </div>
        </>
      ) : (
        <ReactLenis
          root={false}
          className="mt-4 block h-56 overflow-y-auto p-5"
          options={{ duration: 1.1 }}
        >
          <ProgressReadout />
          <PanelList />
        </ReactLenis>
      )}
    </div>
  );
}
