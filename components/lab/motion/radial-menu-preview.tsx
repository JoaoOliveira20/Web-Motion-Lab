import { PreviewIcon } from "@/components/lab-detail/preview-icon";

const points = [
  { cx: 24, cy: 10 },
  { cx: 36, cy: 17 },
  { cx: 36, cy: 31 },
  { cx: 24, cy: 38 },
  { cx: 12, cy: 31 },
  { cx: 12, cy: 17 },
];

export function RadialMenuPreview() {
  return (
    <PreviewIcon>
      {points.map((point, index) => (
        <circle
          key={`${point.cx}-${point.cy}`}
          cx={point.cx}
          cy={point.cy}
          r="2.5"
          className="text-accent motion-safe:animate-preview-fade"
          style={{ animationDelay: `${index * 0.15}s` }}
        />
      ))}
      <rect x="20" y="20" width="8" height="8" rx="1" />
    </PreviewIcon>
  );
}
