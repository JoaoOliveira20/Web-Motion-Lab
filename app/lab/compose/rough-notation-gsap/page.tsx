import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { TimedAnnotations } from "@/components/lab/compose/rough-notation-gsap/timed-annotations";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { annotateApi, scrollTriggerApi, useGsapApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Rough Notation + GSAP — Anotações no Tempo da Timeline — Web Motion Lab",
  description:
    "Composição: ScrollTrigger substitui o IntersectionObserver do experimento original — annotate() chamado por callbacks de scroll do GSAP.",
};

const concepts = [
  {
    term: "ScrollTrigger.create()",
    detail: "Sem tween nenhum — só os callbacks onEnter/onLeaveBack, usados como gatilho de uma API imperativa de terceiros.",
  },
  {
    term: "onLeaveBack",
    detail: "Dispara ao rolar de volta para cima e sair do trigger — o IntersectionObserver original não distinguia direção.",
  },
  {
    term: "annotate() continua igual",
    detail: "Só o gatilho mudou (Fase 1: IntersectionObserver → aqui: ScrollTrigger); a API do Rough Notation não sabe a diferença.",
  },
  {
    term: "scroller customizado",
    detail: "O mesmo padrão de contêiner isolado das Fases 1 e 5 anteriores — não é a página inteira.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/compose/rough-notation-gsap/timed-annotations.tsx",
    apis: [scrollTriggerApi, useGsapApi, annotateApi],
  },
];

export default function RoughNotationGsapComposePage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Composição · Fase 5
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Anotações no Tempo da Timeline
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          O experimento Rough Notation isolado (Fase 1) usava
          IntersectionObserver puro para decidir quando desenhar. Esta
          composição troca esse gatilho pelo ScrollTrigger do GSAP — a
          mesma engine que já controla outras animações da página passa
          a controlar também quando as anotações aparecem e somem.
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
          <TimedAnnotations />
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
