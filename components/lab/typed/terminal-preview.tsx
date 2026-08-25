import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function TerminalPreview() {
  return (
    <PreviewIcon>
      <rect x="7" y="10" width="34" height="28" rx="1" />
      <path d="M13 20 L18 24 L13 28" />
      <line x1="21" y1="28" x2="28" y2="28" />
      <rect
        x="31"
        y="24"
        width="4"
        height="7"
        className="text-accent motion-safe:animate-preview-blink"
        fill="currentColor"
        stroke="none"
      />
    </PreviewIcon>
  );
}
