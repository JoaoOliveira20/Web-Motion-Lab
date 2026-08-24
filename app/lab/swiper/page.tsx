import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { NavigationDemo } from "@/components/lab/swiper/navigation-demo";
import { EffectCardsDemo } from "@/components/lab/swiper/effect-cards-demo";

export const metadata: Metadata = {
  title: "Swiper — Carrossel Completo — Web Motion Lab",
  description:
    "Experimento com Swiper: navegação com setas/paginação e o efeito de pilha de cartões (EffectCards).",
};

const concepts = [
  {
    term: "modules",
    detail: "Swiper é modular — Navigation, Pagination e cada efeito são opt-in via array de módulos.",
  },
  {
    term: "swiper/css/<módulo>",
    detail: "Cada módulo tem seu próprio CSS; importar só o necessário evita carregar estilos não usados.",
  },
  {
    term: "--swiper-theme-color",
    detail: "Custom property que tematiza setas e bullets sem sobrescrever classes internas.",
  },
  {
    term: "sem autoplay",
    detail: "Nenhum dos dois carrosséis avança sozinho — carrossel automático sem pausa é um problema de acessibilidade (WCAG 2.2.2).",
  },
];

export default function SwiperLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Swiper · Carousel
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Carrossel Completo
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Swiper resolve carrossel como uma plataforma: navegação,
          paginação e uma dezena de efeitos de transição vêm prontos como
          módulos. O experimento Embla (próximo desta fase) resolve o
          mesmo problema partindo de primitivas menores — a comparação
          direta fica documentada nos dois experimentos.
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

        <div className="mt-10 grid grid-cols-1 gap-6">
          <NavigationDemo />
          <EffectCardsDemo />
        </div>
      </Container>
    </>
  );
}
