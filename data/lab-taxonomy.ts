export const labCategories = [
  "Animation",
  "Interaction",
  "Scroll",
  "Visual",
  "Typography",
  "Carousel",
  "3D",
  "Physics",
  "Core",
  "GPU / Shaders",
] as const;

export type LabCategory = (typeof labCategories)[number];

export const labLevels = [1, 2, 3, 4, 5] as const;

export type LabLevel = (typeof labLevels)[number];

export const labLevelLabels: Record<LabLevel, string> = {
  1: "Fundamental",
  2: "Básico",
  3: "Intermediário",
  4: "Avançado",
  5: "Experimental",
};
