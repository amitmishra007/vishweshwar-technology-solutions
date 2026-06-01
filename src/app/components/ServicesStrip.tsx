"use client";

import { motion, useMotionValue, useTransform, useScroll } from "framer-motion";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Settings,
  FileCode,
} from "lucide-react";
import { useEffect } from "react";

const services = [
  { icon: Globe, label: "Websites" },
  { icon: Smartphone, label: "Apps" },
  { icon: ShoppingCart, label: "E-Commerce" },
  { icon: Settings, label: "CMS" },
  { icon: FileCode, label: "APIs" },
];

export default function ServicesStripGodTier() {
  /* ================= CURSOR ENERGY ================= */
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX / window.innerWidth);
      cursorY.set(e.clientY / window.innerHeight);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  /* ================= TRANSFORMS ================= */
  const glowX = useTransform(cursorX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(cursorY, [0, 1], ["0%", "100%"]);

  /* ================= PARALLAX ================= */
  const { scrollY } = useScroll();
  const bgY = useTransform(scrollY, [0, 800], [0, -80]);
  const contentY = useTransform(scrollY, [0, 800], [0, -20]);

  return (
    <section className="relative w-full overflow-hidden py-24">
      {/* 🌌 PARALLAX BACKGROUND */}
      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-black to-blue-950"
      />

      {/* 💡 GLOBAL LIGHT FOLLOW */}
      <motion.div
        style={{
          left: glowX,
          top: glowY,
          transform: "translate(-50%, -50%)",
        }}
        className="absolute w-[600px] h-[600px] pointer-events-none
        bg-[radial-gradient(circle,rgba(212,175,55,0.18),transparent_70%)]
        blur-3xl"
      />

      <motion.div
        style={{
          left: glowX,
          top: glowY,
          transform: "translate(-30%, -30%)",
        }}
        className="absolute w-[700px] h-[700px] pointer-events-none
        bg-[radial-gradient(circle,rgba(59,130,246,0.15),transparent_70%)]
        blur-3xl"
      />

      {/* ✨ TOP LIGHT */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[400px]
        bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)] blur-3xl"
      />

      {/* 🎯 CONTENT */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-16"
      >
        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left"
        >
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 60 }}
            transition={{ duration: 0.6 }}
            className="h-[2px] bg-gradient-to-r from-blue-500 via-amber-400 to-red-500 mb-6 mx-auto md:mx-0"
          />

          <h2 className="text-3xl md:text-5xl font-semibold text-white leading-tight">
            We design & develop
          </h2>

          <p className="text-white/60 mt-4 max-w-md text-sm md:text-base">
            High-performance digital systems engineered with precision,
            scalability and cinematic UI experiences.
          </p>
        </motion.div>

        {/* RIGHT GRID */}
        <div className="flex flex-wrap justify-center md:justify-end gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: i * 0.08,
                  type: "spring",
                  stiffness: 120,
                  damping: 16,
                }}
                whileHover={{ y: -12, scale: 1.08 }}
                className="group relative w-28 h-28 rounded-3xl overflow-hidden cursor-pointer"
              >
                {/* GLASS */}
                <div
                  className="absolute inset-0 rounded-3xl
                  bg-white/[0.04] backdrop-blur-xl border border-white/10"
                />

                {/* 🔥 CURSOR LIGHT */}
                <motion.div
                  style={{
                    background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.25), transparent 60%)`,
                  }}
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300"
                />

                {/* 🔥 AMBER ENERGY */}
                <motion.div
                  style={{
                    background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(212,175,55,0.25), transparent 70%)`,
                  }}
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 blur-xl transition duration-500"
                />

                {/* 🔵 DEPTH GLOW */}
                <div
                  className="absolute -inset-2 opacity-0 group-hover:opacity-100 blur-2xl
                  bg-blue-500/10 transition duration-500"
                />

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
                  <motion.div
                    animate={{ y: [0, -4, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Icon className="w-7 h-7 mb-2 text-white/80 group-hover:text-white" />
                  </motion.div>

                  <span className="text-sm text-white/70 group-hover:text-white">
                    {service.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* 🔥 BOTTOM CINEMATIC */}
      <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        <div
          className="absolute inset-0 opacity-[0.06]
          [background-image:linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)]
          [background-size:40px_40px]"
        />

        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px
          bg-gradient-to-r from-transparent via-white/40 to-transparent"
        />
      </div>
    </section>
  );
}
