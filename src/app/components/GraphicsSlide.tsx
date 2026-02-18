"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FancyButton from "./FancyButton";

export default function GraphicsSlide() {
  return (
    <div className="w-full h-full relative overflow-hidden flex items-center justify-center">
      {/* 🌈 Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-animated -z-10"></div>

      {/* 🌟 Morphing Blobs */}
      <div className="absolute -left-[20vmin] -top-[20vmin] w-[70vmax] h-[70vmax] bg-white/7 rounded-full animate-morph animate-spin origin-[55%_55%] pointer-events-none -z-10"></div>
      <div className="absolute -right-[10vmin] -bottom-0 w-[70vmin] h-[70vmin] bg-white/7 rounded-full animate-morph-alt animate-spin-reverse origin-[20%_20%] pointer-events-none -z-10"></div>

      {/* Container with top padding for navbar */}
      <div className="max-w-6xl mx-auto px-6 pt-24 md:pt-28 lg:pt-32 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="space-y-6 text-center md:text-left"
          >
            <p className="opacity-90 text-base sm:text-lg md:text-xl lg:text-2xl">
              Brochures • Business Cards • Catalogues • Logos • Full Branding
            </p>
            <h1 className="font-bold text-4xl sm:text-5xl md:text-5xl lg:text-6xl">
              Graphics & Branding
            </h1>
            <div className="flex md:justify-start justify-center">
              <FancyButton text="View Graphics Work" href="/services" />
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1 }}
            className="flex justify-center"
          >
            <Image
              src="/images/graphics.png"
              alt="Graphics"
              width={600}
              height={500}
              className="w-60 sm:w-72 md:w-80 lg:w-[420px] xl:w-[500px] h-auto drop-shadow-2xl"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
