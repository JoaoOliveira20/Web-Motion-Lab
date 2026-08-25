import Link from "next/link";
import { Container } from "@/components/layout/container";
import { MobileNav } from "@/components/navigation/mobile-nav";

const navLinks = [
  { href: "/showcase", label: "Showcase" },
  { href: "/lab", label: "Laboratório" },
  { href: "/#bibliotecas", label: "Bibliotecas" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/80 bg-background/85 backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        <Link
          href="/"
          className="font-mono text-sm font-medium uppercase tracking-[0.18em]"
        >
          Web Motion Lab
        </Link>
        <nav aria-label="Navegação principal" className="hidden md:block">
          <ul className="flex items-center gap-6 font-mono text-xs uppercase tracking-[0.12em] text-muted">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <MobileNav links={navLinks} />
      </Container>
    </header>
  );
}
