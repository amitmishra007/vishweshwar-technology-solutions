"use client";

import { useRef } from "react";
import { Sphere, useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function RotatingGlobe() {
  const globeRef = useRef<THREE.Mesh>(null);

  const [colorMap, normalMap] = useTexture([
    "/textures/earth.jpg",
    "/textures/earth-normal.jpg",
  ]);

  useFrame(() => {
    if (globeRef.current) {
      globeRef.current.rotation.y += 0.002;
    }
  });

  return (
    <group>
      {/* Earth */}
      <mesh ref={globeRef}>
        <Sphere args={[1.5, 64, 64]}>
          <meshStandardMaterial
            map={colorMap}
            normalMap={normalMap}
            roughness={0.7}
          />
        </Sphere>
      </mesh>
    </group>
  );
}
