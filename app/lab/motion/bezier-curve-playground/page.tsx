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
    "Drag the control points of a cubic Bézier curve and watch an object travel along it in real time — built with Motion's useMotionValue and useTransform.",
};

const concepts = [
  {
    term: "8 MotionValues, no re-renders",
    detail: "Every point is its own MotionValue; dragging never touches React state, only .set() calls.",
  },
  {
    term: "useTransform() combining values",
    detail: "The path, and the moving marker's position, are derived live from the point MotionValues.",
  },
  {
    term: "animate() driving t",
    detail: "Play/Pause/Reset and Speed all just start, stop, or retime an animate() call on a single progress value.",
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
          Drag any of the four points below. The curve, its control polygon
          and the object traveling along it all update immediately —
          nothing here is pre-baked, it&apos;s the same cubic Bézier formula
          evaluated live from wherever you leave the points.
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
