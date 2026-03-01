"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import WebDevSlide from "./WebDevSlide";
import MobileAppSlide from "./MobileAppSlide";
import GraphicsSlide from "./GraphicsSlide";
import MarketingSlide from "./MarketingSlide";

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides = useMemo(
    () => [
      <WebDevSlide key="web" setHeroPaused={setIsPaused} />,
      <MobileAppSlide key="mobile" setHeroPaused={setIsPaused} />,
      <GraphicsSlide key="graphics" setHeroPaused={setIsPaused} />,
      <MarketingSlide key="marketing" setHeroPaused={setIsPaused} />,
    ],
    [],
  );

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 10000);

    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  return (
    <section className="relative w-full h-screen md:h-[75vh] lg:h-screen overflow-hidden">
      {/* DEEP ROYAL BACKGROUND */}
      <div className="absolute inset-0 -z-10" />

      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{
            scale: 0.92,
            opacity: 0,
            clipPath: "circle(0% at 50% 50%)",
          }}
          animate={{
            scale: 1,
            opacity: 1,
            clipPath: "circle(160% at 50% 50%)",
          }}
          exit={{
            opacity: 0,
            scale: 0.96,
          }}
          transition={{
            duration: 1.4,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-0"
        >
          {slides[index]}

          {/* GOLDEN CINEMATIC BURST */}
          <motion.div
            initial={{ opacity: 0.9, scale: 0.4 }}
            animate={{ opacity: 0, scale: 2.4 }}
            transition={{
              duration: 1.3,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at center,
                  rgba(212,175,55,0.6) 0%,
                  rgba(245,215,110,0.45) 15%,
                  rgba(212,175,55,0.25) 35%,
                  rgba(212,175,55,0.1) 50%,
                  transparent 75%)
              `,
              filter: "blur(70px)",
            }}
          />

          {/* SUBTLE GOLD EDGE VIGNETTE */}
          <motion.div
            initial={{ opacity: 0.8 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at center,
                  transparent 60%,
                  rgba(212,175,55,0.15) 85%,
                  rgba(0,0,0,0.4) 100%)
              `,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* LUXURY COMPACT DOT NAVIGATION */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-50">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`relative h-2 rounded-full transition-all duration-500 ${
              i === index
                ? "w-7 bg-gradient-to-r from-[#d4af37] to-[#f5d76e] shadow-[0_0_12px_rgba(212,175,55,0.8)] cursor-pointer"
                : "w-2 bg-white/30 hover:bg-white/50 border-[0.5px] border-amber-200 cursor-pointer"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
