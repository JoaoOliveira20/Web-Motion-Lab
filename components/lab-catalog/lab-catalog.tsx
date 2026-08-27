"use client";

import { useMemo, useState } from "react";
import type { Experiment } from "@/data/experiments";
import type { Composition } from "@/data/compositions";
import type { LibraryEntry } from "@/data/libraries";
import { labCategories, labLevels, labLevelLabels, type LabCategory, type LabLevel } from "@/data/lab-taxonomy";
import { SectionHeading } from "@/components/home/section-heading";
import { ExperimentCard } from "@/components/home/experiment-card";
import { CompositionCard } from "@/components/home/composition-card";
import { cn } from "@/lib/cn";

interface LabCatalogProps {
  experiments: Experiment[];
  compositions: Composition[];
  libraries: LibraryEntry[];
}

interface FilterGroupProps<T extends string | number> {
  label: string;
  allLabel: string;
  options: Array<{ value: T; label: string }>;
  active: T | null;
  onSelect: (value: T | null) => void;
}

function FilterGroup<T extends string | number>({
  label,
  allLabel,
  options,
  active,
  onSelect,
}: FilterGroupProps<T>) {
  return (
    <div role="group" aria-label={`Filtrar por ${label}`} className="mt-4">
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onSelect(null)}
          aria-pressed={active === null}
          className={cn(
            "border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] transition-colors",
            active === null
              ? "border-accent text-accent"
              : "border-border text-muted hover:border-foreground hover:text-foreground",
          )}
        >
          {allLabel}
        </button>
        {options.map((option) => {
          const isActive = active === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onSelect(option.value)}
              aria-pressed={isActive}
              className={cn(
                "border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] transition-colors",
                isActive
                  ? "border-accent text-accent"
                  : "border-border text-muted hover:border-foreground hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function LabCatalog({ experiments, compositions, libraries }: LabCatalogProps) {
  const [query, setQuery] = useState("");
  const [activeLibrary, setActiveLibrary] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<LabCategory | null>(null);
  const [activeLevel, setActiveLevel] = useState<LabLevel | null>(null);

  const normalizedQuery = query.trim().toLowerCase();

  const filteredExperiments = useMemo(
    () =>
      experiments.filter((experiment) => {
        const matchesQuery =
          normalizedQuery === "" ||
          experiment.name.toLowerCase().includes(normalizedQuery) ||
          experiment.library.toLowerCase().includes(normalizedQuery) ||
          experiment.concepts.some((concept) => concept.toLowerCase().includes(normalizedQuery));
        const matchesLibrary = activeLibrary === null || experiment.library === activeLibrary;
        const matchesCategory = activeCategory === null || experiment.category === activeCategory;
        const matchesLevel = activeLevel === null || experiment.level === activeLevel;
        return matchesQuery && matchesLibrary && matchesCategory && matchesLevel;
      }),
    [experiments, normalizedQuery, activeLibrary, activeCategory, activeLevel],
  );

  const filteredCompositions = useMemo(
    () =>
      compositions.filter((composition) => {
        const matchesQuery =
          normalizedQuery === "" ||
          composition.name.toLowerCase().includes(normalizedQuery) ||
          composition.libraries.some((library) => library.toLowerCase().includes(normalizedQuery)) ||
          composition.concepts.some((concept) => concept.toLowerCase().includes(normalizedQuery));
        const matchesLibrary = activeLibrary === null || composition.libraries.includes(activeLibrary);
        const matchesCategory = activeCategory === null || composition.category === activeCategory;
        const matchesLevel = activeLevel === null || composition.level === activeLevel;
        return matchesQuery && matchesLibrary && matchesCategory && matchesLevel;
      }),
    [compositions, normalizedQuery, activeLibrary, activeCategory, activeLevel],
  );

  const hasResults = filteredExperiments.length > 0 || filteredCompositions.length > 0;
  const hasActiveFilter =
    normalizedQuery !== "" || activeLibrary !== null || activeCategory !== null || activeLevel !== null;

  const libraryOptions = libraries.map((library) => ({ value: library.name, label: library.name }));
  const categoryOptions = labCategories.map((category) => ({ value: category, label: category }));
  const levelOptions = labLevels.map((level) => ({ value: level, label: labLevelLabels[level] }));

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="w-full sm:max-w-sm">
          <label htmlFor="lab-search" className="sr-only">
            Buscar por nome, biblioteca ou conceito
          </label>
          <input
            id="lab-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nome, biblioteca ou conceito…"
            className="h-12 w-full border border-border bg-transparent px-4 font-mono text-sm text-foreground placeholder:text-muted focus-visible:border-accent"
          />
        </div>
        {hasActiveFilter ? (
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActiveLibrary(null);
              setActiveCategory(null);
              setActiveLevel(null);
            }}
            className="font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
          >
            Limpar filtros
          </button>
        ) : null}
      </div>

      <FilterGroup
        label="Biblioteca"
        allLabel="Todas"
        options={libraryOptions}
        active={activeLibrary}
        onSelect={setActiveLibrary}
      />
      <FilterGroup
        label="Categoria"
        allLabel="Todas"
        options={categoryOptions}
        active={activeCategory}
        onSelect={setActiveCategory}
      />
      <FilterGroup
        label="Nível"
        allLabel="Todos"
        options={levelOptions}
        active={activeLevel}
        onSelect={setActiveLevel}
      />

      {filteredExperiments.length > 0 ? (
        <div className="mt-16">
          <SectionHeading
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
