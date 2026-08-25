import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function PresencePreview() {
  return (
    <PreviewIcon>
      <rect x="7" y="9" width="34" height="30" rx="1" />
      <line x1="13" y1="19" x2="35" y2="19" />
      <line x1="13" y1="27" x2="27" y2="27" />
      <path
        d="M29 12 L35 18 M35 12 L29 18"
        className="text-accent motion-safe:animate-preview-fade"
        strokeWidth="2.5"
      />
    </PreviewIcon>
  );
}
