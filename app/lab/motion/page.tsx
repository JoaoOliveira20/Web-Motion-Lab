import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { PresenceDemo } from "@/components/lab/motion/presence-demo";
import { GestureGrid } from "@/components/lab/motion/gesture-grid";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import {
  animatePresenceApi,
  motionComponentApi,
  motionGesturesApi,
  useReducedMotionMotionApi,
} from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Motion — Presença e Gestures — Web Motion Lab",
  description:
    "Experimento com a biblioteca Motion: animações declarativas de entrada e saída com AnimatePresence, e resposta a gestures do usuário.",
};

const concepts = [
  {
    term: "Variants",
    detail: "Estados de animação nomeados e reutilizáveis entre elementos.",
  },
  {
    term: "AnimatePresence",
    detail: "Anima a saída de elementos antes de removê-los do DOM.",
  },
  {
    term: "Gestures",
    detail: "whileHover, whileTap e whileFocus respondem à interação direta.",
  },
  {
    term: "useReducedMotion",
    detail: "Hook nativo que lê prefers-reduced-motion do sistema.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/motion/presence-demo.tsx",
    apis: [motionComponentApi, animatePresenceApi, useReducedMotionMotionApi],
    copyable: true,
  },
  {
    filePath: "lab/motion/gesture-grid.tsx",
    apis: [motionComponentApi, motionGesturesApi, useReducedMotionMotionApi],
    copyable: true,
  },
];

export default function MotionLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Motion · Animation
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Presença e Gestures
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Motion (sucessora da Framer Motion) resolve animação declarativa em
          React: em vez de manipular propriedades de estilo diretamente, o
          componente descreve estados — e a biblioteca interpola entre eles,
          incluindo entrada, saída e resposta a gestures.
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
          <PresenceDemo />
          <GestureGrid />
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
