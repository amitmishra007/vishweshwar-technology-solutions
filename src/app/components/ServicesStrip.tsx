"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useScroll,
} from "framer-motion";
import {
  Globe,
  Smartphone,
  ShoppingCart,
  Settings,
  FileCode,
  Crown
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const services = [
  { icon: Globe, label: "Websites", accent: "#60A5FA" },
  { icon: Smartphone, label: "Apps", accent: "#A78BFA" },
  { icon: ShoppingCart, label: "E-Commerce", accent: "#D4AF37" },
  { icon: Settings, label: "CMS", accent: "#14B8A6" },
  { icon: FileCode, label: "APIs", accent: "#38BDF8" },
];

function CinematicText({
  text,
}: {
  text: string;
}) {
  const words = text.split(" ");

  return (
    <span className="relative z-10">
      {words.map((word, index) => (
        <span
          key={`${word}-${index}`}
          className="inline-block overflow-hidden align-bottom mr-[0.28em]"
        >
          <motion.span
            initial={{
              opacity: 0,
              y: "110%",
              rotateX: -35,
              filter: "blur(6px)",
            }}
            whileInView={{
              opacity: 1,
              y: "0%",
              rotateX: 0,
              filter: "blur(0px)",
            }}
            viewport={{
              once: true,
              amount: 0.6,
            }}
            transition={{
              delay: 0.6 + index * 0.055,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{
              transformOrigin: "bottom",
              transformPerspective: 600,
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function ServicesStripGodTier() {
  /* =========================================================
     GLOBAL CURSOR
  ========================================================= */

  const cursorX = useMotionValue(0.5);
  const cursorY = useMotionValue(0.5);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX / window.innerWidth);
      cursorY.set(e.clientY / window.innerHeight);
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, [cursorX, cursorY]);

  const glowX = useTransform(cursorX, [0, 1], ["0%", "100%"]);
  const glowY = useTransform(cursorY, [0, 1], ["0%", "100%"]);

  /* =========================================================
     PARALLAX
  ========================================================= */

  const { scrollY } = useScroll();

  const bgY = useTransform(scrollY, [0, 800], [0, -80]);
  const contentY = useTransform(scrollY, [0, 800], [0, -20]);

  /* =========================================================
     MOBILE / TOUCH ACTIVE CARD
  ========================================================= */

  const [activeCard, setActiveCard] = useState<number | null>(null);

  /* =========================================================
     CARD
  ========================================================= */

  function ServiceCard({
    service,
    index,
  }: {
    service: (typeof services)[number];
    index: number;
  }) {
    const Icon = service.icon;

    const cardRef = useRef<HTMLDivElement>(null);

    const [hovered, setHovered] = useState(false);
    const [pressed, setPressed] = useState(false);

    /* -----------------------------
       3D TILT
    ----------------------------- */

    const rotateX = useMotionValue(0);
    const rotateY = useMotionValue(0);

    const smoothRotateX = useSpring(rotateX, {
      stiffness: 180,
      damping: 18,
      mass: 0.6,
    });

    const smoothRotateY = useSpring(rotateY, {
      stiffness: 180,
      damping: 18,
      mass: 0.6,
    });

    /* -----------------------------
       MAGNETIC MOVEMENT
    ----------------------------- */

    const x = useSpring(useMotionValue(0), {
      stiffness: 160,
      damping: 18,
    });

    const y = useSpring(useMotionValue(0), {
      stiffness: 160,
      damping: 18,
    });

    const handlePointerMove = (
      e: React.PointerEvent<HTMLDivElement>,
    ) => {
      const card = cardRef.current;

      if (!card) return;

      const rect = card.getBoundingClientRect();

      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      const tiltY = (px - 0.5) * 20;
      const tiltX = (0.5 - py) * 20;

      rotateX.set(tiltX);
      rotateY.set(tiltY);

      x.set((px - 0.5) * 8);
      y.set((py - 0.5) * 8);
    };

    const resetPointer = () => {
      rotateX.set(0);
      rotateY.set(0);
      x.set(0);
      y.set(0);
    };

    /* -----------------------------
       TOUCH INTERACTION
    ----------------------------- */

    const handlePointerDown = (
      e: React.PointerEvent<HTMLDivElement>,
    ) => {
      if (e.pointerType === "touch") {
        setPressed(true);
        setActiveCard(index);
      }
    };

    const handlePointerUp = (
      e: React.PointerEvent<HTMLDivElement>,
    ) => {
      if (e.pointerType === "touch") {
        setPressed(false);
      }
    };

    const isActive =
      hovered || pressed || activeCard === index;

    return (
      <motion.div
        ref={cardRef}
        initial={{
          opacity: 0,
          y: 70,
          scale: 0.72,
          rotateX: 25,
          rotateY: index % 2 === 0 ? -12 : 12,
          filter: "blur(8px)",
        }}
        whileInView={{
          opacity: 1,
          y: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          filter: "blur(0px)",
        }}
        viewport={{
          once: true,
          amount: 0.35,
        }}
        transition={{
          delay: 0.45 + index * 0.12,
          duration: 0.9,
          type: "spring",
          stiffness: 110,
          damping: 15,
          mass: 0.8,
        }}
        style={{
          x,
          y,
          rotateX: smoothRotateX,
          rotateY: smoothRotateY,
          transformPerspective: 1000,
        }}
        onPointerMove={handlePointerMove}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => {
          setHovered(false);
          resetPointer();
          if (activeCard === index) {
            setActiveCard(null);
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        className="relative w-28 h-28 md:w-30 md:h-30 rounded-3xl cursor-pointer"
      >
        {/* =====================================================
            OUTER ENERGY
        ===================================================== */}

        <motion.div
          animate={{
            opacity: isActive ? 0.8 : 0,
            scale: isActive ? 1.12 : 0.85,
          }}
          transition={{ duration: 0.45 }}
          className="absolute -inset-5 rounded-[2rem] blur-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${service.accent}55, transparent 68%)`,
          }}
        />

        {/* =====================================================
            3D CARD BODY
        ===================================================== */}

        <motion.div
          animate={{
            scale: pressed ? 0.94 : isActive ? 1.035 : 1,
            y: pressed ? 2 : isActive ? -3 : 0,
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 18,
          }}
          className="absolute inset-0 rounded-3xl overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* BASE GLASS */}

          <div
            className="absolute inset-0 rounded-3xl
            bg-white/[0.045]
            backdrop-blur-2xl
            border border-white/10"
          />

          {/* INNER GLASS */}

          <div
            className="absolute inset-[1px] rounded-[23px]
            border border-white/[0.06]
            pointer-events-none"
          />

          {/* ===================================================
              MOVING LIGHT
          =================================================== */}

          <motion.div
            animate={{
              opacity: isActive ? 1 : 0,
            }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background: `radial-gradient(
                circle 90px at ${glowX} ${glowY},
                rgba(255,255,255,0.22),
                transparent 70%
              )`,
            }}
          />

          {/* ===================================================
              COLORED ENERGY
          =================================================== */}

          <motion.div
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 0.8,
            }}
            transition={{ duration: 0.5 }}
            className="absolute -inset-10 blur-2xl pointer-events-none"
            style={{
              background: `radial-gradient(
                circle,
                ${service.accent}30,
                transparent 68%
              )`,
            }}
          />

          {/* ===================================================
              GLASS SHEEN
          =================================================== */}

          <motion.div
            animate={{
              x: isActive ? ["-120%", "120%"] : "-120%",
              opacity: isActive ? [0, 0.35, 0] : 0,
            }}
            transition={{
              duration: 0.9,
              ease: "easeInOut",
            }}
            className="absolute top-0 bottom-0 w-1/3 -skew-x-12
            bg-gradient-to-r from-transparent via-white/30 to-transparent
            pointer-events-none"
          />

          {/* ===================================================
              TOP EDGE LIGHT
          =================================================== */}

          <motion.div
            animate={{
              opacity: isActive ? 1 : 0.35,
            }}
            className="absolute top-0 left-1/2 -translate-x-1/2
            w-16 h-px pointer-events-none"
            style={{
              background: `linear-gradient(
                to right,
                transparent,
                ${service.accent},
                transparent
              )`,
              boxShadow: `0 0 14px ${service.accent}`,
            }}
          />

          {/* ===================================================
              CONTENT
          =================================================== */}

          <div
            className="relative z-10 flex flex-col items-center justify-center
            h-full text-white"
            style={{
              transform: "translateZ(30px)",
            }}
          >
            {/* ICON PLATFORM */}

            <motion.div
              animate={{
                scale: isActive ? 1.18 : 1,
                y: isActive ? -3 : [0, -4, 0],
              }}
              transition={
                isActive
                  ? {
                      type: "spring",
                      stiffness: 260,
                      damping: 14,
                    }
                  : {
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
              className="relative mb-2"
            >
              {/* ICON GLOW */}

              <motion.div
                animate={{
                  opacity: isActive ? 0.9 : 0,
                  scale: isActive ? 1.5 : 0.8,
                }}
                className="absolute inset-0 blur-lg"
                style={{
                  background: service.accent,
                }}
              />

              {/* ICON */}

              <motion.div
                animate={
                  isActive
                    ? {
                        rotateY: [0, 360],
                        color: service.accent,
                      }
                    : {
                        rotateY: 0,
                        color: "rgba(255,255,255,0.8)",
                      }
                }
                transition={{
                  rotateY: {
                    duration: 0.8,
                    ease: "easeInOut",
                  },
                  color: {
                    duration: 0.25,
                  },
                }}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                <Icon className="relative w-7 h-7" strokeWidth={1.6} />
              </motion.div>
            </motion.div>

            {/* LABEL */}

            <motion.span
              animate={{
                y: isActive ? -1 : 0,
                color: isActive
                  ? "#ffffff"
                  : "rgba(255,255,255,0.7)",
              }}
              className="text-sm font-medium tracking-wide"
            >
              {service.label}
            </motion.span>

            {/* ACTIVE DOT */}

            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{
                width: isActive ? 22 : 0,
                opacity: isActive ? 1 : 0,
              }}
              className="mt-2 h-px"
              style={{
                background: service.accent,
                boxShadow: `0 0 10px ${service.accent}`,
              }}
            />
          </div>

          {/* ===================================================
              BOTTOM DEPTH
          =================================================== */}

          <motion.div
            animate={{
              opacity: isActive ? 0.8 : 0,
            }}
            className="absolute bottom-0 left-1/2
            -translate-x-1/2 w-2/3 h-8 blur-xl"
            style={{
              background: service.accent,
            }}
          />
        </motion.div>
      </motion.div>
    );
  }

  /* ===========================================================
     RETURN
  =========================================================== */

  return (
    <section className="relative w-full overflow-hidden py-24 md:py-28">
      {/* =======================================================
          BACKGROUND
      ======================================================= */}

      <motion.div
        style={{ y: bgY }}
        className="absolute inset-0
        bg-gradient-to-br from-blue-900 via-black to-blue-950"
      />

      {/* =======================================================
          GLOBAL GOLD LIGHT
      ======================================================= */}

      <motion.div
        style={{
          left: glowX,
          top: glowY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        className="absolute w-[600px] h-[600px]
        pointer-events-none
        bg-[radial-gradient(circle,rgba(212,175,55,0.18),transparent_70%)]
        blur-3xl"
      />

      {/* =======================================================
          GLOBAL BLUE LIGHT
      ======================================================= */}

      <motion.div
        style={{
          left: glowX,
          top: glowY,
          translateX: "-30%",
          translateY: "-30%",
        }}
        className="absolute w-[700px] h-[700px]
        pointer-events-none
        bg-[radial-gradient(circle,rgba(59,130,246,0.15),transparent_70%)]
        blur-3xl"
      />

      {/* =======================================================
          TOP ATMOSPHERIC LIGHT
      ======================================================= */}

      <div
        className="absolute top-0 left-1/2 -translate-x-1/2
        w-[900px] h-[400px]
        bg-[radial-gradient(circle,rgba(255,255,255,0.08),transparent_70%)]
        blur-3xl"
      />

      {/* =======================================================
          CONTENT
      ======================================================= */}

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 max-w-7xl mx-auto px-6
        flex flex-col md:flex-row
        items-center justify-between gap-16"
      >
        {/* =====================================================
            LEFT
        ===================================================== */}

        <motion.div
          initial={{
            opacity: 0,
            x: -50,
            filter: "blur(8px)",
          }}
          whileInView={{
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
          }}
          viewport={{
            once: true,
            amount: 0.4,
          }}
          transition={{
            duration: 1,
            type: "spring",
            stiffness: 80,
            damping: 18,
          }}
          className="text-center md:text-left"
        >
{/* LINE */}

{/* PREMIUM CROWN + ACCENT LINE */}

<motion.div
  initial={{ opacity: 0, y: 8 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{
    duration: 0.6,
    delay: 0.2,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="mb-4 flex items-center justify-center md:justify-start gap-3"
>
  {/* CROWN */}
  <div className="relative flex items-center justify-center shrink-0">
    <motion.div
      animate={{
        opacity: [0.25, 0.55, 0.25],
        scale: [0.9, 1.08, 0.9],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className="absolute w-8 h-8 rounded-full bg-amber-400/15 blur-lg"
    />

    <Crown
      className="relative w-5 h-5 text-amber-300"
      strokeWidth={1.5}
    />
  </div>

  {/* LINE TO THE RIGHT */}
  <motion.div
    initial={{ width: 0, opacity: 0 }}
    whileInView={{ width: 60, opacity: 1 }}
    viewport={{ once: true }}
    transition={{
      duration: 0.8,
      delay: 0.35,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      h-[2px]
      bg-gradient-to-r
      from-amber-300
      via-violet-400
      to-transparent
      shadow-[0_0_12px_rgba(129,140,248,0.25)]
    "
  />
</motion.div>

{/* HEADING */}

<motion.h2
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{
    delay: 0.3,
    duration: 0.7,
  }}
  className="text-3xl md:text-5xl
  font-semibold text-amber-100
  leading-tight"
>
  We design & develop
</motion.h2>

          {/* DESCRIPTION */}

<motion.div
  initial={{
    opacity: 0,
    y: 20,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
  }}
  viewport={{
    once: true,
    amount: 0.5,
  }}
  transition={{
    duration: 0.8,
    delay: 0.5,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="
    relative
    mt-6
    max-w-md
    overflow-hidden
    px-5
    py-4
    md:px-6
    md:py-5
    border-l
    border-white/15
    bg-white/[0.025]
    backdrop-blur-md
  "
>
  {/* Accent edge */}
  <div
    className="
      absolute
      left-0
      top-0
      h-full
      w-[3px]
      bg-gradient-to-b
      from-blue-400
      via-blue-800
      to-amber-400
    "
  />

  {/* Top border */}
  <motion.div
    initial={{
      scaleX: 0,
      opacity: 0,
    }}
    whileInView={{
      scaleX: 1,
      opacity: 1,
    }}
    viewport={{
      once: true,
    }}
    transition={{
      delay: 0.55,
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
    }}
    className="
      absolute
      top-0
      left-0
      h-px
      w-full
      origin-left
      bg-gradient-to-r
      from-white/25
      via-white/10
      to-transparent
    "
  />

  {/* Bottom subtle line */}
  <div
    className="
      absolute
      bottom-0
      left-6
      right-0
      h-px
      bg-gradient-to-r
      from-white/10
      to-transparent
    "
  />

  {/* Ambient background */}
  <div
    className="
      absolute
      inset-0
      pointer-events-none
      bg-[linear-gradient(110deg,rgba(255,255,255,0.045),transparent_45%,rgba(212,175,55,0.025))]
    "
  />

  <p
    className="
      relative
      z-10
      text-white/60
      text-sm
      md:text-base
      leading-relaxed
      tracking-[0.01em]
    "
  >
    <CinematicText
      text="High-performance digital systems engineered with precision, scalability and cinematic UI experiences."
    />
  </p>
</motion.div>
        </motion.div>

{/* =====================================================
    SERVICE GRID
===================================================== */}

<div
  className="
    relative
    grid
    grid-cols-2
    md:grid-cols-6
    gap-6
    md:gap-7
    items-center
    justify-items-center
  "
  style={{
    perspective: "1400px",
  }}
>
  {services.map((service, index) => {
    /*
      Desktop layout:

      1 → columns 1-2
      2 → columns 3-4
      3 → columns 5-6

      4 → columns 2-3
      5 → columns 4-5
    */

    const desktopPlacement =
      index === 0
        ? "md:col-start-1"
        : index === 1
          ? "md:col-start-3"
          : index === 2
            ? "md:col-start-5"
            : index === 3
              ? "md:col-start-2"
              : "md:col-start-4";

    return (
      <div
        key={service.label}
        className={`
          col-span-1
          md:col-span-2
          ${desktopPlacement}
        `}
      >
        <ServiceCard
          service={service}
          index={index}
        />
      </div>
    );
  })}
</div>
      </motion.div>

      {/* =======================================================
          CINEMATIC BOTTOM
      ======================================================= */}

      <div
        className="absolute bottom-0 left-0
        w-full h-40 pointer-events-none"
      >
        {/* DARK FADE */}

        <div
          className="absolute inset-0
          bg-gradient-to-t
          from-black
          via-black/70
          to-transparent"
        />

        {/* GRID */}

        <div
          className="absolute inset-0 opacity-[0.06]
          [background-image:linear-gradient(to_right,#ffffff22_1px,transparent_1px),linear-gradient(to_bottom,#ffffff22_1px,transparent_1px)]
          [background-size:40px_40px]"
        />

        {/* HORIZON LIGHT */}

        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 1.4,
            delay: 0.5,
            ease: "easeOut",
          }}
          className="absolute top-0 left-1/2
          -translate-x-1/2
          w-[60%] h-px
          bg-gradient-to-r
          from-transparent
          via-white/40
          to-transparent"
        />
      </div>
    </section>
  );
}
