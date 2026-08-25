const bars = [0.4, 0.7, 1, 0.55];

export function TimelinePreview() {
  return (
    <div className="flex h-14 items-end gap-1.5">
      {bars.map((scale, index) => (
        <span
          key={index}
          className="w-3 bg-accent/70"
          style={{ height: `${scale * 100}%` }}
        />
      ))}
    </div>
  );
}
