import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { TimelineDemo } from "@/components/lab/gsap/timeline-demo";
import { ScrollTriggerDemo } from "@/components/lab/gsap/scroll-trigger-demo";

export const metadata: Metadata = {
  title: "GSAP — Timelines Sequenciadas — Web Motion Lab",
  description:
    "Experimento com GSAP: coreografia de múltiplos elementos com timelines e revelação ligada ao scroll com ScrollTrigger.",
};

const concepts = [
  {
    term: "gsap.timeline()",
    detail: "Sequencia tweens com ordem e stagger controlados por código.",
  },
  {
    term: "useGSAP()",
    detail: "Substitui useLayoutEffect e reverte animações no cleanup via gsap.context().",
  },
  {
    term: "ScrollTrigger",
    detail: "Liga o progresso de uma animação à posição de scroll de qualquer elemento.",
  },
  {
    term: "scrub",
    detail: "Sincroniza a animação diretamente ao scroll, sem easing de tempo.",
  },
];

export default function GsapLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          GSAP · Animation
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Timelines Sequenciadas
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          GSAP resolve animação de forma imperativa: em vez de descrever
          estados de componente, o código comanda tweens diretamente,
          organizados em timelines com controle preciso de ordem, offset e
          stagger. O plugin ScrollTrigger estende esse mesmo motor para
          reagir à posição de scroll.
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
          <TimelineDemo />
          <ScrollTriggerDemo />
        </div>
      </Container>
    </>
  );
}
