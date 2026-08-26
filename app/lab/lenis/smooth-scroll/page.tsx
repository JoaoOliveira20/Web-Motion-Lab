import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { SmoothScrollDemo } from "@/components/lab/lenis/smooth-scroll-demo";
import { LiveExample } from "@/components/lab-detail/live-example";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { reactLenisApi, useLenisApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Lenis — Scroll Suave — Web Motion Lab",
  description:
    "Experimento com Lenis: interpolação de scroll dentro de um contêiner isolado, sem controlar a página inteira.",
};

const concepts = [
  {
    term: "wrapper / content",
    detail: "Lenis interpola o scrollTop entre um elemento wrapper e seu conteúdo.",
  },
  {
    term: "useLenis()",
    detail: "Lê a instância ativa e assina o evento de scroll a partir de qualquer descendente.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/lenis/smooth-scroll-demo.tsx",
    apis: [reactLenisApi, useLenisApi],
  },
];

export default function LenisSmoothScrollLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Lenis · Scroll
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Scroll Suave
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Lenis não substitui o scroll do navegador — ele intercepta o
          evento de wheel/touch e interpola o valor de scroll ao longo do
          tempo, criando a sensação de inércia.
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
            <SmoothScrollDemo />
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
