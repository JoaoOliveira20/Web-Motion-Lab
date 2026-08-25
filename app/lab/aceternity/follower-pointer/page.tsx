import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { FollowerPointerCard } from "@/components/lab/aceternity/following-pointer-card";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { animatePresenceApi, motionComponentApi, useMotionValueApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Aceternity — Cursor Personalizado — Web Motion Lab",
  description:
    "Experimento com Aceternity: cursor: none esconde o ponteiro nativo, um cursor customizado com legenda assume o lugar.",
};

const concepts = [
  {
    term: "cursor: none",
    detail: "Esconde o cursor nativo do sistema para que o cursor customizado assuma o lugar visualmente.",
  },
  {
    term: "AnimatePresence + MotionValue",
    detail: "O cursor customizado monta/desmonta com animação ao entrar e sair da área do cartão.",
  },
  {
    term: "touch vs. pointer",
    detail: "O original usava eventos de mouse e touch separados; unificados aqui em Pointer Events.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/aceternity/following-pointer-card.tsx",
    apis: [motionComponentApi, animatePresenceApi, useMotionValueApi],
  },
];

export default function AceternityFollowerPointerLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Aceternity · UI
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Cursor Personalizado
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Aceternity não tem pacote npm — o componente vem de um registry
          compatível com o shadcn CLI, com o código-fonte embutido no
          próprio JSON. Este foi buscado de lá e adaptado aos tokens do
          projeto.
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

        <div className="mt-10 max-w-2xl">
          <FollowerPointerCard
            label="cursor: none"
            className="flex aspect-[1.618/1] items-center justify-center border border-border bg-surface"
          >
            <p className="pointer-events-none font-mono text-xs text-muted">
              mova o ponteiro dentro desta área
            </p>
          </FollowerPointerCard>
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
