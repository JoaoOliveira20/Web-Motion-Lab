import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import {
  TextRevealCard,
  TextRevealCardTitle,
  TextRevealCardDescription,
} from "@/components/lab/aceternity/text-reveal-card";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { motionComponentApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Aceternity — Revelação de Texto — Web Motion Lab",
  description:
    "Experimento com Aceternity: a posição X do ponteiro vira um clip-path que recorta a camada revelada.",
};

const concepts = [
  {
    term: "clip-path por ponteiro",
    detail: "A posição X do ponteiro vira uma porcentagem de inset() que recorta a camada revelada.",
  },
  {
    term: "Sem re-render a 60fps",
    detail: "A porcentagem é animada via motion.div com animate — a Motion cuida da interpolação.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/aceternity/text-reveal-card.tsx",
    apis: [motionComponentApi],
  },
];

export default function AceternityTextRevealLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Aceternity · UI
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Revelação de Texto
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Aceternity não tem pacote npm — o componente vem de um registry
          compatível com o shadcn CLI, com o código-fonte embutido no
          próprio JSON. Este foi buscado de lá e adaptado aos tokens do
          projeto.
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

        <div className="mt-10 max-w-2xl">
          <TextRevealCard text="passe o cursor" revealText="clip-path: inset()">
            <TextRevealCardTitle>Arraste sobre o texto</TextRevealCardTitle>
            <TextRevealCardDescription>
              A posição horizontal do ponteiro controla quanto da camada de
              baixo fica visível.
            </TextRevealCardDescription>
          </TextRevealCard>
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
