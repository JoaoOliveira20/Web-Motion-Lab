"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useCssVariable } from "@/hooks/use-css-variable";
import { hexStringToNumber } from "@/lib/color";

const GRID_SIZE = 32;
const SPACING = 0.12;

export function PointWaveScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const foreground = useCssVariable("--foreground", "#f4f3ef");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 1.6, 3.2);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const positions = new Float32Array(GRID_SIZE * GRID_SIZE * 3);
    let index = 0;
    for (let x = 0; x < GRID_SIZE; x += 1) {
      for (let z = 0; z < GRID_SIZE; z += 1) {
        positions[index] = (x - GRID_SIZE / 2) * SPACING;
        positions[index + 1] = 0;
        positions[index + 2] = (z - GRID_SIZE / 2) * SPACING;
        index += 3;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: hexStringToNumber(foreground),
      size: 0.035,
    });
    const points = new THREE.Points(geometry, material);
    scene.add(points);

    const positionAttribute = geometry.getAttribute(
      "position",
    ) as THREE.BufferAttribute;

    const pointer = { x: 0, y: 0 };
    const handlePointerMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      pointer.x = (event.clientX - rect.left) / rect.width - 0.5;
      pointer.y = (event.clientY - rect.top) / rect.height - 0.5;
    };
    container.addEventListener("pointermove", handlePointerMove);

    let frameId: number;
    let elapsed = 0;
    const animate = () => {
      if (!prefersReducedMotion) {
        elapsed += 0.02;
        for (let i = 0; i < GRID_SIZE * GRID_SIZE; i += 1) {
          const x = positionAttribute.getX(i);
          const z = positionAttribute.getZ(i);
          const y = Math.sin(x * 2 + elapsed) * 0.15 + Math.cos(z * 2 + elapsed) * 0.15;
          positionAttribute.setY(i, y);
        }
        positionAttribute.needsUpdate = true;

        camera.position.x += (pointer.x * 1.5 - camera.position.x) * 0.03;
        camera.position.y += (1.6 - pointer.y * 1.2 - camera.position.y) * 0.03;
        camera.lookAt(0, 0, 0);
      }
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };
    animate();

    const resizeObserver = new ResizeObserver(() => {
      const { clientWidth, clientHeight } = container;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
    });
    resizeObserver.observe(container);

    return () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      container.removeEventListener("pointermove", handlePointerMove);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [prefersReducedMotion, foreground]);

  return (
    <div className="border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        BufferGeometry + THREE.Points
      </p>
      <div ref={containerRef} className="mt-6 h-64 bg-surface" />
    </div>
  );
}
