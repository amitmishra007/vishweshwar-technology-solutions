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
    <section className="relative w-full overflow-hidden py-16 md:py-20 bg-gradient-to-r from-sky-500 via-blue-600 to-blue-700">
      {/* Animated background glow */}
      <div className="absolute inset-0 opacity-30 blur-3xl bg-[radial-gradient(circle_at_20%_30%,#ffffff33,transparent_40%)]" />

      {/* Dots pattern (bottom center) */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 grid grid-cols-8 gap-2 opacity-30">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 bg-white/60 rounded-full" />
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">
        {/* LEFT TEXT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-center md:text-left"
        >
          {/* animated line */}
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: 40 }}
            transition={{ duration: 0.6 }}
            className="h-[3px] bg-white mb-4 mx-auto md:mx-0"
          />

          <h2 className="text-2xl md:text-4xl font-semibold tracking-wide">
            We design & develop
          </h2>
        </motion.div>

        {/* RIGHT ICONS */}
        <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.label}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  delay: i * 0.1,
                  type: "spring",
                  stiffness: 120,
                }}
                whileHover={{
                  scale: 1.08,
                  y: -6,
                }}
                whileTap={{ scale: 0.95 }}
                className="group relative w-24 h-24 md:w-28 md:h-28 rounded-2xl border border-white/40 backdrop-blur-md flex flex-col items-center justify-center text-white cursor-pointer overflow-hidden"
              >
                {/* glow on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-white/10 blur-xl" />

                {/* icon */}
                <Icon className="w-8 h-8 mb-2" />

                {/* label */}
                <span className="text-xs md:text-sm tracking-wide">
                  {service.label}
                </span>

                {/* border animation */}
                <div className="absolute inset-0 rounded-2xl border border-white/20 group-hover:border-white transition" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
