"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import "lenis/dist/lenis.css";
import { ReactLenis, useLenis } from "lenis/react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useCssVariable } from "@/hooks/use-css-variable";
import { hexStringToNumber } from "@/lib/color";

const waypoints = ["largo", "médio", "próximo"];

function CameraSync({
  canvasRef,
  prefersReducedMotion,
  accent,
  onProgress,
}: {
  canvasRef: RefObject<HTMLDivElement | null>;
  prefersReducedMotion: boolean;
  accent: string;
  onProgress: (progress: number) => void;
}) {
  const lenis = useLenis();

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100,
    );
    camera.position.z = 6;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.TorusKnotGeometry(1, 0.3, 120, 16);
    const material = new THREE.MeshBasicMaterial({
      color: hexStringToNumber(accent),
      wireframe: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let frameId: number;
    const animate = () => {
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

    let unsubscribe: (() => void) | undefined;

    if (prefersReducedMotion) {
      camera.position.z = 3;
    } else if (lenis) {
      unsubscribe = lenis.on("scroll", (instance) => {
        const progress = instance.progress;
        camera.position.z = 6 - progress * 3;
        mesh.rotation.y = progress * Math.PI * 2;
        mesh.rotation.x = progress * Math.PI;
        onProgress(progress);
      });
    }

    return () => {
      unsubscribe?.();
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [canvasRef, accent, prefersReducedMotion, lenis, onProgress]);

  return null;
}

export function DirectScrollScene() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const accent = useCssVariable("--accent", "#ff4d1c");
  const [activeWaypoint, setActiveWaypoint] = useState(0);

  const handleProgress = useCallback((progress: number) => {
    setActiveWaypoint(Math.min(2, Math.floor(progress * 3)));
  }, []);

  return (
    <div className="border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        lenis.on(&quot;scroll&quot;) → camera.position.z = f(lenis.progress)
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div ref={canvasRef} className="h-72 bg-surface" />
        <ReactLenis
          root={false}
          className="h-72 overflow-y-auto overflow-x-hidden p-4"
        >
          <CameraSync
            canvasRef={canvasRef}
            prefersReducedMotion={prefersReducedMotion}
            accent={accent}
            onProgress={handleProgress}
          />
          <div className="flex flex-col gap-24">
            {waypoints.map((label, index) => (
              <div
                key={label}
                className="flex h-24 items-center border border-border bg-surface px-5"
              >
                <p
                  className={`font-mono text-xs uppercase tracking-[0.1em] ${
                    activeWaypoint === index ? "text-accent" : "text-muted"
                  }`}
                >
                  câmera: plano {label}
                </p>
              </div>
            ))}
            <div aria-hidden className="h-4" />
          </div>
        </ReactLenis>
      </div>
    </div>
  );
}
