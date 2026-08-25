import { PreviewIcon } from "@/components/lab-detail/preview-icon";

export function EffectCardsPreview() {
  return (
    <PreviewIcon>
      <rect x="17" y="11" width="18" height="24" rx="1" transform="rotate(-8 26 23)" />
      <rect x="15" y="10" width="18" height="24" rx="1" transform="rotate(4 24 22)" />
      <g
        className="text-accent motion-safe:animate-preview-tilt"
        style={{ transformOrigin: "24px 24px" }}
      >
        <rect x="15" y="12" width="18" height="24" rx="1" fill="var(--background)" />
      </g>
    </PreviewIcon>
  );
}
