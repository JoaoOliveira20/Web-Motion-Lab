import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { ShowcaseHero } from "@/components/showcase/showcase-hero";
import { ShowcaseThesis } from "@/components/showcase/showcase-thesis";
import { StackReel } from "@/components/showcase/stack-reel";
import { RevealOnScroll } from "@/components/showcase/reveal-on-scroll";
import { LazyScrollCameraScene } from "@/components/lab/compose/gsap-three/lazy-scene";

export const metadata: Metadata = {
  title: "Showcase — Web Motion Lab",
  description:
    "A peça final do laboratório: dezesseis experimentos isolados e sete composições resumidos em uma única narrativa de rolagem.",
};

export default function ShowcasePage() {
  return (
    <>
      <BackLink href="/" label="Início" />
      <Container className="mt-8">
        <ShowcaseHero />

        <RevealOnScroll className="border-b border-border py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            01 · Tese
          </p>
          <div className="mt-6">
            <ShowcaseThesis />
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="border-b border-border py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            02 · Peça viva
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-display font-light tracking-tight">
            A mesma cena da Fase 5, sem reescrever uma linha
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            GSAP anima câmera e rotação de uma cena Three.js sem nenhum
            plugin de scroll — só uma timeline pausada e um listener de
            scroll fazendo `.progress()`. Este é o componente exato da
            composição GSAP + Three.js, importado aqui sem alterações.
          </p>
          <div className="mt-10">
            <LazyScrollCameraScene />
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="border-b border-border py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            03 · Stack
          </p>
          <h2 className="mt-3 font-display text-display font-light tracking-tight">
            Dezesseis bibliotecas, um propósito cada
          </h2>
          <div className="mt-10">
            <StackReel />
          </div>
        </RevealOnScroll>

        <RevealOnScroll className="py-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
            04 · Fechamento
          </p>
          <h2 className="mt-3 max-w-2xl font-display text-display font-light tracking-tight">
            Cada experimento tem sua própria página de aprendizado
          </h2>
          <p className="mt-4 max-w-2xl text-muted">
            Isolado ou composto, todo experimento deste laboratório
            documenta o que foi aprendido, onde tropeçou e quando faz
            sentido usar a biblioteca de novo.
          </p>
          <Link
            href="/lab"
            className="mt-8 inline-flex h-14 items-center justify-center border border-foreground px-8 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent"
          >
            Ver todos os experimentos
          </Link>
        </RevealOnScroll>
      </Container>
    </>
  );
}
