import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { LazyGrabField } from "@/components/lab/tsparticles/lazy-grab";
import { LiveExample } from "@/components/lab-detail/live-example";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { tsparticlesOptionsApi, tsparticlesReactApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "tsParticles — Campo com Conexões — Web Motion Lab",
  description:
    "Experimento com tsParticles: o modo grab desenha linhas entre o ponteiro e as partículas próximas.",
};

const concepts = [
  {
    term: "particles.paint.fill.color",
    detail: "A cor não vem de CSS — é lida de --muted via getComputedStyle e passada como string ao Canvas.",
  },
  {
    term: "interactivity.modes.grab",
    detail: "Desenha linhas entre o ponteiro e as partículas dentro de uma distância configurada.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/tsparticles/grab-field.tsx",
    apis: [tsparticlesReactApi, tsparticlesOptionsApi],
  },
];

export default function TsParticlesGrabLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          tsParticles · Visual
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Campo com Conexões
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Onde o campo repulsivo empurra partículas, este conecta o
          ponteiro a elas com linhas — a mesma engine, um modo de
          interactivity diferente.
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
            <LazyGrabField />
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
