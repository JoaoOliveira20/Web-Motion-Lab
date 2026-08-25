import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function AutoplayPreview() {
  return (
    <PreviewIcon>
      <circle cx="24" cy="24" r="15" />
      <path
        d="M20 16 L32 24 L20 32 Z"
        className="text-accent"
        fill="currentColor"
        stroke="none"
      />
    </PreviewIcon>
  );
}
