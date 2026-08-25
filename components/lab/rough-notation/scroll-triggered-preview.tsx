import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function ScrollTriggeredPreview() {
  return (
    <PreviewIcon>
      <line x1="10" y1="18" x2="38" y2="18" />
      <line x1="10" y1="27" x2="30" y2="27" />
      <path
        d="M9 32 Q14 29 19 32 T29 32"
        className="text-accent"
        strokeWidth="2.5"
      />
    </PreviewIcon>
  );
}
