import { experiments } from "@/data/experiments";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/home/section-heading";
import { ExperimentCard } from "@/components/home/experiment-card";

export function ExperimentsGrid() {
  return (
    <section id="experimentos" className="border-b border-border py-20">
      <Container>
        <SectionHeading
          index="02"
          eyebrow="Experimentos"
          title="Laboratórios isolados"
          description="Cada experimento estuda uma biblioteca em contexto próprio, antes de qualquer combinação."
        />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {experiments.map((experiment) => (
            <li key={experiment.slug}>
              <ExperimentCard experiment={experiment} />
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
