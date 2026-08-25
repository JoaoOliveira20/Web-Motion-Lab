export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:left-6 focus:top-6 focus:z-[60] focus:border focus:border-accent focus:bg-background focus:px-4 focus:py-3 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.14em] focus:text-foreground"
    >
      Pular para o conteúdo
    </a>
  );
}
