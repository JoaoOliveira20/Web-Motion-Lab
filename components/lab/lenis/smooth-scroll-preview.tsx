export function SmoothScrollPreview() {
  return (
    <div className="flex h-16 w-10 flex-col items-center justify-between border border-border bg-background py-2">
      <span className="h-1 w-4 bg-border" />
      <span className="h-1 w-4 bg-accent/70" />
      <span className="h-1 w-4 bg-border" />
    </div>
  );
}
