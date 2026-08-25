import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function ScrollToPreview() {
  return (
    <PreviewIcon>
      <circle cx="24" cy="30" r="10" strokeDasharray="3 4" />
      <circle cx="24" cy="30" r="2.5" fill="currentColor" stroke="none" className="text-accent" />
      <g className="text-accent motion-safe:animate-preview-float">
        <path d="M24 6 L24 16" />
        <path d="M19 11 L24 16 L29 11" />
      </g>
    </PreviewIcon>
  );
}
