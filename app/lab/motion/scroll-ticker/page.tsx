import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { ScrollTicker } from "@/components/lab/motion/scroll-ticker";
import { LiveExample } from "@/components/lab-detail/live-example";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { animatePresenceApi, motionComponentApi, useInViewApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Motion — Ticker por Scroll com Capa — Web Motion Lab",
  description:
    "Experimento com a biblioteca Motion: useInView com root escopado detecta o item ativo numa lista com scroll-snap; o texto de fundo troca com crossfade.",
};

const concepts = [
  {
    term: "useInView({ root })",
    detail: "Cada item observa a própria visibilidade dentro de um contêiner específico, não da viewport inteira.",
  },
  {
    term: "scroll-snap-type",
    detail: "CSS puro faz o scroll parar exatamente em cada item — nenhuma lib controla a posição de scroll aqui.",
  },
  {
    term: "AnimatePresence + Marquee",
    detail: "O texto de fundo reaproveita o Marquee (CSS) do experimento Magic UI; a Motion só cuida do crossfade entre trocas.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/motion/scroll-ticker.tsx",
    apis: [useInViewApi, animatePresenceApi, motionComponentApi],
  },
];

export default function MotionScrollTickerLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Motion · Animation
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Ticker por Scroll com Capa
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Role a lista de capas dentro da caixa abaixo. Cada item avisa a si
          mesmo quando está visível — nenhum listener de scroll manual, só{" "}
          <code className="mx-1 font-mono text-sm text-accent">
            useInView
          </code>{" "}
          escutando um contêiner específico. O nome em segundo plano troca
          para acompanhar o item atual.
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
            <ScrollTicker />
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
