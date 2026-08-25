import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function HoverPreview() {
  return (
    <PreviewIcon>
      <line x1="10" y1="24" x2="38" y2="24" />
      <path
        d="M15 15 Q24 9 33 15 Q39 24 33 33 Q24 39 15 33 Q9 24 15 15"
        className="text-accent"
        strokeWidth="2"
      />
    </PreviewIcon>
  );
}
