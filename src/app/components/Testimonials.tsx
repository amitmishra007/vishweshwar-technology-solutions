"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  img: string;
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    img: "/logo3.png",
    quote:
      "The ability to capture responses is a game-changer. Even if a user gets tired of the signup and leaves, that data is still persisted.",
    name: "Jessie J",
    role: "Acme LTD",
  },
  {
    img: "/logo4.png",
    quote:
      "Capturing user feedback is revolutionary. Even if a participant abandons, their valuable input remains intact.",
    name: "Nick V",
    role: "Malika Inc.",
  },
  {
    img: "/iOS-and-Android-development.png",
    quote:
      "Even if a user abandons the sign-up process, their information remains stored — a true game changer.",
    name: "Amelia W",
    role: "Panda AI",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const autorotateTiming = 7000;

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  // Auto-rotate logic
  useEffect(() => {
    startAutoRotate();
    return stopAutoRotate;
  }, []);

  const startAutoRotate = () => {
    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, autorotateTiming);
  };

  const stopAutoRotate = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  // Dynamic height adjustment
  useEffect(() => {
    if (!textRef.current) return;

    const el = textRef.current.children[active] as HTMLElement;
    if (el) textRef.current.style.height = `${el.offsetHeight}px`;
  }, [active]);

  return (
    <div className="relative font-inter antialiased">
      <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
          <div className="flex justify-center">
            <div className="w-full max-w-3xl mx-auto text-center">
              {/* IMAGE */}
              <div className="relative h-32 mb-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-indigo-500/25 before:via-indigo-500/5 before:via-25% before:to-indigo-500/0 before:to-75% before:rounded-full before:-z-10">
                  <div className="h-32 [mask-image:_linear-gradient(0deg,transparent,white_20%,white)]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active}
                        initial={{ opacity: 0, rotate: -60 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 60 }}
                        transition={{
                          duration: 0.7,
                          ease: [0.68, -0.3, 0.32, 1],
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Image
                          src={testimonials[active].img}
                          alt={testimonials[active].name}
                          width={156}
                          height={156}
                          className="rounded-full top-11 relative"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* TEXT QUOTES */}
              <div
                ref={textRef}
                className="mb-9 relative flex flex-col transition-all duration-150 ease-in-out"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, position: "absolute" }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="text-2xl font-bold text-slate-900 before:content-['\u201C'] after:content-['\u201D']">
                      {testimonials[active].quote}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* BUTTONS */}
              <div className="flex flex-wrap justify-center -m-1.5">
                {testimonials.map((t, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      stopAutoRotate();
                      setActive(index);
                    }}
                    className={`inline-flex justify-center whitespace-nowrap rounded-full px-3 py-1.5 m-1.5 text-xs shadow-sm transition-colors duration-150 
                      ${
                        active === index
                          ? "bg-indigo-500 text-white shadow-indigo-950/10"
                          : "bg-white hover:bg-indigo-100 text-slate-900"
                      }`}
                  >
                    {t.name}
                    <span
                      className={`px-1 ${
                        active === index ? "text-indigo-200" : "text-slate-300"
                      }`}
                    >
                      -
                    </span>
                    {t.role}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
