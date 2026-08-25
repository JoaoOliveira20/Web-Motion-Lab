export type CompositionStatus = "disponivel" | "planejado";

export interface Composition {
  slug: string;
  name: string;
  libraries: [string, string];
  summary: string;
  status: CompositionStatus;
}

export const compositions: Composition[] = [
  {
    slug: "lenis-gsap",
    name: "Scroll suave sincronizado",
    libraries: ["Lenis", "GSAP"],
    summary:
      "Lenis assume a interpolação do scroll; ScrollTrigger recalcula a cada frame via gsap.ticker, sem loop de rAF duplicado.",
    status: "disponivel",
  },
  {
    slug: "gsap-three",
    name: "Câmera guiada por timeline",
    libraries: ["GSAP", "Three.js"],
    summary:
      "ScrollTrigger com scrub anima propriedades de uma cena Three.js — timeline controlando câmera, não DOM.",
    status: "disponivel",
  },
  {
    slug: "motion-react-bits",
    name: "Galeria filtrável",
    libraries: ["Motion", "React Bits"],
    summary:
      "AnimatePresence coreografa entrada/saída de SpotlightCards ao trocar de filtro, sem perder o efeito de hover.",
    status: "disponivel",
  },
  {
    slug: "swiper-motion",
    name: "Legenda sincronizada ao slide",
    libraries: ["Swiper", "Motion"],
    summary:
      "Swiper controla os slides; onSlideChange dispara uma legenda animada com AnimatePresence, fora do DOM do carrossel.",
    status: "disponivel",
  },
  {
    slug: "lottie-motion",
    name: "Ícone reativo a gestures",
    libraries: ["Lottie", "Motion"],
    summary:
      "whileHover/whileTap da Motion disparam play()/pause() no lottieRef — dois motores de animação, um gatilho só.",
    status: "disponivel",
  },
  {
    slug: "tsparticles-lenis",
    name: "Partículas com parallax de scroll",
    libraries: ["tsParticles", "Lenis"],
    summary:
      "O progresso de scroll do Lenis desloca o campo de partículas em paralaxe — duas bibliotecas, nenhuma sabendo da outra.",
    status: "disponivel",
  },
  {
    slug: "rough-notation-gsap",
    name: "Anotações no tempo da timeline",
    libraries: ["Rough Notation", "GSAP"],
    summary:
      "ScrollTrigger substitui o IntersectionObserver do experimento original — annotate() chamado por callbacks de timeline.",
    status: "disponivel",
  },
];
