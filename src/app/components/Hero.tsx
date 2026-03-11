"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

import WebDevSlide from "./WebDevSlide";
import MobileAppSlide from "./MobileAppSlide";
import GraphicsSlide from "./GraphicsSlide";
import MarketingSlide from "./MarketingSlide";

type HeroProps = Record<string, never>;

/* ---------------- SHIMMER STYLE ---------------- */

const shimmerCSS = `
@keyframes shimmer {
0% { background-position: -1200px 0 }
100% { background-position: 1200px 0 }
}

.skeleton {
background: linear-gradient(
90deg,
#e5e7eb 25%,
#f3f4f6 37%,
#e5e7eb 63%
);
background-size: 1200px 100%;
animation: shimmer 1.6s infinite linear;
}
`;

/* ---------------- SKELETON ---------------- */

function HeroSkeleton() {
  return (
    <section className="relative w-full h-screen md:h-[75vh] lg:h-screen overflow-hidden bg-gradient-to-b from-white to-blue-50">
      <style>{shimmerCSS}</style>

      <div className="max-w-7xl mx-auto h-full px-6 md:px-8 flex flex-col md:flex-row items-center gap-12">
        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center w-full md:w-1/2 space-y-5">
          <div className="h-4 w-36 rounded skeleton" />

          <div className="space-y-3">
            <div className="h-8 w-4/5 rounded skeleton" />
            <div className="h-8 w-3/5 rounded skeleton" />
          </div>

          <div className="space-y-2 pt-2">
            <div className="h-4 w-full rounded skeleton" />
            <div className="h-4 w-5/6 rounded skeleton" />
            <div className="h-4 w-3/4 rounded skeleton" />
          </div>

          <div className="flex gap-4 pt-4">
            <div className="h-11 w-36 rounded-lg skeleton" />
            <div className="h-11 w-36 rounded-lg skeleton" />
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="w-full md:w-1/2 flex justify-center items-center">
          <div className="relative flex items-center justify-center">
            <div className="absolute w-[220px] h-[220px] md:w-[300px] md:h-[300px] lg:w-[340px] lg:h-[340px] rounded-full border border-gray-200" />

            <div className="w-[80px] h-[80px] md:w-[110px] md:h-[110px] rounded-full skeleton" />

            <div className="absolute w-[34px] h-[34px] md:w-[40px] md:h-[40px] rounded-xl skeleton -top-4 left-1/2 -translate-x-1/2" />

            <div className="absolute w-[34px] h-[34px] md:w-[40px] md:h-[40px] rounded-xl skeleton bottom-0 right-4" />

            <div className="absolute w-[34px] h-[34px] md:w-[40px] md:h-[40px] rounded-xl skeleton bottom-0 left-4" />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- HERO ---------------- */

export default function Hero({}: HeroProps) {
  const SLIDE_COUNT = 4;
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const slides = [
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
  ];

  /* AUTO ROTATE */

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % SLIDE_COUNT);
    }, 10000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const prevSlide = () =>
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);

  return (
    <section className="relative w-full h-screen md:h-[75vh] lg:h-screen overflow-hidden">
      {/* SKELETON OVERLAY */}

      {!mounted && (
        <motion.div
          className="absolute inset-0 z-40"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <HeroSkeleton />
        </motion.div>
      )}

      <AnimatePresence mode="popLayout">
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
            duration: 1.2,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute inset-0"
        >
          {slides[index]}

          {/* GOLD BURST */}

          <motion.div
            initial={{ opacity: 0.9, scale: 0.4 }}
            animate={{ opacity: 0, scale: 2.4 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(circle at center,
              rgba(212,175,55,0.6) 0%,
              rgba(245,215,110,0.45) 15%,
              rgba(212,175,55,0.25) 35%,
              rgba(212,175,55,0.1) 50%,
              transparent 75%)`,
              filter: "blur(70px)",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* DOT NAV */}

      <div className="hidden md:flex absolute bottom-5 left-1/2 -translate-x-1/2 gap-2 z-50">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            className={`h-2 rounded-full transition-all duration-500 ${
              i === index
                ? "w-7 bg-gradient-to-r from-[#d4af37] to-[#f5d76e] shadow-[0_0_12px_rgba(212,175,55,0.8)]"
                : "w-2 bg-white/30 hover:bg-white/50 border border-amber-200"
            }`}
          />
        ))}
      </div>

      {/* LEFT ARROW */}

      <button
        onClick={prevSlide}
        className="flex md:hidden lg:flex absolute top-1/2 left-3 -translate-y-1/2 z-50 
        w-6 h-6 lg:w-12 lg:h-12 
        rounded-full bg-gradient-to-br from-[#d4af37]/80 to-[#f5d76e]/70 shadow-lg 
        items-center justify-center hover:scale-105 transition-transform"
      >
        <svg
          className="h-3 w-3 lg:h-6 lg:w-6 text-white"
          viewBox="0 0 24 24"
          fill="none"
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
        className="flex md:hidden lg:flex absolute top-1/2 right-3 -translate-y-1/2 z-50 
        w-6 h-6 lg:w-12 lg:h-12 
        rounded-full bg-gradient-to-br from-[#d4af37]/80 to-[#f5d76e]/70 shadow-lg 
        items-center justify-center hover:scale-105 transition-transform"
      >
        <svg
          className="h-3 w-3 lg:h-6 lg:w-6 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </section>
  );
}
