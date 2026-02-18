"use client";

import { useGLTF } from "@react-three/drei";
import { ThreeElements } from "@react-three/fiber";

type ModelLoaderProps = ThreeElements["group"] & {
  src: string;
};

export default function ModelLoader({
  src,
  scale = 1,
  ...props
}: ModelLoaderProps) {
  const { scene } = useGLTF(src);

  return (
    <group {...props} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}
