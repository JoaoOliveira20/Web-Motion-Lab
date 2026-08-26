import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { ScrollTriggerDemo } from "@/components/lab/gsap/scroll-trigger-demo";
import { LiveExample } from "@/components/lab-detail/live-example";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { scrollTriggerApi, useGsapApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "GSAP — Revelação por Scroll — Web Motion Lab",
  description:
    "Experimento com GSAP: o plugin ScrollTrigger liga o progresso de uma animação à posição de scroll de um contêiner.",
};

const concepts = [
  {
    term: "ScrollTrigger",
    detail: "Liga o progresso de uma animação à posição de scroll de qualquer elemento.",
  },
  {
    term: "scrub",
    detail: "Sincroniza a animação diretamente ao scroll, sem easing de tempo.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/gsap/scroll-trigger-demo.tsx",
    apis: [scrollTriggerApi, useGsapApi],
  },
];

export default function GsapScrollTriggerLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          GSAP · Animation
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Revelação por Scroll
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          O plugin ScrollTrigger estende o mesmo motor de timelines para
          reagir à posição de scroll — cada painel revela e uma barra de
          progresso acompanha a rolagem de um contêiner isolado.
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
            <ScrollTriggerDemo />
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
