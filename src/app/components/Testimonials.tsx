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
  const containerRef = useRef<HTMLDivElement | null>(null);

  /* 📐 RESPONSIVE */
  const [cardWidth, setCardWidth] = useState(280);
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if (w < 640) setCardWidth(220);
      else if (w < 1024) setCardWidth(260);
      else setCardWidth(320);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  /* 🧠 AUTOPLAY */
  useEffect(() => {
    if (paused) return;
    const interval: ReturnType<typeof setInterval> = setInterval(() => {
      setActive((p) => (p + 1) % testimonials.length);
    }, 4200);
    return () => clearInterval(interval);
  }, [paused]);

  /* 💡 LIGHT PHYSICS */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 });

  const lightX = useTransform(smoothX, [-400, 400], ["10%", "90%"]);
  const lightY = useTransform(smoothY, [-400, 400], ["10%", "90%"]);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  /* 🎯 DRAG */
  const handleDragEnd = (
    _: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo,
  ) => {
    const velocity = info.velocity.x;
    const offset = info.offset.x;

    if (offset < -80 || velocity < -700) {
      setActive((p) => (p + 1) % testimonials.length);
    } else if (offset > 80 || velocity > 700) {
      setActive((p) => (p === 0 ? testimonials.length - 1 : p - 1));
    }
  };

  /* 📐 DEPTH MODEL (NON-LINEAR) */
  const depth = (o: number) => {
    const abs = Math.abs(o);

    const falloff = Math.pow(abs, 1.3); // 🔥 non-linear

    return {
      scale: 1 - 0.22 * falloff,
      opacity: 1 - 0.7 * falloff,
      rotateY: o * -34,
      z: -220 * falloff,
      blur: 8 * falloff,
    };
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMove}
      style={{ perspective: 1600 }}
      className="h-screen relative py-32 text-white overflow-hidden
      bg-[radial-gradient(circle_at_50%_20%,rgba(120,70,20,0.25),transparent_60%),linear-gradient(to_bottom,#0b0b0b,#0a0a0a,#050505)]"
    >
      {/* AMBIENT */}
      <div className="absolute w-[1000px] h-[1000px] bg-amber-400/10 blur-[240px] rounded-full left-1/2 -translate-x-1/2 -top-40" />

      <div className="relative max-w-7xl mx-auto px-6 flex gap-16">
        {/* LEFT */}
        <div className="w-[260px]">
          <p className="text-xs tracking-[0.4em] uppercase">Testimonials</p>
          <div className="mt-4 w-40 h-[2px] bg-white/10 overflow-hidden">
            <motion.div
              key={active}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 4.2, ease: "linear" }}
              className="h-full bg-gradient-to-r from-[#d4af37] via-[#f5d76e] to-amber-400/70"
            />
          </div>
        </div>

        {/* RIGHT */}
        <div
          className="relative flex-1 h-[460px] flex items-center justify-center"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {testimonials.map((t, i) => {
            const offset = i - active;
            const isActive = i === active;
            const d = depth(offset);

            return (
              <motion.div
                key={i}
                drag={isActive ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={handleDragEnd}
                initial={{
                  scale: 0.5,
                  opacity: 0,
                  filter: "blur(14px)",
                }}
                animate={{
                  x: offset * cardWidth,
                  scale: d.scale,
                  opacity: d.opacity,
                  rotateY: d.rotateY,
                  z: d.z,
                  filter: `blur(${d.blur}px)`,
                  zIndex: isActive ? 30 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 160,
                  damping: 18,
                  mass: 1,
                }}
                className="absolute w-[320px] md:w-[420px] brand-font"
              >
                <motion.div
                  whileHover={{
                    rotateX: 4,
                    rotateY: -4,
                  }}
                  className="relative rounded-[30px] p-10
                  bg-[linear-gradient(135deg,rgba(255,255,255,0.09),rgba(255,255,255,0.02))]
                  backdrop-blur-3xl border border-white/10
                  shadow-[0_80px_200px_rgba(0,0,0,0.95)]
                  overflow-hidden"
                >
                  {/* LIGHT */}
                  <motion.div
                    style={{
                      background: `radial-gradient(circle at ${lightX} ${lightY}, rgba(255,255,255,0.25), transparent 65%)`,
                    }}
                    className="absolute inset-0"
                  />

                  {/* TEXTURE */}
                  <div
                    className="absolute inset-0 opacity-[0.05] mix-blend-overlay pointer-events-none
                  [background-image:url('https://grainy-gradients.vercel.app/noise.svg')]"
                  />

                  {/* GOLD QUOTES */}
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: isActive ? 1 : 0.6 }}
                    className="absolute text-[80px] text-amber-400/70 top-2 left-4"
                  >
                    “
                  </motion.span>

                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: isActive ? 1 : 0.6 }}
                    className="absolute text-[80px] text-amber-400/70 bottom-2 right-4"
                  >
                    ”
                  </motion.span>

                  {/* IMAGE */}
                  <div className="flex justify-center mb-6">
                    <Image
                      src={t.img}
                      alt={t.name}
                      width={70}
                      height={70}
                      className="rounded-full bg-white p-2"
                    />
                  </div>

                  {/* TEXT */}
                  <p className="text-center text-white/80 text-lg leading-relaxed px-4">
                    {t.quote}
                  </p>

                  {/* AUTHOR */}
                  <div className="mt-6 text-center">
                    <p>{t.name}</p>
                    <p className="text-white/40 text-sm">{t.role}</p>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
