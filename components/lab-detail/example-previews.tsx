import type { ComponentType } from "react";
import { PresencePreview } from "@/components/lab/motion/presence-preview";
import { GesturesPreview } from "@/components/lab/motion/gestures-preview";

export const examplePreviews: Record<string, ComponentType> = {
  "motion/presence": PresencePreview,
  "motion/gestures": GesturesPreview,
};
