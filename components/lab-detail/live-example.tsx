import type { ReactNode } from "react";

export function LiveExample({ children }: { children: ReactNode }) {
  return (
    <div className="border border-border">
      <div className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3 font-mono text-[10px] uppercase tracking-[0.14em] text-muted">
        <span className="relative flex h-1.5 w-1.5">
          <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-accent opacity-75" />
          <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
        </span>
        Exemplo
      </div>
      <div className="flex min-h-[420px] items-center justify-center overflow-hidden bg-background p-8 sm:p-12">
        {children}
      </div>
    </div>
  );
}
