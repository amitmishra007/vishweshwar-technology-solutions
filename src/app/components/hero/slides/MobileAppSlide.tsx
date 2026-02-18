"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import * as THREE from "three";
import { useRef } from "react";
import GradientButton from "../../GradientButton";

const AndroidModel = dynamic(() => import("../../AndroidModel"), {
  ssr: false,
});
const AppleLogo = dynamic(() => import("../../AppleLogo"), { ssr: false });

// FLOAT + ROTATION
function FloatingRotation({ children }) {
  const ref = useRef();
  let t = 0;

  useFrame((_, delta) => {
    t += delta;
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.25;
    ref.current.position.y = 0.4 + Math.sin(t * 1.4) * 0.08;
  });

  return <group ref={ref}>{children}</group>;
}

// DUST
function DustBurst({ delay = 0 }) {
  const particles = [...Array(18)].map(() => ({
    x: (Math.random() - 0.5) * 1.5,
    z: (Math.random() - 0.5) * 1.5,
    scale: Math.random() * 0.1 + 0.05,
  }));

  return (
    <>
      {particles.map((p, i) => (
        <motion.mesh
          key={i}
          position={[p.x, -2.1, p.z]}
          initial={{ scale: 0.01, opacity: 0.8 }}
          animate={{ scale: p.scale, opacity: 0 }}
          transition={{ duration: 0.9, ease: "easeOut", delay }}
        >
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshStandardMaterial transparent opacity={0.5} color="#cdd3db" />
        </motion.mesh>
      ))}
    </>
  );
}

export default function MobileAppModelsOnly() {
  return (
    <div className="w-full h-screen pt-[120px] bg-gradient-to-b from-[#f7f9fb] to-[#eef1f6] flex flex-col items-center justify-start overflow-hidden">
      {/* ⭐ TEXT + CTA FIRST NOW ⭐ */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
        className="text-center mb-6"
      >
        <h1 className="text-4xl font-bold text-gray-800 tracking-tight">
          Stunning Mobile Experiences
        </h1>

        <p className="text-lg text-gray-600 mt-3 max-w-xl mx-auto leading-relaxed">
          Where elegant design meets flawless performance on both Android & iOS.
        </p>

        <GradientButton className="mt-6">Build My App</GradientButton>
      </motion.div>

      {/* ⭐ MODELS BELOW ⭐ */}
      <div className="w-full h-[70%]">
        <Canvas
          camera={{ position: [0, 1, 11], fov: 40 }}
          gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping }}
        >
          <ambientLight intensity={0.65} />
          <directionalLight position={[4, 6, 5]} intensity={1} />
          <Environment preset="studio" />

          {/* LEFT MODEL */}
          <motion.group
            initial={{ y: 6, scale: 0.1, rotateX: -Math.PI }}
            animate={{ y: 0.4, scale: 4.5, rotateX: 0 }}
            transition={{
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            position={[-4, 0, 0]}
          >
            <DustBurst delay={0.95} />

            <FloatingRotation>
              <AndroidModel scale={10} />
            </FloatingRotation>
          </motion.group>

          {/* RIGHT MODEL */}
          <motion.group
            initial={{ y: 6, scale: 0.1, rotateX: Math.PI }}
            animate={{ y: 0.4, scale: 4.8, rotateX: 0 }}
            transition={{
              delay: 0.3,
              duration: 1.5,
              ease: [0.16, 1, 0.3, 1],
            }}
            position={[4, 0, 0]}
          >
            <DustBurst delay={1.25} />

            <FloatingRotation>
              <AppleLogo scale={6.5} />
            </FloatingRotation>
          </motion.group>

          {/* SHADOW */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.4, 0]}>
            <circleGeometry args={[10, 64]} />
            <meshStandardMaterial transparent opacity={0.1} color="#a9b1bb" />
          </mesh>
        </Canvas>
      </div>
    </div>
  );
}
