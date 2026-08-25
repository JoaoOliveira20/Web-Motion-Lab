import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function FollowerPointerPreview() {
  return (
    <PreviewIcon>
      <path
        d="M12 8 L12 30 L18 25 L22 33 L26 31 L22 23 L30 23 Z"
        className="text-accent"
      />
      <rect x="26" y="30" width="14" height="8" rx="1" strokeDasharray="2 3" />
    </PreviewIcon>
  );
}
