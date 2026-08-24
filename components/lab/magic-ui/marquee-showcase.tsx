import { libraries } from "@/data/libraries";
import { Marquee } from "@/components/lab/magic-ui/marquee";

export function MarqueeShowcase() {
  return (
    <div className="border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        Marquee
      </p>
      <div className="mt-8 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
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
    </div>
  );
}
