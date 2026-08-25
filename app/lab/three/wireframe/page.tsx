import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { LazyWireframeScene } from "@/components/lab/three/lazy-wireframe";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { perspectiveCameraApi, webglRendererApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Three.js — Malha em Wireframe — Web Motion Lab",
  description:
    "Experimento com Three.js puro: uma malha (Mesh) girando, com cena, câmera e loop de render escritos à mão.",
};

const concepts = [
  {
    term: "Scene / Camera / Renderer",
    detail: "Os três objetos que todo programa Three.js monta manualmente — nenhum deles é opcional.",
  },
  {
    term: "requestAnimationFrame",
    detail: "O loop de render é escrito à mão; nada acontece na tela sem esse loop explícito.",
  },
  {
    term: "dispose()",
    detail: "Geometria, material e renderer cada um precisa de limpeza própria — nenhuma é automática.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/three/wireframe-scene.tsx",
    apis: [perspectiveCameraApi, webglRendererApi],
  },
];

export default function ThreeWireframeLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Three.js · 3D
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Malha em Wireframe
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Cada objeto da cena é criado, animado e destruído explicitamente
          por código — sem nenhuma camada de conveniência entre o
          navegador e o WebGL.
        </p>

        <dl className="mt-10 grid grid-cols-1 gap-6 border-y border-border py-8 sm:grid-cols-3">
          {concepts.map((concept) => (
            <div key={concept.term}>
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {concept.term}
              </dt>
              <dd className="mt-2 text-sm">{concept.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10">
          <LazyWireframeScene />
        </div>

        <div className="mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            Código-fonte e APIs usadas
          </p>
          <div className="mt-4">
            <SourceCode files={sourceFiles} />
          </div>
        </div>
      </Container>
    </>
  );
}
