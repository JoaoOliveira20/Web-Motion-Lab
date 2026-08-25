import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function ScrollTriggerPreview() {
  return (
    <PreviewIcon>
      <line x1="16" y1="8" x2="16" y2="40" />
      <g className="text-accent motion-safe:animate-preview-float">
        <circle cx="16" cy="24" r="3" fill="currentColor" stroke="none" />
        <line x1="24" y1="24" x2="34" y2="24" />
      </g>
    </PreviewIcon>
  );
}
