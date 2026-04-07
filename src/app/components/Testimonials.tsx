"use client";

import { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  PanInfo,
} from "framer-motion";
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
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const update = () => setIsMobile(window.innerWidth < 1024);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* AUTOPLAY */
  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      setActive((p) => (p + 1) % testimonials.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [paused]);

  /* LIGHT SYSTEM */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 80, damping: 25 });
  const smoothY = useSpring(mouseY, { stiffness: 80, damping: 25 });

  const lightX = useTransform(smoothX, [-400, 400], ["20%", "80%"]);
  const lightY = useTransform(smoothY, [-400, 400], ["20%", "80%"]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isMobile) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  /* DRAG */
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    if (info.offset.x < -80 || info.velocity.x < -600) {
      setActive((p) => (p + 1) % testimonials.length);
    } else if (info.offset.x > 80 || info.velocity.x > 600) {
      setActive((p) => (p === 0 ? testimonials.length - 1 : p - 1));
    }
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMove}
      style={{ perspective: 1800 }}
      className="relative py-16 lg:py-20 flex items-center overflow-hidden bg-black"
    >
      {/* DYNAMIC LIGHT */}
      <motion.div
        style={{
          background: `radial-gradient(circle at ${lightX} ${lightY}, rgba(255,200,120,0.15), transparent 60%)`,
        }}
        className="absolute inset-0"
      />

      <div className="relative max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-10 w-full">
        {/* LEFT */}
        <div className="w-full lg:w-[220px] flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <p className="text-xs tracking-[0.4em] uppercase text-white/60">
            Testimonials
          </p>

          <div className="mt-4 w-28 h-[2px] bg-white/10 overflow-hidden">
            <motion.div
              key={active}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4.2, ease: "linear" }}
              className="h-full bg-amber-400"
            />
          </div>
        </div>

        {/* RIGHT */}
        {isMobile ? (
          <div
            className="flex-1 flex items-center justify-center"
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
          >
            <motion.div
              key={active}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              onDragEnd={handleDragEnd}
              whileTap={{ scale: 0.96 }}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="w-full max-w-[360px]"
            >
              <Card t={testimonials[active]} active />
            </motion.div>
          </div>
        ) : (
          <div className="relative flex-1 h-[420px] flex items-center justify-center">
            {testimonials.map((t, i) => {
              const offset = i - active;
              const isActive = i === active;

              return (
                <motion.div
                  key={i}
                  drag={isActive ? "x" : false}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={handleDragEnd}
                  animate={{
                    x: offset * 340,
                    scale: isActive ? 1 : 0.85,
                    opacity: isActive ? 1 : 0.4,
                    zIndex: isActive ? 20 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 140, damping: 18 }}
                  className="absolute w-[380px]"
                >
                  <Card t={t} active={isActive} />
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

/* 💎 CARD */
function Card({ t, active }: { t: Testimonial; active?: boolean }) {
  const ref = useRef<HTMLDivElement | null>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-100, 100], [10, -10]);
  const rotateY = useTransform(x, [-100, 100], [-10, 10]);

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;

    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      style={{
        rotateX: active ? rotateX : 0,
        rotateY: active ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      whileHover={{ scale: active ? 1.03 : 1 }}
      className={`
        relative
        rounded-[28px] p-7
        bg-white/[0.05]
        border border-white/10
        backdrop-blur-3xl
        shadow-[0_30px_100px_rgba(0,0,0,0.8)]
        overflow-hidden
        ${active ? "ring-1 ring-amber-400/30" : ""}
      `}
    >
      {/* REFLECTION SWEEP */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: "200%" }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent"
      />

      <div className="flex justify-center mb-5">
        <Image
          src={t.img}
          alt={t.name}
          width={64}
          height={64}
          className="rounded-full bg-white p-2"
        />
      </div>

      {/* QUOTE */}
      <p className="text-center text-white/80 text-sm leading-relaxed px-2">
        <span className="text-amber-400 text-lg">“ </span>
        {t.quote}
        <span className="text-amber-400 text-lg"> ”</span>
      </p>

      <div className="mt-5 text-center">
        <p className="text-amber-400">{t.name}</p>
        <p className="text-white/40 text-xs">{t.role}</p>
      </div>
    </motion.div>
  );
}
