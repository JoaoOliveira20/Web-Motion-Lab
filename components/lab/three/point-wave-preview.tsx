const dots = [
  [4, 20], [16, 12], [28, 22], [40, 10], [52, 24],
  [8, 34], [22, 40], [34, 32], [46, 42], [58, 36],
];

export function PointWavePreview() {
  return (
    <svg viewBox="0 0 64 48" className="h-12 w-16">
      {dots.map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r={1.4} className="fill-accent/70" />
      ))}
    </svg>
  );
}
