import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function TimelinePreview() {
  return (
    <PreviewIcon>
      <line x1="12" y1="36" x2="12" y2="24" strokeWidth="3.5" />
      <line
        x1="20"
        y1="36"
        x2="20"
        y2="12"
        strokeWidth="3.5"
        className="text-accent motion-safe:animate-preview-scale-y"
        style={{ transformOrigin: "20px 36px" }}
      />
      <line x1="28" y1="36" x2="28" y2="28" strokeWidth="3.5" />
      <line x1="36" y1="36" x2="36" y2="18" strokeWidth="3.5" />
    </PreviewIcon>
  );
}
