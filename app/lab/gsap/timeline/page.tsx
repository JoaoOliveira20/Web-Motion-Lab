import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { TimelineDemo } from "@/components/lab/gsap/timeline-demo";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { gsapTimelineApi, useGsapApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "GSAP — Timeline Sequenciada — Web Motion Lab",
  description:
    "Experimento com GSAP: gsap.timeline() coreografa múltiplos elementos com ordem e stagger controlados por código.",
};

const concepts = [
  {
    term: "gsap.timeline()",
    detail: "Sequencia tweens com ordem e stagger controlados por código.",
  },
  {
    term: "useGSAP()",
    detail: "Substitui useLayoutEffect e reverte animações no cleanup via gsap.context().",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/gsap/timeline-demo.tsx",
    apis: [gsapTimelineApi, useGsapApi],
  },
];

export default function GsapTimelineLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          GSAP · Animation
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Timeline Sequenciada
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          GSAP resolve animação de forma imperativa: em vez de descrever
          estados de componente, o código comanda tweens diretamente,
          organizados numa timeline com controle preciso de ordem, offset
          e stagger.
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
          <TimelineDemo />
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
