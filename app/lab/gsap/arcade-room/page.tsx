import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { ArcadeRoomScene } from "@/components/lab/gsap/arcade-room/arcade-room-scene";
import { LiveExample } from "@/components/lab-detail/live-example";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { scrollTriggerApi, useGsapApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "GSAP — Sala de Fliperama — Web Motion Lab",
  description:
    "Experimento com GSAP: ScrollTrigger num contêiner horizontal customizado cria uma sala de scroll infinito com máquinas de fliperama clicáveis.",
};

const concepts = [
  {
    term: "ScrollTrigger num scroller customizado",
    detail: "ScrollTrigger não precisa ser a página inteira — aqui ele observa o scroll horizontal de uma div específica.",
  },
  {
    term: "Scroll nativo, infinito de mentira",
    detail: "A sequência de máquinas se repete 3x; ao chegar perto de uma ponta, o scroll salta um conjunto inteiro para trás — imperceptível porque o conteúdo é idêntico.",
  },
  {
    term: "Dados viram cena",
    detail: "As máquinas não são fixas no código — vêm de data/experiments.ts filtrado por biblioteca, a mesma fonte do catálogo do /lab.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/gsap/arcade-room/arcade-room-scene.tsx",
    apis: [useGsapApi, scrollTriggerApi],
  },
  {
    filePath: "lab/gsap/arcade-room/arcade-cabinet.tsx",
  },
];

export default function GsapArcadeRoomLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          GSAP · Animation
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Sala de Fliperama
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Role para os lados dentro da caixa abaixo — a sala não tem fim.
          Cada máquina representa um dos experimentos de GSAP deste próprio
          laboratório; clique numa para abrir os detalhes.
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
          <LiveExample>
            <ArcadeRoomScene className="aspect-[16/10] w-full" />
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
