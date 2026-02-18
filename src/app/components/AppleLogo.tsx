"use client";

import ModelLoader from "./ModelLoader";
import { ThreeElements } from "@react-three/fiber";

type AppleLogoProps = ThreeElements["group"];

export default function AppleLogo(props: AppleLogoProps) {
  return <ModelLoader src="/models/apple_logo.glb" {...props} />;
}
