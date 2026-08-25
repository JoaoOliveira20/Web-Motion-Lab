const dots: [number, number][] = [[10, 10], [26, 8], [40, 18], [16, 28], [34, 32]];

export function GrabPreview() {
  return (
    <svg viewBox="0 0 50 42" className="h-12 w-16">
      {dots.map(([x, y], index) =>
        dots.slice(index + 1).map(([x2, y2], j) => (
          <line
            key={`${index}-${j}`}
            x1={x}
            y1={y}
            x2={x2}
            y2={y2}
            className="stroke-border"
            strokeWidth={0.5}
          />
        )),
      )}
      {dots.map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r={1.4} className="fill-accent/70" />
      ))}
    </svg>
  );
}
