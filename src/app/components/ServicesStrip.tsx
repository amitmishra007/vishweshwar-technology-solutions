"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Code2,
  Globe2,
  LayoutDashboard,
  Smartphone,
  ShoppingCart,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

/* =========================================================
   TYPES
========================================================= */

type Service = {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  number: string;
};

type ServiceCardProps = {
  service: Service;
  index: number;
  reducedMotion: boolean;
};

/* =========================================================
   DATA
========================================================= */

const services: Service[] = [
  {
    title: "Websites",
    description: "High-performance digital experiences built to convert.",
    href: "/services#website-development",
    icon: Globe2,
    number: "01",
  },
  {
    title: "Apps",
    description: "Native and cross-platform applications engineered to scale.",
    href: "/services#mobile-apps",
    icon: Smartphone,
    number: "02",
  },
  {
    title: "E-Commerce",
    description: "Commerce platforms designed for growth and frictionless sales.",
    href: "/services#ecommerce",
    icon: ShoppingCart,
    number: "03",
  },
  {
    title: "CMS",
    description: "Flexible content systems, dashboards and business platforms.",
    href: "/services#cms",
    icon: LayoutDashboard,
    number: "04",
  },
  {
    title: "APIs",
    description: "Reliable backend systems and integrations connecting everything.",
    href: "/services#api-development",
    icon: Code2,
    number: "05",
  },
];

/* =========================================================
   MOTION
========================================================= */

const sectionVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.08,
    },
  },
};

const contentVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 28,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: "easeOut",
    },
  },
};

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ServicesStripGodTier() {
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = prefersReducedMotion ?? false;

  return (
    <section
      aria-labelledby="services-strip-title"
      className="
        relative isolate w-full overflow-hidden
        bg-[#050a12]
        text-white
      "
    >
      {/* =====================================================
          ATMOSPHERIC BACKGROUND
      ===================================================== */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Deep background gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_45%,rgba(212,175,55,0.075),transparent_28%),radial-gradient(circle_at_82%_18%,rgba(39,91,145,0.14),transparent_32%),linear-gradient(135deg,#040810_0%,#081321_48%,#050a12_100%)]" />

        {/* Gold atmospheric light */}
        <motion.div
          initial={reducedMotion ? undefined : { opacity: 0, scale: 0.85 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="
            absolute
            -left-[14%]
            top-[20%]
            h-[420px]
            w-[420px]
            rounded-full
            bg-[#d4af37]/[0.055]
            blur-[100px]
          "
        />

        <motion.div
          initial={reducedMotion ? undefined : { opacity: 0, scale: 0.8 }}
          whileInView={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.15, ease: "easeOut" }}
          className="
            absolute
            -right-[12%]
            bottom-[5%]
            h-[500px]
            w-[500px]
            rounded-full
            bg-[#234e78]/[0.08]
            blur-[120px]
          "
        />

        {/* Vector technology pattern */}
        <TechnologyPattern reducedMotion={reducedMotion} />

        {/* Fine grain */}
        <div
          className="
            absolute inset-0
            opacity-[0.035]
            [background-image:radial-gradient(rgba(255,255,255,0.8)_0.5px,transparent_0.5px)]
            [background-size:5px_5px]
          "
        />

        {/* Top/bottom edge illumination */}
        <div className="absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/35 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <motion.div
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="
          relative z-10
          mx-auto
          w-full
          max-w-7xl
          px-5
          py-20
          sm:px-7
          sm:py-24
          lg:px-8
          lg:py-28
        "
      >
        {/* ===================================================
            INTRO
        =================================================== */}

        <motion.div
          variants={contentVariants}
          className="
            mb-12
            flex
            flex-col
            lg:mb-16
            lg:flex-row
            lg:items-end
            lg:justify-between
            lg:gap-16
          "
        >
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="relative flex h-7 w-7 items-center justify-center">
                <span className="absolute inset-0 rounded-full border border-[#d4af37]/35" />
                <span className="absolute h-2 w-2 rounded-full bg-[#d4af37] shadow-[0_0_14px_rgba(212,175,55,0.65)]" />
              </span>

              <span className="h-px w-8 bg-gradient-to-r from-[#d4af37]/70 to-transparent" />

              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-[#d4af37]/90 sm:text-[11px]">
                Digital Engineering
              </span>
            </div>

            <h2
              id="services-strip-title"
              className="
                brand-font
                max-w-3xl
                text-3xl
                font-semibold
                leading-[1.08]
                tracking-[-0.035em]
                text-white
                sm:text-4xl
                md:text-5xl
                lg:text-[3.45rem]
              "
            >
              We design &{" "}
              <span className="bg-gradient-to-r from-[#f5d78e] via-[#d4af37] to-[#9f7a1d] bg-clip-text text-transparent">
                develop
              </span>
              .
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55 sm:text-[15px]">
              From high-performance websites to scalable digital platforms,
              we turn ambitious ideas into technology built for the real world.
            </p>
          </div>

          {/* Desktop decorative statement */}
          <div className="mt-8 hidden max-w-xs lg:block">
            <div className="border-l border-white/10 pl-5">
              <div className="mb-2 flex items-center gap-2">
                <Sparkles className="h-3.5 w-3.5 text-[#d4af37]/80" />
                <span className="text-[10px] font-medium uppercase tracking-[0.22em] text-white/35">
                  Built to perform
                </span>
              </div>

              <p className="text-xs leading-6 text-white/35">
                Strategy, design, engineering and performance working as one
                system.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ===================================================
            SERVICES
        =================================================== */}

        <div className="relative">
          {/* Desktop grid */}
          <div className="hidden md:grid md:grid-cols-5">
            {services.map((service, index) => (
              <DesktopServiceCard
                key={service.title}
                service={service}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>

          {/* Mobile list */}
          <div className="flex flex-col md:hidden">
            {services.map((service, index) => (
              <MobileServiceCard
                key={service.title}
                service={service}
                index={index}
                reducedMotion={reducedMotion}
              />
            ))}
          </div>
        </div>

        {/* ===================================================
            FOOTER LINE
        =================================================== */}

        <motion.div
          variants={contentVariants}
          className="mt-12 flex items-center gap-4 sm:mt-14"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-[#d4af37]/30 via-white/10 to-transparent" />

          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-white/25">
            <span className="h-1 w-1 rounded-full bg-[#d4af37]/70" />
            Explore our capabilities
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* =========================================================
   DESKTOP SERVICE CARD
========================================================= */

function DesktopServiceCard({
  service,
  index,
  reducedMotion,
}: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={
        reducedMotion
          ? { opacity: 1 }
          : {
              opacity: 0,
              y: 35,
              filter: "blur(8px)",
            }
      }
      whileInView={
        reducedMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }
      }
      viewport={{ once: true, amount: 0.25 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      className="group relative"
    >
      <Link
        href={service.href}
        aria-label={`Explore ${service.title}`}
        className="
          relative
          flex
          min-h-[270px]
          flex-col
          overflow-hidden
          border-r
          border-white/[0.07]
          px-5
          py-6
          outline-none
          transition-colors
          duration-500
          first:border-l
          hover:bg-white/[0.025]
          focus-visible:bg-white/[0.035]
          focus-visible:ring-1
          focus-visible:ring-inset
          focus-visible:ring-[#d4af37]/50
        "
      >
        {/* Active vertical illumination */}
        <span
          aria-hidden="true"
          className="
            absolute
            bottom-0
            left-0
            top-0
            w-px
            origin-bottom
            scale-y-0
            bg-gradient-to-t
            from-[#d4af37]
            via-[#d4af37]/40
            to-transparent
            transition-transform
            duration-700
            ease-out
            group-hover:scale-y-100
          "
        />

        {/* Number */}
        <div className="flex items-start justify-between">
          <span className="font-mono text-[9px] tracking-[0.2em] text-white/20 transition-colors duration-500 group-hover:text-[#d4af37]/60">
            {service.number}
          </span>

          <ArrowUpRight
            aria-hidden="true"
            className="
              h-4
              w-4
              -translate-x-1
              translate-y-1
              text-white/20
              opacity-0
              transition-all
              duration-500
              group-hover:translate-x-0
              group-hover:translate-y-0
              group-hover:text-[#d4af37]
              group-hover:opacity-100
            "
          />
        </div>

        {/* Icon */}
        <div className="relative mt-10 flex h-14 w-14 items-center justify-center">
          {/* soft ambient glow */}
          <span
            aria-hidden="true"
            className="
              absolute
              h-8
              w-8
              rounded-full
              bg-[#d4af37]/10
              opacity-0
              blur-xl
              transition-opacity
              duration-700
              group-hover:opacity-100
            "
          />

          {/* polished capsule */}
          <span
            className="
              relative
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-[15px]
              border
              border-white/[0.11]
              bg-gradient-to-br
              from-white/[0.105]
              via-white/[0.045]
              to-transparent
              shadow-[inset_0_1px_0_rgba(255,255,255,0.10)]
              transition-all
              duration-500
              group-hover:-translate-y-1
              group-hover:border-[#d4af37]/35
              group-hover:from-[#d4af37]/15
            "
          >
            {/* glass highlight */}
            <span
              aria-hidden="true"
              className="
                absolute
                inset-[1px]
                rounded-[14px]
                bg-gradient-to-br
                from-white/[0.08]
                to-transparent
              "
            />

            <Icon
              aria-hidden="true"
              strokeWidth={1.55}
              className="
                relative
                z-10
                h-[21px]
                w-[21px]
                text-white/75
                transition-all
                duration-500
                group-hover:text-[#f5d78e]
              "
            />
          </span>
        </div>

        {/* Text */}
        <div className="mt-auto pt-7">
          <h3 className="brand-font text-[17px] font-medium tracking-[-0.02em] text-white/90 transition-colors duration-500 group-hover:text-white">
            {service.title}
          </h3>

          <p className="mt-2 max-w-[185px] text-[11px] leading-5 text-white/35 transition-colors duration-500 group-hover:text-white/50">
            {service.description}
          </p>
        </div>

        {/* Bottom progress line */}
        <span
          aria-hidden="true"
          className="
            absolute
            bottom-0
            left-0
            h-px
            w-0
            bg-gradient-to-r
            from-[#d4af37]
            to-transparent
            transition-all
            duration-700
            group-hover:w-full
          "
        />
      </Link>
    </motion.div>
  );
}

/* =========================================================
   MOBILE SERVICE CARD
========================================================= */

function MobileServiceCard({
  service,
  index,
  reducedMotion,
}: ServiceCardProps) {
  const Icon = service.icon;

  return (
    <motion.div
      initial={
        reducedMotion
          ? { opacity: 1 }
          : {
              opacity: 0,
              x: -22,
              filter: "blur(5px)",
            }
      }
      whileInView={
        reducedMotion
          ? { opacity: 1 }
          : {
              opacity: 1,
              x: 0,
              filter: "blur(0px)",
            }
      }
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.6,
        delay: index * 0.07,
        ease: "easeOut",
      }}
    >
      <Link
        href={service.href}
        className="
          group
          relative
          flex
          min-h-[92px]
          items-center
          gap-4
          overflow-hidden
          border-t
          border-white/[0.075]
          px-1
          py-5
          outline-none
          transition-colors
          duration-300
          active:bg-white/[0.035]
          focus-visible:bg-white/[0.035]
        "
      >
        {/* Left active rail */}
        <span
          aria-hidden="true"
          className="
            absolute
            bottom-3
            left-0
            top-3
            w-px
            bg-gradient-to-b
            from-transparent
            via-[#d4af37]/70
            to-transparent
            opacity-30
            transition-opacity
            duration-300
            group-active:opacity-100
          "
        />

        {/* Icon */}
        <span
          className="
            relative
            flex
            h-12
            w-12
            shrink-0
            items-center
            justify-center
            rounded-[14px]
            border
            border-white/[0.10]
            bg-gradient-to-br
            from-white/[0.09]
            to-white/[0.025]
            shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]
            transition-all
            duration-300
            group-active:scale-[0.96]
            group-active:border-[#d4af37]/35
          "
        >
          <span
            aria-hidden="true"
            className="absolute inset-[1px] rounded-[13px] bg-gradient-to-br from-white/[0.06] to-transparent"
          />

          <Icon
            aria-hidden="true"
            strokeWidth={1.55}
            className="
              relative
              z-10
              h-5
              w-5
              text-white/70
              transition-colors
              duration-300
              group-active:text-[#f5d78e]
            "
          />
        </span>

        {/* Content */}
        <span className="min-w-0 flex-1">
          <span className="flex items-center gap-2">
            <span className="brand-font text-[15px] font-medium tracking-[-0.01em] text-white/90">
              {service.title}
            </span>

            <span className="font-mono text-[8px] tracking-[0.18em] text-white/20">
              {service.number}
            </span>
          </span>

          <span className="mt-1 block max-w-[270px] text-[11px] leading-5 text-white/35">
            {service.description}
          </span>
        </span>

        {/* Arrow */}
        <span
          aria-hidden="true"
          className="
            flex
            h-8
            w-8
            shrink-0
            items-center
            justify-center
            rounded-full
            border
            border-white/[0.08]
            text-white/25
            transition-all
            duration-300
            group-active:border-[#d4af37]/35
            group-active:text-[#d4af37]
          "
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </span>
      </Link>
    </motion.div>
  );
}

/* =========================================================
   TECHNOLOGY VECTOR BACKGROUND
========================================================= */

function TechnologyPattern({
  reducedMotion,
}: {
  reducedMotion: boolean;
}) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 1200 650"
      preserveAspectRatio="none"
      className="
        absolute
        inset-0
        h-full
        w-full
        opacity-[0.42]
      "
    >
      <defs>
        <linearGradient id="vectorGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#d4af37" stopOpacity="0.0" />
          <stop offset="45%" stopColor="#d4af37" stopOpacity="0.38" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </linearGradient>

        <linearGradient id="vectorBlue" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6da8d8" stopOpacity="0" />
          <stop offset="50%" stopColor="#6da8d8" stopOpacity="0.20" />
          <stop offset="100%" stopColor="#6da8d8" stopOpacity="0" />
        </linearGradient>

        <radialGradient id="nodeGold">
          <stop offset="0%" stopColor="#f5d78e" stopOpacity="0.8" />
          <stop offset="35%" stopColor="#d4af37" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Large orbital geometry */}
      <motion.g
        initial={reducedMotion ? undefined : { rotate: -8, opacity: 0 }}
        whileInView={
          reducedMotion
            ? undefined
            : {
                rotate: 0,
                opacity: 1,
              }
        }
        viewport={{ once: true }}
        transition={{ duration: 1.8, ease: "easeOut" }}
        style={{ transformOrigin: "850px 300px" }}
      >
        <ellipse
          cx="850"
          cy="300"
          rx="390"
          ry="210"
          fill="none"
          stroke="url(#vectorGold)"
          strokeWidth="0.7"
        />

        <ellipse
          cx="850"
          cy="300"
          rx="310"
          ry="155"
          fill="none"
          stroke="url(#vectorBlue)"
          strokeWidth="0.7"
        />

        <ellipse
          cx="850"
          cy="300"
          rx="215"
          ry="105"
          fill="none"
          stroke="url(#vectorGold)"
          strokeWidth="0.55"
        />

        <ellipse
          cx="850"
          cy="300"
          rx="145"
          ry="68"
          fill="none"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="0.6"
        />
      </motion.g>

      {/* Left geometric network */}
      <g fill="none">
        <path
          d="M0 130 L160 90 L280 170 L390 85 L510 145"
          stroke="url(#vectorBlue)"
          strokeWidth="0.7"
        />

        <path
          d="M60 420 L190 335 L315 410 L430 315 L570 390"
          stroke="url(#vectorGold)"
          strokeWidth="0.65"
        />

        <path
          d="M190 335 L160 90"
          stroke="rgba(255,255,255,0.055)"
          strokeWidth="0.55"
        />

        <path
          d="M315 410 L280 170"
          stroke="rgba(255,255,255,0.045)"
          strokeWidth="0.55"
        />

        <path
          d="M430 315 L390 85"
          stroke="rgba(255,255,255,0.045)"
          strokeWidth="0.55"
        />
      </g>

      {/* Network nodes */}
      {[
        [160, 90],
        [280, 170],
        [390, 85],
        [510, 145],
        [190, 335],
        [315, 410],
        [430, 315],
        [570, 390],
        [850, 90],
        [1070, 205],
        [1010, 480],
        [700, 510],
      ].map(([cx, cy], index) => (
        <g key={`${cx}-${cy}`}>
          <circle
            cx={cx}
            cy={cy}
            r="12"
            fill="url(#nodeGold)"
            opacity={index % 3 === 0 ? 0.7 : 0.35}
          />

          <circle
            cx={cx}
            cy={cy}
            r="2"
            fill={index % 3 === 0 ? "#f5d78e" : "#6da8d8"}
            opacity="0.75"
          />
        </g>
      ))}

      {/* Right-side technical lines */}
      <g
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path
          d="M980 65 L1110 145 L1160 280 L1075 390 L1180 520"
          stroke="url(#vectorGold)"
          strokeWidth="0.7"
        />

        <path
          d="M720 510 L820 430 L940 455 L1010 480"
          stroke="url(#vectorBlue)"
          strokeWidth="0.65"
        />

        <path
          d="M940 455 L1075 390"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="0.55"
        />
      </g>

      {/* Moving orbital dots */}
      {!reducedMotion && (
        <>
          <motion.circle
            cx="850"
            cy="90"
            r="2.2"
            fill="#f5d78e"
            animate={{
              opacity: [0.15, 0.8, 0.15],
              scale: [0.7, 1.4, 0.7],
            }}
            transition={{
              duration: 3.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.circle
            cx="1070"
            cy="205"
            r="1.8"
            fill="#6da8d8"
            animate={{
              opacity: [0.15, 0.7, 0.15],
              scale: [0.7, 1.25, 0.7],
            }}
            transition={{
              duration: 4.6,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          <motion.circle
            cx="315"
            cy="410"
            r="1.8"
            fill="#f5d78e"
            animate={{
              opacity: [0.1, 0.65, 0.1],
              scale: [0.7, 1.3, 0.7],
            }}
            transition={{
              duration: 4.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.6,
            }}
          />
        </>
      )}
    </svg>
  );
}