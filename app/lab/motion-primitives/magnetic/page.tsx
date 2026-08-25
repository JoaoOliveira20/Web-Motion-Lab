import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { MagneticShowcase } from "@/components/lab/motion-primitives/magnetic-showcase";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { motionComponentApi, useMotionValueApi, useSpringApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Motion Primitives — Botão Magnético — Web Motion Lab",
  description:
    "Experimento com Motion Primitives: um mousemove no documento inteiro calcula distância até o alvo e o atrai com física de mola.",
};

const concepts = [
  {
    term: "document.addEventListener",
    detail: "Magnetic escuta mousemove no documento inteiro para calcular distância até o centro do alvo.",
  },
  {
    term: "useMotionValue + useSpring",
    detail: "A distância vira um valor de mola — suaviza a atração em vez de seguir o ponteiro 1:1.",
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
];

export default function MotionPrimitivesMagneticLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Motion Primitives · UI
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Botão Magnético
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Motion Primitives é uma biblioteca de cópia, mas o código-fonte
          já vem em TypeScript e já usa a mesma Motion do resto do
          laboratório — um primitivo pequeno e recombinável, não um
          componente de UI finalizado.
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
          <MagneticShowcase />
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
