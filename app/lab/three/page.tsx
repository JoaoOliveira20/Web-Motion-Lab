import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { ThreeLazySection } from "@/components/lab/three/lazy-section";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";

export const metadata: Metadata = {
  title: "Three.js — Cena WebGL Programável — Web Motion Lab",
  description:
    "Experimento com Three.js puro: cena, câmera e objetos controlados diretamente por código, sem camada de conveniência.",
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
    term: "BufferGeometry",
    detail: "Posições de vértice em um Float32Array puro — a representação mais direta de geometria da API.",
  },
  {
    term: "dispose()",
    detail: "Geometria, material e renderer cada um precisa de limpeza própria — nenhuma é automática.",
  },
];

const perspectiveCameraApi = {
  name: "PerspectiveCamera",
  href: "https://threejs.org/docs/#api/en/cameras/PerspectiveCamera",
};
const webglRendererApi = {
  name: "WebGLRenderer",
  href: "https://threejs.org/docs/#api/en/renderers/WebGLRenderer",
};

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/three/wireframe-scene.tsx",
    apis: [perspectiveCameraApi, webglRendererApi],
  },
  {
    filePath: "lab/three/point-wave-scene.tsx",
    apis: [
      {
        name: "BufferGeometry",
        href: "https://threejs.org/docs/#api/en/core/BufferGeometry",
      },
      {
        name: "Points",
        href: "https://threejs.org/docs/#api/en/objects/Points",
      },
    ],
  },
];

export default function ThreeLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Three.js · 3D
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Cena WebGL Programável
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Onde o Vanta entregou efeitos prontos por algumas opções, aqui
          cada objeto da cena é criado, animado e destruído explicitamente
          por código — o comparativo completo está em{" "}
          <code className="mx-1 font-mono text-sm text-accent">
            docs/experiments/three.md
          </code>
          .
        </p>

        <dl className="mt-10 grid grid-cols-1 gap-6 border-y border-border py-8 sm:grid-cols-2 lg:grid-cols-4">
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
          <ThreeLazySection />
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
