import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { ArcadeRoomScene } from "@/components/lab/gsap/arcade-room/arcade-room-scene";
import { LiveExample } from "@/components/lab-detail/live-example";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { useGsapApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "GSAP — Sala de Fliperama — Web Motion Lab",
  description:
    "Experimento com GSAP: perspective e translateZ criam um corredor 3D real; o scroll avança a câmera por fliperamas dispostos nas paredes, num loop infinito.",
};

const concepts = [
  {
    term: "perspective + translateZ",
    detail: "3D de verdade via CSS — cada fliperama tem sua própria posição no eixo Z; o navegador cuida da escala e do ponto de fuga sozinho.",
  },
  {
    term: "Scroll vira profundidade",
    detail: "O delta do scroll acumula num valor de profundidade, suavizado por gsap.to() com overwrite — sem depender de nenhuma barra de rolagem real.",
  },
  {
    term: "Wrap infinito no eixo Z",
    detail: "Cada fliperama tem sua posição embrulhada entre 0 e a profundidade total — ao passar pela câmera, reaparece lá no fundo do corredor.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/gsap/arcade-room/arcade-room-scene.tsx",
    apis: [useGsapApi],
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
          Role para dentro da caixa abaixo — a câmera avança por um corredor
          que não tem fim, com fliperamas nas paredes em perspectiva real de
          CSS. Cada máquina representa um dos experimentos de GSAP deste
          próprio laboratório; clique numa para abrir os detalhes.
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
