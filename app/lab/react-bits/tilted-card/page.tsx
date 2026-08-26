import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { TiltedCard } from "@/components/lab/react-bits/tilted-card";
import { LiveExample } from "@/components/lab-detail/live-example";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { motionComponentApi, useMotionValueApi, useSpringApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "React Bits — Tilt com Spring Physics — Web Motion Lab",
  description:
    "Experimento com React Bits: useSpring suaviza a rotação 3D calculada a partir da posição do ponteiro.",
};

const concepts = [
  {
    term: "useMotionValue + useSpring",
    detail: "TiltedCard usa a mesma Motion do resto do laboratório, agora para física de mola em vez de gestures.",
  },
  {
    term: "perspective",
    detail: "Propriedade CSS que dá profundidade 3D à rotação de rotateX/rotateY.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/react-bits/tilted-card.tsx",
    apis: [motionComponentApi, useMotionValueApi, useSpringApi],
  },
];

export default function ReactBitsTiltedCardLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          React Bits · UI
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Tilt com Spring Physics
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          A posição do ponteiro relativa ao centro do cartão vira rotação
          3D, suavizada por uma mola em vez de seguir o cursor 1:1.
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
          <LiveExample>
            <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2">
              <TiltedCard caption="rotateX / rotateY" className="h-48">
                <p className="font-mono text-xs text-accent">Física de mola</p>
                <p className="mt-2 text-sm text-muted">
                  useSpring suaviza a rotação calculada a partir da posição
                  do ponteiro relativa ao centro do cartão.
                </p>
              </TiltedCard>
              <TiltedCard caption="perspective: 800" className="h-48">
                <p className="font-mono text-xs text-accent">
                  Legenda flutuante
                </p>
                <p className="mt-2 text-sm text-muted">
                  A legenda segue o ponteiro com x/y próprios, independentes
                  da rotação do cartão.
                </p>
              </TiltedCard>
            </div>
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
