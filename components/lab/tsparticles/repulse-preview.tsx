import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function RepulsePreview() {
  return (
    <PreviewIcon>
      <circle cx="24" cy="24" r="2" fill="currentColor" stroke="none" />
      <circle cx="12" cy="14" r="2" fill="currentColor" stroke="none" className="text-accent" />
      <circle cx="36" cy="14" r="2" fill="currentColor" stroke="none" className="text-accent" />
      <circle cx="10" cy="30" r="2" fill="currentColor" stroke="none" className="text-accent" />
      <circle cx="38" cy="32" r="2" fill="currentColor" stroke="none" className="text-accent" />
      <circle cx="24" cy="38" r="2" fill="currentColor" stroke="none" className="text-accent" />
    </PreviewIcon>
  );
}
