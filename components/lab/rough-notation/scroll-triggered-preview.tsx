import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function ScrollTriggeredPreview() {
  return (
    <PreviewIcon>
      <line x1="10" y1="16" x2="38" y2="16" />
      <line x1="10" y1="24" x2="30" y2="24" />
      <path
        d="M9 30 Q14 27 19 30 T29 30"
        className="text-accent motion-safe:animate-preview-dash"
        strokeWidth="2.5"
        strokeDasharray="24 24"
      />
      <line x1="10" y1="34" x2="24" y2="34" opacity="0.4" />
    </PreviewIcon>
  );
}
