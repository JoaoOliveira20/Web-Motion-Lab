import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { InViewShowcase } from "@/components/lab/motion-primitives/in-view-showcase";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { motionComponentApi, useInViewApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Motion Primitives — Revelação por Viewport — Web Motion Lab",
  description:
    "Experimento com Motion Primitives: useInView envolve IntersectionObserver com uma API declarativa.",
};

const concepts = [
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
    filePath: "lab/motion-primitives/in-view.tsx",
    apis: [motionComponentApi, useInViewApi],
  },
  {
    filePath: "lab/motion-primitives/in-view-showcase.tsx",
  },
];

export default function MotionPrimitivesInViewLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Motion Primitives · UI
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Revelação por Viewport
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Cada item observa a própria visibilidade — nenhum
          IntersectionObserver criado manualmente, nenhum estado
          compartilhado entre itens.
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
