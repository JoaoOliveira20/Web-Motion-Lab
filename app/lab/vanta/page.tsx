import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { VantaLazySection } from "@/components/lab/vanta/lazy-section";

export const metadata: Metadata = {
  title: "Vanta — Background WebGL — Web Motion Lab",
  description:
    "Experimento com Vanta: dois efeitos de fundo em WebGL (NET e DOTS) construídos sobre Three.js, carregados sob demanda.",
};

const concepts = [
  {
    term: "THREE como parâmetro",
    detail: "Vanta não empacota o Three.js — cada efeito espera receber a instância via options.THREE.",
  },
  {
    term: "Cores em hexadecimal numérico",
    detail: "0xff4d1c, não '#ff4d1c' — os tokens CSS precisam ser convertidos antes de chegar ao efeito.",
  },
  {
    term: "effect.destroy()",
    detail: "Sem isso, o loop de render do Three.js continua rodando depois que o componente desmonta.",
  },
  {
    term: "Sem tipos oficiais",
    detail: "Vanta não publica .d.ts — os tipos usados aqui foram escritos localmente em types/vanta.d.ts.",
  },
];

export default function VantaLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Vanta · Visual
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Background WebGL
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Vanta empacota cenas Three.js prontas como efeitos de fundo
          configuráveis. Mais rápido de usar que Three.js puro, ao custo
          de bem menos controle sobre a cena — ver comparação em{" "}
          <code className="mx-1 font-mono text-sm text-accent">
            docs/experiments/three.md
          </code>{" "}
          (Fase 4, próximo experimento).
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
          <VantaLazySection />
        </div>
      </Container>
    </>
  );
}
