import { PreviewIcon } from "@/components/lab-detail/preview-icon";

const dots: [number, number, boolean][] = [
  [6, 30, false], [14, 24, false], [22, 16, true],
  [30, 12, true], [38, 18, false], [42, 26, false],
];

export function PointWavePreview() {
  return (
    <PreviewIcon>
      {dots.map(([cx, cy, accent], index) => (
        <circle
          key={index}
          cx={cx}
          cy={cy}
          r={2.2}
          fill="currentColor"
          stroke="none"
          className={accent ? "text-accent" : undefined}
        />
      ))}
    </PreviewIcon>
  );
}
