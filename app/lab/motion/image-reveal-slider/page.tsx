import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { ImageRevealSlider } from "@/components/lab/motion/image-reveal-slider";
import { LiveExample } from "@/components/lab-detail/live-example";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { motionComponentApi, motionDragApi, useMotionValueApi, useTransformApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Motion — Slider de Revelação — Web Motion Lab",
  description:
    "Experimento com a biblioteca Motion: drag move um MotionValue em pixels, e useTransform o converte num clip-path que revela a foto colorida sobre a versão em preto e branco.",
};

const concepts = [
  {
    term: "drag=\"x\" + useMotionValue",
    detail: "O gesture de drag escreve direto num MotionValue próprio, em pixels — sem re-render a cada frame.",
  },
  {
    term: "useTransform → clip-path",
    detail: "O mesmo valor de posição vira uma porcentagem de inset(), recortando a camada de cima em tempo real.",
  },
  {
    term: "ResizeObserver",
    detail: "A largura do contêiner é medida ao vivo para converter pixels em porcentagem — o slider funciona em qualquer tamanho de tela.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/motion/image-reveal-slider.tsx",
    apis: [motionComponentApi, motionDragApi, useMotionValueApi, useTransformApi],
  },
];

export default function MotionImageRevealSliderLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Motion · Animation
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Slider de Revelação
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Arraste a alça horizontalmente. As duas camadas são a mesma foto —
          uma com{" "}
          <code className="mx-1 font-mono text-sm text-accent">
            filter: grayscale(1)
          </code>{" "}
          — empilhadas uma sobre a outra; a posição da alça vira um{" "}
          <code className="mx-1 font-mono text-sm text-accent">
            clip-path
          </code>{" "}
          que recorta a camada colorida por cima.
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
            <ImageRevealSlider />
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
