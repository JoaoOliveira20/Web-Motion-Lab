export function SnapPreview() {
  return (
    <div className="flex items-center gap-1.5">
      {[0, 1, 2].map((index) => (
        <span
          key={index}
          className={`h-10 w-7 border ${index === 1 ? "border-accent bg-accent/10" : "border-border bg-background"}`}
        />
      ))}
    </div>
  );
}
