import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function ScrollTriggerPreview() {
  return (
    <PreviewIcon>
      <line x1="16" y1="8" x2="16" y2="40" />
      <line x1="12" y1="16" x2="20" y2="16" />
      <circle cx="16" cy="27" r="3" fill="currentColor" stroke="none" className="text-accent" />
      <line x1="24" y1="27" x2="34" y2="27" className="text-accent" />
    </PreviewIcon>
  );
}
