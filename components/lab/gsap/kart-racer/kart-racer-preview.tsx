import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function KartRacerPreview() {
  return (
    <PreviewIcon>
      <path d="M18 8 L30 8 L36 40 L12 40 Z" />
      <line x1="24" y1="10" x2="24" y2="38" strokeDasharray="3 4" />
      <g
        className="text-accent motion-safe:animate-preview-slide"
        style={{ transformOrigin: "24px 30px" }}
      >
        <rect x="18" y="26" width="12" height="8" />
        <rect x="15" y="32" width="18" height="3" />
      </g>
    </PreviewIcon>
  );
}
