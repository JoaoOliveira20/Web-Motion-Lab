import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function SmoothScrollPreview() {
  return (
    <PreviewIcon>
      <rect x="18" y="8" width="12" height="32" rx="6" />
      <rect
        x="20"
        y="14"
        width="8"
        height="12"
        rx="4"
        className="text-accent motion-safe:animate-preview-float"
        fill="currentColor"
        stroke="none"
      />
    </PreviewIcon>
  );
}
