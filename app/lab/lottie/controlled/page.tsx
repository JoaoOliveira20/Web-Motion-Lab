import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { ControlledDemo } from "@/components/lab/lottie/controlled-demo";
import { LiveExample } from "@/components/lab-detail/live-example";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { lottieRefApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Lottie — Controle Imperativo — Web Motion Lab",
  description:
    "Experimento com Lottie: lottieRef expõe play/pause/setSpeed sobre a mesma animação, fora do fluxo declarativo.",
};

const concepts = [
  {
    term: "lottieRef",
    detail: "Uso imperativo: expõe play/pause/setSpeed/playSegments sobre a mesma animação.",
  },
  {
    term: "Cor embutida no arquivo",
    detail: "Ao contrário do SVG do Rough Notation, as cores do Lottie não herdam currentColor — ficam fixas no JSON.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/lottie/controlled-demo.tsx",
    apis: [lottieRefApi],
  },
];

export default function LottieControlledLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Lottie · Animation
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Controle Imperativo
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Em vez de deixar a animação tocar sozinha, um{" "}
          <code className="mx-1 font-mono text-sm text-accent">
            lottieRef
          </code>{" "}
          dá acesso direto à instância — pausar, retomar e mudar
          velocidade sob demanda.
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
            <ControlledDemo />
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
