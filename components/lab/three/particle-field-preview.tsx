import { PreviewIcon } from "@/components/lab-detail/preview-icon";

const capsules = [
  { x: 24, y: 24, rotate: 0 },
  { x: 14, y: 16, rotate: -40 },
  { x: 34, y: 16, rotate: 40 },
  { x: 12, y: 32, rotate: 30 },
  { x: 36, y: 32, rotate: -30 },
  { x: 24, y: 10, rotate: 90 },
  { x: 24, y: 38, rotate: 90 },
];

export function ParticleFieldPreview() {
  return (
    <PreviewIcon>
      {capsules.map((capsule, index) => (
        <rect
          key={index}
          x={capsule.x - 1.4}
          y={capsule.y - 5}
          width="2.8"
          height="10"
          rx="1.4"
          className={index === 0 ? "text-accent motion-safe:animate-preview-pulse" : undefined}
          style={{ transformOrigin: `${capsule.x}px ${capsule.y}px`, transform: `rotate(${capsule.rotate}deg)` }}
          fill="currentColor"
          stroke="none"
        />
      ))}
    </PreviewIcon>
  );
}
