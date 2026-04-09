"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { PhoneCall } from "lucide-react";
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

  const smoothX = useSpring(rotateX, { stiffness: 140, damping: 14 });
  const smoothY = useSpring(rotateY, { stiffness: 140, damping: 14 });

  /* ------------------ AI TRANSFORMS ------------------ */
  const scaleBreath = useTransform(energyMV, [0, 1], [1, 1.06]);
  const glow = useTransform(energyMV, [0, 1], [0.4, 1]);

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

      const intensity = 0.7 + intentLevel;

      rotateX.set(-y * 16 * intensity);
      rotateY.set(x * 16 * intensity);
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
      className="fixed bottom-16 left-6 z-[999] group perspective-[1600px]"
    >
      {/* 🌌 AI BREATHING GLOW */}
      <motion.div
        style={{ scale: scaleBreath, opacity: glow }}
        className="absolute inset-0 rounded-full blur-2xl"
      >
        <div className="w-full h-full rounded-full bg-gradient-to-r from-blue-900/30 via-amber-600/30 to-yellow-400/20" />
      </motion.div>

      {/* 🔁 PREMIUM RINGS */}
      {[0, 1].map((i) => (
        <motion.span
          key={i}
          className="absolute inset-0 rounded-full border border-amber-400/30"
          animate={{
            scale: [1, 1.6 + i * 0.3],
            opacity: [0.5, 0],
          }}
          transition={{
            duration: 2.5 + i,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      ))}

      {/* 💠 MAIN BUTTON */}
      <motion.a
        href="tel:+919509990768"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        style={{
          rotateX: smoothX,
          rotateY: smoothY,
          scale: scaleBreath,
          transformStyle: "preserve-3d",
        }}
        className="
          group relative flex items-center gap-3
          px-6 py-3 rounded-full overflow-hidden

          text-white font-medium
          backdrop-blur-[6px]

          border border-white/20
          shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),_0_6px_12px_rgba(0,0,0,0.25)]
        "
      >
        {/* 🎨 FANCY BUTTON GRADIENT CORE */}
        <span className="absolute inset-0 rounded-full overflow-hidden">
          <span className="absolute inset-0 bg-gradient-to-r from-blue-950 via-amber-700 to-yellow-500 animate-gradientMove" />
          <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-amber-700 to-blue-950 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </span>

        {/* ✨ SHINE SWEEP */}
        <span className="absolute inset-0 overflow-hidden rounded-full">
          <span className="absolute top-0 left-[-75%] w-1/2 h-full bg-white/20 skew-x-[-25deg] group-hover:left-[130%] transition-all duration-[1200ms]" />
        </span>

        {/* 📞 ICON */}
        <motion.div
          className="relative z-10"
          style={{ transform: "translateZ(40px)" }}
          animate={{
            rotate: [0, 18, -12, 18, 0],
          }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        >
          <PhoneCall size={20} />
        </motion.div>

        {/* 📞 TEXT */}
        <span
          className="
            relative z-10 brand-font
            max-w-0 overflow-hidden whitespace-nowrap
            group-hover:max-w-[240px]
            transition-all duration-500 ease-out
          "
          style={{ transform: "translateZ(30px)" }}
        >
          Call Us: +91 95099 90768
        </span>

        {/* 💎 GLASS OVERLAY */}
        <div className="absolute inset-0 rounded-full bg-white/5 backdrop-blur-md border border-white/20" />
      </motion.a>
    </div>
  );
}
