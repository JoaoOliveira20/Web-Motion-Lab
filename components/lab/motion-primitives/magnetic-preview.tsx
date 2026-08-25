import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function MagneticPreview() {
  return (
    <PreviewIcon>
      <rect x="16" y="16" width="16" height="16" rx="2" />
      <g className="text-accent motion-safe:animate-preview-slide">
        <path d="M6 14 Q12 18 16 22" />
        <path d="M6 34 Q12 30 16 26" />
      </g>
    </PreviewIcon>
  );
}
