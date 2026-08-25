import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function MarqueePreview() {
  return (
    <PreviewIcon>
      <g className="motion-safe:animate-preview-slide">
        <path d="M4 18 L10 24 L4 30" />
        <path d="M17 18 L23 24 L17 30" className="text-accent" />
        <path d="M30 18 L36 24 L30 30" />
      </g>
    </PreviewIcon>
  );
}
