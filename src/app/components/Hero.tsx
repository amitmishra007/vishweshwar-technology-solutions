"use client";

import { useState, useEffect, useMemo, Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

import WebDevSlide from "./WebDevSlide";
import MobileAppSlide from "./MobileAppSlide";
import GraphicsSlide from "./GraphicsSlide";
import MarketingSlide from "./MarketingSlide";

// Use object or Record<string, unknown> for empty props
type HeroProps = Record<string, unknown>;

export default function Hero({}: HeroProps) {
  const [index, setIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // Slides typed as ReactNode for SSR-safety
  const slides: React.ReactNode[] = useMemo(
    () => [
      <WebDevSlide
        key="web"
        setHeroPaused={setIsPaused as Dispatch<SetStateAction<boolean>>}
      />,
      <MobileAppSlide
        key="mobile"
        setHeroPaused={setIsPaused as Dispatch<SetStateAction<boolean>>}
      />,
      <GraphicsSlide
        key="graphics"
        setHeroPaused={setIsPaused as Dispatch<SetStateAction<boolean>>}
      />,
      <MarketingSlide
        key="marketing"
        setHeroPaused={setIsPaused as Dispatch<SetStateAction<boolean>>}
      />,
    ],
    [],
  );

  // Auto-rotation every 10s
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative w-full h-screen md:h-[75vh] lg:h-screen overflow-hidden">
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
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          {slides[index]}

          {/* GOLDEN CINEMATIC BURST */}
          <motion.div
            initial={{ opacity: 0.9, scale: 0.4 }}
            animate={{ opacity: 0, scale: 2.4 }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `
                radial-gradient(circle at center,
                  rgba(212,175,55,0.6) 0%,
                  rgba(245,215,110,0.45) 15%,
                  rgba(212,175,55,0.25) 35%,
                  rgba(212,175,55,0.1) 50%,
                  transparent 75%)`,
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
                  rgba(0,0,0,0.4) 100%)`,
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* DOT NAVIGATION */}
      <div className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 gap-2 z-50">
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

      {/* LEFT ARROW */}
      <button
        onClick={prevSlide}
        className="flex md:hidden lg:flex absolute top-1/2 left-4 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/80 to-[#f5d76e]/70 shadow-lg items-center justify-center hover:scale-105 transition-transform cursor-pointer"
        aria-label="Previous Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      {/* RIGHT ARROW */}
      <button
        onClick={nextSlide}
        className="flex md:hidden lg:flex absolute top-1/2 right-4 -translate-y-1/2 z-50 w-12 h-12 rounded-full bg-gradient-to-br from-[#d4af37]/80 to-[#f5d76e]/70 shadow-lg items-center justify-center hover:scale-105 transition-transform cursor-pointer"
        aria-label="Next Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
