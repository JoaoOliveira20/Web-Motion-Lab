"use client";

import { useMemo, useRef, useState } from "react";
import type { RoughAnnotationConfig } from "rough-notation/lib/model";
import { useRoughAnnotation } from "@/hooks/use-rough-annotation";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

function AnnotatedTerm({
  term,
  type,
}: {
  term: string;
  type: RoughAnnotationConfig["type"];
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const config = useMemo<RoughAnnotationConfig>(
    () => ({ type, animate: !prefersReducedMotion, strokeWidth: 2, padding: 3 }),
    [type, prefersReducedMotion],
  );

  useRoughAnnotation(ref, config, isHovered);

  return (
    <button
      type="button"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="text-left"
    >
      <span ref={ref} className="text-accent">
        {term}
      </span>
    </button>
  );
}

const terms: Array<{ term: string; type: RoughAnnotationConfig["type"] }> = [
  { term: "strike-through", type: "strike-through" },
  { term: "crossed-off", type: "crossed-off" },
  { term: "box", type: "box" },
];

export function HoverAnnotation() {
  return (
    <div className="w-full">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        useRoughAnnotation() sob demanda
      </p>
      <p className="mt-6 text-sm text-muted">
        Passe o mouse ou o foco por cada termo. Cada anotação é criada uma
        única vez e reage a um booleano — o mesmo padrão usado para
        estados de UI comuns em React.
      </p>
      <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-4 text-lg">
        {terms.map(({ term, type }) => (
          <li key={term}>
            <AnnotatedTerm term={term} type={type} />
          </li>
        ))}
      </ul>
    </div>
  );
}
