export function TiltedCardPreview() {
  return (
    <div
      className="h-16 w-24 border border-border bg-background"
      style={{ transform: "perspective(400px) rotateX(8deg) rotateY(-10deg)" }}
    />
  );
}
