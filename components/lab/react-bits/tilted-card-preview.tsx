import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function TiltedCardPreview() {
  return (
    <PreviewIcon>
      <g
        className="motion-safe:animate-preview-tilt"
        style={{ transformOrigin: "24px 21px" }}
      >
        <rect x="12" y="12" width="24" height="18" rx="1" />
      </g>
      <circle
        cx="34"
        cy="14"
        r="2"
        fill="currentColor"
        stroke="none"
        className="text-accent"
      />
    </PreviewIcon>
  );
}
