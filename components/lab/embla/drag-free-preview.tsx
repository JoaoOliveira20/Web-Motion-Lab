import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function DragFreePreview() {
  return (
    <PreviewIcon>
      <line x1="6" y1="18" x2="10" y2="18" strokeDasharray="1 3" opacity="0.5" />
      <line x1="6" y1="24" x2="10" y2="24" strokeDasharray="1 3" opacity="0.5" />
      <line x1="6" y1="30" x2="10" y2="30" strokeDasharray="1 3" opacity="0.5" />
      <rect
        x="16"
        y="14"
        width="14"
        height="20"
        rx="1"
        className="text-accent motion-safe:animate-preview-slide"
      />
    </PreviewIcon>
  );
}
