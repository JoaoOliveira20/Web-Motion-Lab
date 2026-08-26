import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { LazyDotsBackground } from "@/components/lab/vanta/lazy-dots";
import { LiveExample } from "@/components/lab-detail/live-example";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";

export const metadata: Metadata = {
  title: "Vanta — Efeito DOTS — Web Motion Lab",
  description:
    "Experimento com Vanta: VANTA.DOTS() empacota outro efeito Three.js pronto, com opções próprias de cor e espaçamento.",
};

const concepts = [
  {
    term: "Cores em hexadecimal numérico",
    detail: "0xff4d1c, não '#ff4d1c' — os tokens CSS precisam ser convertidos antes de chegar ao efeito.",
  },
  {
    term: "Sem tipos oficiais",
    detail: "Vanta não publica .d.ts — os tipos usados aqui foram escritos localmente em types/vanta.d.ts.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/vanta/dots-background.tsx",
    apis: [{ name: "VANTA.DOTS()", href: "https://www.vantajs.com/?effect=dots" }],
  },
];

export default function VantaDotsLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Vanta · Visual
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Efeito DOTS
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Mesmo mecanismo do NET (Three.js por baixo, opções por cima),
          efeito visual completamente diferente — troca de nome, troca de
          cena inteira.
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
            <LazyDotsBackground />
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
