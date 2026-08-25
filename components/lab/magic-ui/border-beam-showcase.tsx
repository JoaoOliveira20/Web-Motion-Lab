import { BorderBeam } from "@/components/lab/magic-ui/border-beam";

export function BorderBeamShowcase() {
  return (
    <div className="relative aspect-[1.618/1] overflow-hidden border border-border bg-surface p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        BorderBeam
      </p>
      <p className="mt-8 max-w-sm text-sm text-muted">
        Um segmento de gradiente percorre o perímetro do cartão usando
        <code className="mx-1 font-mono text-accent">offset-path</code>
        — a mesma API de motion path usada para animar elementos ao longo
        de uma trajetória SVG, aqui aplicada ao contorno de um retângulo.
      </p>
      <BorderBeam duration={5} size={80} />
    </div>
  );
}
