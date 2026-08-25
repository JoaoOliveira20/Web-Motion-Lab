import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { GestureGrid } from "@/components/lab/motion/gesture-grid";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import {
  motionComponentApi,
  motionGesturesApi,
  useReducedMotionMotionApi,
} from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Motion — Gestures — Web Motion Lab",
  description:
    "Experimento com a biblioteca Motion: whileHover, whileTap e whileFocus respondem à interação direta, sem listener manual.",
};

const concepts = [
  {
    term: "whileHover / whileTap",
    detail: "Alvos de animação temporários, ativos só enquanto o gesture dura — sem estado manual no componente.",
  },
  {
    term: "whileFocus",
    detail: "Mesmo padrão dos gestures de ponteiro, mas disparado por navegação de teclado — acessível por padrão.",
  },
  {
    term: "useReducedMotion",
    detail: "Com o sistema pedindo menos movimento, os alvos de gesture somem sem quebrar a interação em si.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/motion/gesture-grid.tsx",
    apis: [motionComponentApi, motionGesturesApi, useReducedMotionMotionApi],
  },
];

export default function MotionGesturesLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Motion · Animation
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Gestures
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Em vez de{" "}
          <code className="mx-1 font-mono text-sm text-accent">
            onMouseEnter
          </code>
          /
          <code className="mx-1 font-mono text-sm text-accent">
            onMouseLeave
          </code>{" "}
          manuais, a Motion trata hover, tap e foco como estados de
          animação — os mesmos{" "}
          <code className="mx-1 font-mono text-sm text-accent">
            initial
          </code>
          /
          <code className="mx-1 font-mono text-sm text-accent">
            animate
          </code>{" "}
          que já existem, só que amarrados a um gesture em vez do ciclo de
          vida do componente.
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
