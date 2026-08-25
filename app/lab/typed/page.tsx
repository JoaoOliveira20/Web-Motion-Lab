import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { LoopTypedDemo } from "@/components/lab/typed/loop-typed-demo";
import { TerminalTypedDemo } from "@/components/lab/typed/terminal-typed-demo";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";

export const metadata: Metadata = {
  title: "Typed.js — Texto Digitado — Web Motion Lab",
  description:
    "Experimento com Typed.js: simulação de digitação em tempo real e controle imperativo de start/stop/reset.",
};

const concepts = [
  {
    term: "new Typed(el, options)",
    detail: "Manipula o textContent do elemento diretamente — fora do controle do React.",
  },
  {
    term: ".destroy()",
    detail: "Limpeza obrigatória no cleanup do efeito, ou a instância continua rodando após desmontar.",
  },
  {
    term: "toggle() / reset()",
    detail: "Métodos imperativos para pausar, retomar e reiniciar a digitação sob demanda.",
  },
  {
    term: "Fallback estático",
    detail: "Com prefers-reduced-motion, o texto final aparece direto, sem a animação de digitação.",
  },
];

const typedClassApi = {
  name: "new Typed(el, options)",
  href: "https://mattboldt.github.io/typed.js/docs/class/src/typed.js~Typed.html",
};

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/typed/loop-typed-demo.tsx",
  },
  {
    filePath: "lab/typed/terminal-typed-demo.tsx",
    apis: [
      {
        name: ".toggle() / .reset() / .destroy()",
        href: "https://mattboldt.github.io/typed.js/docs/class/src/typed.js~Typed.html",
      },
    ],
  },
  {
    filePath: "use-typed.ts",
    dir: "hooks",
    apis: [typedClassApi],
  },
];

export default function TypedLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Typed.js · Typography
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Texto Digitado
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Typed.js escreve e apaga texto diretamente no DOM, fora do
          ciclo de renderização do React. Isso resolve o efeito de
          digitação com pouco código, mas exige atenção ao cleanup — sem
          <code className="mx-1 font-mono text-sm text-accent">
            destroy()
          </code>
          , a instância anterior continua escrevendo depois que o
          componente desmonta.
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
          <LoopTypedDemo />
          <TerminalTypedDemo />
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
