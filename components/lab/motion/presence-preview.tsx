export function PresencePreview() {
  return (
    <div className="w-40 border border-border bg-background p-3">
      <div className="flex items-center justify-between">
        <span className="h-1.5 w-10 bg-muted/50" />
        <span className="h-4 w-14 border border-foreground/40" />
      </div>
      <div className="mt-3 flex flex-col gap-1.5">
        <span className="h-1 w-full bg-border" />
        <span className="h-1 w-4/5 bg-border" />
        <span className="h-1 w-3/5 bg-border" />
      </div>
    </div>
  );
}
