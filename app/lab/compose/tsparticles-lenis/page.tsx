import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { LazyParticlesParallax } from "@/components/lab/compose/tsparticles-lenis/lazy-parallax";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { reactLenisApi, tsparticlesReactApi, useLenisApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "tsParticles + Lenis — Partículas com Parallax — Web Motion Lab",
  description:
    "Composição: o progresso de scroll do Lenis desloca o campo de partículas em paralaxe — duas bibliotecas, nenhuma sabendo da outra.",
};

const concepts = [
  {
    term: "Camadas separadas",
    detail: "As partículas ficam num contêiner absoluto atrás do conteúdo; o Lenis controla só o conteúdo em primeiro plano.",
  },
  {
    term: "useLenis(callback)",
    detail: "Lê lenis.scroll (pixels já interpolados) a cada frame de scroll e aplica um translateY na camada de trás.",
  },
  {
    term: "Velocidades diferentes",
    detail: "A camada de partículas se move a 40% da velocidade do conteúdo — a definição clássica de parallax.",
  },
  {
    term: "fullScreen: false",
    detail: "Mesma correção aplicada no experimento tsParticles isolado — sem isso, o Canvas ignoraria o contêiner.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/compose/tsparticles-lenis/particles-parallax.tsx",
    apis: [reactLenisApi, useLenisApi, tsparticlesReactApi],
  },
];

export default function TsParticlesLenisComposePage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Composição · Fase 5
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Partículas com Parallax de Scroll
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          tsParticles não tem noção de scroll; Lenis não tem noção de
          partículas. A composição inteira é uma função de sincronização
          escrita por fora das duas, lendo a posição de uma para mover a
          outra.
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
          <LazyParticlesParallax />
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
