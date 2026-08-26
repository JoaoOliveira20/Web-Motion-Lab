interface SceneryProps {
  className?: string;
}

export function TreeSprite({ className }: SceneryProps) {
  return (
    <svg
      viewBox="0 0 20 28"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden
    >
      <rect x="8" y="20" width="4" height="8" fill="#5a4632" />
      <rect x="6" y="14" width="8" height="2" fill="#3a2e21" />
      <rect x="2" y="14" width="16" height="6" fill="#2f6b47" />
      <rect x="6" y="14" width="4" height="2" fill="#3f8a5c" />
      <rect x="4" y="8" width="12" height="6" fill="#2f6b47" />
      <rect x="7" y="8" width="4" height="2" fill="#3f8a5c" />
      <rect x="6" y="2" width="8" height="6" fill="#2f6b47" />
      <rect x="8" y="2" width="3" height="2" fill="#3f8a5c" />
    </svg>
  );
}

export function SignSprite({ className }: SceneryProps) {
  return (
    <svg
      viewBox="0 0 20 28"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden
    >
      <rect x="9" y="14" width="2" height="14" fill="#8b8781" />
      <rect x="2" y="2" width="16" height="12" fill="#f4c94f" />
      <rect x="4" y="4" width="12" height="8" fill="none" stroke="#1c1a19" strokeWidth="1.5" />
      <rect x="7" y="6" width="6" height="2" fill="#1c1a19" />
      <rect x="9" y="8" width="2" height="3" fill="#1c1a19" />
    </svg>
  );
}
