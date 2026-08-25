import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { BorderBeamShowcase } from "@/components/lab/magic-ui/border-beam-showcase";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { motionComponentApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Magic UI — Contorno Animado — Web Motion Lab",
  description:
    "Experimento com Magic UI: offset-path anima um segmento de gradiente percorrendo o contorno de um cartão.",
};

const concepts = [
  {
    term: "offset-path",
    detail: "Propriedade CSS que define uma trajetória; offset-distance move o elemento ao longo dela.",
  },
  {
    term: "mask-intersect",
    detail: "Combina duas máscaras para revelar só a borda de um elemento com radius arbitrário.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/magic-ui/border-beam.tsx",
    apis: [motionComponentApi],
  },
];

export default function MagicUiBorderBeamLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Magic UI · UI
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Contorno Animado
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Um segmento de gradiente percorre o perímetro do cartão via{" "}
          <code className="mx-1 font-mono text-sm text-accent">
            offset-path
          </code>{" "}
          — a Motion anima só a posição ao longo da trajetória, não o
          gradiente em si.
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

        <div className="mt-10 max-w-2xl">
          <BorderBeamShowcase />
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
