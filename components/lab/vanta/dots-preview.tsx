import { PreviewIcon } from "@/components/lab-detail/preview-icon";

const dots: [number, number][] = [
  [12, 12], [24, 10], [36, 14],
  [10, 24], [24, 24], [38, 24],
  [12, 36], [24, 38], [36, 36],
];

export function DotsPreview() {
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
          className={index === 4 ? "text-accent" : undefined}
        />
      ))}
    </PreviewIcon>
  );
}
