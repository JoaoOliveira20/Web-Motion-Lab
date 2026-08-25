export function DragFreePreview() {
  return (
    <div className="flex items-center gap-1.5 [transform:rotate(-2deg)]">
      {[0, 1, 2, 3].map((index) => (
        <span key={index} className="h-9 w-6 shrink-0 border border-border bg-background" />
      ))}
    </div>
  );
}
