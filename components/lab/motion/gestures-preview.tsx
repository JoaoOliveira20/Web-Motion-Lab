const states = [
  { label: "hover", className: "scale-105 border-accent text-accent" },
  { label: "tap", className: "scale-90 bg-border/50 text-muted" },
  { label: "focus", className: "outline outline-2 outline-accent outline-offset-2 text-muted" },
];

export function GesturesPreview() {
  return (
    <div className="flex gap-3">
      {states.map((state) => (
        <div
          key={state.label}
          className={`flex h-14 w-14 items-center justify-center border border-border bg-background font-mono text-[7px] uppercase tracking-[0.06em] ${state.className}`}
        >
          {state.label}
        </div>
      ))}
    </div>
  );
}
