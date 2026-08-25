import { libraries } from "@/data/libraries";
import { Marquee } from "@/components/lab/magic-ui/marquee";

export function StackReel() {
  return (
    <div className="[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <Marquee pauseOnHover repeat={2}>
        {libraries.map((library) => (
          <span
            key={library.slug}
            className="font-mono text-sm uppercase tracking-[0.1em] text-muted"
          >
            {library.name}
          </span>
        ))}
      </Marquee>
    </div>
  );
}
