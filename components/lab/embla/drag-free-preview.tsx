import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function DragFreePreview() {
  return (
    <PreviewIcon>
      <rect x="24" y="14" width="14" height="20" rx="1" className="text-accent" />
      <line x1="16" y1="18" x2="20" y2="18" strokeDasharray="1 3" />
      <line x1="16" y1="24" x2="20" y2="24" strokeDasharray="1 3" />
      <line x1="16" y1="30" x2="20" y2="30" strokeDasharray="1 3" />
    </PreviewIcon>
  );
}
