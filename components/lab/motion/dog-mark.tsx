import { cn } from "@/lib/cn";

const earLeftPath =
  "M55 65C30 70 15 110 28 150C40 165 58 145 60 110C61 95 60 78 55 65Z";
const earRightPath =
  "M145 65C170 70 185 110 172 150C160 165 142 145 140 110C139 95 140 78 145 65Z";
const mouthPath = "M100 141V150M100 150Q90 158 82 150M100 150Q110 158 118 150";

interface DogMarkProps {
  variant: "sketch" | "solid";
  className?: string;
}

export function DogMark({ variant, className }: DogMarkProps) {
  const isSolid = variant === "solid";
  const shapeProps = isSolid
    ? { fill: "currentColor" }
    : { fill: "none", stroke: "currentColor", strokeWidth: 2.5 };

  return (
    <svg
      viewBox="0 0 200 200"
      className={cn(isSolid ? "text-accent" : "text-muted", className)}
      aria-hidden
    >
      <path d={earLeftPath} {...shapeProps} />
      <path d={earRightPath} {...shapeProps} />
      <circle cx="100" cy="100" r="58" {...shapeProps} />
      <ellipse cx="100" cy="150" rx="34" ry="24" {...shapeProps} />
      <g className={isSolid ? "text-background" : "text-muted"}>
        <circle cx="76" cy="90" r="8" fill="currentColor" />
        <circle cx="124" cy="90" r="8" fill="currentColor" />
        <ellipse cx="100" cy="134" rx="10" ry="7" fill="currentColor" />
        <path
          d={mouthPath}
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
}
