import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { MagneticShowcase } from "@/components/lab/motion-primitives/magnetic-showcase";
import { InViewShowcase } from "@/components/lab/motion-primitives/in-view-showcase";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { motionComponentApi, useInViewApi, useMotionValueApi, useSpringApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Motion Primitives — Padrões Reutilizáveis — Web Motion Lab",
  description:
    "Experimento com Motion Primitives: um botão magnético e um wrapper de revelação por viewport, ambos construídos sobre a Motion.",
};

const concepts = [
  {
    term: "Primitivos, não componentes prontos",
    detail: "Blocos pequenos e recombináveis (Magnetic, InView) em vez de componentes de UI finalizados.",
  },
  {
    term: "document.addEventListener",
    detail: "Magnetic escuta mousemove no documento inteiro para calcular distância até o centro do alvo.",
  },
  {
    term: "useInView",
    detail: "Hook nativo da Motion que envolve IntersectionObserver com uma API declarativa.",
  },
  {
    term: "once + margin",
    detail: "viewOptions controla se a animação repete e quão cedo ela dispara antes do elemento entrar.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/motion-primitives/magnetic.tsx",
    apis: [motionComponentApi, useMotionValueApi, useSpringApi],
  },
  {
    filePath: "lab/motion-primitives/magnetic-showcase.tsx",
  },
  {
    filePath: "lab/motion-primitives/in-view.tsx",
    apis: [motionComponentApi, useInViewApi],
  },
  {
    filePath: "lab/motion-primitives/in-view-showcase.tsx",
  },
];

export default function MotionPrimitivesLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Motion Primitives · UI
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Padrões Reutilizáveis
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Motion Primitives também é uma biblioteca de cópia — mas, ao
          contrário do React Bits, o código-fonte já vem em TypeScript e
          já usa a mesma Motion da Fase 1. Os dois componentes abaixo
          foram adaptados quase diretamente, com pequenas simplificações
          descritas na documentação do experimento.
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

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <MagneticShowcase />
          <InViewShowcase />
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
