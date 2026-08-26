interface KartSpriteProps {
  bodyColor?: string;
  className?: string;
}

const TRIM = "#1c1a19";
const HELMET = "#f4f3ef";
const WHEEL = "#100f0e";
const TAILLIGHT = "#ff4d1c";
const METAL = "#8b8781";

export function KartSprite({ bodyColor = "#ff4d1c", className }: KartSpriteProps) {
  return (
    <svg
      viewBox="0 0 32 28"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden
    >
      <rect x="9" y="2" width="14" height="2" fill={TRIM} />
      <rect x="9" y="4" width="2" height="3" fill={TRIM} />
      <rect x="21" y="4" width="2" height="3" fill={TRIM} />

      <rect x="13" y="5" width="6" height="5" fill={HELMET} />
      <rect x="13" y="5" width="6" height="2" fill={bodyColor} />

      <rect x="10" y="9" width="12" height="4" fill={TRIM} />
      <rect x="7" y="13" width="18" height="5" fill={bodyColor} />
      <rect x="4" y="18" width="24" height="6" fill={bodyColor} />
      <rect x="2" y="16" width="3" height="4" fill={TRIM} />
      <rect x="27" y="16" width="3" height="4" fill={TRIM} />

      <rect x="3" y="24" width="26" height="3" fill={TRIM} />

      <rect x="0" y="20" width="6" height="8" fill={WHEEL} />
      <rect x="26" y="20" width="6" height="8" fill={WHEEL} />

      <rect x="5" y="19" width="2" height="2" fill={TAILLIGHT} />
      <rect x="25" y="19" width="2" height="2" fill={TAILLIGHT} />

      <rect x="6" y="25" width="2" height="3" fill={METAL} />
      <rect x="24" y="25" width="2" height="3" fill={METAL} />
    </svg>
  );
}
