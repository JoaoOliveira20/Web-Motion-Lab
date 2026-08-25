import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { TsParticlesLazySection } from "@/components/lab/tsparticles/lazy-section";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";

export const metadata: Metadata = {
  title: "tsParticles — Sistema de Partículas — Web Motion Lab",
  description:
    "Experimento com tsParticles: campo de partículas reagindo a hover e clique, carregado sob demanda via dynamic import.",
};

const concepts = [
  {
    term: "loadSlim(engine)",
    detail: "Registra um subconjunto de formas/interações — bem menor que o bundle completo (loadFull).",
  },
  {
    term: "ParticlesProvider",
    detail: "Garante que o engine carregue uma única vez; os filhos só renderizam depois de pronto.",
  },
  {
    term: "dynamic(..., { ssr: false })",
    detail: "O engine (Canvas, sem sentido no servidor) só entra no bundle do cliente, sob demanda desta página.",
  },
  {
    term: "particles.paint.fill.color",
    detail: "A cor não vem de CSS — é lida de --accent/--muted via getComputedStyle e passada como string ao Canvas.",
  },
];

const tsparticlesReactApi = {
  name: "ParticlesProvider / loadSlim / <Particles>",
  href: "https://particles.js.org/guide/wrappers-react",
};
const tsparticlesOptionsApi = {
  name: "interactivity (repulse/push/grab)",
  href: "https://particles.js.org/options/",
};

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/tsparticles/particles-provider.tsx",
    apis: [tsparticlesReactApi],
  },
  {
    filePath: "lab/tsparticles/repulse-field.tsx",
    apis: [tsparticlesReactApi, tsparticlesOptionsApi],
  },
  {
    filePath: "lab/tsparticles/grab-field.tsx",
    apis: [tsparticlesReactApi, tsparticlesOptionsApi],
  },
];

export default function TsParticlesLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          tsParticles · Visual
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Sistema de Partículas
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Primeiro experimento da Fase 4 — bibliotecas visuais pesadas
          que só devem carregar onde são usadas. Nenhum código do
          tsParticles entra no bundle da homepage ou de qualquer outra
          rota; ele só chega ao navegador quando esta página é aberta.
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

        <div className="mt-10">
          <TsParticlesLazySection />
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
