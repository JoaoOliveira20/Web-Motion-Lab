export function TextRevealPreview() {
  return (
    <div className="relative h-6 w-32 overflow-hidden">
      <span className="absolute inset-0 font-display text-lg font-light text-border">
        texto
      </span>
      <span
        className="absolute inset-0 overflow-hidden font-display text-lg font-light text-accent"
        style={{ clipPath: "inset(0 45% 0 0)" }}
      >
        texto
      </span>
    </div>
  );
}
