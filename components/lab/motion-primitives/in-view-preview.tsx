import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function InViewPreview() {
  return (
    <PreviewIcon>
      <rect x="8" y="8" width="32" height="18" rx="1" strokeDasharray="3 3" />
      <rect
        x="14"
        y="24"
        width="20"
        height="10"
        rx="1"
        className="text-accent motion-safe:animate-preview-fade"
        fill="currentColor"
        fillOpacity="0.2"
      />
    </PreviewIcon>
  );
}
