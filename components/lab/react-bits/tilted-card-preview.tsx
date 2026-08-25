import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function TiltedCardPreview() {
  return (
    <PreviewIcon>
      <rect
        x="12"
        y="12"
        width="26"
        height="20"
        rx="1"
        transform="rotate(-8 25 22)"
      />
      <circle
        cx="34"
        cy="15"
        r="2"
        fill="currentColor"
        stroke="none"
        className="text-accent"
      />
    </PreviewIcon>
  );
}
