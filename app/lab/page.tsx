import type { Metadata } from "next";
import { experiments } from "@/data/experiments";
import { compositions } from "@/data/compositions";
import { libraries } from "@/data/libraries";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { LabCatalog } from "@/components/lab-catalog/lab-catalog";

export const metadata: Metadata = {
  title: "Laboratório — Web Motion Lab",
  description: "Índice de todos os experimentos do Web Motion Lab.",
};

export default function LabIndexPage() {
  return (
    <>
      <BackLink href="/" label="Início" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Índice
        </p>
        <h1 className="mt-3 font-display text-display font-light tracking-tight">
          Todos os experimentos
        </h1>
        <p className="mt-4 max-w-sm text-sm text-muted">
          Experimentos disponíveis podem ser abertos. Os demais estão
          planejados nas próximas fases. Composições usam mais de uma
          biblioteca — filtrar por uma delas mostra as duas listas.
        </p>

        <div className="mt-10">
          <LabCatalog
            experiments={experiments}
            compositions={compositions}
            libraries={libraries}
          />
        </div>
      </Container>
    </>
  );
}
