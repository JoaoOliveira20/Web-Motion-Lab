import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { CaptionedCarousel } from "@/components/lab/compose/swiper-motion/captioned-carousel";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";
import {
  animatePresenceApi,
  motionComponentApi,
  useReducedMotionMotionApi,
} from "@/data/api-docs";

export const metadata: Metadata = {
  title: "Swiper + Motion — Legenda Sincronizada — Web Motion Lab",
  description:
    "Composição: Swiper controla os slides; onSlideChange dispara uma legenda animada com AnimatePresence, fora do DOM do carrossel.",
};

const concepts = [
  {
    term: "onSlideChange",
    detail: "O único ponto de contato entre as duas bibliotecas: um número (activeIndex) sai do Swiper e entra no React.",
  },
  {
    term: "AnimatePresence mode=\"wait\"",
    detail: "Espera a legenda antiga terminar de sair antes de montar a nova — evita duas legendas sobrepostas.",
  },
  {
    term: "key={activeIndex}",
    detail: "Trocar a key força a Motion a tratar cada legenda como um elemento novo, disparando exit/enter.",
  },
  {
    term: "Duas árvores de DOM",
    detail: "A legenda vive fora do <Swiper> — não precisa ser uma SwiperSlide para reagir ao slide ativo.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/compose/swiper-motion/captioned-carousel.tsx",
    apis: [
      { name: "Swiper (React) — onSlideChange", href: "https://swiperjs.com/react" },
      motionComponentApi,
      animatePresenceApi,
      useReducedMotionMotionApi,
    ],
  },
];

export default function SwiperMotionComposePage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Composição · Fase 5
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Legenda Sincronizada ao Slide
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          O experimento Swiper isolado (Fase 3) não precisava saber qual
          slide estava ativo fora dele. Aqui o índice do slide ativo
          alimenta um componente de legenda inteiramente separado,
          animado pela Motion — duas bibliotecas, uma comunicação de mão
          única.
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
          <CaptionedCarousel />
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
