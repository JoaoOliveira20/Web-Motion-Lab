import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { SpotlightCard } from "@/components/lab/react-bits/spotlight-card";
import { TiltedCard } from "@/components/lab/react-bits/tilted-card";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { motionComponentApi, useMotionValueApi, useSpringApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "React Bits — Efeitos de Componente — Web Motion Lab",
  description:
    "Experimento com React Bits: cartões reativos ao ponteiro usando CSS custom properties e spring physics.",
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
  {
    term: "useMotionValue + useSpring",
    detail: "TiltedCard usa a mesma Motion da Fase 1, agora para física de mola em vez de gestures.",
  },
  {
    term: "perspective",
    detail: "Propriedade CSS que dá profundidade 3D à rotação de rotateX/rotateY.",
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
  {
    filePath: "lab/react-bits/tilted-card.tsx",
    apis: [motionComponentApi, useMotionValueApi, useSpringApi],
  },
];

export default function ReactBitsLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          React Bits · UI
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Efeitos de Componente
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          React Bits não é um pacote instalável — é uma coleção de
          componentes para copiar e adaptar. Este experimento reproduz
          duas técnicas da biblioteca (spotlight por CSS custom
          properties e tilt 3D com spring physics), adaptadas aos tokens
          e à estrutura deste projeto.
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
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            SpotlightCard
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {spotlightNotes.map((note) => (
              <SpotlightCard key={note.title}>
                <p className="font-mono text-xs text-accent">{note.title}</p>
                <p className="mt-3 text-sm text-muted">{note.detail}</p>
              </SpotlightCard>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            TiltedCard
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TiltedCard caption="rotateX / rotateY" className="h-48">
              <p className="font-mono text-xs text-accent">Física de mola</p>
              <p className="mt-2 text-sm text-muted">
                useSpring suaviza a rotação calculada a partir da posição
                do ponteiro relativa ao centro do cartão.
              </p>
            </TiltedCard>
            <TiltedCard caption="perspective: 800" className="h-48">
              <p className="font-mono text-xs text-accent">Legenda flutuante</p>
              <p className="mt-2 text-sm text-muted">
                A legenda segue o ponteiro com x/y próprios, independentes
                da rotação do cartão.
              </p>
            </TiltedCard>
          </div>
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
