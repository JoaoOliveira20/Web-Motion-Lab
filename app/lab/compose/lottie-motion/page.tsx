import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { HoverPlayIcon } from "@/components/lab/compose/lottie-motion/hover-play-icon";

export const metadata: Metadata = {
  title: "Lottie + Motion — Ícone Reativo a Gestures — Web Motion Lab",
  description:
    "Composição: whileHover/onHoverStart da Motion disparam play()/pause() no lottieRef — dois motores de animação, um gatilho de gesture só.",
};

const concepts = [
  {
    term: "onHoverStart / onHoverEnd",
    detail: "Callbacks de gesture da Motion, disparados independentemente de whileHover — um anima o wrapper, o outro comanda o Lottie.",
  },
  {
    term: "Dois motores, uma intenção",
    detail: "A Motion nunca anima os quadros do SVG; o Lottie nunca sabe que existe um scale por baixo dele.",
  },
  {
    term: "lottieRef imperativo",
    detail: "Mesmo padrão do experimento Lottie isolado (Fase 3) — só que agora o gatilho vem de um gesture, não de um clique.",
  },
  {
    term: "prefers-reduced-motion",
    detail: "Desliga o scale da Motion; o play/pause do Lottie continua funcionando (não é ambiente, é resposta direta ao hover).",
  },
];

export default function LottieMotionComposePage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Composição · Fase 5
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Ícone Reativo a Gestures
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          No experimento Lottie isolado (Fase 3), play/pause vinham de
          um clique em botão. Aqui o gatilho é um gesture de ponteiro
          capturado pela Motion — o mesmo padrão de{" "}
          <code className="mx-1 font-mono text-sm text-accent">
            whileHover
          </code>{" "}
          da Fase 1, agora comandando outra biblioteca.
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
          <HoverPlayIcon />
        </div>
      </Container>
    </>
  );
}
