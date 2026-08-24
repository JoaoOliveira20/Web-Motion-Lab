"use client";

import { WireframeScene } from "@/components/lab/three/wireframe-scene";
import { PointWaveScene } from "@/components/lab/three/point-wave-scene";

export default function ThreeSection() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <WireframeScene />
      <PointWaveScene />
    </div>
  );
}
