import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function NetPreview() {
  return (
    <PreviewIcon>
      <g className="motion-safe:animate-preview-float">
        <line x1="10" y1="14" x2="24" y2="24" strokeWidth="1" opacity="0.6" />
        <line x1="24" y1="24" x2="38" y2="16" strokeWidth="1" opacity="0.6" />
        <line x1="24" y1="24" x2="14" y2="36" strokeWidth="1" opacity="0.6" />
        <line x1="24" y1="24" x2="34" y2="34" strokeWidth="1" opacity="0.6" />
        <line x1="10" y1="14" x2="14" y2="36" strokeWidth="1" opacity="0.6" />
        <circle cx="10" cy="14" r="2.2" fill="currentColor" stroke="none" className="text-accent" />
        <circle cx="24" cy="24" r="2.2" fill="currentColor" stroke="none" className="text-accent" />
        <circle cx="38" cy="16" r="2.2" fill="currentColor" stroke="none" className="text-accent" />
        <circle cx="14" cy="36" r="2.2" fill="currentColor" stroke="none" className="text-accent" />
        <circle cx="34" cy="34" r="2.2" fill="currentColor" stroke="none" className="text-accent" />
      </g>
    </PreviewIcon>
  );
}
