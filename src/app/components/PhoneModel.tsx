import { useGLTF, Float } from "@react-three/drei";
import { ThreeElements, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

// Strict GLTF type
interface GLTFResult {
  scene: THREE.Group;
}

export function PhoneModel(props: ThreeElements["group"]) {
  const group = useRef<THREE.Group>(null);

  const { scene } = useGLTF("/models/AndroidRobot.glb") as GLTFResult;

  useFrame(() => {
    if (group.current) {
      group.current.rotation.y += 0.003;
    }
  });

  return (
    <Float speed={3.2} rotationIntensity={1.5} floatIntensity={0.6}>
      <group ref={group} scale={8} {...props}>
        <primitive object={scene} />
      </group>
    </Float>
  );
}

useGLTF.preload("/models/AndroidRobot.glb");
