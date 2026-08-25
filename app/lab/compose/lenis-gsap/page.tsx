import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { SyncedScroller } from "@/components/lab/compose/lenis-gsap/synced-scroller";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { reactLenisApi, scrollTriggerApi, useGsapApi, useLenisApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Lenis + GSAP — Scroll Suave Sincronizado — Web Motion Lab",
  description:
    "Composição: Lenis interpola o scroll, GSAP ScrollTrigger reage a ele via gsap.ticker em vez de dois loops de requestAnimationFrame competindo.",
};

const concepts = [
  {
    term: "autoRaf: false",
    detail: "Desliga o loop de rAF interno do Lenis — o gsap.ticker assume esse papel.",
  },
  {
    term: "gsap.ticker.add()",
    detail: "Chama lenis.raf(time * 1000) a cada frame do GSAP em vez de um rAF próprio do Lenis.",
  },
  {
    term: "lenis.on('scroll', ScrollTrigger.update)",
    detail: "Sem isso, o ScrollTrigger não sabe que a posição mudou — ele escuta o scroll nativo por padrão.",
  },
  {
    term: "lenis.rootElement",
    detail: "O elemento wrapper vira o scroller do ScrollTrigger — a mesma API de scroller customizado da Fase 1.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/compose/lenis-gsap/synced-scroller.tsx",
    apis: [reactLenisApi, useLenisApi, scrollTriggerApi, useGsapApi],
  },
];

export default function LenisGsapComposePage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Composição · Fase 5
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Scroll Suave Sincronizado
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Nos experimentos isolados (Fase 1), Lenis controlava um
          contêiner sem nenhuma animação amarrada a ele, e o ScrollTrigger
          do GSAP reagia ao scroll nativo do navegador. Aqui as duas
          coisas são a mesma: o ScrollTrigger anima com base na posição
          que o Lenis está interpolando, não na posição real do
          scrollbar.
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
          <SyncedScroller />
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
