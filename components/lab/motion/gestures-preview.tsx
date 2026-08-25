import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function GesturesPreview() {
  return (
    <PreviewIcon>
      <circle cx="24" cy="24" r="16" strokeDasharray="2 5" />
      <circle cx="24" cy="24" r="9" className="text-accent" strokeDasharray="2 4" />
      <circle cx="24" cy="24" r="2.5" fill="currentColor" stroke="none" />
    </PreviewIcon>
  );
}
