import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { LazyParticleField } from "@/components/lab/three/lazy-particle-field";
import { LiveExample } from "@/components/lab-detail/live-example";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { useFrameApi, useThreeApi, instancedMeshApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Three.js — Campo de Partículas — Web Motion Lab",
  description:
    "Campo de cápsulas instanciadas com React Three Fiber, reagindo ao cursor com inércia, formação em anel e leve profundidade.",
};

const concepts = [
  {
    term: "InstancedMesh",
    detail: "Milhares de cápsulas desenhadas numa única draw call — nenhum componente React por partícula.",
  },
  {
    term: "useFrame",
    detail: "O loop de animação roda fora do ciclo de renderização do React; posição e cor são escritas direto no buffer da GPU.",
  },
  {
    term: "Campo de influência",
    detail: "O cursor não move as partículas diretamente — ele distorce um campo de força que elas seguem com inércia.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/three/particle-field-scene.tsx",
    apis: [useFrameApi, useThreeApi, instancedMeshApi],
  },
];

export default function ThreeParticleFieldLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Three.js · 3D
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Campo de Partículas
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Um campo de cápsulas orientadas pelo movimento reage à presença
          do cursor: perto dele, as partículas giram em torno de um anel
          orgânico; longe, voltam a uma respiração lenta e contínua.
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
            <LazyParticleField className="aspect-[16/10] w-full" />
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
