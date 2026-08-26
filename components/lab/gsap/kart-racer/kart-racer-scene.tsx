"use client";

import { useRef, type ReactNode } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { KartSprite } from "@/components/lab/gsap/kart-racer/kart-sprite";
import { TreeSprite, SignSprite } from "@/components/lab/gsap/kart-racer/scenery-sprites";

interface SceneryConfig {
  side: 1 | -1;
  delay: number;
  duration: number;
}

const sceneryConfig: SceneryConfig[] = [
  { side: -1, delay: 0.0, duration: 3.2 },
  { side: 1, delay: 0.4, duration: 3.6 },
  { side: -1, delay: 0.9, duration: 3.0 },
  { side: 1, delay: 1.3, duration: 3.4 },
  { side: -1, delay: 1.8, duration: 3.3 },
  { side: 1, delay: 2.2, duration: 3.1 },
  { side: -1, delay: 2.7, duration: 3.5 },
  { side: 1, delay: 3.1, duration: 3.2 },
  { side: -1, delay: 3.6, duration: 3.4 },
  { side: 1, delay: 4.0, duration: 3.0 },
];

const ROAD_SEGMENTS = 10;
const MAX_CURVE_SHIFT = 46;

const roadSegments = Array.from({ length: ROAD_SEGMENTS }, (_, i) => {
  const t = i / (ROAD_SEGMENTS - 1);
  return {
    top: (i / ROAD_SEGMENTS) * 100,
    height: 100 / ROAD_SEGMENTS + 0.6,
    width: 16 + t * 84,
    depthFactor: (1 - t) ** 2 * MAX_CURVE_SHIFT,
    shade: i % 2 === 0 ? "#2c2a2e" : "#332f34",
  };
});

const DASH_COUNT = 6;
const DASH_DURATION = 1.8;

function placeDash(el: HTMLElement, t: number, curve: number) {
  const eased = t * t;
  const shift = curve * (1 - eased) ** 2 * MAX_CURVE_SHIFT;
  el.style.top = `${eased * 100}%`;
  el.style.left = `calc(50% + ${shift}%)`;
  el.style.width = `${2 + eased * 9}%`;
  el.style.height = `${1 + eased * 3.5}%`;
  el.style.opacity = String(Math.min(1, eased * 4));
}

function placeScenery(el: HTMLElement, t: number, side: 1 | -1, curve: number) {
  const eased = t * t;
  const shift = curve * (1 - eased) ** 2 * MAX_CURVE_SHIFT;
  const lane = side * (12 + eased * 42);
  el.style.top = `${eased * 100}%`;
  el.style.left = `calc(50% + ${lane + shift}%)`;
  el.style.width = `${6 + eased * 15}%`;
  el.style.opacity = String(Math.min(1, eased * 5));
}

interface KartRacerSceneProps {
  kart?: ReactNode;
  scenery?: ReactNode[];
  className?: string;
}

export function KartRacerScene({
  kart = <KartSprite />,
  scenery = [<TreeSprite key="tree" />, <SignSprite key="sign" />, <TreeSprite key="tree-2" />],
  className,
}: KartRacerSceneProps) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const kartRef = useRef<HTMLDivElement>(null);
  const dashRefs = useRef<Array<HTMLDivElement | null>>([]);
  const sceneryRefs = useRef<Array<HTMLDivElement | null>>([]);
  const prefersReducedMotion = useReducedMotion();

  useGSAP(
    () => {
      if (!kartRef.current) return;

      if (prefersReducedMotion) {
        sceneRef.current?.style.setProperty("--curve", "0");
        gsap.set(kartRef.current, { x: 0, y: 0, rotation: 0 });
        dashRefs.current.forEach((el, i) => {
          if (el) placeDash(el, ((i + 0.5) / DASH_COUNT) % 1, 0);
        });
        sceneryRefs.current.forEach((el, i) => {
          const cfg = sceneryConfig[i];
          if (el && cfg) placeScenery(el, ((i + 1) / (sceneryConfig.length + 1)) % 1, cfg.side, 0);
        });
        return;
      }

      const curveState = { value: 0 };
      const kartX = gsap.quickTo(kartRef.current, "x", { duration: 0.5, ease: "power2.out" });
      const kartRotation = gsap.quickTo(kartRef.current, "rotation", {
        duration: 0.5,
        ease: "power2.out",
      });

      const MAX_KART_X = 16;
      const MAX_KART_ROTATE = 7;

      const syncCurve = () => {
        sceneRef.current?.style.setProperty("--curve", String(curveState.value));
        kartX(curveState.value * MAX_KART_X);
        kartRotation(curveState.value * MAX_KART_ROTATE);
      };

      sceneRef.current?.style.setProperty("--curve", "0");

      const HOLD = 2.6;
      const TURN = 1.3;

      gsap
        .timeline({ repeat: -1, defaults: { ease: "sine.inOut" } })
        .to(curveState, { value: 1, duration: TURN, onUpdate: syncCurve }, `+=${HOLD}`)
        .to(curveState, { value: 0, duration: TURN, onUpdate: syncCurve })
        .to(curveState, { value: -1, duration: TURN, onUpdate: syncCurve }, `+=${HOLD}`)
        .to(curveState, { value: 0, duration: TURN, onUpdate: syncCurve });

      gsap.to(kartRef.current, {
        y: 5,
        duration: 0.55,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      dashRefs.current.forEach((el, i) => {
        if (!el) return;
        placeDash(el, 0, curveState.value);
        const proxy = { t: 0 };
        gsap.to(proxy, {
          t: 1,
          duration: DASH_DURATION,
          repeat: -1,
          delay: (i / DASH_COUNT) * DASH_DURATION,
          ease: "power1.in",
          onUpdate: () => placeDash(el, proxy.t, curveState.value),
        });
      });

      sceneryRefs.current.forEach((el, i) => {
        const cfg = sceneryConfig[i];
        if (!el || !cfg) return;
        placeScenery(el, 0, cfg.side, curveState.value);
        const proxy = { t: 0 };
        gsap.to(proxy, {
          t: 1,
          duration: cfg.duration,
          repeat: -1,
          delay: cfg.delay,
          ease: "power1.in",
          onUpdate: () => placeScenery(el, proxy.t, cfg.side, curveState.value),
        });
      });
    },
    { scope: sceneRef, dependencies: [prefersReducedMotion] },
  );

  return (
    <div ref={sceneRef} className={className}>
      <div className="relative h-full w-full overflow-hidden">
        <div
          className="absolute inset-x-0 top-0"
          style={{
            height: "26%",
            background: "linear-gradient(180deg, #201430 0%, #4a2a52 55%, #d97a4a 100%)",
          }}
        />
        <div
          className="absolute rounded-full"
          style={{
            top: "20%",
            left: "50%",
            width: "22%",
            aspectRatio: "1 / 1",
            transform: "translate(-50%, -50%)",
            background:
              "radial-gradient(circle, #ffe3a8 0%, #ffb35c 55%, #ff7a4d 100%)",
          }}
        />

        <div
          className="absolute inset-x-0 bottom-0 overflow-hidden"
          style={{ top: "24%", background: "#3a7a3f" }}
        >
          {roadSegments.map((segment, i) => (
            <div
              key={i}
              className="absolute"
              style={{
                top: `${segment.top}%`,
                height: `${segment.height}%`,
                width: `${segment.width}%`,
                left: `calc(50% + var(--curve, 0) * ${segment.depthFactor}%)`,
                transform: "translateX(-50%)",
                backgroundColor: segment.shade,
              }}
            />
          ))}

          {Array.from({ length: DASH_COUNT }).map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                dashRefs.current[i] = el;
              }}
              className="pointer-events-none absolute bg-[#f4f3ef]"
              style={{ transform: "translate(-50%, -50%)" }}
            />
          ))}

          {sceneryConfig.map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                sceneryRefs.current[i] = el;
              }}
              className="pointer-events-none absolute"
              style={{ transform: "translate(-50%, -100%)", aspectRatio: "20 / 28" }}
            >
              <div className="h-full w-full">{scenery[i % scenery.length]}</div>
            </div>
          ))}

          <div
            className="absolute left-1/2 top-[80%] -translate-x-1/2 -translate-y-1/2"
            style={{ width: "15%", aspectRatio: "32 / 28" }}
          >
            <div ref={kartRef} className="h-full w-full">
              {kart}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
