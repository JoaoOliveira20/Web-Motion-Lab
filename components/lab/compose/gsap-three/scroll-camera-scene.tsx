"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useCssVariable } from "@/hooks/use-css-variable";
import { hexStringToNumber } from "@/lib/color";

const waypoints = ["largo", "médio", "próximo"];

export function ScrollCameraScene() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const accent = useCssVariable("--accent", "#ff4d1c");
  const [activeWaypoint, setActiveWaypoint] = useState(0);

  useEffect(() => {
    const container = canvasRef.current;
    const scroller = scrollRef.current;
    const content = contentRef.current;
    if (!container || !scroller || !content) return;

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

    let removeScrollListener: (() => void) | undefined;

    if (prefersReducedMotion) {
      camera.position.z = 3;
    } else {
      const timeline = gsap.timeline({ paused: true })
        .to(camera.position, { z: 3, ease: "none" }, 0)
        .to(mesh.rotation, { y: Math.PI * 2, x: Math.PI, ease: "none" }, 0);

      const handleScroll = () => {
        const maxScroll = scroller.scrollHeight - scroller.clientHeight;
        const progress = maxScroll > 0 ? scroller.scrollTop / maxScroll : 0;
        timeline.progress(progress);
        setActiveWaypoint(Math.min(2, Math.floor(progress * 3)));
      };

      scroller.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();

      removeScrollListener = () => {
        scroller.removeEventListener("scroll", handleScroll);
        timeline.kill();
      };
    }

    return () => {
      removeScrollListener?.();
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, [accent, prefersReducedMotion]);

  return (
    <div className="border border-border p-6">
      <p className="font-mono text-xs uppercase tracking-[0.14em] text-muted">
        gsap.timeline().progress(scrollTop / maxScroll)
      </p>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div ref={canvasRef} className="h-72 bg-surface" />
        <div
          ref={scrollRef}
          className="h-72 overflow-y-auto overflow-x-hidden p-4"
        >
          <div ref={contentRef} className="flex flex-col gap-24">
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
        </div>
      </div>
    </div>
  );
}
