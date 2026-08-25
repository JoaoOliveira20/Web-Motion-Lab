import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { DragFreeCarousel } from "@/components/lab/embla/drag-free-carousel";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";

export const metadata: Metadata = {
  title: "Embla — Arraste Livre — Web Motion Lab",
  description:
    "Experimento com Embla: dragFree desliga o snap por completo, virando um scroll horizontal com inércia.",
};

const concepts = [
  {
    term: "dragFree",
    detail: "Desliga o snap por completo: o carrossel vira um scroll horizontal com inércia.",
  },
  {
    term: "flex-[0_0_auto]",
    detail: "O tamanho de cada item é CSS puro — Embla mede o que existe, não impõe layout.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/embla/drag-free-carousel.tsx",
    apis: [
      {
        name: "useEmblaCarousel()",
        href: "https://www.embla-carousel.com/docs/get-started/react",
      },
    ],
  },
];

export default function EmblaDragFreeLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Embla · Carousel
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Arraste Livre
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Sem snap, sem pontos de parada — só a opção{" "}
          <code className="mx-1 font-mono text-sm text-accent">
            dragFree
          </code>{" "}
          mudando o comportamento inteiro do mesmo motor usado no
          experimento de snap.
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
          <DragFreeCarousel />
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
