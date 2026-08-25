import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function LoopPreview() {
  return (
    <PreviewIcon>
      <line x1="8" y1="24" x2="30" y2="24" />
      <line
        x1="34"
        y1="14"
        x2="34"
        y2="34"
        className="text-accent motion-safe:animate-preview-blink"
        strokeWidth="3"
      />
    </PreviewIcon>
  );
}
