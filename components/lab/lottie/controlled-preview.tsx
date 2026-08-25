export function ControlledPreview() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-border">
        <span className="h-4 w-4 rounded-full bg-border" />
      </div>
      <div className="flex gap-1">
        {["0.5x", "1x", "2x"].map((label) => (
          <span
            key={label}
            className="border border-foreground/40 px-1 py-0.5 font-mono text-[6px] text-muted"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}
