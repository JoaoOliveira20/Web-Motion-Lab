import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { LazyPointWaveScene } from "@/components/lab/three/lazy-point-wave";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";

export const metadata: Metadata = {
  title: "Three.js — Onda de Pontos — Web Motion Lab",
  description:
    "Experimento com Three.js puro: um campo de pontos animado a partir de um BufferGeometry com Float32Array.",
};

const concepts = [
  {
    term: "BufferGeometry",
    detail: "Posições de vértice em um Float32Array puro — a representação mais direta de geometria da API.",
  },
  {
    term: "THREE.Points",
    detail: "Renderiza cada vértice do buffer como um ponto, sem faces nem malha entre eles.",
  },
];

const sourceFiles: SourceFileEntry[] = [
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

export default function ThreePointWaveLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Three.js · 3D
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Onda de Pontos
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Onde o wireframe usa uma geometria pronta (Icosaedro), aqui as
          posições de cada ponto vêm de um array puro — a representação
          mais direta de geometria que o Three.js oferece.
        </p>

        <dl className="mt-10 grid grid-cols-1 gap-6 border-y border-border py-8 sm:grid-cols-2">
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
          <LazyPointWaveScene />
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
