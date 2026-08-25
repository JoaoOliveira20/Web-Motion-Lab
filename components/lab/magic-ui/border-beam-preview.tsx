import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function BorderBeamPreview() {
  return (
    <PreviewIcon>
      <rect x="8" y="10" width="32" height="28" rx="1" />
      <path
        d="M8 20 L8 11 Q8 10 9 10 L20 10"
        className="text-accent"
        strokeWidth="3"
      />
    </PreviewIcon>
  );
}
