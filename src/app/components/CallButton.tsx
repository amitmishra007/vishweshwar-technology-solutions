"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { useAIInteraction } from "../hooks/useAIInteraction";

export default function CallButton() {
  const { energy, intentLevel } = useAIInteraction();
  const ref = useRef<HTMLDivElement | null>(null);

  /* ------------------ NORMALIZE ENERGY ------------------ */
  const energyMV = useMotionValue(
    typeof energy === "number" ? energy : energy.get(),
  );

  useEffect(() => {
    if (typeof energy === "number") {
      energyMV.set(energy);
    } else {
      const unsub = energy.on("change", (v) => energyMV.set(v));
      return () => unsub();
    }
  }, [energy, energyMV]);

  /* ------------------ 3D ROTATION ------------------ */
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const smoothX = useSpring(rotateX, { stiffness: 160, damping: 16 });
  const smoothY = useSpring(rotateY, { stiffness: 160, damping: 16 });

  /* ------------------ AI TRANSFORMS ------------------ */
  const scaleBreath = useTransform(energyMV, [0, 1], [1, 1.08]);
  const glow = useTransform(energyMV, [0, 1], [0.5, 1]);

  /* ------------------ INTERACTION ------------------ */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const rect = el.getBoundingClientRect();

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;

      const intensity = 0.8 + intentLevel;

      rotateX.set(-y * 18 * intensity);
      rotateY.set(x * 18 * intensity);
    };

    const reset = () => {
      rotateX.set(0);
      rotateY.set(0);
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", reset);
    el.addEventListener("touchmove", handleMove);
    el.addEventListener("touchend", reset);

    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", reset);
      el.removeEventListener("touchmove", handleMove);
      el.removeEventListener("touchend", reset);
    };
  }, [intentLevel, rotateX, rotateY]);

  return (
    <div
      ref={ref}
      className="fixed bottom-16 left-6 z-[999] perspective-[1600px]"
    >
      <div className="w-[115px] h-[115px]">
        {" "}
        {/* 👈 HALF of 230px */}
        {/* ⚡ GLOW */}
        <motion.div
          style={{ scale: scaleBreath, opacity: glow }}
          className="absolute inset-0 rounded-full blur-xl"
        >
          <div className="w-full h-full rounded-full bg-gradient-to-r from-amber-500/40 via-yellow-400/30 to-orange-400/20" />
        </motion.div>
        {/* ⚡ PULSE RINGS */}
        {/* ⚡ PULSE RINGS (SLOWER & PREMIUM) */}
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="absolute inset-0 rounded-full border border-amber-400/40"
            animate={{
              scale: [1, 1.5 + i * 0.25],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 2.2 + i * 0.6, // ⬅️ slower
              repeat: Infinity,
              ease: "easeOut",
              delay: i * 0.4, // ⬅️ stagger for smoother flow
            }}
          />
        ))}
        {/* 💠 BUTTON */}
        <motion.a
          href="tel:+919509990768"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.92 }}
          style={{
            rotateX: smoothX,
            rotateY: smoothY,
            transformStyle: "preserve-3d",
          }}
          className="relative block w-full h-full"
        >
          <motion.div
            style={{ transform: "translateZ(30px)" }}
            className="relative w-full h-full"
          >
            <Image
              src="/vishweshwar-indsutries-bhiwadi-call-us-button.png"
              alt="Call Vishweshwar Industries"
              fill
              className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.3)]"
            />
          </motion.div>
        </motion.a>
      </div>
    </div>
  );
}
