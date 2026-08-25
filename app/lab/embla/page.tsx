import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { SnapCarousel } from "@/components/lab/embla/snap-carousel";
import { DragFreeCarousel } from "@/components/lab/embla/drag-free-carousel";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";

export const metadata: Metadata = {
  title: "Embla — Carrossel Controlável — Web Motion Lab",
  description:
    "Experimento com Embla: setas e paginação construídas à mão sobre uma primitiva de baixo nível, e um modo de arraste livre sem snap.",
};

const concepts = [
  {
    term: "useEmblaCarousel()",
    detail: "Retorna [ref, api] — sem componentes de slide, sem setas, sem paginação prontas.",
  },
  {
    term: "scrollSnapList() / on('select')",
    detail: "A UI de navegação é construída ouvindo eventos da API, não vem de graça.",
  },
  {
    term: "flex-[0_0_X%]",
    detail: "O tamanho de cada slide é CSS puro — Embla mede o que existe, não impõe layout.",
  },
  {
    term: "dragFree",
    detail: "Desliga o snap por completo: o carrossel vira um scroll horizontal com inércia.",
  },
];

const useEmblaCarouselApi = {
  name: "useEmblaCarousel()",
  href: "https://www.embla-carousel.com/docs/get-started/react",
};
const emblaMethodsApi = {
  name: "scrollSnapList() / on('select') / scrollTo()",
  href: "https://www.embla-carousel.com/docs/v8/api/methods",
};

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/embla/snap-carousel.tsx",
    apis: [useEmblaCarouselApi],
  },
  {
    filePath: "lab/embla/use-embla-controls.ts",
    apis: [emblaMethodsApi],
  },
  {
    filePath: "lab/embla/drag-free-carousel.tsx",
    apis: [useEmblaCarouselApi],
  },
];

export default function EmblaLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Embla · Carousel
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Carrossel Controlável
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Onde o experimento Swiper habilitou módulos prontos, Embla
          entrega só o motor de scroll com snap — setas, pontos e até o
          tamanho dos slides são responsabilidade da aplicação. A
          comparação directa fica em{" "}
          <code className="mx-1 font-mono text-sm text-accent">
            docs/experiments/embla.md
          </code>
          .
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
          <SnapCarousel />
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
