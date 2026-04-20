"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Settings,
  FileCode,
} from "lucide-react";

const services = [
  { icon: Globe, label: "Websites" },
  { icon: Smartphone, label: "Apps" },
  { icon: ShoppingCart, label: "E-Commerce" },
  { icon: Settings, label: "CMS" },
  { icon: FileCode, label: "APIs" },
];

export default function ServicesStrip() {
  return (
    <section className="relative w-full overflow-hidden py-20 md:py-24">
      {/* 🌌 BASE BACKGROUND (matches premium dark theme) */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a0a] via-[#0d1117] to-[#050505]" />

      {/* subtle blue energy tint */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(59,130,246,0.12),transparent_40%)]" />

      {/* 🔴 BRAND ACCENT GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(239,68,68,0.08),transparent_40%)]" />

      {/* 🧊 TOP SOFT LIGHT */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white/[0.04] to-transparent" />

      {/* 🎯 CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-center md:text-left"
        >
          {/* animated accent line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 48 }}
            transition={{ duration: 0.6 }}
            className="h-[2px] bg-gradient-to-r from-blue-500 to-red-500 mb-5 mx-auto md:mx-0"
          />

          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-white leading-tight">
            We design & develop
          </h2>

          <p className="text-gray-400 mt-4 max-w-md text-sm md:text-base">
            High-performance digital solutions engineered with precision,
            scalability, and modern design systems.
          </p>
        </motion.div>

        {/* RIGHT ICON GRID */}
        <div className="flex flex-wrap justify-center md:justify-end gap-5">
          {services.map((service, i) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, y: 40, scale: 0.92 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: i * 0.08,
                  type: "spring",
                  stiffness: 120,
                  damping: 18,
                }}
                whileHover={{ y: -8, scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
                className="group relative w-24 h-24 md:w-28 md:h-28 rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl flex flex-col items-center justify-center text-white cursor-pointer overflow-hidden"
              >
                {/* inner glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-br from-white/10 to-transparent" />

                {/* subtle spotlight */}
                <div className="absolute -inset-1 opacity-0 group-hover:opacity-100 blur-xl bg-blue-500/10 transition duration-500" />

                {/* icon */}
                <Icon className="w-7 h-7 mb-2 text-white/90 group-hover:text-white transition" />

                {/* label */}
                <span className="text-xs md:text-sm text-white/80 group-hover:text-white tracking-wide transition">
                  {service.label}
                </span>

                {/* premium border highlight */}
                <div className="absolute inset-0 rounded-2xl border border-white/5 group-hover:border-white/20 transition" />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 🔥 BOTTOM CINEMATIC FINISH */}
      <div className="absolute bottom-0 left-0 w-full h-40 pointer-events-none">
        {/* fade to next section */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />

        {/* mesh grid effect */}
        <div className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)] [background-size:40px_40px]" />

        {/* glowing divider line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[60%] h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
      </div>
    </section>
  );
}
