import type { LabCategory, LabLevel } from "@/data/lab-taxonomy";

export type CompositionStatus = "disponivel" | "planejado";

export interface Composition {
  slug: string;
  name: string;
  libraries: [string, string];
  category: LabCategory;
  level: LabLevel;
  concepts: string[];
  summary: string;
  status: CompositionStatus;
}

export const compositions: Composition[] = [
  {
    slug: "lenis-gsap",
    name: "Scroll suave sincronizado",
    libraries: ["Lenis", "GSAP"],
    category: "Scroll",
    level: 4,
    concepts: ["gsap.ticker", "Render Loop Conflicts", "ScrollTrigger + Lenis Sync"],
    summary:
      "Lenis assume a interpolação do scroll; ScrollTrigger recalcula a cada frame via gsap.ticker, sem loop de rAF duplicado.",
    status: "disponivel",
  },
  {
    slug: "gsap-three",
    name: "Câmera guiada por timeline",
    libraries: ["GSAP", "Three.js"],
    category: "3D",
    level: 4,
    concepts: ["ScrollTrigger scrub", "Non-DOM Targets", "Camera Animation"],
    summary:
      "ScrollTrigger com scrub anima propriedades de uma cena Three.js — timeline controlando câmera, não DOM.",
    status: "disponivel",
  },
  {
    slug: "motion-react-bits",
    name: "Galeria filtrável",
    libraries: ["Motion", "React Bits"],
    category: "Animation",
    level: 3,
    concepts: ["AnimatePresence", "Filtered Lists", "Third-party Hover Preservation"],
    summary:
      "AnimatePresence coreografa entrada/saída de SpotlightCards ao trocar de filtro, sem perder o efeito de hover.",
    status: "disponivel",
  },
  {
    slug: "swiper-motion",
    name: "Legenda sincronizada ao slide",
    libraries: ["Swiper", "Motion"],
    category: "Carousel",
    level: 3,
    concepts: ["onSlideChange", "AnimatePresence", "External State Sync"],
    summary:
      "Swiper controla os slides; onSlideChange dispara uma legenda animada com AnimatePresence, fora do DOM do carrossel.",
    status: "disponivel",
  },
  {
    slug: "lottie-motion",
    name: "Ícone reativo a gestures",
    libraries: ["Lottie", "Motion"],
    category: "Interaction",
    level: 3,
    concepts: ["lottieRef", "Gesture Triggers", "Cross-engine Trigger"],
    summary:
      "whileHover/whileTap da Motion disparam play()/pause() no lottieRef — dois motores de animação, um gatilho só.",
    status: "disponivel",
  },
  {
    slug: "tsparticles-lenis",
    name: "Partículas com parallax de scroll",
    libraries: ["tsParticles", "Lenis"],
    category: "Scroll",
    level: 3,
    concepts: ["Particles", "Scroll Progress", "Parallax", "Decoupled Libraries"],
    summary:
      "O progresso de scroll do Lenis desloca o campo de partículas em paralaxe — duas bibliotecas, nenhuma sabendo da outra.",
    status: "disponivel",
  },
  {
    slug: "rough-notation-gsap",
    name: "Anotações no tempo da timeline",
    libraries: ["Rough Notation", "GSAP"],
    category: "Typography",
    level: 3,
    concepts: ["annotate()", "Timeline Callbacks", "ScrollTrigger vs IntersectionObserver"],
    summary:
      "ScrollTrigger substitui o IntersectionObserver do experimento original — annotate() chamado por callbacks de timeline.",
    status: "disponivel",
  },
];
