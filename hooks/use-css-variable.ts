import { useEffect, useState } from "react";

function readCssVariable(name: string, fallback: string) {
  if (typeof window === "undefined") {
    return fallback;
  }
  const value = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim();
  return value || fallback;
}

export function useCssVariable(name: string, fallback: string) {
  const [value, setValue] = useState(() => readCssVariable(name, fallback));

  useEffect(() => {
    const sync = () => setValue(readCssVariable(name, fallback));
    sync();

    const observer = new MutationObserver(sync);

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class", "data-theme"],
    });

    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", sync);

    return () => {
      observer.disconnect();
      media.removeEventListener("change", sync);
    };
  }, [name, fallback]);

  return value;
}
