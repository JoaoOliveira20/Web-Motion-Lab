export function ScrollTriggerPreview() {
  return (
    <div className="w-32">
      <div className="h-1 w-full bg-border">
        <div className="h-full w-2/3 bg-accent" />
      </div>
      <div className="mt-2 flex flex-col gap-1">
        <span className="h-6 w-full border border-border bg-background" />
        <span className="h-6 w-full border border-border bg-background opacity-60" />
      </div>
    </div>
  );
}
