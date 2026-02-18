"use client";

import { useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { motion } from "framer-motion";
import ModelLoader from "./ModelLoader";

// ---------------------- Helpers ----------------------
const getModelGrid = (count: number) => {
  switch (count) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-2";
    case 3:
      return "grid-cols-3";
    case 4:
      return "grid-cols-2 md:grid-cols-4";
    case 5:
      return "grid-cols-2 md:grid-cols-5";
    default:
      return "grid-cols-2";
  }
};

// ---------------------- Auto Rotate ----------------------
function AutoRotate() {
  useFrame((state) => {
    state.scene.rotation.y += 0.01;
  });
  return null;
}

// ---------------------- Right-Side Model Viewer ----------------------
function BigModel({ src, scale }: { src: string; scale: number }) {
  return (
    <div className="w-full h-56 md:h-64 flex items-center justify-center">
      <Canvas camera={{ position: [0, 1, 5], fov: 40 }}>
        <ambientLight intensity={1.6} />
        <directionalLight intensity={1.3} position={[4, 4, 4]} />
        <AutoRotate />
        <ModelLoader src={src} scale={scale * 4} position={[0, -0.4, 0]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}

// ---------------------- Services Data ----------------------
const services = [
  {
    leftTitle: "Website Development",
    dual: false,
    leftModel: "/models/apple_logo.glb",
    leftIcons: [
      "/logo1.png",
      "/logo2.png",
      "/logo3.png",
      "/logo4.png",
      "/logo5.png",
    ],

    rightTitle: "Website Development",
    rightModels: [
      { src: "/models/apple_logo.glb", scale: 2 },
      { src: "/models/AndroidRobot.glb", scale: 2.5 },
    ],
    rightIcons: [
      "/logo1.png",
      "/logo2.png",
      "/logo3.png",
      "/logo4.png",
      "/logo5.png",
    ],
  },

  {
    leftTitle: "Mobile App Development",
    dual: true,
    leftModel: null,
    leftIcons: [
      "/logo6.png",
      "/logo7.png",
      "/logo8.png",
      "/logo9.png",
      "/logo10.png",
    ],

    rightTitle: "Mobile App Development",
    rightModels: [
      { src: "/models/AndroidRobot.glb", scale: 2.5 },
      { src: "/models/apple_logo.glb", scale: 2 },
    ],
    rightIcons: [
      "/logo6.png",
      "/logo7.png",
      "/logo8.png",
      "/logo9.png",
      "/logo10.png",
    ],
  },

  {
    leftTitle: "Graphics & Animations",
    dual: false,
    leftModel: null,
    leftIcons: ["/logo10.png", "/logo11.png", "/logo12.png"],

    rightTitle: "Graphics & Animations",
    rightModels: [
      { src: "/models/apple_logo.glb", scale: 2.5 },
      { src: "/models/AndroidRobot.glb", scale: 2 },
      { src: "/models/apple_logo.glb", scale: 2 },
    ],
    rightIcons: ["/logo10.png", "/logo11.png", "/logo12.png"],
  },

  {
    leftTitle: "SEO & Marketing",
    dual: false,
    leftModel: null,
    leftIcons: ["/logo10.png", "/logo11.png", "/logo12.png"],

    rightTitle: "SEO & Marketing Services",
    rightModels: [
      { src: "/models/apple_logo.glb", scale: 2 },
      { src: "/models/apple_logo.glb", scale: 2 },
    ],
    rightIcons: ["/logo10.png", "/logo11.png", "/logo12.png"],
  },
];

// ---------------------- Main Component ----------------------
export default function Services() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % services.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full py-24 px-6 bg-gradient-to-br from-[#0a0e1f] via-[#0e1327] to-[#1b213f] overflow-hidden">
      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="relative mx-auto text-center font-black text-5xl 
        bg-gradient-to-r from-[#0a1a3f] via-[#f5d78e] to-[#0a1a3f]
        bg-clip-text text-transparent tracking-wider"
      >
        OUR SERVICES
      </motion.h2>

      <p className="text-center text-[#d4af37]/80 font-semibold tracking-[0.3em] mt-3">
        INNOVATION • TECHNOLOGY • DIGITAL • ENGINEERING
      </p>

      {/* Layout */}
      <div className="max-w-7xl mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 gap-16 relative z-10">
        {/* LEFT SIDE */}
        <div className="grid grid-cols-2 gap-6">
          {services.map((card, idx) => {
            const isActive = idx === active;

            return (
              <motion.div
                key={idx}
                onClick={() => setActive(idx)}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.25 }}
                className={`relative cursor-pointer rounded-2xl h-[230px] p-4 
                  backdrop-blur-xl border shadow-xl 
                  ${isActive ? "bg-[#0d1a2b]/60 border-[#d4af37]/40 shadow-[0_0_20px_#d4af3780]" : "bg-white/5 border-white/10"}`}
              >
                <h3 className="text-center text-[#f5d78e] text-sm font-semibold mb-2">
                  {card.leftTitle}
                </h3>

                {/* BOTTOM ICONS */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-3">
                  {card.leftIcons.map((icon, i) => (
                    <img key={i} src={icon} className="w-8 h-8 opacity-90" />
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl p-6 h-[520px] 
          backdrop-blur-xl bg-[#0a1a3f]/20 
          border border-[#d4af37]/20 shadow-2xl"
        >
          <h3 className="text-center text-3xl font-bold text-[#f5d78e] tracking-wide">
            {services[active].rightTitle}
          </h3>

          {/* MODELS */}
          <div
            className={`grid gap-8 mt-6 ${getModelGrid(services[active].rightModels.length)}`}
          >
            {services[active].rightModels.map((m, i) => (
              <BigModel key={i} src={m.src} scale={m.scale} />
            ))}
          </div>

          {/* ICONS */}
          <div className="flex justify-center gap-6 mt-10 flex-wrap">
            {services[active].rightIcons.map((icon, i) => (
              <img key={i} src={icon} className="w-20 h-20 opacity-90" />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
