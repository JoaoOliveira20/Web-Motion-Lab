import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { TerminalTypedDemo } from "@/components/lab/typed/terminal-typed-demo";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { typedMethodsApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Typed.js — Controle Imperativo — Web Motion Lab",
  description:
    "Experimento com Typed.js: .toggle() e .reset() pausam, retomam e reiniciam a digitação sob demanda.",
};

const concepts = [
  {
    term: "toggle() / reset()",
    detail: "Métodos imperativos para pausar, retomar e reiniciar a digitação sob demanda.",
  },
  {
    term: ".destroy()",
    detail: "Limpeza obrigatória no cleanup do efeito, ou a instância continua rodando após desmontar.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/typed/terminal-typed-demo.tsx",
    apis: [typedMethodsApi],
  },
];

export default function TypedTerminalLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Typed.js · Typography
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Controle Imperativo
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Botões próprios chamam métodos direto na instância — pausar,
          retomar e reiniciar sob demanda, em vez de deixar o loop correr
          sozinho.
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
          <TerminalTypedDemo />
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
