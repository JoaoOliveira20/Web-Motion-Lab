import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { LazyRepulseField } from "@/components/lab/tsparticles/lazy-repulse";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { tsparticlesOptionsApi, tsparticlesReactApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "tsParticles — Campo Repulsivo — Web Motion Lab",
  description:
    "Experimento com tsParticles: hover empurra as partículas, clique adiciona mais — dois modos de interactivity num só campo.",
};

const concepts = [
  {
    term: "loadSlim(engine)",
    detail: "Registra um subconjunto de formas/interações — bem menor que o bundle completo (loadFull).",
  },
  {
    term: "interactivity.modes",
    detail: "repulse no hover, push no clique — dois comportamentos configurados, zero código de física escrito à mão.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/tsparticles/particles-provider.tsx",
    apis: [tsparticlesReactApi],
  },
  {
    filePath: "lab/tsparticles/repulse-field.tsx",
    apis: [tsparticlesReactApi, tsparticlesOptionsApi],
  },
];

export default function TsParticlesRepulseLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          tsParticles · Visual
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Campo Repulsivo
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Passe o mouse para empurrar as partículas, clique para adicionar
          mais — carregado sob demanda, nenhum código do tsParticles entra
          no bundle de outra rota.
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
          <LazyRepulseField />
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
