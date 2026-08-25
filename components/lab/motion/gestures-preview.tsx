import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function GesturesPreview() {
  return (
    <PreviewIcon>
      <circle cx="24" cy="24" r="16" strokeDasharray="2 5" />
      <circle
        cx="24"
        cy="24"
        r="9"
        className="text-accent motion-safe:animate-preview-pulse"
        style={{ transformOrigin: "24px 24px" }}
      />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" stroke="none" />
    </PreviewIcon>
  );
}
