import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { MarqueeShowcase } from "@/components/lab/magic-ui/marquee-showcase";
import { LiveExample } from "@/components/lab-detail/live-example";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";

export const metadata: Metadata = {
  title: "Magic UI — Ticker Infinito — Web Motion Lab",
  description:
    "Experimento com Magic UI: Marquee é CSS puro — sem Motion, sem GSAP — para o loop infinito.",
};

const concepts = [
  {
    term: "@keyframes + CSS var",
    detail: "Marquee usa apenas CSS puro — sem Motion, sem GSAP — para o loop infinito.",
  },
  {
    term: "reduced motion automático",
    detail: "A regra global de app/globals.css já reduz animações CSS a 1 iteração, sem tratamento próprio.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/magic-ui/marquee.tsx",
  },
];

export default function MagicUiMarqueeLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Magic UI · UI
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Ticker Infinito
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Ao contrário do BorderBeam, este efeito não depende de nenhuma
          biblioteca de animação — só{" "}
          <code className="mx-1 font-mono text-sm text-accent">
            @keyframes
          </code>{" "}
          e uma custom property de duração, comparando quando vale a pena
          pagar o custo de uma lib e quando o navegador já resolve
          sozinho.
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
            <MarqueeShowcase />
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
