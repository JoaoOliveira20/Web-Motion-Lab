const labels = ["whileHover", "whileTap", "whileFocus"];

export function GesturesPreview() {
  return (
    <div className="flex gap-2">
      {labels.map((label) => (
        <div
          key={label}
          className="flex h-16 w-16 flex-col items-center justify-center gap-1.5 border border-border bg-background"
        >
          <span className="h-1 w-8 bg-accent/70" />
          <span className="h-1 w-6 bg-border" />
        </div>
      ))}
    </div>
  );
}
