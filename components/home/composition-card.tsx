import Link from "next/link";
import type { Composition } from "@/data/compositions";
import { cn } from "@/lib/cn";

const statusLabel: Record<Composition["status"], string> = {
  disponivel: "Disponível",
  planejado: "Planejado",
};

export function CompositionCard({ composition }: { composition: Composition }) {
  const isAvailable = composition.status === "disponivel";

  const content = (
    <div
      className={cn(
        "group flex h-full flex-col justify-between border border-border p-6 transition-colors",
        isAvailable ? "hover:border-accent" : "opacity-60",
      )}
    >
      <div>
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.14em] text-muted">
          <span>
            {composition.libraries[0]} + {composition.libraries[1]}
          </span>
          <span className={isAvailable ? "text-accent" : "text-muted"}>
            {statusLabel[composition.status]}
          </span>
        </div>
        <h3 className="mt-4 font-display text-2xl font-light tracking-tight">
          {composition.name}
        </h3>
        <p className="mt-3 text-sm text-muted">{composition.summary}</p>
      </div>
    </div>
  );

  if (!isAvailable) {
    return <div>{content}</div>;
  }

  return (
    <Link href={`/lab/compose/${composition.slug}`} className="block h-full">
      {content}
    </Link>
  );
}
