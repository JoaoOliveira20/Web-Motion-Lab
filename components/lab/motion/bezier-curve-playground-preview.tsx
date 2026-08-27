import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function BezierCurvePlaygroundPreview() {
  return (
    <PreviewIcon>
      <path d="M8 8 L16 8 M32 40 L40 40" strokeDasharray="2 3" className="text-border" strokeWidth="1.2" />
      <path d="M8 8 C16 8 32 40 40 40" className="text-accent" strokeWidth="1.8" />
      <circle cx="8" cy="8" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="40" cy="40" r="2.4" fill="currentColor" stroke="none" />
      <circle
        cx="16"
        cy="8"
        r="1.8"
        className="text-accent motion-safe:animate-preview-pulse"
        fill="currentColor"
        stroke="none"
      />
      <circle cx="32" cy="40" r="1.8" className="text-accent" fill="currentColor" stroke="none" />
    </PreviewIcon>
  );
}
