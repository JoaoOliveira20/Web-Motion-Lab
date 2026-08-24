import type { LibraryCategory } from "@/data/libraries";

export type ExperimentStatus = "disponivel" | "planejado";

export interface Experiment {
  slug: string;
  name: string;
  library: string;
  category: LibraryCategory;
  complexity: 1 | 2 | 3 | 4 | 5;
  summary: string;
  status: ExperimentStatus;
  featured?: boolean;
}

export const experiments: Experiment[] = [
  {
    slug: "motion",
    name: "Presença e Gestures",
    library: "Motion",
    category: "Animation",
    complexity: 2,
    summary:
      "Animações declarativas de entrada, saída e resposta a gestures usando AnimatePresence e variants.",
    status: "disponivel",
    featured: true,
  },
  {
    slug: "gsap",
    name: "Timelines Sequenciadas",
    library: "GSAP",
    category: "Animation",
    complexity: 3,
    summary: "Coreografia de múltiplos elementos com timelines e ScrollTrigger.",
    status: "disponivel",
  },
  {
    slug: "lenis",
    name: "Scroll Suave",
    library: "Lenis",
    category: "Scroll",
    complexity: 2,
    summary: "Smooth scrolling e sincronização com animações baseadas em scroll.",
    status: "disponivel",
  },
  {
    slug: "rough-notation",
    name: "Anotações Manuscritas",
    library: "Rough Notation",
    category: "Typography",
    complexity: 1,
    summary: "Destaques desenhados sobre texto ao entrar em viewport.",
    status: "disponivel",
  },
  {
    slug: "typed",
    name: "Texto Digitado",
    library: "Typed.js",
    category: "Typography",
    complexity: 1,
    summary: "Simulação de digitação em tempo real para headlines dinâmicas.",
    status: "disponivel",
  },
  {
    slug: "react-bits",
    name: "Efeitos de Componente",
    library: "React Bits",
    category: "UI",
    complexity: 2,
    summary: "Comparação entre componentes prontos e implementação própria.",
    status: "disponivel",
  },
  {
    slug: "motion-primitives",
    name: "Padrões Reutilizáveis",
    library: "Motion Primitives",
    category: "UI",
    complexity: 2,
    summary: "Blocos de motion reutilizáveis para interfaces.",
    status: "disponivel",
  },
  {
    slug: "magic-ui",
    name: "Componentes Visuais",
    library: "Magic UI",
    category: "UI",
    complexity: 2,
    summary: "Avaliação de componentes visuais prontos para produção.",
    status: "disponivel",
  },
  {
    slug: "aceternity",
    name: "Efeitos Avançados",
    library: "Aceternity",
    category: "UI",
    complexity: 3,
    summary: "Efeitos de interface mais elaborados e sua composição com motion.",
    status: "disponivel",
  },
  {
    slug: "lottie",
    name: "Animação Vetorial",
    library: "Lottie",
    category: "Animation",
    complexity: 2,
    summary: "Reprodução de animações exportadas do After Effects no navegador.",
    status: "disponivel",
  },
  {
    slug: "swiper",
    name: "Carrossel Completo",
    library: "Swiper",
    category: "Carousel",
    complexity: 2,
    summary: "Galeria com navegação, paginação e efeitos configuráveis.",
    status: "disponivel",
  },
  {
    slug: "embla",
    name: "Carrossel Controlável",
    library: "Embla",
    category: "Carousel",
    complexity: 2,
    summary: "Carrossel leve construído a partir de primitivas de baixo nível.",
    status: "disponivel",
  },
  {
    slug: "tsparticles",
    name: "Sistema de Partículas",
    library: "tsParticles",
    category: "Visual",
    complexity: 3,
    summary: "Campo de partículas interativo respondendo a ponteiro e scroll.",
    status: "planejado",
  },
  {
    slug: "vanta",
    name: "Background WebGL",
    library: "Vanta",
    category: "Visual",
    complexity: 3,
    summary: "Fundo animado em WebGL configurável.",
    status: "planejado",
  },
  {
    slug: "spline",
    name: "Cena 3D Colaborativa",
    library: "Spline",
    category: "3D",
    complexity: 3,
    summary: "Objeto 3D interativo exportado do editor Spline.",
    status: "planejado",
  },
  {
    slug: "three",
    name: "Cena WebGL Programável",
    library: "Three.js",
    category: "3D",
    complexity: 4,
    summary: "Cena, câmera e objetos 3D controlados via código.",
    status: "planejado",
  },
];
