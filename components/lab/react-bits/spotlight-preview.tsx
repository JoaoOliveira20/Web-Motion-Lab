import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function SpotlightPreview() {
  return (
    <PreviewIcon>
      <rect x="8" y="8" width="32" height="32" rx="1" />
      <circle cx="18" cy="18" r="6" className="text-accent" strokeDasharray="2 3" />
      <circle cx="18" cy="18" r="1.5" fill="currentColor" stroke="none" className="text-accent" />
    </PreviewIcon>
  );
}
