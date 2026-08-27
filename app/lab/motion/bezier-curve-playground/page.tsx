import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { BezierCurvePlayground } from "@/components/lab/motion/bezier-curve-playground";
import { LiveExample } from "@/components/lab-detail/live-example";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { useMotionValueApi, useTransformApi, motionAnimateApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Motion — Bezier Curve Playground — Web Motion Lab",
  description:
    "Arraste os pontos de controle de uma curva de Bézier cúbica e veja um objeto percorrê-la em tempo real — construído com useMotionValue e useTransform da Motion.",
};

const concepts = [
  {
    term: "8 MotionValues, zero re-render",
    detail: "Cada ponto é sua própria MotionValue; arrastar nunca passa pelo React state, só chama .set().",
  },
  {
    term: "useTransform() combinando valores",
    detail: "O traçado da curva e a posição do marcador em movimento são derivados ao vivo das MotionValues dos pontos.",
  },
  {
    term: "animate() conduzindo o t",
    detail: "Play/Pause/Reset e Velocidade apenas iniciam, param ou reajustam uma chamada de animate() sobre um único valor de progresso.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/motion/bezier-curve-playground.tsx",
    apis: [useMotionValueApi, useTransformApi, motionAnimateApi],
  },
];

export default function BezierCurvePlaygroundLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Motion · Core
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Bezier Curve Playground
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Arraste qualquer um dos quatro pontos abaixo. A curva, seu
          polígono de controle e o objeto que a percorre atualizam
          imediatamente — nada aqui é pré-calculado, é a mesma fórmula da
          Bézier cúbica avaliada ao vivo a partir de onde você deixar os
          pontos.
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
            <BezierCurvePlayground />
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
