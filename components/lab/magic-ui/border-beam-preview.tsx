import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function BorderBeamPreview() {
  return (
    <PreviewIcon>
      <rect x="8" y="10" width="32" height="28" rx="1" />
      <g
        className="text-accent motion-safe:animate-preview-orbit"
        style={{ transformOrigin: "24px 24px" }}
      >
        <path d="M8 20 L8 11 Q8 10 9 10 L18 10" strokeWidth="3" />
      </g>
    </PreviewIcon>
  );
}
