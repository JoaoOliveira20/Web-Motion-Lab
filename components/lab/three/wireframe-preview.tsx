import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function WireframePreview() {
  return (
    <PreviewIcon>
      <g
        className="motion-safe:animate-preview-orbit"
        style={{ transformOrigin: "24px 23px", animationDuration: "8s" }}
      >
        <path d="M24 6 L42 18 L36 40 L12 40 L6 18 Z" />
        <path
          d="M24 6 L24 26 M24 26 L42 18 M24 26 L6 18 M24 26 L36 40 M24 26 L12 40"
          className="text-accent"
          strokeWidth="1.2"
        />
      </g>
    </PreviewIcon>
  );
}
