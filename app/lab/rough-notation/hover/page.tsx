import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { HoverAnnotation } from "@/components/lab/rough-notation/hover-annotation";
import { LiveExample } from "@/components/lab-detail/live-example";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { annotateApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Rough Notation — Anotação por Hover — Web Motion Lab",
  description:
    "Experimento com Rough Notation: cada anotação reage sob demanda a um booleano de hover/foco, o mesmo padrão de estado de UI comum em React.",
};

const concepts = [
  {
    term: "annotate() sob demanda",
    detail: "Criada uma única vez, reage a um booleano — o mesmo padrão usado para estados de UI comuns em React.",
  },
  {
    term: "currentColor",
    detail: "Sem 'color' explícito, a anotação herda a cor de texto do elemento via CSS.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/rough-notation/hover-annotation.tsx",
  },
  {
    filePath: "use-rough-annotation.ts",
    dir: "hooks",
    apis: [annotateApi],
  },
];

export default function RoughNotationHoverLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Rough Notation · Typography
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Anotação por Hover
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Em vez de scroll, o gatilho aqui é interação direta — passe o
          mouse ou o foco por cada termo e a anotação some/aparece sob
          demanda.
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
            <HoverAnnotation />
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
