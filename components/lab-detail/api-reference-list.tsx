export interface ApiReference {
  name: string;
  href: string;
}

export function ApiReferenceList({ apis }: { apis: ApiReference[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {apis.map((api) => (
        <li key={api.name}>
          <a
            href={api.href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border border-border px-3 py-1.5 font-mono text-xs uppercase tracking-[0.1em] text-muted transition-colors hover:border-accent hover:text-accent"
          >
            {api.name}
            <span aria-hidden>↗</span>
            <span className="sr-only">(abre a documentação em nova aba)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}
