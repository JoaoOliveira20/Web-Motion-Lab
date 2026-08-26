import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { RadialMenu } from "@/components/lab/motion/radial-menu";
import { LiveExample } from "@/components/lab-detail/live-example";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { animatePresenceApi, motionComponentApi, useReducedMotionMotionApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Motion — Menu Radial — Web Motion Lab",
  description:
    "Experimento com a biblioteca Motion: coordenadas polares posicionam itens em círculo, cada um animando com stagger via AnimatePresence.",
};

const concepts = [
  {
    term: "Coordenadas polares",
    detail: "x = r·cos(θ) e y = r·sin(θ) distribuem N itens em círculo a partir de um ângulo e um raio.",
  },
  {
    term: "AnimatePresence + stagger",
    detail: "Cada item anima entrada/saída com um delay proporcional ao próprio índice, criando o efeito de leque.",
  },
  {
    term: "Escape / clique fora",
    detail: "Um menu radial se comporta como qualquer popover — teclado e clique externo precisam fechá-lo.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/motion/radial-menu.tsx",
    apis: [motionComponentApi, animatePresenceApi, useReducedMotionMotionApi],
  },
];

export default function MotionRadialMenuLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Motion · Animation
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Menu Radial
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          O botão central abre seis ações dispostas em círculo — a posição de
          cada uma vem de trigonometria simples, não de um layout de grid ou
          flexbox. A Motion cuida só da interpolação entre o centro e o
          ponto final de cada item.
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
            <RadialMenu />
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
