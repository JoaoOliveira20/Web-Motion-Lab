import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function MarqueePreview() {
  return (
    <PreviewIcon>
      <path d="M6 18 L12 24 L6 30" />
      <path d="M19 18 L25 24 L19 30" className="text-accent" />
      <path d="M32 18 L38 24 L32 30" />
    </PreviewIcon>
  );
}
