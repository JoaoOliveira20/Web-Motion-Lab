import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function GrabPreview() {
  return (
    <PreviewIcon>
      <g
        className="text-accent motion-safe:animate-preview-dash"
        strokeDasharray="16 16"
      >
        <line x1="24" y1="24" x2="12" y2="14" />
        <line x1="24" y1="24" x2="36" y2="14" />
        <line x1="24" y1="24" x2="14" y2="36" />
        <line x1="24" y1="24" x2="34" y2="34" />
      </g>
      <circle cx="24" cy="24" r="3" fill="currentColor" stroke="none" className="text-accent" />
      <circle cx="12" cy="14" r="2" fill="currentColor" stroke="none" />
      <circle cx="36" cy="14" r="2" fill="currentColor" stroke="none" />
      <circle cx="14" cy="36" r="2" fill="currentColor" stroke="none" />
      <circle cx="34" cy="34" r="2" fill="currentColor" stroke="none" />
    </PreviewIcon>
  );
}
