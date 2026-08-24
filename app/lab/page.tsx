import type { Metadata } from "next";
import { experiments } from "@/data/experiments";
import { compositions } from "@/data/compositions";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { SectionHeading } from "@/components/home/section-heading";
import { ExperimentCard } from "@/components/home/experiment-card";
import { CompositionCard } from "@/components/home/composition-card";

export const metadata: Metadata = {
  title: "Laboratório — Web Motion Lab",
  description: "Índice de todos os experimentos do Web Motion Lab.",
};

export default function LabIndexPage() {
  return (
    <>
      <BackLink href="/" label="Início" />
      <Container className="mt-8">
        <SectionHeading
          index="01"
          eyebrow="Índice"
          title="Todos os experimentos"
          description="Experimentos disponíveis podem ser abertos. Os demais estão planejados nas próximas fases."
        />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.map((experiment) => (
            <li key={experiment.slug}>
              <ExperimentCard experiment={experiment} />
            </li>
          ))}
        </ul>

        <div className="mt-20">
          <SectionHeading
            index="02"
            eyebrow="Fase 5"
            title="Composições"
            description="Pares de bibliotecas combinadas para estudar integração — não é obrigação usar todas juntas, é entender como duas convivem."
          />
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {compositions.map((composition) => (
              <li key={composition.slug}>
                <CompositionCard composition={composition} />
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </>
  );
}
