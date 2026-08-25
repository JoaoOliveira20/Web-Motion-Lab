export function WireframePreview() {
  return (
    <svg viewBox="0 0 64 64" className="h-14 w-14 stroke-accent/70" fill="none" strokeWidth="1">
      <polygon points="32,6 58,24 48,54 16,54 6,24" />
      <polygon points="32,6 32,32 58,24" />
      <polygon points="32,6 32,32 6,24" />
      <polygon points="32,32 48,54 58,24" />
      <polygon points="32,32 16,54 6,24" />
      <polygon points="32,32 16,54 48,54" />
    </svg>
  );
}
