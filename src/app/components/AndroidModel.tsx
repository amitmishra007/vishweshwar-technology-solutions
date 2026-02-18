"use client";

import ModelLoader from "./ModelLoader";
import { ThreeElements } from "@react-three/fiber";

type AndroidModelProps = ThreeElements["group"];

export default function AndroidModel(props: AndroidModelProps) {
  return <ModelLoader src="/models/AndroidRobot.glb" {...props} />;
}
