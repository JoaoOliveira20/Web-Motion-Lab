"use client";

import { useEffect, useRef, useState } from "react";
import { annotate, annotationGroup } from "rough-notation";
import type { BracketType, RoughAnnotation, RoughAnnotationType } from "rough-notation/lib/model";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const targets: Array<{
  word: string;
  type: RoughAnnotationType;
  brackets?: BracketType[];
}> = [
  { word: "underline", type: "underline" },
  { word: "highlight", type: "highlight" },
  { word: "circle", type: "circle" },
  { word: "bracket", type: "bracket", brackets: ["left", "right"] },
];

export function AnnotationShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<Array<HTMLElement | null>>([]);
  const groupRef = useRef<{ show: () => void; hide: () => void } | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const elements = wordRefs.current;
    const annotations: RoughAnnotation[] = targets.map((target, index) => {
      const element = elements[index];
      return annotate(element as HTMLElement, {
        type: target.type,
        animate: !prefersReducedMotion,
        strokeWidth: 2,
        padding: target.type === "circle" ? 6 : 4,
        brackets: target.brackets,
      });
    });

    groupRef.current = annotationGroup(annotations);

    return () => {
      annotations.forEach((annotation) => annotation.remove());
      groupRef.current = null;
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.6 },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      groupRef.current?.show();
    }
  }, [isVisible]);

  const handleReplay = () => {
    groupRef.current?.hide();
    requestAnimationFrame(() => groupRef.current?.show());
  };

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex items-center justify-between">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
          annotate() + annotationGroup()
        </p>
        <button
          type="button"
          onClick={handleReplay}
          className="border border-foreground px-4 py-2 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent"
        >
          Reiniciar
        </button>
      </div>

      <p className="mt-8 text-2xl leading-relaxed">
        Quatro tipos de anotação —{" "}
        <span
          ref={(el) => {
            wordRefs.current[0] = el;
          }}
          className="text-accent"
        >
          underline
        </span>
        ,{" "}
        <span
          ref={(el) => {
            wordRefs.current[1] = el;
          }}
          className="text-accent"
        >
          highlight
        </span>
        ,{" "}
        <span
          ref={(el) => {
            wordRefs.current[2] = el;
          }}
          className="text-accent"
        >
          circle
        </span>{" "}
        e{" "}
        <span
          ref={(el) => {
            wordRefs.current[3] = el;
          }}
          className="text-accent"
        >
          bracket
        </span>{" "}
        — desenhados sobre o texto ao entrar na viewport.
      </p>
    </div>
  );
}
