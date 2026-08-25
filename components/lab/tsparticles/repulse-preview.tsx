import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function RepulsePreview() {
  return (
    <PreviewIcon>
      <circle cx="24" cy="24" r="2" fill="currentColor" stroke="none" />
      <g
        className="text-accent motion-safe:animate-preview-pulse"
        style={{ transformOrigin: "24px 24px" }}
      >
        <circle cx="12" cy="14" r="2" fill="currentColor" stroke="none" />
        <circle cx="36" cy="14" r="2" fill="currentColor" stroke="none" />
        <circle cx="10" cy="30" r="2" fill="currentColor" stroke="none" />
        <circle cx="38" cy="32" r="2" fill="currentColor" stroke="none" />
        <circle cx="24" cy="38" r="2" fill="currentColor" stroke="none" />
      </g>
    </PreviewIcon>
  );
}
