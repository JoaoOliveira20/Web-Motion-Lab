export function FollowerPointerPreview() {
  return (
    <div className="relative flex h-16 w-24 items-center justify-center border border-border bg-background">
      <span className="h-1.5 w-1.5 rounded-full bg-accent" />
      <span className="absolute bottom-2 right-2 border border-foreground/40 px-1.5 py-0.5 font-mono text-[6px] uppercase tracking-[0.1em] text-muted">
        cursor
      </span>
    </div>
  );
}
