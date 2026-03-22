"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useTransform, PanInfo } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  img: string;
  quote: string;
  name: string;
  role: string;
}

const testimonials: Readonly<Testimonial[]> = [
  {
    img: "/logo3.png",
    quote:
      "Working with Vishweshwar Industries transformed our digital presence completely.",
    name: "Jaswant Singh",
    role: "Atom Learning Center",
  },
  {
    img: "/logo4.png",
    quote:
      "Amit Mishra and his team delivered a brand identity that feels refined and powerful.",
    name: "Kirti Kapoor",
    role: "Paradigm Spaces",
  },
  {
    img: "/iOS-and-Android-development.png",
    quote:
      "Their branding strategy gave us a strong and professional identity.",
    name: "Imran Khan",
    role: "ECR Builders",
  },
  {
    img: "/logo3.png",
    quote:
      "Working with Vishweshwar Industries transformed our digital presence completely.",
    name: "Jaswant Singh",
    role: "Atom Learning Center",
  },
  {
    img: "/logo4.png",
    quote:
      "Amit Mishra and his team delivered a brand identity that feels refined and powerful.",
    name: "Kirti Kapoor",
    role: "Paradigm Spaces",
  },
  {
    img: "/iOS-and-Android-development.png",
    quote:
      "Their branding strategy gave us a strong and professional identity.",
    name: "Imran Khan",
    role: "ECR Builders",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  // ✅ NEW: window width state for SSR-safe usage
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /* AUTO PLAY */
  useEffect(() => {
    if (paused) return;
    const i = setInterval(() => {
      setActive((p) => (p + 1) % testimonials.length);
    }, 3500);
    return () => clearInterval(i);
  }, [paused]);

  /* MOUSE LIGHT */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const lightX = useTransform(mouseX, [-300, 300], ["20%", "80%"]);
  const lightY = useTransform(mouseY, [-300, 300], ["20%", "80%"]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  /* DRAG */
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x < -80) {
      setActive((p) => (p + 1) % testimonials.length);
    } else if (info.offset.x > 80) {
      setActive((p) => (p === 0 ? testimonials.length - 1 : p - 1));
    }
  };

  return (
    <section
      onMouseMove={handleMove}
      className="relative py-32 text-white overflow-hidden
  bg-[radial-gradient(circle_at_50%_20%,rgba(120,70,20,0.25),transparent_60%),linear-gradient(to_bottom,#0b0b0b,#0a0a0a,#050505)]"
    >
      {/* 🌌 AMBIENT LIGHT */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-amber-400/10 blur-[220px] rounded-full" />

      {/* GRID */}
      <div
        className="absolute inset-0 opacity-[0.03] 
      [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] 
      [background-size:60px_60px]"
      />

      <div className="relative max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* 🧾 LEFT SIDE (TITLE) */}
        <div className="relative z-20 w-full lg:w-[260px] flex-shrink-0">
          <p className="text-xs tracking-[0.4em] text-white uppercase">
            Testimonials
          </p>

          {/* PROGRESS UNDERLINE */}
          <div className="relative mt-4 w-40 h-[2px] bg-white/10 overflow-hidden rounded-full">
            <motion.div
              key={active}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full bg-amber-400"
            />
          </div>
        </div>

        {/* 🎴 RIGHT SIDE (CARDS) */}
        <div
          className="relative w-full lg:flex-1 h-[380px] sm:h-[420px] md:h-[460px] flex justify-center items-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {testimonials.map((t, i) => {
            const offset = i - active;
            const isActive = i === active;

            return (
              <motion.div
                key={i}
                drag={isActive}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                animate={{
                  // ✅ Use safe windowWidth
                  x: offset * (windowWidth < 640 ? 220 : 260),
                  scale: isActive ? 1 : 0.85,
                  opacity: isActive ? 1 : 0.3,
                  zIndex: isActive ? 10 : 1,
                  filter: isActive ? "blur(0px)" : "blur(3px)",
                }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 18,
                }}
                className="absolute w-[260px] sm:w-[300px] md:w-[360px] lg:w-[420px]"
              >
                <div
                  className="relative rounded-3xl p-6 sm:p-8 md:p-10 
          bg-white/5 backdrop-blur-2xl border border-white/10 
          shadow-[0_40px_120px_rgba(0,0,0,0.7)] overflow-hidden"
                >
                  {/* LIGHT */}
                  <motion.div
                    style={{
                      background: `radial-gradient(circle at ${lightX} ${lightY}, rgba(255,255,255,0.18), transparent 60%)`,
                    }}
                    className="absolute inset-0 pointer-events-none"
                  />

                  {/* IMAGE */}
                  <div className="flex justify-center mb-5">
                    <Image
                      src={t.img}
                      alt={t.name}
                      width={60}
                      height={60}
                      className="rounded-full bg-white p-2 object-contain"
                    />
                  </div>

                  {/* TEXT */}
                  <p className="text-white/80 text-sm sm:text-base md:text-lg text-center leading-relaxed">
                    “{t.quote}”
                  </p>

                  {/* AUTHOR */}
                  <div className="mt-5 text-center">
                    <p className="font-medium text-sm sm:text-base">{t.name}</p>
                    <p className="text-xs sm:text-sm text-white/50">{t.role}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
