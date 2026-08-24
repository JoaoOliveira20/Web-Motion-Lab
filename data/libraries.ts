export type LibraryCategory =
  | "Animation"
  | "Scroll"
  | "UI"
  | "3D"
  | "Visual"
  | "Carousel"
  | "Typography";

export interface LibraryEntry {
  slug: string;
  name: string;
  category: LibraryCategory;
  purpose: string;
  comparison: string;
}

export const libraries: LibraryEntry[] = [
  {
    slug: "motion",
    name: "Motion",
    category: "Animation",
    purpose: "Animação declarativa, presença e gestures",
    comparison: "GSAP",
  },
  {
    slug: "gsap",
    name: "GSAP",
    category: "Animation",
    purpose: "Timelines e animações complexas",
    comparison: "Motion",
  },
  {
    slug: "lenis",
    name: "Lenis",
    category: "Scroll",
    purpose: "Smooth scrolling e scroll-driven animation",
    comparison: "Scroll nativo",
  },
  {
    slug: "rough-notation",
    name: "Rough Notation",
    category: "Typography",
    purpose: "Destaques e anotações desenhadas à mão",
    comparison: "CSS/SVG",
  },
  {
    slug: "typed",
    name: "Typed.js",
    category: "Typography",
    purpose: "Texto digitado dinamicamente",
    comparison: "Implementação própria",
  },
  {
    slug: "react-bits",
    name: "React Bits",
    category: "UI",
    purpose: "Componentes e efeitos prontos",
    comparison: "Magic UI / Aceternity",
  },
  {
    slug: "motion-primitives",
    name: "Motion Primitives",
    category: "UI",
    purpose: "Padrões de motion reutilizáveis",
    comparison: "Motion",
  },
  {
    slug: "magic-ui",
    name: "Magic UI",
    category: "UI",
    purpose: "Componentes visuais prontos",
    comparison: "React Bits / Aceternity",
  },
  {
    slug: "aceternity",
    name: "Aceternity",
    category: "UI",
    purpose: "Efeitos e componentes avançados",
    comparison: "React Bits / Magic UI",
  },
  {
    slug: "lottie",
    name: "Lottie",
    category: "Animation",
    purpose: "Animações vetoriais exportadas do After Effects",
    comparison: "CSS/SVG",
  },
  {
    slug: "swiper",
    name: "Swiper",
    category: "Carousel",
    purpose: "Carrosséis completos e configuráveis",
    comparison: "Embla",
  },
  {
    slug: "embla",
    name: "Embla",
    category: "Carousel",
    purpose: "Carrossel leve e altamente controlável",
    comparison: "Swiper",
  },
  {
    slug: "tsparticles",
    name: "tsParticles",
    category: "Visual",
    purpose: "Sistemas de partículas interativos",
    comparison: "Vanta",
  },
  {
    slug: "vanta",
    name: "Vanta",
    category: "Visual",
    purpose: "Backgrounds WebGL animados",
    comparison: "tsParticles",
  },
  {
    slug: "spline",
    name: "Spline",
    category: "3D",
    purpose: "Experiências 3D visuais e colaborativas",
    comparison: "Three.js",
  },
  {
    slug: "three",
    name: "Three.js",
    category: "3D",
    purpose: "WebGL e 3D programável",
    comparison: "Spline",
  },
];
