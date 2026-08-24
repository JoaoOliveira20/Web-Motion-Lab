"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { annotate } from "rough-notation";
import type { RoughAnnotation } from "rough-notation/lib/model";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

gsap.registerPlugin(ScrollTrigger);

const paragraphs = [
  {
    id: "underline",
    type: "underline" as const,
    text: "Cada anotação aparece quando o termo cruza a linha de gatilho do ScrollTrigger.",
    term: "linha de gatilho",
  },
  {
    id: "circle",
    type: "circle" as const,
    text: "Rolar de volta esconde a anotação — onLeaveBack chama annotation.hide().",
    term: "onLeaveBack",
  },
  {
    id: "highlight",
    type: "highlight" as const,
    text: "O experimento original usava IntersectionObserver; aqui é o mesmo motor do resto da timeline.",
    term: "mesmo motor",
  },
];

export function TimedAnnotations() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      const scroller = scrollerRef.current;
      if (!scroller) return;

      const annotations: RoughAnnotation[] = [];

      paragraphs.forEach((paragraph) => {
        const el = scroller.querySelector<HTMLElement>(`[data-term="${paragraph.id}"]`);
        if (!el) return;

        const annotation = annotate(el, {
          type: paragraph.type,
          animate: !prefersReducedMotion,
          strokeWidth: 2,
          padding: paragraph.type === "circle" ? 6 : 4,
        });
        annotations.push(annotation);

        if (prefersReducedMotion) {
          annotation.show();
          return;
        }

        ScrollTrigger.create({
          trigger: el,
          scroller,
          start: "top 75%",
          onEnter: () => annotation.show(),
          onLeaveBack: () => annotation.hide(),
        });
      });

      return () => {
        annotations.forEach((annotation) => annotation.remove());
      };
    },
    { dependencies: [prefersReducedMotion] },
  );

  return (
    <div className="border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        ScrollTrigger.create() + annotate()
      </p>

      <div
        ref={scrollerRef}
        className="mt-6 flex h-72 flex-col gap-24 overflow-y-auto overflow-x-hidden p-4"
      >
        {paragraphs.map((paragraph) => (
          <p key={paragraph.id} className="text-lg leading-relaxed text-muted">
            {paragraph.text.split(paragraph.term)[0]}
            <span data-term={paragraph.id} className="text-accent">
              {paragraph.term}
            </span>
            {paragraph.text.split(paragraph.term)[1]}
          </p>
        ))}
        <div aria-hidden className="h-4" />
      </div>
    </div>
  );
}
