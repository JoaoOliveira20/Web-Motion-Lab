import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function CubePreview() {
  return (
    <PreviewIcon>
      <g
        className="motion-safe:animate-preview-tilt"
        style={{ transformOrigin: "24px 21px" }}
      >
        <path d="M24 8 L36 14 L24 20 L12 14 Z" />
        <path d="M12 14 L24 20 L24 34 L12 28 Z" opacity="0.6" />
        <path
          d="M36 14 L24 20 L24 34 L36 28 Z"
          className="text-accent"
        />
      </g>
    </PreviewIcon>
  );
}
