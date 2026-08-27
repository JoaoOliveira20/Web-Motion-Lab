import type { ComponentType } from "react";
import { PresencePreview } from "@/components/lab/motion/presence-preview";
import { GesturesPreview } from "@/components/lab/motion/gestures-preview";
import { RadialMenuPreview } from "@/components/lab/motion/radial-menu-preview";
import { ScrollTickerPreview } from "@/components/lab/motion/scroll-ticker-preview";
import { ImageRevealSliderPreview } from "@/components/lab/motion/image-reveal-slider-preview";
import { KartRacerPreview } from "@/components/lab/gsap/kart-racer/kart-racer-preview";
import { ArcadeRoomPreview } from "@/components/lab/gsap/arcade-room/arcade-room-preview";
import { TimelinePreview } from "@/components/lab/gsap/timeline-preview";
import { ScrollTriggerPreview } from "@/components/lab/gsap/scroll-trigger-preview";
import { SmoothScrollPreview } from "@/components/lab/lenis/smooth-scroll-preview";
import { ScrollToPreview } from "@/components/lab/lenis/scroll-to-preview";
import { ScrollTriggeredPreview } from "@/components/lab/rough-notation/scroll-triggered-preview";
import { HoverPreview as RoughNotationHoverPreview } from "@/components/lab/rough-notation/hover-preview";
import { LoopPreview } from "@/components/lab/typed/loop-preview";
import { TerminalPreview } from "@/components/lab/typed/terminal-preview";
import { SpotlightPreview } from "@/components/lab/react-bits/spotlight-preview";
import { TiltedCardPreview } from "@/components/lab/react-bits/tilted-card-preview";
import { MagneticPreview } from "@/components/lab/motion-primitives/magnetic-preview";
import { InViewPreview } from "@/components/lab/motion-primitives/in-view-preview";
import { BorderBeamPreview } from "@/components/lab/magic-ui/border-beam-preview";
import { MarqueePreview } from "@/components/lab/magic-ui/marquee-preview";
import { TextRevealPreview } from "@/components/lab/aceternity/text-reveal-preview";
import { FollowerPointerPreview } from "@/components/lab/aceternity/follower-pointer-preview";
import { AutoplayPreview } from "@/components/lab/lottie/autoplay-preview";
import { ControlledPreview } from "@/components/lab/lottie/controlled-preview";
import { NavigationPreview } from "@/components/lab/swiper/navigation-preview";
import { EffectCardsPreview } from "@/components/lab/swiper/effect-cards-preview";
import { SnapPreview } from "@/components/lab/embla/snap-preview";
import { DragFreePreview } from "@/components/lab/embla/drag-free-preview";
import { RepulsePreview } from "@/components/lab/tsparticles/repulse-preview";
import { GrabPreview } from "@/components/lab/tsparticles/grab-preview";
import { NetPreview } from "@/components/lab/vanta/net-preview";
import { DotsPreview } from "@/components/lab/vanta/dots-preview";
import { WireframePreview } from "@/components/lab/three/wireframe-preview";
import { PointWavePreview } from "@/components/lab/three/point-wave-preview";
import { CubePreview } from "@/components/lab/spline/cube-preview";

export const examplePreviews: Record<string, ComponentType> = {
  "motion/presence": PresencePreview,
  "motion/gestures": GesturesPreview,
  "motion/radial-menu": RadialMenuPreview,
  "motion/scroll-ticker": ScrollTickerPreview,
  "motion/image-reveal-slider": ImageRevealSliderPreview,
  "gsap/kart-racer": KartRacerPreview,
  "gsap/arcade-room": ArcadeRoomPreview,
  "gsap/timeline": TimelinePreview,
  "gsap/scroll-trigger": ScrollTriggerPreview,
  "lenis/smooth-scroll": SmoothScrollPreview,
  "lenis/scroll-to": ScrollToPreview,
  "rough-notation/scroll-triggered": ScrollTriggeredPreview,
  "rough-notation/hover": RoughNotationHoverPreview,
  "typed/loop": LoopPreview,
  "typed/terminal": TerminalPreview,
  "react-bits/spotlight": SpotlightPreview,
  "react-bits/tilted-card": TiltedCardPreview,
  "motion-primitives/magnetic": MagneticPreview,
  "motion-primitives/in-view": InViewPreview,
  "magic-ui/border-beam": BorderBeamPreview,
  "magic-ui/marquee": MarqueePreview,
  "aceternity/text-reveal": TextRevealPreview,
  "aceternity/follower-pointer": FollowerPointerPreview,
  "lottie/autoplay": AutoplayPreview,
  "lottie/controlled": ControlledPreview,
  "swiper/navigation": NavigationPreview,
  "swiper/effect-cards": EffectCardsPreview,
  "embla/snap": SnapPreview,
  "embla/drag-free": DragFreePreview,
  "tsparticles/repulse": RepulsePreview,
  "tsparticles/grab": GrabPreview,
  "vanta/net": NetPreview,
  "vanta/dots": DotsPreview,
  "three/wireframe": WireframePreview,
  "three/point-wave": PointWavePreview,
  spline: CubePreview,
};
