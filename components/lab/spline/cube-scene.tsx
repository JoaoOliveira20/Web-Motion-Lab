"use client";

import { useRef, useState } from "react";
import Spline from "@splinetool/react-spline";
import type { SPEObject, SplineEvent } from "@splinetool/react-spline";
import type { Application } from "@splinetool/runtime";

const SCENE_URL = "https://prod.spline.design/6Wq1Q7YGyM-iab9i/scene.splinecode";

export function CubeScene() {
  const cubeRef = useRef<SPEObject | null>(null);
  const [status, setStatus] = useState("carregando cena…");

  const handleLoad = (spline: Application) => {
    cubeRef.current = spline.findObjectByName("Cube") ?? null;
    setStatus(cubeRef.current ? "cena carregada" : "objeto 'Cube' não encontrado");
  };

  const handleMouseDown = (event: SplineEvent) => {
    setStatus(`clicado: ${event.target.name}`);
  };

  const handleRotate = () => {
    if (!cubeRef.current) return;
    cubeRef.current.rotation.y += Math.PI / 2;
  };

  return (
    <div className="border border-border p-6">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          {status}
        </p>
        <button
          type="button"
          onClick={handleRotate}
          className="border border-foreground px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent"
        >
          Girar cubo
        </button>
      </div>
      <div className="mt-6 h-[32rem] bg-surface">
        <Spline
          scene={SCENE_URL}
          onLoad={handleLoad}
          onSplineMouseDown={handleMouseDown}
          className="h-full w-full touch-none"
        />
      </div>
      <p className="mt-4 text-xs text-muted">
        Cena de demonstração oficial do react-spline (
        <code className="font-mono text-accent">6Wq1Q7YGyM-iab9i</code>),
        publicada no README da biblioteca — não foi desenhada para este
        projeto.
      </p>
    </div>
  );
}
