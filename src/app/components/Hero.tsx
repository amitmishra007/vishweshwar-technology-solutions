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
  /* ---------------- HYDRATION SAFETY ---------------- */
  const [mounted, setMounted] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev

  useEffect(() => {
    setMounted(true);
  }, []);
  /* -------------------------------------------------- */

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
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  // const prevSlide = () =>
  //   setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  // const nextSlide = () => setIndex((prev) => (prev + 1) % slides.length);

  const nextSlide = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  /* ------------ PREVENT HYDRATION MISMATCH ----------- */
  if (!mounted) {
    return (
      <section className="relative w-full h-screen md:h-[75vh] lg:h-screen overflow-hidden" />
    );
  }
  /* --------------------------------------------------- */

  return (
    <section className="relative w-full h-screen md:h-[75vh] lg:h-screen overflow-hidden">
      <div className="absolute inset-0 -z-10" />

      <AnimatePresence mode="wait" custom={direction}>
        <motion.div
          key={index}
          custom={direction}
          variants={{
            initial: (dir: number) => ({
              x: dir > 0 ? "100%" : "-100%",
              scale: 0.9,
              opacity: 0,
              rotateY: dir > 0 ? 25 : -25,
              filter: "blur(20px)",
            }),
            animate: {
              x: "0%",
              scale: 1,
              opacity: 1,
              rotateY: 0,
              filter: "blur(0px)",
              transition: {
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1], // cinematic ease
              },
            },
            exit: (dir: number) => ({
              x: dir > 0 ? "-60%" : "60%",
              scale: 0.95,
              opacity: 0,
              rotateY: dir > 0 ? -15 : 15,
              filter: "blur(10px)",
              transition: {
                duration: 1,
                ease: [0.4, 0, 0.2, 1],
              },
            }),
          }}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
          style={{
            perspective: "1200px",
            transformStyle: "preserve-3d",
          }}
        >
          {slides[index]}

          {/* LIGHT SWEEP */}
          <motion.div
            initial={{ x: "-100%", opacity: 0.4 }}
            animate={{ x: "100%", opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25), transparent 70%)",
              mixBlendMode: "overlay",
            }}
          />

          {/* DEPTH SHADOW */}
          <motion.div
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,0,0,0.5), transparent 70%)",
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
        className="flex md:hidden lg:flex absolute top-1/2 left-3 -translate-y-1/2 z-50 
  w-6 h-6 lg:w-12 lg:h-12 
  rounded-full bg-gradient-to-br from-[#d4af37]/80 to-[#f5d76e]/70 shadow-lg 
  items-center justify-center hover:scale-105 transition-transform cursor-pointer"
        aria-label="Previous Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 lg:h-6 lg:w-6 text-white"
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
        className="flex md:hidden lg:flex absolute top-1/2 right-3 -translate-y-1/2 z-50 
  w-6 h-6 lg:w-12 lg:h-12 
  rounded-full bg-gradient-to-br from-[#d4af37]/80 to-[#f5d76e]/70 shadow-lg 
  items-center justify-center hover:scale-105 transition-transform cursor-pointer"
        aria-label="Next Slide"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-3 w-3 lg:h-6 lg:w-6 text-white"
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
