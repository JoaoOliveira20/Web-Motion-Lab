import Link from "next/link";
import { Container } from "@/components/layout/container";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Container>
      <Link
        href={href}
        className="font-mono text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-foreground"
      >
        ← {label}
      </Link>
    </Container>
  );
}
