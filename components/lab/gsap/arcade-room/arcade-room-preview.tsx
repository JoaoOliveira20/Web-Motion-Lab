import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function ArcadeRoomPreview() {
  return (
    <PreviewIcon>
      <rect x="4" y="14" width="10" height="16" />
      <rect x="6" y="17" width="6" height="5" />
      <rect x="19" y="10" width="10" height="20" className="text-accent" />
      <rect x="21" y="13" width="6" height="7" fill="currentColor" />
      <rect x="34" y="16" width="10" height="14" />
      <rect x="36" y="19" width="6" height="4" />
      <g
        className="text-accent motion-safe:animate-preview-fade"
        style={{ animationDelay: "0.3s" }}
      >
        <circle cx="24" cy="16.5" r="2" fill="currentColor" stroke="none" />
      </g>
      <line x1="2" y1="34" x2="46" y2="34" />
    </PreviewIcon>
  );
}
