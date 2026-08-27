"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useMotionValue, useTransform, animate, type MotionValue } from "motion/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cn } from "@/lib/cn";

const VIEW_WIDTH = 400;
const VIEW_HEIGHT = 260;
const POINT_MARGIN = 12;
const BASE_DURATION = 2;

const DEFAULT_POINTS = {
  p0: { x: 50, y: 210 },
  p1: { x: 90, y: 40 },
  p2: { x: 310, y: 230 },
  p3: { x: 350, y: 70 },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function cubicBezier(t: number, a: number, b: number, c: number, d: number) {
  const mt = 1 - t;
  return mt ** 3 * a + 3 * mt ** 2 * t * b + 3 * mt * t ** 2 * c + t ** 3 * d;
}

interface PointHandleProps {
  x: MotionValue<number>;
  y: MotionValue<number>;
  label: string;
  variant: "anchor" | "control";
  active: boolean;
  onPointerDown: (event: React.PointerEvent<SVGCircleElement>) => void;
}

function PointHandle({ x, y, label, variant, active, onPointerDown }: PointHandleProps) {
  const isAnchor = variant === "anchor";
  const radius = active ? (isAnchor ? 9 : 7) : isAnchor ? 7 : 6;

  return (
    <g>
      <motion.circle
        cx={x}
        cy={y}
        r={radius}
        className={cn(
          "cursor-grab touch-none transition-[r] duration-150 active:cursor-grabbing",
          isAnchor ? "fill-foreground" : "fill-background stroke-accent",
        )}
        strokeWidth={isAnchor ? 0 : 2}
        onPointerDown={onPointerDown}
      />
      <motion.text
        x={x}
        y={y}
        dx={isAnchor ? 12 : 11}
        dy={isAnchor ? -12 : -10}
        className="select-none fill-muted font-mono text-[9px] uppercase tracking-[0.1em]"
      >
        {label}
      </motion.text>
    </g>
  );
}

function ToggleField({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      aria-pressed={checked}
      className="flex w-full items-center justify-between gap-3 py-1 text-left"
    >
      <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">{label}</span>
      <span
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center border transition-colors",
          checked ? "border-accent bg-accent text-accent-foreground" : "border-border text-transparent",
        )}
      >
        <svg viewBox="0 0 12 12" className="h-2.5 w-2.5" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M2 6l3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}

function PlaybackIcon({ kind }: { kind: "play" | "pause" | "reset" }) {
  return (
    <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.6">
      {kind === "play" ? <path d="M5 3.5l8 4.5-8 4.5z" strokeLinejoin="round" fill="currentColor" /> : null}
      {kind === "pause" ? <path d="M5 3v10M11 3v10" strokeLinecap="round" /> : null}
      {kind === "reset" ? (
        <path
          d="M13 8a5 5 0 1 1-1.5-3.6M13 2.5v3h-3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      ) : null}
    </svg>
  );
}

export function BezierCurvePlayground() {
  const svgRef = useRef<SVGSVGElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const p0x = useMotionValue(DEFAULT_POINTS.p0.x);
  const p0y = useMotionValue(DEFAULT_POINTS.p0.y);
  const p1x = useMotionValue(DEFAULT_POINTS.p1.x);
  const p1y = useMotionValue(DEFAULT_POINTS.p1.y);
  const p2x = useMotionValue(DEFAULT_POINTS.p2.x);
  const p2y = useMotionValue(DEFAULT_POINTS.p2.y);
  const p3x = useMotionValue(DEFAULT_POINTS.p3.x);
  const p3y = useMotionValue(DEFAULT_POINTS.p3.y);

  const t = useMotionValue(0);

  const [activePoint, setActivePoint] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1);
  const [showPoints, setShowPoints] = useState(true);
  const [showPolygon, setShowPolygon] = useState(true);
  const [showMotion, setShowMotion] = useState(true);

  const playbackRef = useRef<ReturnType<typeof animate> | null>(null);
  const dragCleanupRef = useRef<(() => void) | null>(null);

  const pathD = useTransform(
    [p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y],
    (values: number[]) => {
      const [x0, y0, x1, y1, x2, y2, x3, y3] = values;
      return `M ${x0} ${y0} C ${x1} ${y1} ${x2} ${y2} ${x3} ${y3}`;
    },
  );

  const markerX = useTransform(
    [t, p0x, p1x, p2x, p3x],
    (values: number[]) => cubicBezier(values[0], values[1], values[2], values[3], values[4]),
  );
  const markerY = useTransform(
    [t, p0y, p1y, p2y, p3y],
    (values: number[]) => cubicBezier(values[0], values[1], values[2], values[3], values[4]),
  );

  const effectiveDuration = useMemo(() => (BASE_DURATION / speed).toFixed(1), [speed]);

  const stopPlayback = () => {
    playbackRef.current?.stop();
    playbackRef.current = null;
  };

  const runAnimation = (from: number) => {
    stopPlayback();

    if (prefersReducedMotion) {
      t.set(1);
      return;
    }

    playbackRef.current = animate(t, 1, {
      duration: (BASE_DURATION / speed) * (1 - from),
      ease: "easeInOut",
      onComplete: () => setIsPlaying(false),
    });
  };

  const play = () => {
    const from = t.get() >= 1 ? 0 : t.get();
    if (from === 0) t.set(0);
    setIsPlaying(true);
    runAnimation(from);
  };

  const pause = () => {
    stopPlayback();
    setIsPlaying(false);
  };

  const resetPlayback = () => {
    stopPlayback();
    setIsPlaying(false);
    t.set(0);
  };

  useEffect(() => {
    if (!isPlaying) return;
    runAnimation(t.get());
    return stopPlayback;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [speed]);

  useEffect(() => stopPlayback, []);

  const resetPoints = () => {
    const pairs: Array<[MotionValue<number>, number]> = [
      [p0x, DEFAULT_POINTS.p0.x],
      [p0y, DEFAULT_POINTS.p0.y],
      [p1x, DEFAULT_POINTS.p1.x],
      [p1y, DEFAULT_POINTS.p1.y],
      [p2x, DEFAULT_POINTS.p2.x],
      [p2y, DEFAULT_POINTS.p2.y],
      [p3x, DEFAULT_POINTS.p3.x],
      [p3y, DEFAULT_POINTS.p3.y],
    ];
    pairs.forEach(([value, target]) => {
      if (prefersReducedMotion) value.set(target);
      else animate(value, target, { duration: 0.5, ease: "easeInOut" });
    });
  };

  const handlePointerDown = (
    event: React.PointerEvent<SVGCircleElement>,
    id: string,
    x: MotionValue<number>,
    y: MotionValue<number>,
  ) => {
    event.preventDefault();
    const svg = svgRef.current;
    if (!svg) return;
    const ctm = svg.getScreenCTM();
    if (!ctm) return;
    const inverse = ctm.inverse();
    const svgPoint = svg.createSVGPoint();

    setActivePoint(id);

    const handleMove = (moveEvent: PointerEvent) => {
      svgPoint.x = moveEvent.clientX;
      svgPoint.y = moveEvent.clientY;
      const transformed = svgPoint.matrixTransform(inverse);
      x.set(clamp(transformed.x, POINT_MARGIN, VIEW_WIDTH - POINT_MARGIN));
      y.set(clamp(transformed.y, POINT_MARGIN, VIEW_HEIGHT - POINT_MARGIN));
    };

    const handleUp = () => {
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
      dragCleanupRef.current = null;
      setActivePoint(null);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
    dragCleanupRef.current = handleUp;
  };

  useEffect(() => () => dragCleanupRef.current?.(), []);

  return (
    <div className="w-full max-w-4xl">
      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted">
        Pontos de Controle <span className="text-accent">→</span> Curva <span className="text-accent">→</span> Movimento
      </p>

      <div className="mt-4 flex flex-col gap-6 lg:flex-row lg:items-start">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              Arraste os pontos
            </span>
            <button
              type="button"
              onClick={resetPoints}
              className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted transition-colors hover:text-foreground"
            >
              Redefinir Pontos
            </button>
          </div>

          <svg
            ref={svgRef}
            viewBox={`0 0 ${VIEW_WIDTH} ${VIEW_HEIGHT}`}
            className="mt-3 w-full touch-none select-none bg-surface"
          >
            <defs>
              <pattern id="bezier-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="1" cy="1" r="1" className="fill-border" />
              </pattern>
            </defs>
            <rect width={VIEW_WIDTH} height={VIEW_HEIGHT} fill="url(#bezier-grid)" />

            {showPolygon ? (
              <g className="stroke-border" strokeWidth={1.5} strokeDasharray="4 4">
                <motion.line x1={p0x} y1={p0y} x2={p1x} y2={p1y} />
                <motion.line x1={p1x} y1={p1y} x2={p2x} y2={p2y} />
                <motion.line x1={p2x} y1={p2y} x2={p3x} y2={p3y} />
              </g>
            ) : null}

            <motion.path d={pathD} className="fill-none stroke-accent" strokeWidth={2.5} strokeLinecap="round" />

            {showMotion ? (
              <>
                <motion.circle cx={markerX} cy={markerY} r={9} className="fill-accent opacity-25" />
                <motion.circle cx={markerX} cy={markerY} r={4.5} className="fill-accent" />
              </>
            ) : null}

            {showPoints ? (
              <>
                <PointHandle
                  x={p0x}
                  y={p0y}
                  label="P0 Início"
                  variant="anchor"
                  active={activePoint === "p0"}
                  onPointerDown={(event) => handlePointerDown(event, "p0", p0x, p0y)}
                />
                <PointHandle
                  x={p1x}
                  y={p1y}
                  label="P1 Controle"
                  variant="control"
                  active={activePoint === "p1"}
                  onPointerDown={(event) => handlePointerDown(event, "p1", p1x, p1y)}
                />
                <PointHandle
                  x={p2x}
                  y={p2y}
                  label="P2 Controle"
                  variant="control"
                  active={activePoint === "p2"}
                  onPointerDown={(event) => handlePointerDown(event, "p2", p2x, p2y)}
                />
                <PointHandle
                  x={p3x}
                  y={p3y}
                  label="P3 Fim"
                  variant="anchor"
                  active={activePoint === "p3"}
                  onPointerDown={(event) => handlePointerDown(event, "p3", p3x, p3y)}
                />
              </>
            ) : null}
          </svg>
        </div>

        <div className="w-full shrink-0 lg:w-56">
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">Curva de Bézier</p>

          <div className="mt-4 space-y-1 border-b border-border pb-4 font-mono text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted">Tipo</span>
              <span className="text-foreground">Cúbica</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted">Duração</span>
              <span className="text-foreground">{effectiveDuration}s</span>
            </div>
          </div>

          <div className="mt-4 border-b border-border pb-4">
            <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
              <span>Velocidade</span>
              <span className="text-foreground">{speed.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min={0.25}
              max={2.5}
              step={0.25}
              value={speed}
              onChange={(event) => setSpeed(Number(event.target.value))}
              className="mt-2 w-full accent-accent"
            />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <button
              type="button"
              onClick={isPlaying ? pause : play}
              className="flex h-9 flex-1 items-center justify-center gap-2 border border-border font-mono text-[10px] uppercase tracking-[0.12em] text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              <PlaybackIcon kind={isPlaying ? "pause" : "play"} />
              {isPlaying ? "Pausar" : "Reproduzir"}
            </button>
            <button
              type="button"
              onClick={resetPlayback}
              aria-label="Reiniciar animação"
              className="flex h-9 w-9 items-center justify-center border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <PlaybackIcon kind="reset" />
            </button>
          </div>

          <div className="mt-5 space-y-1">
            <ToggleField label="Mostrar Pontos de Controle" checked={showPoints} onChange={setShowPoints} />
            <ToggleField label="Mostrar Polígono de Controle" checked={showPolygon} onChange={setShowPolygon} />
            <ToggleField label="Mostrar Movimento" checked={showMotion} onChange={setShowMotion} />
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 border-t border-border pt-6 sm:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-accent">Curva de Bézier Cúbica</p>
          <p className="mt-2 text-sm text-muted">
            Uma curva de Bézier cúbica é definida por quatro pontos: P0 e P3 são as âncoras de início e fim
            pelas quais a curva passa; P1 e P2 são pontos de controle que puxam a curva em direção a eles sem
            que a curva chegue a tocá-los.
          </p>
        </div>
        <div className="flex flex-col justify-center border border-border bg-surface px-4 py-3 font-mono text-xs leading-relaxed text-muted">
          <p className="text-foreground">B(t) = (1−t)³P₀ + 3(1−t)²tP₁ + 3(1−t)t²P₂ + t³P₃</p>
          <p className="mt-1 text-[10px] tracking-[0.08em] text-muted">0 ≤ t ≤ 1</p>
        </div>
      </div>
    </div>
  );
}
