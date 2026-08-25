"use client";

import { useEffect, useRef, useState } from "react";
import { annotate } from "rough-notation";
import type { RoughAnnotation } from "rough-notation/lib/model";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function ShowcaseThesis() {
  const containerRef = useRef<HTMLDivElement>(null);
  const highlightRef = useRef<HTMLElement | null>(null);
  const annotationRef = useRef<RoughAnnotation | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const element = highlightRef.current;
    if (!element) return;

    const annotation = annotate(element, {
      type: "underline",
      animate: !prefersReducedMotion,
      strokeWidth: 2,
      padding: 4,
    });
    annotationRef.current = annotation;

    return () => annotation.remove();
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
      annotationRef.current?.show();
    }
  }, [isVisible]);

  return (
    <div ref={containerRef} className="max-w-3xl">
      <p className="font-display text-3xl font-light leading-snug md:text-4xl">
        A pergunta nunca foi quantas bibliotecas dá para acumular — foi{" "}
        <span
          ref={(el) => {
            highlightRef.current = el;
          }}
          className="text-accent"
        >
          qual delas resolve este problema específico
        </span>
        , sabendo o que ela custa e o que ela troca.
      </p>
    </div>
  );
}
