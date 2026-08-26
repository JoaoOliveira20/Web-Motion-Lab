import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { AnnotationShowcase } from "@/components/lab/rough-notation/annotation-showcase";
import { LiveExample } from "@/components/lab-detail/live-example";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { annotateApi, annotationGroupApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Rough Notation — Anotação por Viewport — Web Motion Lab",
  description:
    "Experimento com Rough Notation: annotationGroup() sincroniza múltiplas anotações para aparecerem em sequência ao entrar na viewport.",
};

const concepts = [
  {
    term: "annotate()",
    detail: "Desenha uma anotação em SVG sobre um elemento existente do DOM.",
  },
  {
    term: "annotationGroup()",
    detail: "Sincroniza múltiplas anotações para aparecerem em sequência, como uma só.",
  },
  {
    term: "IntersectionObserver",
    detail: "Rough Notation não observa viewport sozinho — isso é responsabilidade da aplicação.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/rough-notation/annotation-showcase.tsx",
    apis: [annotateApi, annotationGroupApi],
  },
];

export default function RoughNotationScrollTriggeredLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Rough Notation · Typography
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Anotação por Viewport
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Rough Notation desenha marcações com aparência de traço à mão
          sobre qualquer elemento do DOM. Aqui, quatro anotações diferentes
          disparam juntas, sincronizadas por{" "}
          <code className="mx-1 font-mono text-sm text-accent">
            annotationGroup()
          </code>
          , ao entrar na viewport.
        </p>

        <dl className="mt-10 grid grid-cols-1 gap-6 border-y border-border py-8 sm:grid-cols-3">
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
            <AnnotationShowcase />
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
