export function EffectCardsPreview() {
  return (
    <div className="relative h-14 w-11">
      <span className="absolute inset-0 -rotate-6 border border-border bg-background" />
      <span className="absolute inset-0 rotate-3 border border-border bg-background" />
      <span className="absolute inset-0 border border-accent bg-surface" />
    </div>
  );
}
