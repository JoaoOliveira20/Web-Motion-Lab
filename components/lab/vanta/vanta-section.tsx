"use client";

import { NetBackground } from "@/components/lab/vanta/net-background";
import { DotsBackground } from "@/components/lab/vanta/dots-background";

export default function VantaSection() {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      <NetBackground />
      <DotsBackground />
    </div>
  );
}
