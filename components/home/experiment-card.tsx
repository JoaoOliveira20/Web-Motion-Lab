import Link from "next/link";
import type { Experiment } from "@/data/experiments";
import { examplePreviews } from "@/components/lab-detail/example-previews";
import { cn } from "@/lib/cn";

const statusLabel: Record<Experiment["status"], string> = {
  disponivel: "Disponível",
  planejado: "Planejado",
};

export function ExperimentCard({ experiment }: { experiment: Experiment }) {
  const isAvailable = experiment.status === "disponivel";
  const Preview = examplePreviews[experiment.slug];

  const content = (
    <div
      className={cn(
        "group flex h-full flex-col justify-between border border-border p-6 transition-colors",
        isAvailable
          ? "hover:border-accent"
          : "opacity-60",
      )}
    >
      <div>
        <div
          aria-hidden
          className="mb-5 flex h-28 items-center justify-center overflow-hidden border border-border bg-surface"
        >
          {Preview ? (
            <Preview />
          ) : (
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted/40">
              {experiment.library}
            </span>
          )}
        </div>
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-muted">
          <span>{experiment.library}</span>
          <span
            className={cn(
              isAvailable ? "text-accent" : "text-muted",
            )}
          >
            {statusLabel[experiment.status]}
          </span>
        </div>
        <h3 className="mt-4 font-display text-2xl font-light tracking-tight">
          {experiment.name}
        </h3>
        <p className="mt-3 text-sm text-muted">{experiment.summary}</p>
      </div>
      <div className="mt-6 flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-muted">
        <span>{experiment.category}</span>
        <span aria-label={`Complexidade ${experiment.complexity} de 5`}>
          {"●".repeat(experiment.complexity)}
          {"○".repeat(5 - experiment.complexity)}
        </span>
      </div>
    </div>
  );

  if (!isAvailable) {
    return <div>{content}</div>;
  }

  return (
    <Link href={`/lab/${experiment.slug}`} className="block h-full">
      {content}
    </Link>
  );
}
