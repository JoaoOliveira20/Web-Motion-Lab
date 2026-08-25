import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function TerminalPreview() {
  return (
    <PreviewIcon>
      <rect x="7" y="10" width="34" height="28" rx="1" />
      <path d="M13 20 L18 24 L13 28" className="text-accent" />
      <line x1="21" y1="28" x2="30" y2="28" className="text-accent" />
    </PreviewIcon>
  );
}
