import Link from "next/link";
import { Container } from "@/components/layout/container";

export function SiteFooter() {
  return (
    <footer className="border-t border-border py-10">
      <Container className="flex flex-col gap-4 font-mono text-xs uppercase tracking-[0.12em] text-muted md:flex-row md:items-center md:justify-between">
        <p>Web Motion Lab — laboratório experimental de front-end</p>
        <Link href="/lab" className="transition-colors hover:text-foreground">
          Ver laboratório
        </Link>
      </Container>
    </footer>
  );
}
