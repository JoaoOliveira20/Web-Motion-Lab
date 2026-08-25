import Link from "next/link";
import { experiments, type Experiment } from "@/data/experiments";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/home/section-heading";
import { ExperimentCard } from "@/components/home/experiment-card";

const featuredSlugs = [
  "motion/gestures",
  "gsap/scroll-trigger",
  "lenis/smooth-scroll",
  "react-bits/tilted-card",
  "rough-notation/hover",
  "swiper/effect-cards",
  "tsparticles/grab",
  "three/point-wave",
  "spline",
];

const featuredExperiments = featuredSlugs
  .map((slug) => experiments.find((experiment) => experiment.slug === slug))
  .filter((experiment): experiment is Experiment => Boolean(experiment));

export function ExperimentsGrid() {
  return (
    <section id="experimentos" className="border-b border-border py-20">
      <Container>
        <SectionHeading
          title="Laboratórios isolados"
          description="Uma amostra das 16 bibliotecas — cada experimento estuda uma em contexto próprio, antes de qualquer combinação."
        />
        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredExperiments.map((experiment) => (
            <li key={experiment.slug}>
              <ExperimentCard experiment={experiment} />
            </li>
          ))}
        </ul>
        <div className="mt-10 flex justify-center">
          <Link
            href="/lab"
            className="inline-flex h-14 items-center justify-center border border-foreground px-8 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent"
          >
            Ver todos os laboratórios
          </Link>
        </div>
      </Container>
    </section>
  );
}
