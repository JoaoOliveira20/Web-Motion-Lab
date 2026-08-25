import { PreviewIcon } from "@/components/lab-detail/preview-icon";

const dots: [number, number][] = [
  [6, 30], [14, 24], [22, 16], [30, 12], [38, 18], [42, 26],
];

export function PointWavePreview() {
  return (
    <PreviewIcon>
      {dots.map(([cx, cy], index) => (
        <circle
          key={index}
          cx={cx}
          cy={cy}
          r={2.2}
          fill="currentColor"
          stroke="none"
          className={
            index === 2 || index === 3
              ? "text-accent motion-safe:animate-preview-float"
              : undefined
          }
        />
      ))}
    </PreviewIcon>
  );
}
