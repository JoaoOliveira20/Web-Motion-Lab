import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { SpotlightCard } from "@/components/lab/react-bits/spotlight-card";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";

export const metadata: Metadata = {
  title: "React Bits — Spotlight por CSS — Web Motion Lab",
  description:
    "Experimento com React Bits: um handler de pointermove escreve direto no style via ref, sem re-render React.",
};

const concepts = [
  {
    term: "Biblioteca de cópia",
    detail: "Sem pacote npm — o código do componente é copiado e adaptado para o projeto.",
  },
  {
    term: "CSS custom properties",
    detail: "SpotlightCard atualiza --mouse-x/--mouse-y via DOM direto, sem re-render React.",
  },
];

const spotlightNotes = [
  {
    title: "Sem re-render",
    detail: "O handler de pointermove escreve direto no style do elemento via ref, evitando re-render a 60fps.",
  },
  {
    title: "Radial gradient",
    detail: "O brilho é um pseudo-elemento com background radial posicionado pelas variáveis CSS.",
  },
  {
    title: "currentColor evitado",
    detail: "A cor usa color-mix() com o token --accent, então respeita o tema claro/escuro automaticamente.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/react-bits/spotlight-card.tsx",
  },
];

export default function ReactBitsSpotlightLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          React Bits · UI
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Spotlight por CSS
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          React Bits não é um pacote instalável — é uma coleção de
          componentes para copiar e adaptar. Este reproduz um spotlight
          reativo ao ponteiro sem tocar no ciclo de render do React.
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

        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {spotlightNotes.map((note) => (
            <SpotlightCard key={note.title}>
              <p className="font-mono text-xs text-accent">{note.title}</p>
              <p className="mt-3 text-sm text-muted">{note.detail}</p>
            </SpotlightCard>
          ))}
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
