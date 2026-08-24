interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  description?: string;
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-border pb-8 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          {index} · {eyebrow}
        </p>
        <h2 className="mt-3 font-display text-display font-light tracking-tight">
          {title}
        </h2>
      </div>
      {description ? (
        <p className="max-w-sm text-sm text-muted">{description}</p>
      ) : null}
    </div>
  );
}
