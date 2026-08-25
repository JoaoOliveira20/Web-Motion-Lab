import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function ControlledPreview() {
  return (
    <PreviewIcon>
      <path
        d="M10 15 L22 24 L10 33 Z"
        className="text-accent"
        fill="currentColor"
        stroke="none"
      />
      <line x1="30" y1="15" x2="30" y2="33" strokeWidth="3.5" />
      <line x1="38" y1="15" x2="38" y2="33" strokeWidth="3.5" />
    </PreviewIcon>
  );
}
