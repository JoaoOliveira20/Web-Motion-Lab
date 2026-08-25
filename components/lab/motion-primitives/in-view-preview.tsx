import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function InViewPreview() {
  return (
    <PreviewIcon>
      <rect x="8" y="8" width="32" height="20" rx="1" />
      <rect
        x="14"
        y="24"
        width="20"
        height="10"
        rx="1"
        className="text-accent"
        fill="currentColor"
        fillOpacity="0.15"
      />
    </PreviewIcon>
  );
}
