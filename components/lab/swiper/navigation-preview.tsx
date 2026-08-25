import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function NavigationPreview() {
  return (
    <PreviewIcon>
      <path d="M11 18 L6 24 L11 30" className="text-accent" />
      <rect
        x="16"
        y="12"
        width="16"
        height="24"
        rx="1"
        className="motion-safe:animate-preview-slide"
      />
      <path d="M37 18 L42 24 L37 30" className="text-accent" />
    </PreviewIcon>
  );
}
