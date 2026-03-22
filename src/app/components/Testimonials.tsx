"use client";

import { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
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
      "Working with Vishweshwar Industries transformed our digital presence completely. The design precision and branding clarity elevated our company beyond expectations.",
    name: "Jaswant Singh",
    role: "Atom Learning Center",
  },
  {
    img: "/logo4.png",
    quote:
      "Amit Mishra and his team delivered a website and brand identity that feels modern, trustworthy, and incredibly refined.",
    name: "Kirti Kapoor",
    role: "Paradigm Spaces",
  },
  {
    img: "/iOS-and-Android-development.png",
    quote:
      "The digital branding strategy created by Vishweshwar Industries gave our company a strong and professional online identity.",
    name: "Imran Khan",
    role: "ECR Builders",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  /* AUTO PLAY */
  useEffect(() => {
    if (paused) return;

    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [paused]);

  /* PARALLAX */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-200, 200], [8, -8]);
  const rotateY = useTransform(mouseX, [-200, 200], [-8, 8]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  const t = testimonials[active];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative py-32 bg-gradient-to-b from-white to-[#faf9f6] overflow-hidden"
    >
      {/* AMBIENT LIGHT */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 -translate-x-1/2 top-10 w-[600px] h-[600px] bg-[#d4af37]/20 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* TITLE */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-4xl font-semibold text-blue-900 mb-20"
        >
          Trusted by ambitious businesses
        </motion.h2>

        {/* CARD */}
        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          className="relative"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              style={{ rotateX, rotateY }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.6 }}
              className="bg-white/70 backdrop-blur-xl border border-white/40 shadow-[0_20px_80px_rgba(0,0,0,0.15)] rounded-3xl p-10 md:p-14"
            >
              {/* IMAGE */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#f5d76e] blur-xl opacity-40 rounded-full" />
                  <Image
                    src={t.img}
                    alt={t.name}
                    width={100}
                    height={100}
                    className="rounded-full relative z-10 border border-amber-300/40"
                  />
                </div>
              </div>

              {/* QUOTE */}
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl mx-auto">
                <span className="text-3xl text-amber-500">“</span>
                {t.quote}
                <span className="text-3xl text-amber-500">”</span>
              </p>

              {/* AUTHOR */}
              <div className="mt-10">
                <p className="font-semibold text-blue-900">{t.name}</p>
                <p className="text-sm text-slate-500">{t.role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* PROGRESS BAR */}
          <div className="mt-10 h-[3px] bg-slate-200 rounded-full overflow-hidden">
            <motion.div
              key={active}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 6, ease: "linear" }}
              className="h-full bg-gradient-to-r from-[#d4af37] to-[#f5d76e]"
            />
          </div>
        </div>

        {/* INDICATORS */}
        <div className="flex justify-center gap-4 mt-10">
          {testimonials.map((_, i) => {
            const isActive = active === i;

            return (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={
                  "transition-all duration-300 rounded-full " +
                  (isActive
                    ? "w-10 h-2 bg-gradient-to-r from-[#d4af37] to-[#f5d76e]"
                    : "w-2 h-2 bg-slate-300 hover:bg-amber-400")
                }
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
