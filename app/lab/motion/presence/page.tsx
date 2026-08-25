import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { PresenceDemo } from "@/components/lab/motion/presence-demo";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import {
  animatePresenceApi,
  motionComponentApi,
  useReducedMotionMotionApi,
} from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Motion — Presença — Web Motion Lab",
  description:
    "Experimento com a biblioteca Motion: AnimatePresence anima a saída de um elemento antes de removê-lo do DOM.",
};

const concepts = [
  {
    term: "AnimatePresence",
    detail: "Anima a saída de elementos antes de removê-los do DOM — o React sozinho não permite isso.",
  },
  {
    term: "initial / animate / exit",
    detail: "Três estados descritos como dados; a Motion interpola entre eles, inclusive na saída.",
  },
  {
    term: "useReducedMotion",
    detail: "Hook nativo que lê prefers-reduced-motion do sistema e desliga a animação sem remover a função.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/motion/presence-demo.tsx",
    apis: [motionComponentApi, animatePresenceApi, useReducedMotionMotionApi],
  },
];

export default function MotionPresenceLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Motion · Animation
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Presença
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Remover um elemento do React o tira da árvore imediatamente — não
          sobra tempo para uma animação de saída rodar. O{" "}
          <code className="mx-1 font-mono text-sm text-accent">
            AnimatePresence
          </code>{" "}
          resolve isso: espera a animação de <code className="mx-1 font-mono text-sm text-accent">exit</code>{" "}
          terminar antes de deixar o elemento sumir de verdade.
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
          <PresenceDemo />
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
