import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function PresencePreview() {
  return (
    <PreviewIcon>
      <rect x="8" y="10" width="32" height="28" rx="1" />
      <line x1="14" y1="20" x2="34" y2="20" />
      <line x1="14" y1="27" x2="26" y2="27" />
      <path d="M30 12 L35 17 M35 12 L30 17" className="text-accent" strokeWidth="2.5" />
    </PreviewIcon>
  );
}
