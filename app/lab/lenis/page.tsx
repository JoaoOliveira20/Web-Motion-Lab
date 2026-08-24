import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { SmoothScrollDemo } from "@/components/lab/lenis/smooth-scroll-demo";
import { ScrollToDemo } from "@/components/lab/lenis/scroll-to-demo";

export const metadata: Metadata = {
  title: "Lenis — Scroll Suave — Web Motion Lab",
  description:
    "Experimento com Lenis: interpolação de scroll e navegação programática dentro de um contêiner isolado.",
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
  {
    term: "scrollTo()",
    detail: "Navegação programática suave até um seletor, elemento ou posição.",
  },
  {
    term: "prefers-reduced-motion",
    detail: "Com o sistema pedindo menos movimento, o experimento desliga o Lenis inteiro.",
  },
];

export default function LenisLabPage() {
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
          tempo, criando a sensação de inércia. Este experimento roda em um
          contêiner isolado, sem controlar o scroll da página inteira.
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
          <SmoothScrollDemo />
          <ScrollToDemo />
        </div>
      </Container>
    </>
  );
}
