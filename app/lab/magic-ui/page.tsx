import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { BorderBeamShowcase } from "@/components/lab/magic-ui/border-beam-showcase";
import { MarqueeShowcase } from "@/components/lab/magic-ui/marquee-showcase";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { motionComponentApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Magic UI — Componentes Visuais — Web Motion Lab",
  description:
    "Experimento com Magic UI: um contorno animado via offset-path e um ticker infinito via CSS puro.",
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
  {
    term: "@keyframes + CSS var",
    detail: "Marquee usa apenas CSS puro — sem Motion, sem GSAP — para o loop infinito.",
  },
  {
    term: "reduced motion automático",
    detail: "A regra global de app/globals.css já reduz animações CSS a 1 iteração; BorderBeam (JS) precisa de tratamento próprio.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/magic-ui/border-beam.tsx",
    apis: [motionComponentApi],
  },
  {
    filePath: "lab/magic-ui/marquee.tsx",
  },
];

export default function MagicUiLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Magic UI · UI
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Componentes Visuais
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Magic UI mistura duas abordagens: efeitos que dependem da
          Motion (como o BorderBeam) e efeitos que são CSS puro (como o
          Marquee). Comparar os dois mostra quando vale a pena pagar o
          custo de uma biblioteca de animação e quando o navegador já
          resolve sozinho.
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
          <BorderBeamShowcase />
          <MarqueeShowcase />
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
