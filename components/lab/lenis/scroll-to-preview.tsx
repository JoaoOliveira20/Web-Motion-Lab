export function ScrollToPreview() {
  return (
    <div className="flex gap-1.5">
      {["A", "B", "C"].map((label) => (
        <span
          key={label}
          className="flex h-7 w-7 items-center justify-center border border-foreground/40 font-mono text-[8px] text-muted"
        >
          {label}
        </span>
      ))}
    </div>
  );
}
