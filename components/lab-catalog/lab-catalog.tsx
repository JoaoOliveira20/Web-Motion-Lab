"use client";

import { useMemo, useState } from "react";
import type { Experiment } from "@/data/experiments";
import type { Composition } from "@/data/compositions";
import type { LibraryEntry } from "@/data/libraries";
import { SectionHeading } from "@/components/home/section-heading";
import { ExperimentCard } from "@/components/home/experiment-card";
import { CompositionCard } from "@/components/home/composition-card";
import { cn } from "@/lib/cn";

interface LabCatalogProps {
  experiments: Experiment[];
  compositions: Composition[];
  libraries: LibraryEntry[];
}

export function LabCatalog({ experiments, compositions, libraries }: LabCatalogProps) {
  const [query, setQuery] = useState("");
  const [activeLibraries, setActiveLibraries] = useState<string[]>([]);

  const normalizedQuery = query.trim().toLowerCase();

  const toggleLibrary = (name: string) => {
    setActiveLibraries((current) =>
      current.includes(name)
        ? current.filter((item) => item !== name)
        : [...current, name],
    );
  };

  const filteredExperiments = useMemo(
    () =>
      experiments.filter((experiment) => {
        const matchesQuery =
          normalizedQuery === "" ||
          experiment.name.toLowerCase().includes(normalizedQuery) ||
          experiment.library.toLowerCase().includes(normalizedQuery);
        const matchesLibrary =
          activeLibraries.length === 0 ||
          activeLibraries.includes(experiment.library);
        return matchesQuery && matchesLibrary;
      }),
    [experiments, normalizedQuery, activeLibraries],
  );

  const filteredCompositions = useMemo(
    () =>
      compositions.filter((composition) => {
        const matchesQuery =
          normalizedQuery === "" ||
          composition.name.toLowerCase().includes(normalizedQuery) ||
          composition.libraries.some((library) =>
            library.toLowerCase().includes(normalizedQuery),
          );
        const matchesLibrary =
          activeLibraries.length === 0 ||
          composition.libraries.some((library) =>
            activeLibraries.includes(library),
          );
        return matchesQuery && matchesLibrary;
      }),
    [compositions, normalizedQuery, activeLibraries],
  );

  const hasResults =
    filteredExperiments.length > 0 || filteredCompositions.length > 0;
  const hasActiveFilter = normalizedQuery !== "" || activeLibraries.length > 0;

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-sm">
          <label htmlFor="lab-search" className="sr-only">
            Buscar por nome ou biblioteca
          </label>
          <input
            id="lab-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nome ou biblioteca…"
            className="h-12 w-full border border-border bg-transparent px-4 font-mono text-sm text-foreground placeholder:text-muted focus-visible:border-accent"
          />
        </div>
        {hasActiveFilter ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveLibraries([]);
            }}
            className="font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
          >
            Limpar filtros
          </button>
        ) : null}
      </div>

      <div
        role="group"
        aria-label="Filtrar por biblioteca"
        className="mt-4 flex flex-wrap gap-2"
      >
        {libraries.map((library) => {
          const isActive = activeLibraries.includes(library.name);
          return (
            <button
              key={library.slug}
              type="button"
              onClick={() => toggleLibrary(library.name)}
              aria-pressed={isActive}
              className={cn(
                "border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] transition-colors",
                isActive
                  ? "border-accent text-accent"
                  : "border-border text-muted hover:border-foreground hover:text-foreground",
              )}
            >
              {library.name}
            </button>
          );
        })}
      </div>

      {filteredExperiments.length > 0 ? (
        <div className="mt-16">
          <SectionHeading
            eyebrow="Experimentos"
            title="Laboratórios isolados"
            description={`${filteredExperiments.length} de ${experiments.length} experimentos.`}
          />
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredExperiments.map((experiment) => (
              <li key={experiment.slug}>
                <ExperimentCard experiment={experiment} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {filteredCompositions.length > 0 ? (
        <div className="mt-16">
          <SectionHeading
            eyebrow="Fase 5"
            title="Composições"
            description={`${filteredCompositions.length} de ${compositions.length} composições — pares de bibliotecas combinadas.`}
          />
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredCompositions.map((composition) => (
              <li key={composition.slug}>
                <CompositionCard composition={composition} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {!hasResults ? (
        <p className="mt-16 border border-border p-6 text-center font-mono text-xs uppercase tracking-[0.14em] text-muted">
          Nenhum experimento ou composição encontrado para esse filtro.
        </p>
      ) : null}
    </div>
  );
}
