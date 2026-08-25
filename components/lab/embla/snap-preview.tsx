import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function SnapPreview() {
  return (
    <PreviewIcon>
      <rect x="6" y="16" width="10" height="16" rx="1" opacity="0.5" />
      <rect
        x="19"
        y="12"
        width="10"
        height="24"
        rx="1"
        className="text-accent motion-safe:animate-preview-pulse"
        style={{ transformOrigin: "24px 24px" }}
        strokeWidth="2.5"
      />
      <rect x="32" y="16" width="10" height="16" rx="1" opacity="0.5" />
    </PreviewIcon>
  );
}
