"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Html,
  Environment,
  ContactShadows,
} from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

/* -------------------- CONFIG -------------------- */
const ANDROID_END_X = 0.9;
const GAP = 1.4;

/* -------------------- ANDROID -------------------- */
function Android() {
  const { scene } = useGLTF("/models/AndroidRobot.glb");

  const parentRef = useRef<THREE.Group>(null);
  const spinRef = useRef<THREE.Group>(null);

  const centeredScene = useMemo(() => {
    const cloned = scene.clone();
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    cloned.position.sub(center);
    return cloned;
  }, [scene]);

  useFrame((state) => {
    if (!parentRef.current || !spinRef.current) return;

    const t = state.clock.elapsedTime;

    /* 🎬 Smooth cinematic entry */
    const raw = Math.min(t * 0.6, 1);
    const progress = 1 - Math.pow(1 - raw, 3);

    const startX = 3.5;

    parentRef.current.position.x = startX + (ANDROID_END_X - startX) * progress;

    parentRef.current.position.y = -0.25 + Math.sin(t * 1.4) * 0.08;

    parentRef.current.position.z = Math.sin(t * 0.6) * 0.12;

    /* 🎯 tilt */
    parentRef.current.rotation.z = -Math.PI / 4;

    /* 🔄 clean spin */
    spinRef.current.rotation.y += 0.015;

    /* ✅ SCALE → reduced by 10% */
    const scalePulse = 3 + Math.sin(t * 1.2) * 0.02;
    parentRef.current.scale.setScalar(3.78 * scalePulse); // 4.2 → 3.78
  });

  return (
    <group ref={parentRef}>
      <group ref={spinRef}>
        <primitive object={centeredScene} />
      </group>
    </group>
  );
}

/* -------------------- APPLE -------------------- */
function Apple() {
  const { scene } = useGLTF("/models/apple_logo.glb");
  const ref = useRef<THREE.Group>(null);

  const centeredScene = useMemo(() => {
    const cloned = scene.clone();
    const box = new THREE.Box3().setFromObject(cloned);
    const center = box.getCenter(new THREE.Vector3());
    cloned.position.sub(center);
    return cloned;
  }, [scene]);

  useFrame((state) => {
    if (!ref.current) return;

    const t = state.clock.elapsedTime;

    /* 🎬 ENTRY FROM TOP */
    const raw = Math.min(t * 0.9, 1);
    const progress = 1 - Math.pow(1 - raw, 3);

    const startY = 2.5;
    const endY = -0.05;

    ref.current.position.y =
      startY + (endY - startY) * progress + Math.sin(t * 0.9) * 0.05;

    /* 🎯 position */
    ref.current.position.x = ANDROID_END_X - GAP;

    ref.current.position.z = Math.cos(t * 0.5) * 0.08;

    /* 🔄 10% faster rotation */
    ref.current.rotation.y -= 0.0088; // was 0.008

    /* scale unchanged */
    const scalePulse = 1 + Math.sin(t * 1.1 + Math.PI) * 0.02;
    ref.current.scale.setScalar(6.2 * scalePulse);
  });

  return <primitive ref={ref} object={centeredScene} />;
}

/* -------------------- LOADER -------------------- */
function Loader() {
  return (
    <Html center>
      <div className="w-10 h-10 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
    </Html>
  );
}

import { useThree } from "@react-three/fiber";
import { useEffect } from "react";

function EnvironmentController() {
  const { scene } = useThree();

  useEffect(() => {
    scene.environmentIntensity = 1.2; // 🔥 adjust here
  }, [scene]);

  return null;
}

/* -------------------- MAIN SCENE -------------------- */
export default function AndroidModel() {
  return (
    <Canvas
      camera={{ position: [0, 0.2, 5.5], fov: 42 }}
      dpr={[1, 2]}
      gl={{
        antialias: true,
        powerPreference: "high-performance",
        toneMapping: THREE.ACESFilmicToneMapping,
        outputColorSpace: THREE.SRGBColorSpace,
      }}
    >
      {/* 🌌 HDRI ENVIRONMENT (cinematic reflections) */}
      <Environment preset="city" />
      <EnvironmentController />

      {/* 🌫️ Fog */}
      <fog attach="fog" args={["#0b0f19", 6, 12]} />

      {/* 💡 Lights */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 4, 2]} intensity={2.2} />
      <pointLight position={[-2, 2, 2]} intensity={2} color="#34d399" />
      <pointLight position={[2, 2, 2]} intensity={2} color="#ffffff" />
      <pointLight position={[0, -3, -2]} intensity={1.4} color="#d4af37" />

      <Suspense fallback={<Loader />}>
        <group position={[0, -0.2, 0]}>
          <Android />
          <Apple />

          {/* 🪞 CONTACT SHADOWS (huge realism boost) */}
          <ContactShadows
            position={[0, -1.2, 0]}
            opacity={0.4}
            scale={10}
            blur={2.5}
            far={4}
          />
        </group>
      </Suspense>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </Canvas>
  );
}

/* -------------------- PRELOAD -------------------- */
useGLTF.preload("/models/AndroidRobot.glb");
useGLTF.preload("/models/apple_logo.glb");
