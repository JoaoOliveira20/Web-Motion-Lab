import { useEffect, useRef, type RefObject } from "react";
import Typed, { type TypedOptions } from "typed.js";

export function useTyped(
  ref: RefObject<HTMLElement | null>,
  options: TypedOptions,
) {
  const instanceRef = useRef<Typed | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const instance = new Typed(element, options);
    instanceRef.current = instance;

    return () => {
      instance.destroy();
      instanceRef.current = null;
    };
  }, [ref, options]);

  return instanceRef;
}
