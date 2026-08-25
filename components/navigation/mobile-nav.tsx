"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";

interface MobileNavProps {
  links: Array<{ href: string; label: string }>;
}

export function MobileNav({ links }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
        buttonRef.current?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="md:hidden">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => setIsOpen((value) => !value)}
        aria-expanded={isOpen}
        aria-controls="mobile-nav-panel"
        className="flex h-10 w-10 items-center justify-center border border-border text-foreground transition-colors hover:border-accent hover:text-accent"
      >
        <span className="sr-only">{isOpen ? "Fechar menu" : "Abrir menu"}</span>
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          className="h-4 w-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          {isOpen ? (
            <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
          ) : (
            <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
          )}
        </svg>
      </button>

      {isOpen ? (
        <ul
          id="mobile-nav-panel"
          className="absolute inset-x-0 top-16 border-b border-border bg-background px-6 font-mono text-sm uppercase tracking-[0.12em] text-muted"
        >
          {links.map((link) => (
            <li key={link.href} className="border-t border-border/60 first:border-t-0">
              <Link
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-4 transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
