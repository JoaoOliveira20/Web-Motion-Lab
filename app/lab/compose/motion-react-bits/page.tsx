import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { FilterableGallery } from "@/components/lab/compose/motion-react-bits/filterable-gallery";

export const metadata: Metadata = {
  title: "Motion + React Bits — Galeria Filtrável — Web Motion Lab",
  description:
    "Composição: AnimatePresence coreografa entrada e saída de SpotlightCards ao trocar de filtro, sem perder o efeito de hover do React Bits.",
};

const concepts = [
  {
    term: "Componente reaproveitado",
    detail: "O SpotlightCard é literalmente o mesmo componente do experimento React Bits — nenhuma cópia, um import.",
  },
  {
    term: "layout + AnimatePresence",
    detail: "layout anima a realocação dos cartões restantes; AnimatePresence anima os que saem antes de sumirem do DOM.",
  },
  {
    term: "mode=\"popLayout\"",
    detail: "Remove um item do fluxo de layout assim que começa a sair, para os outros já reorganizarem em vez de esperar.",
  },
  {
    term: "Duas camadas de interação",
    detail: "Motion anima o filtro; o CSS/ref do SpotlightCard continua cuidando do brilho por baixo, sem interferência.",
  },
];

export default function MotionReactBitsComposePage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Composição · Fase 5
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Galeria Filtrável
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          O SpotlightCard (Fase 2) resolve reação ao ponteiro; a Motion
          (Fase 1) resolve reação ao estado do React. Aqui os dois
          convivem no mesmo componente: trocar o filtro anima quais
          cartões entram e saem, sem tocar em como cada cartão reage ao
          próprio hover.
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
          <FilterableGallery />
        </div>
      </Container>
    </>
  );
}
