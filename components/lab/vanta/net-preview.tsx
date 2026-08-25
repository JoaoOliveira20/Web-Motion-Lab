const points: [number, number][] = [[8, 10], [26, 6], [42, 16], [14, 30], [34, 34], [50, 24]];

export function NetPreview() {
  return (
    <svg viewBox="0 0 58 42" className="h-12 w-16">
      {points.map(([x, y], index) =>
        points.slice(index + 1).map(([x2, y2], j) => (
          <line
            key={`${index}-${j}`}
            x1={x}
            y1={y}
            x2={x2}
            y2={y2}
            className="stroke-muted/60"
            strokeWidth={0.4}
          />
        )),
      )}
      {points.map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r={1.2} className="fill-accent/70" />
      ))}
    </svg>
  );
}
