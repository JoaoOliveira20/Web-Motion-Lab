import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { ScrollToDemo } from "@/components/lab/lenis/scroll-to-demo";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { lenisScrollToApi, useLenisApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Lenis — Navegação Programática — Web Motion Lab",
  description:
    "Experimento com Lenis: scrollTo() navega suavemente até um seletor, elemento ou posição.",
};

const concepts = [
  {
    term: "scrollTo()",
    detail: "Navegação programática suave até um seletor, elemento ou posição.",
  },
  {
    term: "prefers-reduced-motion",
    detail: "Com o sistema pedindo menos movimento, o experimento desliga o Lenis inteiro.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/lenis/scroll-to-demo.tsx",
    apis: [useLenisApi, lenisScrollToApi],
  },
];

export default function LenisScrollToLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Lenis · Scroll
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Navegação Programática
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Três botões chamam{" "}
          <code className="mx-1 font-mono text-sm text-accent">
            lenis.scrollTo()
          </code>{" "}
          direto na instância — a mesma inércia do scroll manual, só que
          disparada por código.
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
          <ScrollToDemo />
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
