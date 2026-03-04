"use client";

import { Canvas } from "@react-three/fiber";
import { Float } from "@react-three/drei";

export default function FloatingShapes() {
  return (
    <Canvas camera={{ position: [0, 0, 7] }}>
      <ambientLight intensity={1.2} />
      <Float speed={2} rotationIntensity={1} floatIntensity={2}>
        <mesh position={[-2, 1, 0]}>
          <dodecahedronGeometry args={[1.2]} />
          <meshStandardMaterial
            color="#d4af37"
            metalness={0.7}
            roughness={0.2}
          />
        </mesh>

        <mesh position={[2.5, -1.5, 0]}>
          <icosahedronGeometry args={[1]} />
          <meshStandardMaterial
            color="#1e2a78"
            metalness={0.6}
            roughness={0.3}
          />
        </mesh>

        <mesh position={[0, -2, 0]}>
          <octahedronGeometry args={[0.9]} />
          <meshStandardMaterial
            color="#ffcf48"
            metalness={0.8}
            roughness={0.25}
          />
        </mesh>
      </Float>
    </Canvas>
  );
}
