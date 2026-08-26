import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function ScrollTickerPreview() {
  return (
    <PreviewIcon>
      <line x1="4" y1="12" x2="44" y2="12" className="motion-safe:animate-preview-fade" />
      <line
        x1="4"
        y1="24"
        x2="44"
        y2="24"
        className="text-accent motion-safe:animate-preview-fade"
        style={{ animationDelay: "0.4s" }}
      />
      <line
        x1="4"
        y1="36"
        x2="44"
        y2="36"
        className="motion-safe:animate-preview-fade"
        style={{ animationDelay: "0.8s" }}
      />
      <rect x="16" y="6" width="16" height="12" fill="var(--background)" />
    </PreviewIcon>
  );
}
