"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Html } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

/* -------------------- ANDROID -------------------- */
function Android() {
  const { scene } = useGLTF("/models/AndroidRobot.glb");
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

    // rotation
    ref.current.rotation.y += 0.008;

    // floating (clean, no bias)
    ref.current.position.y = Math.sin(t * 1.4) * 0.08;

    // depth breathing
    ref.current.position.z = Math.sin(t * 0.6) * 0.08;

    // subtle scale pulse (cinematic life)
    const scalePulse = 1 + Math.sin(t * 1.2) * 0.025;
    ref.current.scale.setScalar(9.2 * scalePulse);
  });

  return (
    <primitive
      ref={ref}
      object={centeredScene}
      position={[-1.25, 0, 0]} // ✅ more spacing
    />
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

    ref.current.rotation.y -= 0.008;

    ref.current.position.y = Math.sin(t * 0.9 + Math.PI) * 0.06;

    ref.current.position.z = Math.cos(t * 0.5) * 0.08;

    const scalePulse = 1 + Math.sin(t * 1.1 + Math.PI) * 0.02;
    ref.current.scale.setScalar(6.2 * scalePulse);
  });

  return (
    <primitive
      ref={ref}
      object={centeredScene}
      position={[1.25, 0, 0]} // ✅ symmetric spacing
    />
  );
}

/* -------------------- LOADER -------------------- */
function Loader() {
  return (
    <Html center>
      <div className="w-10 h-10 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
    </Html>
  );
}

/* -------------------- MAIN SCENE -------------------- */
export default function AndroidModel() {
  return (
    <Canvas
      camera={{ position: [0, 0.15, 5.5], fov: 45 }} // ✅ FIXED CAMERA
      dpr={[1, 2]}
    >
      {/* 🌫️ Cinematic atmosphere */}
      <fog attach="fog" args={["#0b0f19", 6, 11]} />

      {/* 🌤️ Base light */}
      <ambientLight intensity={1.0} />

      {/* 🎯 Key lights */}
      <pointLight position={[-2, 2, 2]} intensity={2.2} color="#34d399" />
      <pointLight position={[2, 2, 2]} intensity={2.2} color="#ffffff" />

      {/* ✨ Rim light */}
      <pointLight position={[0, -3, -2]} intensity={1.5} color="#d4af37" />

      {/* 🌌 Global alignment group */}
      <Suspense fallback={<Loader />}>
        <group position={[0, -0.15, 0]}>
          <Android />
          <Apple />
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
