import { useEffect, useRef, type RefObject } from "react";
import { annotate } from "rough-notation";
import type { RoughAnnotation, RoughAnnotationConfig } from "rough-notation/lib/model";

export function useRoughAnnotation(
  ref: RefObject<HTMLElement | null>,
  config: RoughAnnotationConfig,
  isVisible: boolean,
) {
  const annotationRef = useRef<RoughAnnotation | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const annotation = annotate(element, config);
    annotationRef.current = annotation;

    return () => {
      annotation.remove();
      annotationRef.current = null;
    };
  }, [ref, config]);

  useEffect(() => {
    const annotation = annotationRef.current;
    if (!annotation) return;

    if (isVisible) {
      annotation.show();
    } else {
      annotation.hide();
    }
  }, [isVisible]);
}
