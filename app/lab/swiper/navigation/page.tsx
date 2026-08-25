import type { Metadata } from "next";
import { Container } from "@/components/layout/container";
import { BackLink } from "@/components/navigation/back-link";
import { NavigationDemo } from "@/components/lab/swiper/navigation-demo";
import { SourceCode, type SourceFileEntry } from "@/components/lab-detail/source-code";

const swiperApi = { name: "Swiper (React)", href: "https://swiperjs.com/react" };
const swiperModulesApi = {
  name: "Módulos (Navigation/Pagination)",
  href: "https://swiperjs.com/swiper-api",
};

export const metadata: Metadata = {
  title: "Swiper — Navegação e Paginação — Web Motion Lab",
  description:
    "Experimento com Swiper: os módulos Navigation e Pagination vêm prontos, opt-in via array de módulos.",
};

const concepts = [
  {
    term: "modules",
    detail: "Swiper é modular — Navigation e Pagination são opt-in via array de módulos.",
  },
  {
    term: "--swiper-theme-color",
    detail: "Custom property que tematiza setas e bullets sem sobrescrever classes internas.",
  },
];

const sourceFiles: SourceFileEntry[] = [
  {
    filePath: "lab/swiper/navigation-demo.tsx",
    apis: [swiperApi, swiperModulesApi],
  },
];

export default function SwiperNavigationLabPage() {
  return (
    <>
      <BackLink href="/lab" label="Laboratório" />
      <Container className="mt-8">
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-accent">
          Swiper · Carousel
        </p>
        <h1 className="mt-4 font-display text-display font-light tracking-tight">
          Navegação e Paginação
        </h1>
        <p className="mt-4 max-w-2xl text-muted">
          Swiper resolve carrossel como uma plataforma: navegação e
          paginação vêm prontas como módulos, sem escrever setas ou pontos
          à mão.
        </p>

        <dl className="mt-10 grid grid-cols-1 gap-6 border-y border-border py-8 sm:grid-cols-2">
          {concepts.map((concept) => (
            <div key={concept.term}>
              <dt className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
                {concept.term}
              </dt>
              <dd className="mt-2 text-sm">{concept.detail}</dd>
            </div>
          ))}
        </dl>

        <div className="mt-10">
          <NavigationDemo />
        </div>

        <div className="mt-16">
          <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
            Código-fonte e APIs usadas
          </p>
          <div className="mt-4">
            <SourceCode files={sourceFiles} />
          </div>
        </div>
      </Container>
    </>
  );
}
