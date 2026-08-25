import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function TextRevealPreview() {
  return (
    <PreviewIcon>
      <line x1="8" y1="18" x2="40" y2="18" opacity="0.4" />
      <line x1="8" y1="30" x2="34" y2="30" opacity="0.4" />
      <line x1="8" y1="18" x2="24" y2="18" className="text-accent" />
      <line x1="8" y1="30" x2="20" y2="30" className="text-accent" />
      <line
        x1="24"
        y1="9"
        x2="24"
        y2="39"
        className="text-accent motion-safe:animate-preview-slide"
        strokeWidth="3"
      />
    </PreviewIcon>
  );
}
