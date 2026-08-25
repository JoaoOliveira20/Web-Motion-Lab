import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { AnnotationShowcase } from "@/components/lab/rough-notation/annotation-showcase";
import { HoverAnnotation } from "@/components/lab/rough-notation/hover-annotation";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";

export const metadata: Metadata = {
  title: "Rough Notation — Anotações Manuscritas — Web Motion Lab",
  description:
    "Experimento com Rough Notation: destaques desenhados à mão disparados por viewport e por interação.",
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
    term: "currentColor",
    detail: "Sem 'color' explícito, a anotação herda a cor de texto do elemento via CSS.",
  },
  {
    term: "IntersectionObserver",
    detail: "Rough Notation não observa viewport sozinho — isso é responsabilidade da aplicação.",
  },
];

const annotateApi = {
  name: "annotate()",
  href: "https://roughnotation.com/",
};

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/rough-notation/annotation-showcase.tsx",
    apis: [
      annotateApi,
      {
        name: "annotationGroup()",
        href: "https://roughnotation.com/",
      },
    ],
  },
  {
    filePath: "lab/rough-notation/hover-annotation.tsx",
  },
  {
    filePath: "use-rough-annotation.ts",
    dir: "hooks",
    apis: [annotateApi],
  },
];

export default function RoughNotationLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Rough Notation · Typography
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Anotações Manuscritas
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Rough Notation desenha marcações com aparência de traço à mão
          sobre qualquer elemento do DOM, usando SVG gerado por Rough.js.
          A biblioteca não decide quando mostrar a anotação — isso fica
          por conta da aplicação, geralmente amarrado a scroll ou
          interação.
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
          <AnnotationShowcase />
          <HoverAnnotation />
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
