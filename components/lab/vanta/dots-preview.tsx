import { PreviewIcon } from "@/components/lab-detail/preview-icon";

const dots: [number, number][] = [
  [12, 12], [24, 10], [36, 14],
  [10, 24], [36, 24],
  [12, 36], [24, 38], [36, 36],
];

export function DotsPreview() {
  return (
    <PreviewIcon>
      {dots.map(([cx, cy], index) => (
        <circle key={index} cx={cx} cy={cy} r={2.2} fill="currentColor" stroke="none" />
      ))}
      <circle
        cx="24"
        cy="24"
        r="2.2"
        fill="currentColor"
        stroke="none"
        className="text-accent motion-safe:animate-preview-pulse"
        style={{ transformOrigin: "24px 24px" }}
      />
    </PreviewIcon>
  );
}
