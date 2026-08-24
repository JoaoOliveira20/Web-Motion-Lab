declare module "vanta/dist/vanta.net.min.js" {
  import type * as THREE from "three";

  interface VantaNetOptions {
    el: HTMLElement;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    backgroundColor?: number;
    points?: number;
    maxDistance?: number;
    spacing?: number;
    showDots?: boolean;
  }

  interface VantaEffectInstance {
    destroy: () => void;
    setOptions: (options: Partial<VantaNetOptions>) => void;
  }

  export default function NET(options: VantaNetOptions): VantaEffectInstance;
}

declare module "vanta/dist/vanta.dots.min.js" {
  import type * as THREE from "three";

  interface VantaDotsOptions {
    el: HTMLElement;
    THREE: typeof THREE;
    mouseControls?: boolean;
    touchControls?: boolean;
    gyroControls?: boolean;
    minHeight?: number;
    minWidth?: number;
    scale?: number;
    scaleMobile?: number;
    color?: number;
    color2?: number;
    backgroundColor?: number;
    size?: number;
    spacing?: number;
    showLines?: boolean;
  }

  interface VantaEffectInstance {
    destroy: () => void;
    setOptions: (options: Partial<VantaDotsOptions>) => void;
  }

  export default function DOTS(options: VantaDotsOptions): VantaEffectInstance;
}
