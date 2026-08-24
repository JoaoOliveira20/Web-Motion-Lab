import Link from "next/link";
import { experiments } from "@/data/experiments";
import { Container } from "@/components/layout/container";
import { SectionHeading } from "@/components/home/section-heading";

export function FeaturedExperiment() {
  const featured = experiments.find((experiment) => experiment.featured);

  if (!featured) {
    return null;
  }

  return (
    <section className="py-20">
      <Container>
        <SectionHeading index="04" eyebrow="Destaque" title="Experimento em foco" />
        <div className="mt-10 grid grid-cols-1 gap-8 border border-border p-8 md:grid-cols-[1fr_auto] md:items-center md:p-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
              {featured.library}
            </p>
            <h3 className="mt-4 font-display text-display font-light tracking-tight">
              {featured.name}
            </h3>
            <p className="mt-4 max-w-lg text-muted">{featured.summary}</p>
          </div>
          <Link
            href={`/lab/${featured.slug}`}
            className="inline-flex h-14 items-center justify-center border border-foreground px-8 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent"
          >
            Ver experimento
          </Link>
        </div>
      </Container>
    </section>
  );
}
