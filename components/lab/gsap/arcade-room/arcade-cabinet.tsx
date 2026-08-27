const TRIM = "#1c1a19";
const METAL = "#8b8781";

const GLYPHS: Record<string, string> = {
  circle: "M20 12a8 8 0 1 0 0.01 0",
  square: "M13 5h14v14H13Z",
  triangle: "M20 4 L34 30 L6 30 Z",
  diamond: "M20 3 L35 20 L20 37 L5 20 Z",
};

interface ArcadeCabinetProps {
  color?: string;
  screenColor?: string;
  glyph?: keyof typeof GLYPHS;
  className?: string;
}

export function ArcadeCabinet({
  color = "#ff4d1c",
  screenColor = "#7ef7d0",
  glyph = "circle",
  className,
}: ArcadeCabinetProps) {
  return (
    <svg
      viewBox="0 0 40 60"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden
    >
      <rect x="2" y="0" width="36" height="4" fill={color} />
      <rect x="6" y="4" width="28" height="22" fill={TRIM} />
      <rect x="9" y="7" width="22" height="16" fill="#0b0f10" />
      <g
        className="cabinet-glyph"
        transform="translate(9 7) scale(0.55)"
        fill="none"
        stroke={screenColor}
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={GLYPHS[glyph]} />
      </g>

      <rect x="4" y="26" width="32" height="6" fill={TRIM} />
      <rect x="6" y="32" width="28" height="24" fill={color} />

      <rect x="10" y="37" width="4" height="4" fill={TRIM} />
      <rect x="11.5" y="35.5" width="1" height="7" fill={METAL} />
      <rect x="8.5" y="38.5" width="7" height="1" fill={METAL} />

      <rect x="22" y="38" width="4" height="4" fill="#f4f3ef" />
      <rect x="28" y="38" width="4" height="4" fill="#1c1a19" />

      <rect x="6" y="52" width="28" height="4" fill={TRIM} />
      <rect x="4" y="56" width="6" height="4" fill={TRIM} />
      <rect x="30" y="56" width="6" height="4" fill={TRIM} />
    </svg>
  );
}
