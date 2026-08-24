import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import {
  TextRevealCard,
  TextRevealCardTitle,
  TextRevealCardDescription,
} from "@/components/lab/aceternity/text-reveal-card";
import { FollowerPointerCard } from "@/components/lab/aceternity/following-pointer-card";

export const metadata: Metadata = {
  title: "Aceternity — Efeitos Avançados — Web Motion Lab",
  description:
    "Experimento com Aceternity: revelação de texto por arraste do ponteiro e um cursor customizado com legenda.",
};

const concepts = [
  {
    term: "clip-path por ponteiro",
    detail: "A posição X do ponteiro vira uma porcentagem de inset() que recorta a camada revelada.",
  },
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

export default function AceternityLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Aceternity · UI
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Efeitos Avançados
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Aceternity não tem pacote npm nem monorepo público — os
          componentes vêm de um registry compatível com o shadcn CLI
          (<code className="mx-1 font-mono text-sm text-accent">
            ui.aceternity.com/registry/*.json
          </code>
          ), com o código-fonte embutido no próprio JSON. Os dois efeitos
          abaixo foram buscados de lá e adaptados aos tokens do projeto.
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

        <div className="mt-10 grid grid-cols-1 gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
              TextRevealCard
            </p>
            <div className="mt-4">
              <TextRevealCard text="passe o cursor" revealText="clip-path: inset()">
                <TextRevealCardTitle>Arraste sobre o texto</TextRevealCardTitle>
                <TextRevealCardDescription>
                  A posição horizontal do ponteiro controla quanto da
                  camada de baixo fica visível.
                </TextRevealCardDescription>
              </TextRevealCard>
            </div>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
              FollowerPointerCard
            </p>
            <FollowerPointerCard
              label="cursor: none"
              className="mt-4 flex h-40 items-center justify-center border border-border bg-surface"
            >
              <p className="pointer-events-none font-mono text-xs text-muted">
                mova o ponteiro dentro desta área
              </p>
            </FollowerPointerCard>
          </div>
        </div>
      </Container>
    </>
  );
}
