"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FancyButton from "./FancyButton";

export default function MarketingSlide() {
  return (
    <div className="w-full h-full relative overflow-hidden bg-gradient-to-br from-white to-yellow-100 text-blue-950 flex items-center justify-center">
      {/* Wavy background layers */}
      <div className="absolute bottom-0 left-0 w-full h-1/5 wave wave1"></div>
      <div className="absolute bottom-2 left-0 w-full h-1/5 wave wave2"></div>
      <div className="absolute bottom-4 left-0 w-full h-1/5 wave wave3"></div>
      <div className="absolute bottom-6 left-0 w-full h-1/5 wave wave4"></div>

      {/* Container with top padding for navbar */}
      <div className="max-w-6xl mx-auto px-6 pt-24 md:pt-28 lg:pt-32 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="space-y-6 text-center md:text-left"
          >
            <p className="opacity-90 text-base sm:text-lg md:text-xl lg:text-2xl">
              SEO • SMO • PPC • Bulk WhatsApp • SMS • Social Media Campaigns
            </p>
            <h1 className="font-okaluera font-bold text-4xl sm:text-5xl md:text-5xl lg:text-6xl">
              Digital Marketing
            </h1>
            <div className="flex md:justify-start justify-center">
              <FancyButton text="Boost Your Business" href="/services" />
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
              src="/logo10.png"
              alt="Marketing"
              width={600}
              height={500}
              className="w-60 sm:w-72 md:w-80 lg:w-[420px] xl:w-[500px] h-auto"
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
