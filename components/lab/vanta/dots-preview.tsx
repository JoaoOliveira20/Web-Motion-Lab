const dots: [number, number][] = [
  [8, 8], [22, 12], [36, 6], [50, 16],
  [12, 24], [28, 28], [44, 22],
  [6, 36], [24, 38], [40, 34],
];

export function DotsPreview() {
  return (
    <svg viewBox="0 0 56 44" className="h-12 w-16">
      {dots.map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r={1.5} className="fill-accent/70" />
      ))}
    </svg>
  );
}
