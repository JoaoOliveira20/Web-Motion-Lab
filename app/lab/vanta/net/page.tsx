import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { LazyNetBackground } from "@/components/lab/vanta/lazy-net";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";

export const metadata: Metadata = {
  title: "Vanta — Efeito NET — Web Motion Lab",
  description:
    "Experimento com Vanta: VANTA.NET() empacota uma cena Three.js de rede de pontos como background configurável.",
};

const concepts = [
  {
    term: "THREE como parâmetro",
    detail: "Vanta não empacota o Three.js — o efeito espera receber a instância via options.THREE.",
  },
  {
    term: "effect.destroy()",
    detail: "Sem isso, o loop de render do Three.js continua rodando depois que o componente desmonta.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/vanta/net-background.tsx",
    apis: [{ name: "VANTA.NET()", href: "https://www.vantajs.com/?effect=net" }],
  },
];

export default function VantaNetLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Vanta · Visual
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Efeito NET
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Vanta empacota uma cena Three.js pronta como fundo configurável
          — bem mais rápido de usar que Three.js puro, ao custo de bem
          menos controle sobre a cena.
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
          <LazyNetBackground />
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
