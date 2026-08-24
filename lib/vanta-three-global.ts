import type * as THREE from "three";

type WindowWithThree = Window & { THREE?: typeof THREE };

export function exposeThreeGlobally(threeInstance: typeof THREE) {
  (window as WindowWithThree).THREE = threeInstance;
}
