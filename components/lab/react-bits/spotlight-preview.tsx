import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function SpotlightPreview() {
  return (
    <PreviewIcon>
      <defs>
        <radialGradient id="spotlight-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--accent)" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect x="8" y="8" width="32" height="32" rx="1" />
      <circle
        cx="18"
        cy="18"
        r="12"
        fill="url(#spotlight-glow)"
        stroke="none"
        className="motion-safe:animate-preview-slide"
      />
      <circle cx="18" cy="18" r="1.5" fill="currentColor" stroke="none" className="text-accent" />
    </PreviewIcon>
  );
}
