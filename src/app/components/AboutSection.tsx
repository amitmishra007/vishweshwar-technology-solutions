"use client";

import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Preload } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section className="relative w-full overflow-hidden text-white bg-black pt-28">
      {/* Cinematic 3D background (all R3F components inside Canvas) */}
      <Canvas
        className="absolute inset-0 -z-10 opacity-90"
        camera={{ position: [0, 0, 8], fov: 50 }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight intensity={0.9} position={[4, 6, 3]} />

          {/* R3F scene components (useFrame hooks live here) */}
          <FloatingShards count={8} />
          <SoftPulse position={[0, -1.6, -2]} scale={3} />

          <Preload all />
        </Suspense>

        <EffectComposer>
          <Bloom
            intensity={1.15}
            luminanceThreshold={0.12}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>

      {/* Soft overlay so content stays readable */}
      <div className="absolute inset-0 -z-5 bg-gradient-to-b from-black/80 via-transparent to-black/40 pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT - Text */}
          <div className="space-y-6 z-10 flex flex-col justify-center">
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              className="text-4xl md:text-5xl font-extrabold leading-tight"
            >
              We craft products that feel alive.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.8 }}
              className="text-lg text-gray-300 max-w-xl"
            >
              <span className="font-semibold text-indigo-300">
                Vishweshwar Industries
              </span>{" "}
              - we design and build web & mobile experiences, creative branding
              and performance-driven marketing. Our work blends pixel-perfect UI
              with performant engineering.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.35, duration: 0.6 }}
            >
              <a
                href="#about"
                className="inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-3 text-sm font-semibold shadow-2xl hover:scale-[1.02] transition-transform"
              >
                Learn more
              </a>
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55 }}
              className="block text-xs text-gray-400 pt-3"
            >
              Cinematic motion · 3D previews · Holographic components
            </motion.span>
          </div>

          {/* RIGHT - Video centered vertically with the left text */}
          <div className="relative flex items-center justify-center w-full h-[420px] md:h-[520px] lg:h-[560px] z-10">
            {/* subtle volumetric glow */}
            <div className="absolute -inset-12 rounded-3xl bg-gradient-to-tr from-purple-900/20 via-indigo-700/10 to-blue-600/10 blur-[96px] opacity-75" />

            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9 }}
              className="relative w-[92%] md:w-[82%] lg:w-[78%] h-full rounded-3xl overflow-hidden border border-white/12 shadow-2xl shadow-indigo-900/40"
            >
              <video
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                plays
              >
                <source
                  src="/Vishweshwar-Industries-Hero-Video1.mp4"
                  type="video/mp4"
                />
              </video>

              {/* DOM overlay inside the normal React tree (NOT drei Html) */}
              <div className="pointer-events-none absolute left-4 bottom-4 hidden md:flex items-center gap-3 text-xs text-white/80">
                <span className="px-2 py-1 rounded-full bg-white/6">
                  ▶ Live demo
                </span>
                <span className="px-2 py-1 rounded-full bg-white/6">1080p</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom curve that blends into a white section below */}
      <div className="relative mt-16 -mb-1 z-10">
        <svg
          viewBox="0 0 1440 160"
          className="w-full h-[160px] block"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,48 C180,120 360,120 540,88 C720,56 900,24 1080,40 C1260,56 1440,120 1440,120 L1440 160 L0 160 Z"
            fill="#251033"
            opacity="0.95"
          />
          <path
            d="M0,64 C200,120 380,120 560,88 C740,56 920,24 1100,40 C1280,56 1440,112 1440,112 L1440 160 L0 160 Z"
            fill="#391a63"
            opacity="0.85"
          />
        </svg>
      </div>
    </section>
  );
}

/* ----------------- 3D SCENE: Floating shards + soft pulse ----------------- */

function FloatingShards({ count = 6 }: any) {
  const group = useRef<any>();
  useFrame((state, delta) => {
    if (!group.current) return;
    group.current.rotation.y += 0.02 * delta;
  });

  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, i) => {
        const x = (Math.random() - 0.5) * 6;
        const y = (Math.random() - 0.5) * 3;
        const z = (Math.random() - 0.5) * 4 - 1;
        const scale = 0.6 + Math.random() * 1.2;
        return <Shard key={i} position={[x, y, z]} scale={scale} />;
      })}
    </group>
  );
}

function Shard({ position = [0, 0, 0], scale = 1 }: any) {
  const ref = useRef<any>();
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.x += 0.007;
    ref.current.rotation.y += 0.011;
  });

  return (
    <mesh ref={ref} position={position} scale={[scale, scale, scale]}>
      <coneGeometry args={[0.25, 1, 6]} />
      <meshStandardMaterial
        emissive="#6c4dff"
        emissiveIntensity={0.6}
        metalness={0.7}
        roughness={0.2}
        color="#5b21b6"
      />
    </mesh>
  );
}

function SoftPulse({ position = [0, 0, 0], scale = 1 }: any) {
  const ref = useRef<any>();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = Math.sin(clock.getElapsedTime() * 0.8) * 0.15 + 0.85;
    ref.current.scale.set(scale * t, scale * t, scale * t);
  });

  return (
    <mesh ref={ref} position={position}>
      <icosahedronGeometry args={[1, 3]} />
      <meshStandardMaterial
        transparent={true}
        opacity={0.14}
        color="#8b5cf6"
        roughness={0.6}
        metalness={0.2}
      />
    </mesh>
  );
}
