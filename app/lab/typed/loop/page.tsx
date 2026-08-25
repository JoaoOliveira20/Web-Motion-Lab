import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { LoopTypedDemo } from "@/components/lab/typed/loop-typed-demo";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { typedClassApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Typed.js — Loop Declarativo — Web Motion Lab",
  description:
    "Experimento com Typed.js: new Typed(el, options) escreve e apaga uma lista de frases em loop, fora do controle do React.",
};

const concepts = [
  {
    term: "new Typed(el, options)",
    detail: "Manipula o textContent do elemento diretamente — fora do controle do React.",
  },
  {
    term: "Fallback estático",
    detail: "Com prefers-reduced-motion, o texto final aparece direto, sem a animação de digitação.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/typed/loop-typed-demo.tsx",
  },
  {
    filePath: "use-typed.ts",
    dir: "hooks",
    apis: [typedClassApi],
  },
];

export default function TypedLoopLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Typed.js · Typography
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Loop Declarativo
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Uma lista de frases escrita e apagada em loop, sem nenhum
          controle manual — a instância cuida de tudo sozinha depois de
          criada.
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
          <LoopTypedDemo />
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
