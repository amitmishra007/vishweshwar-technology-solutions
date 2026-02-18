"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import WebDevSlide from "./WebDevSlide";
import MobileAppSlide from "./MobileAppSlide";
import GraphicsSlide from "./GraphicsSlide";
import MarketingSlide from "./MarketingSlide";

const slides = [
  <WebDevSlide key="web" />,
  <MobileAppSlide key="mobile" />,
  <GraphicsSlide key="graphics" />,
  <MarketingSlide key="marketing" />,
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative w-full h-screen overflow-hidden  ">
      {/* SLIDES */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, x: 120, scale: 0.97 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: -120, scale: 0.97 }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {slides[index]}
        </motion.div>
      </AnimatePresence>

      {/* DOTS */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-50">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full transition-all ${
              i === index
                ? "bg-linear-to-r from-[#d4af37] to-[#b8860b] w-8"
                : "bg-linear-to-r from-blue-950  to-blue-900"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
