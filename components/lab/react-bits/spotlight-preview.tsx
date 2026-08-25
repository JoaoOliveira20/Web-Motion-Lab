export function SpotlightPreview() {
  return (
    <div
      className="h-16 w-24 border border-border bg-background"
      style={{
        backgroundImage:
          "radial-gradient(circle at 30% 30%, color-mix(in srgb, var(--accent) 35%, transparent), transparent 70%)",
      }}
    />
  );
}
