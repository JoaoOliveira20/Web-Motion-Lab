import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { EffectCardsDemo } from "@/components/lab/swiper/effect-cards-demo";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";

const swiperApi = { name: "Swiper (React)", href: "https://swiperjs.com/react" };
const swiperModulesApi = {
  name: "Módulo (EffectCards)",
  href: "https://swiperjs.com/swiper-api",
};

export const metadata: Metadata = {
  title: "Swiper — Pilha de Cartões — Web Motion Lab",
  description:
    "Experimento com Swiper: o módulo EffectCards troca a transição padrão por um efeito de pilha, sem código extra.",
};

const concepts = [
  {
    term: "effect=\"cards\"",
    detail: "Um módulo inteiro troca a transição padrão por um efeito de pilha visual.",
  },
  {
    term: "sem autoplay",
    detail: "O carrossel não avança sozinho — automático sem pausa é um problema de acessibilidade (WCAG 2.2.2).",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/swiper/effect-cards-demo.tsx",
    apis: [swiperApi, swiperModulesApi],
  },
];

export default function SwiperEffectCardsLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Swiper · Carousel
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Pilha de Cartões
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Trocar o módulo de efeito é a diferença inteira entre este
          experimento e o de navegação — o motor por baixo continua o
          mesmo.
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
          <EffectCardsDemo />
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
