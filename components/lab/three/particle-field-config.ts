export interface ParticleFieldConfig {
  cursorFocus: number;
  swirlStrength: number;
  ringPullStrength: number;
  followRate: number;
  idleIntensity: number;
}

export interface ParticleFieldPreset {
  id: string;
  label: string;
  description: string;
  config: ParticleFieldConfig;
}

export const particleFieldPresets: ParticleFieldPreset[] = [
  {
    id: "organico",
    label: "Orgânico",
    description: "As cápsulas convergem suavemente para o cursor.",
    config: {
      cursorFocus: 1,
      swirlStrength: 0.55,
      ringPullStrength: 0.85,
      followRate: 3.2,
      idleIntensity: 1,
    },
  },
  {
    id: "campo-livre",
    label: "Campo Livre",
    description: "A orientação ignora o cursor e segue só o campo.",
    config: {
      cursorFocus: 0,
      swirlStrength: 0.55,
      ringPullStrength: 0.85,
      followRate: 3.2,
      idleIntensity: 1,
    },
  },
  {
    id: "intenso",
    label: "Intenso",
    description: "Redemoinho e resposta ao cursor bem mais fortes.",
    config: {
      cursorFocus: 1,
      swirlStrength: 1,
      ringPullStrength: 1.4,
      followRate: 5,
      idleIntensity: 0.6,
    },
  },
];

export const defaultParticleFieldConfig = particleFieldPresets[0].config;

export const particleFieldConfigFields: Array<{
  key: keyof ParticleFieldConfig;
  label: string;
  min: number;
  max: number;
  step: number;
}> = [
  { key: "cursorFocus", label: "Foco no cursor", min: 0, max: 1, step: 0.05 },
  { key: "swirlStrength", label: "Redemoinho", min: 0, max: 1.4, step: 0.05 },
  { key: "ringPullStrength", label: "Puxão do anel", min: 0, max: 1.8, step: 0.05 },
  { key: "followRate", label: "Inércia", min: 1.2, max: 7, step: 0.1 },
  { key: "idleIntensity", label: "Respiração idle", min: 0, max: 2, step: 0.05 },
];
