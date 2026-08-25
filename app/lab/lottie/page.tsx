import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { AutoplayDemo } from "@/components/lab/lottie/autoplay-demo";
import { ControlledDemo } from "@/components/lab/lottie/controlled-demo";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { lottieComponentApi, lottieRefApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Lottie — Animação Vetorial — Web Motion Lab",
  description:
    "Experimento com Lottie: reprodução declarativa e controle imperativo de uma animação vetorial exportada para JSON.",
};

const concepts = [
  {
    term: "Bodymovin/Lottie JSON",
    detail: "Formato aberto que descreve camadas, formas e keyframes exportados do After Effects.",
  },
  {
    term: "<Lottie src loop autoplay />",
    detail: "Uso declarativo: a biblioteca busca o JSON e toca sozinha conforme as props.",
  },
  {
    term: "useLottie()",
    detail: "Uso imperativo: expõe play/pause/setSpeed/playSegments sobre a mesma animação.",
  },
  {
    term: "Cor embutida no arquivo",
    detail: "Ao contrário do SVG do Rough Notation, as cores do Lottie não herdam currentColor — ficam fixas no JSON.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/lottie/autoplay-demo.tsx",
    apis: [lottieComponentApi],
  },
  {
    filePath: "lab/lottie/controlled-demo.tsx",
    apis: [lottieRefApi],
  },
];

export default function LottieLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Lottie · Animation
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Animação Vetorial
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          A animação usada nos dois experimentos abaixo (
          <code className="mx-1 font-mono text-sm text-accent">ripple.json</code>
          ) vem da suíte de testes oficial do lottie-web (MIT), não foi
          desenhada para este projeto — o objetivo aqui é a API de
          reprodução, não a peça de motion design em si.
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
          <AutoplayDemo />
          <ControlledDemo />
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
