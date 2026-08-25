const dots = [[12, 10], [30, 6], [46, 16], [8, 30], [26, 36], [44, 32]];

export function RepulsePreview() {
  return (
    <svg viewBox="0 0 56 42" className="h-12 w-16">
      {dots.map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r={1.6} className="fill-accent/70" />
      ))}
    </svg>
  );
}
