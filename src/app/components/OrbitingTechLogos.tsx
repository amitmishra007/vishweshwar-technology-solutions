"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const techLogos = [
  "/icons/nextjs.png",
  "/icons/react.png",
  "/icons/flutter.png",
  "/icons/node.png",
];

export default function OrbitingTechLogos() {
  const groupRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Rotate the orbit
    if (groupRef.current) groupRef.current.rotation.y = t * 0.4;

    // Make each logo face the camera
    groupRef.current?.children.forEach((child) => {
      child.lookAt(camera.position);
    });
  });

  return (
    <group ref={groupRef} position={[0, 0, 2]}>
      {techLogos.map((src, i) => {
        const angle = (i / techLogos.length) * Math.PI * 2;

        return (
          <group key={src}>
            {/* Glow ring behind the icon */}
            <mesh position={[Math.cos(angle) * 3, Math.sin(angle) * 3, 0]}>
              <circleGeometry args={[0.55, 32]} />
              <meshBasicMaterial color="#00eaff" opacity={0.45} transparent />
            </mesh>

            {/* Logo */}
            <mesh
              position={[
                Math.cos(angle) * 3,
                Math.sin(angle) * 3,
                0.1, // raise slightly in front of glow
              ]}
            >
              <planeGeometry args={[0.9, 0.9]} />
              <meshBasicMaterial
                map={new THREE.TextureLoader().load(src)}
                transparent
              />
            </mesh>

            {/* Orbit trail */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[2.9, 3.1, 64]} />
              <meshBasicMaterial
                color="#00eaff"
                transparent
                opacity={0.15}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
