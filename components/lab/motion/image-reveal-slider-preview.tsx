import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function ImageRevealSliderPreview() {
  return (
    <PreviewIcon>
      <rect x="6" y="8" width="36" height="32" />
      <circle cx="17" cy="22" r="7" />
      <circle
        cx="31"
        cy="22"
        r="7"
        className="text-accent"
        fill="currentColor"
        stroke="none"
      />
      <line
        x1="24"
        y1="8"
        x2="24"
        y2="40"
        className="text-accent motion-safe:animate-preview-slide"
        strokeWidth="2"
      />
    </PreviewIcon>
  );
}
