import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function ScrollToPreview() {
  return (
    <PreviewIcon>
      <circle cx="24" cy="24" r="12" strokeDasharray="3 4" />
      <circle cx="24" cy="24" r="3" fill="currentColor" stroke="none" className="text-accent" />
      <path d="M24 4 L24 11" className="text-accent" />
      <path d="M20 8 L24 12 L28 8" className="text-accent" />
    </PreviewIcon>
  );
}
