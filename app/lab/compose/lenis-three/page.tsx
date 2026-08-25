import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { LazyDirectScrollScene } from "@/components/lab/compose/lenis-three/lazy-scene";

export const metadata: Metadata = {
  title: "Lenis + Three.js — Câmera por Scroll Direto — Web Motion Lab",
  description:
    "Composição: lenis.progress move a câmera de uma cena Three.js diretamente, sem nenhuma engine de animação no meio.",
};

const concepts = [
  {
    term: "lenis.progress",
    detail: "0 a 1, exposto pela própria instância do Lenis — sem calcular scrollTop / (scrollHeight - clientHeight) na mão.",
  },
  {
    term: "lenis.on(\"scroll\", cb)",
    detail: "Callback chamado a cada frame interpolado do Lenis, recebendo a instância — dispensa qualquer engine de tween.",
  },
  {
    term: "Sem GSAP",
    detail: "A composição GSAP + Three.js (Fase 5) usa timeline.progress() como intermediário. Aqui o valor vai direto para camera.position.",
  },
  {
    term: "Mesma cena, dois donos",
    detail: "O requestAnimationFrame do Three.js só desenha; o callback do Lenis só muda valores — igual à composição GSAP + Three.js.",
  },
];

export default function LenisThreeComposePage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Composição · Ideia adicional
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Câmera por Scroll Direto
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          A composição GSAP + Three.js (Fase 5) usa uma timeline do GSAP
          como intermediário entre o scroll e a câmera. Esta pergunta o
          oposto: dá pra pular esse intermediário? Aqui, o próprio
          <code className="mx-1 font-mono text-accent">lenis.progress</code>
          move a câmera diretamente — sem timeline, sem tween, sem
          ScrollTrigger.
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
          <LazyDirectScrollScene />
        </div>
      </Container>
    </>
  );
}
