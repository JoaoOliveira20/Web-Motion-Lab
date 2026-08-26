import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { KartRacerScene } from "@/components/lab/gsap/kart-racer/kart-racer-scene";
import { LiveExample } from "@/components/lab-detail/live-example";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import { gsapPositionParameterApi, gsapQuickToApi, gsapTimelineApi, useGsapApi } from "@/data/api-docs";

export const metadata: Metadata = {
  title: "GSAP — Corrida Retrô em Loop — Web Motion Lab",
  description:
    "Experimento com GSAP: uma timeline em loop infinito sincroniza kart, pista e cenário lateral numa animação de corrida arcade, sem interação nem scroll.",
};

const concepts = [
  {
    term: "Timeline com position parameter",
    detail: "Uma única timeline com repeat: -1 usa \"+=\" para intercalar retas e curvas sem tweens vazios de espera.",
  },
  {
    term: "Um valor, vários elementos",
    detail: "A curva é um único número (-1 a 1) espelhado numa custom property CSS e lido por dezenas de elementos via calc().",
  },
  {
    term: "gsap.quickTo()",
    detail: "O kart persegue o valor de curva com um leve atraso próprio — reforça a sensação orgânica sem travar a timeline principal.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/gsap/kart-racer/kart-racer-scene.tsx",
    apis: [useGsapApi, gsapTimelineApi, gsapPositionParameterApi, gsapQuickToApi],
  },
  {
    filePath: "lab/gsap/kart-racer/kart-sprite.tsx",
  },
  {
    filePath: "lab/gsap/kart-racer/scenery-sprites.tsx",
  },
];

export default function GsapKartRacerLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          GSAP · Animation
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Corrida Retrô em Loop
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Uma cena inspirada em corridas arcade antigas, sem jogo por trás —
          só uma timeline em loop infinito. O kart fica perto do centro; a
          pista, as faixas e o cenário lateral se movem para criar a
          sensação de velocidade e de curva, sem depender de scroll ou de
          qualquer interação.
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
            <KartRacerScene className="aspect-[16/10] w-full" />
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
