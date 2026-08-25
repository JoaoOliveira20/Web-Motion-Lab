export function PresencePreview() {
  return (
    <div className="w-44 border border-border bg-background p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="font-mono text-[7px] uppercase tracking-[0.14em] text-muted">
          AnimatePresence
        </span>
        <span className="border border-accent/60 px-1.5 py-0.5 font-mono text-[6px] uppercase tracking-[0.1em] text-accent">
          Fechar painel
        </span>
      </div>
      <div className="mt-3 flex flex-col gap-1.5">
        <span className="h-1 w-full bg-border" />
        <span className="h-1 w-4/5 bg-border" />
        <span className="h-1 w-3/5 bg-border" />
      </div>
    </div>
  );
}
