import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function TextRevealPreview() {
  return (
    <PreviewIcon>
      <line x1="8" y1="18" x2="40" y2="18" />
      <line x1="8" y1="30" x2="40" y2="30" />
      <line x1="24" y1="10" x2="24" y2="38" className="text-accent" strokeWidth="3" />
    </PreviewIcon>
  );
}
