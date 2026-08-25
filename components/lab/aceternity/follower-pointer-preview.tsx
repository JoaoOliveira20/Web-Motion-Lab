import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function FollowerPointerPreview() {
  return (
    <PreviewIcon>
      <rect x="10" y="10" width="28" height="24" rx="1" strokeDasharray="3 3" />
      <g className="text-accent motion-safe:animate-preview-orbit" style={{ transformOrigin: "20px 22px", animationDuration: "5s" }}>
        <path d="M14 12 L14 28 L19 24 L22 31 L26 29 L23 22 L30 22 Z" />
      </g>
    </PreviewIcon>
  );
}
