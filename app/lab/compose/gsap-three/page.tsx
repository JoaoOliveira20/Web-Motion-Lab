import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { LazyScrollCameraScene } from "@/components/lab/compose/gsap-three/lazy-scene";

export const metadata: Metadata = {
  title: "GSAP + Three.js — Câmera Guiada por Timeline — Web Motion Lab",
  description:
    "Composição: ScrollTrigger com scrub anima propriedades de uma cena Three.js — câmera e rotação controladas pela posição de scroll.",
};

const concepts = [
  {
    term: "GSAP anima qualquer objeto",
    detail: "camera.position e mesh.rotation não são elementos DOM — são objetos JS com propriedades numéricas, e é só isso que o GSAP precisa.",
  },
  {
    term: "scrub: 1",
    detail: "A timeline não toca sozinha — ela é 'tocada' pela posição de scroll, com 1s de suavização entre os dois.",
  },
  {
    term: "Dois loops, uma cena",
    detail: "O requestAnimationFrame do Three.js só desenha; o GSAP só muda valores. Nenhum sabe da existência do outro.",
  },
  {
    term: "onUpdate do ScrollTrigger",
    detail: "Sincroniza um indicador de UI (React state) com o progresso da mesma timeline que move a câmera.",
  },
];

export default function GsapThreeComposePage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Composição · Fase 5
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Câmera Guiada por Timeline
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          O experimento Three.js isolado (Fase 4) animava a cena com um
          loop próprio, sem relação com scroll. Aqui a mesma cena é
          controlada por uma timeline do GSAP amarrada ao scroll de uma
          lista ao lado — role a lista para aproximar a câmera e girar o
          objeto.
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
          <LazyScrollCameraScene />
        </div>
      </Container>
    </>
  );
}
