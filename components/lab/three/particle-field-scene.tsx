"use client";

import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree, type RootState } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useCssVariable } from "@/hooks/use-css-variable";
import { cn } from "@/lib/cn";

const FIELD_RADIUS_RATIO = 0.24;
const RING_RADIUS_RATIO = 0.42;
const SWIRL_STRENGTH = 0.55;
const RING_PULL_STRENGTH = 0.85;
const IDLE_BREATHE_AMPLITUDE = 0.05;
const IDLE_WAVE_AMPLITUDE = 0.14;
const FOLLOW_RATE = 3.2;
const FOLLOW_RATE_REDUCED = 9;
const PRESENCE_RATE = 4;
const POINT_AT_CURSOR_BASE = 0.6;
const POINT_AT_CURSOR_EXTRA = 0.4;

function particleCountForWidth(width: number) {
  if (width === 0) return 220;
  if (width < 640) return 130;
  if (width < 1024) return 220;
  return 340;
}

interface CapsuleField {
  basePosition: Float32Array;
  currentPosition: Float32Array;
  phase: Float32Array;
  depth: Float32Array;
  scale: Float32Array;
}

function createField(count: number, spreadX: number, spreadY: number): CapsuleField {
  const basePosition = new Float32Array(count * 3);
  const currentPosition = new Float32Array(count * 3);
  const phase = new Float32Array(count);
  const depth = new Float32Array(count);
  const scale = new Float32Array(count);

  for (let i = 0; i < count; i += 1) {
    const x = (Math.random() - 0.5) * spreadX;
    const y = (Math.random() - 0.5) * spreadY;
    const z = (Math.random() - 0.5) * 2.4;
    const index = i * 3;
    basePosition[index] = x;
    basePosition[index + 1] = y;
    basePosition[index + 2] = z;
    currentPosition[index] = x;
    currentPosition[index + 1] = y;
    currentPosition[index + 2] = z;
    phase[i] = Math.random() * Math.PI * 2;
    depth[i] = (z + 1.2) / 2.4;
    scale[i] = 0.65 + Math.random() * 0.6;
  }

  return { basePosition, currentPosition, phase, depth, scale };
}

const dummy = new THREE.Object3D();
const up = new THREE.Vector3(0, 1, 0);
const movement = new THREE.Vector3();
const toPointer = new THREE.Vector3();
const idleQuaternion = new THREE.Quaternion();
const pointQuaternion = new THREE.Quaternion();
const idleEuler = new THREE.Euler();
const capsuleColor = new THREE.Color();

interface CapsuleFieldMeshProps {
  accentColor: string;
  backgroundColor: string;
  foregroundColor: string;
  reduceMotion: boolean;
  presenceTargetRef: React.RefObject<number>;
}

function CapsuleFieldMesh({
  accentColor,
  backgroundColor,
  foregroundColor,
  reduceMotion,
  presenceTargetRef,
}: CapsuleFieldMeshProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const presenceRef = useRef(0);
  const { viewport, size } = useThree();

  const count = useMemo(() => particleCountForWidth(size.width), [size.width]);
  const fieldRef = useRef<CapsuleField | null>(null);

  useEffect(() => {
    fieldRef.current = createField(count, viewport.width * 1.15, viewport.height * 1.15);
  }, [count, viewport.width, viewport.height]);

  const fieldRadius = viewport.width * FIELD_RADIUS_RATIO;
  const ringRadius = fieldRadius * RING_RADIUS_RATIO;

  const accent = useMemo(() => new THREE.Color(accentColor), [accentColor]);
  const foreground = useMemo(() => new THREE.Color(foregroundColor), [foregroundColor]);
  const background = useMemo(() => new THREE.Color(backgroundColor), [backgroundColor]);

  useFrame((state: RootState, delta: number) => {
    const mesh = meshRef.current;
    const field = fieldRef.current;
    if (!mesh || !field) return;

    const target = presenceTargetRef.current ?? 0;
    presenceRef.current += (target - presenceRef.current) * (1 - Math.exp(-delta * PRESENCE_RATE));
    const presence = presenceRef.current;

    const pointerX = state.pointer.x * viewport.width * 0.5;
    const pointerY = state.pointer.y * viewport.height * 0.5;
    const time = state.clock.elapsedTime;
    const followRate = reduceMotion ? FOLLOW_RATE_REDUCED : FOLLOW_RATE;
    const followAmount = 1 - Math.exp(-delta * followRate);

    for (let i = 0; i < count; i += 1) {
      const index = i * 3;
      const baseX = field.basePosition[index];
      const baseY = field.basePosition[index + 1];
      const baseZ = field.basePosition[index + 2];
      const curX = field.currentPosition[index];
      const curY = field.currentPosition[index + 1];
      const curZ = field.currentPosition[index + 2];

      const toPointerX = pointerX - baseX;
      const toPointerY = pointerY - baseY;
      const dist = Math.hypot(toPointerX, toPointerY) + 0.0001;
      const influence = presence * Math.exp(-(dist * dist) / (2 * fieldRadius * fieldRadius));

      const radialX = toPointerX / dist;
      const radialY = toPointerY / dist;
      const tangentX = -radialY;
      const tangentY = radialX;
      const ringPull = (ringRadius - dist) * RING_PULL_STRENGTH;

      const phase = field.phase[i];
      const breathe = reduceMotion ? 0 : Math.sin(time * 0.6 + phase) * IDLE_BREATHE_AMPLITUDE;
      const wave = reduceMotion ? 0 : Math.sin(time * 1.3 + phase * 1.7) * IDLE_WAVE_AMPLITUDE * influence;

      const targetX = baseX + (tangentX * SWIRL_STRENGTH + radialX * ringPull) * influence + tangentX * wave;
      const targetY =
        baseY + (tangentY * SWIRL_STRENGTH + radialY * ringPull) * influence + tangentY * wave + breathe;
      const targetZ = baseZ + breathe * 0.6 + wave * 0.4;

      const nextX = curX + (targetX - curX) * followAmount;
      const nextY = curY + (targetY - curY) * followAmount;
      const nextZ = curZ + (targetZ - curZ) * followAmount;

      field.currentPosition[index] = nextX;
      field.currentPosition[index + 1] = nextY;
      field.currentPosition[index + 2] = nextZ;

      movement.set(nextX - curX, nextY - curY, nextZ - curZ);
      const speed = movement.length();
      if (speed > 0.00006) {
        movement.normalize();
        idleQuaternion.setFromUnitVectors(up, movement);
      } else {
        idleQuaternion.setFromEuler(idleEuler.set(0, 0, phase));
      }

      if (presence > 0.001) {
        toPointer.set(pointerX - nextX, pointerY - nextY, -nextZ);
        if (toPointer.lengthSq() > 0.0001) {
          toPointer.normalize();
          pointQuaternion.setFromUnitVectors(up, toPointer);
          const pointAmount = presence * (POINT_AT_CURSOR_BASE + influence * POINT_AT_CURSOR_EXTRA);
          idleQuaternion.slerp(pointQuaternion, pointAmount);
        }
      }
      dummy.quaternion.copy(idleQuaternion);

      const depthScale = 0.55 + field.depth[i] * 0.75;
      const finalScale = field.scale[i] * depthScale * (1 + influence * 0.25);

      dummy.position.set(nextX, nextY, nextZ);
      dummy.scale.setScalar(finalScale);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);

      const heat = Math.min(1, influence * 1.4);
      capsuleColor.copy(accent);
      capsuleColor.lerp(foreground, heat * 0.5);
      capsuleColor.lerp(background, (1 - field.depth[i]) * 0.35);
      mesh.setColorAt(i, capsuleColor);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) mesh.instanceColor.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <capsuleGeometry args={[0.026, 0.2, 3, 6]} />
      <meshBasicMaterial toneMapped={false} />
    </instancedMesh>
  );
}

interface ParticleFieldSceneProps {
  className?: string;
}

export function ParticleFieldScene({ className }: ParticleFieldSceneProps) {
  const prefersReducedMotion = useReducedMotion();
  const accentColor = useCssVariable("--accent", "#ff4d1c");
  const backgroundColor = useCssVariable("--background", "#0b0b0c");
  const foregroundColor = useCssVariable("--foreground", "#f4f3ef");
  const presenceTargetRef = useRef(0);

  return (
    <div
      className={cn("touch-none select-none", className)}
      onPointerEnter={() => {
        presenceTargetRef.current = 1;
      }}
      onPointerMove={() => {
        presenceTargetRef.current = 1;
      }}
      onPointerLeave={() => {
        presenceTargetRef.current = 0;
      }}
    >
      <Canvas camera={{ position: [0, 0, 6], fov: 50 }} gl={{ antialias: true, alpha: false }} dpr={[1, 1.75]}>
        <color attach="background" args={[backgroundColor]} />
        <CapsuleFieldMesh
          accentColor={accentColor}
          backgroundColor={backgroundColor}
          foregroundColor={foregroundColor}
          reduceMotion={prefersReducedMotion}
          presenceTargetRef={presenceTargetRef}
        />
      </Canvas>
    </div>
  );
}
