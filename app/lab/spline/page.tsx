import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { LazyCubeScene } from "@/components/lab/spline/lazy-cube-scene";
import { LiveExample } from "@/components/lab-detail/live-example";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";

export const metadata: Metadata = {
  title: "Spline — Cena 3D Colaborativa — Web Motion Lab",
  description:
    "Experimento com Spline: embed de uma cena desenhada no editor visual, com leitura de eventos e manipulação imperativa de objetos.",
};

const concepts = [
  {
    term: "scene (.splinecode)",
    detail: "A cena não é escrita em código — é desenhada no editor do Spline e exportada como URL.",
  },
  {
    term: "onLoad(spline)",
    detail: "Recebe a Application carregada; findObjectByName() localiza objetos definidos no editor.",
  },
  {
    term: "onSpline*",
    detail: "Eventos de mouse/teclado do Spline chegam como props React comuns, sem listener manual.",
  },
  {
    term: "Manipulação direta",
    detail: "object.rotation.y += x muda a cena em tempo real — sem re-renderizar nenhum componente React.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/spline/cube-scene.tsx",
    apis: [
      {
        name: "<Spline onLoad findObjectByName onSplineMouseDown>",
        href: "https://docs.spline.design/d16ba1312b9546b9b0339b159a54d96e",
      },
    ],
  },
];

export default function SplineLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Spline · 3D
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Cena 3D Colaborativa
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Spline resolve o problema de outra forma: em vez de código
          declarando geometria (como no experimento Three.js), a cena é
          desenhada visualmente no editor do Spline e só é referenciada
          aqui por uma URL. O código React fica responsável só por
          carregar, ouvir eventos e manipular objetos já existentes.
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
          <LiveExample>
            <LazyCubeScene />
          </LiveExample>
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
