"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Html } from "@react-three/drei";
import { Suspense, useRef, useMemo } from "react";
import * as THREE from "three";

/* -------------------- ANDROID -------------------- */
function Android() {
  const { scene } = useGLTF("/models/AndroidRobot.glb");
  const ref = useRef<THREE.Group>(null);

  // ✅ center ONCE (optimized)
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
    ref.current.rotation.y += 0.008;
    ref.current.position.y = -0.45 + Math.sin(t * 1.4) * 0.08;

    // subtle depth breathing
    ref.current.position.z = Math.sin(t * 0.6) * 0.05;
  });

  return (
    <primitive
      ref={ref}
      object={centeredScene}
      scale={9.2} // 👈 increased from 8.2
      position={[-1.1, -0.25, 0]} // 👈 closer + pushed down
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

    ref.current.position.y = -0.45 + Math.sin(t * 0.9 + Math.PI) * 0.06;

    ref.current.position.z = Math.cos(t * 0.5) * 0.05;
  });

  return (
    <primitive
      ref={ref}
      object={centeredScene}
      scale={6.2} // 👈 increased from 5.5
      position={[1.1, -0.25, 0]} // 👈 closer + pushed down
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
      camera={{ position: [0, 0.4, 5.5], fov: 45 }} // 👈 was 0 → now 0.4
      dpr={[1, 2]}
    >
      {/* 🌤️ Base lighting */}
      <ambientLight intensity={1.1} />
      {/* 🎯 Key lights (cinematic separation) */}
      <pointLight position={[-2, 2, 2]} intensity={2} color="#34d399" />{" "}
      {/* Android tint */}
      <pointLight position={[2, 2, 2]} intensity={2} color="#ffffff" />{" "}
      {/* Apple clean */}
      {/* ✨ subtle rim light */}
      <pointLight position={[0, -3, -2]} intensity={1.2} color="#d4af37" />
      <Suspense fallback={<Loader />}>
        <Android />
        <Apple />
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
