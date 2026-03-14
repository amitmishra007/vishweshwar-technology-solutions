"use client";

import Image from "next/image";
import { motion, AnimatePresence, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState, JSX } from "react";
import {
  Sparkles,
  ChevronDown,
  Palette,
  TrendingUp,
  Smartphone,
} from "lucide-react";
import FancyButton from "./FancyButton";

interface Slide {
  image: string;
  tilt: number;
  title: string;
  subtitle: string;
  paragraph: string;
  ctaText: string;
  ctaHref: string;
  icon: JSX.Element;
}

const SLIDES: Slide[] = [
  {
    image: "/mini-responsive-collage.webp",
    tilt: -5,
    title: "Engineering Digital Platforms for the Future",
    subtitle: "12+ Years of Web Engineering Excellence",
    paragraph:
      "For over a decade we have been designing and building scalable digital platforms for businesses across industries...",
    ctaText: "Learn About Our Journey",
    ctaHref: "/about",
    icon: <Sparkles size={20} className="text-amber-600" />,
  },
  {
    image: "/mini-responsive-collage.webp",
    tilt: 5,
    title: "Innovating with Mobile Experiences",
    subtitle: "Top Mobile App Solutions",
    paragraph:
      "We build high-quality mobile applications with cross-platform capabilities, optimized for performance and user experience...",
    ctaText: "Explore Mobile Solutions",
    ctaHref: "/services/mobile-apps",
    icon: <Smartphone size={20} className="text-blue-600" />,
  },
  {
    image: "/mini-responsive-collage.webp",
    tilt: -8,
    title: "Creative Brand Identity",
    subtitle: "Design That Speaks",
    paragraph:
      "Our creative team helps brands stand out with unique logos, brand identities, marketing graphics, and packaging designs...",
    ctaText: "See Our Work",
    ctaHref: "/services/graphics",
    icon: <Palette size={20} className="text-amber-500" />,
  },
  {
    image: "/mini-responsive-collage.webp",
    tilt: 7,
    title: "Data-Driven Marketing & SEO",
    subtitle: "Grow Organically & Paid",
    paragraph:
      "We deliver marketing strategies powered by SEO, content, ads, and analytics to drive business growth and ROI...",
    ctaText: "Boost Your Marketing",
    ctaHref: "/services/marketing",
    icon: <TrendingUp size={20} className="text-green-600" />,
  },
];

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = Math.floor(value).toString();
        }
      },
    });

    return () => controls.stop();
  }, [isInView, to]);

  return <span ref={ref}>0</span>;
}

export default function AboutSection() {
  const [open, setOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  /** HYDRATION GUARD (prevents extension DOM mutation mismatch) */
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  /** Auto rotate carousel */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative w-full py-28 bg-gradient-to-b from-blue-50 via-white to-blue-50 overflow-hidden">
      {/* background glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/30 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* STATS */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 mb-20 max-w-5xl mx-auto"
        >
          {[
            { label: "Years of Experience", value: 13 },
            { label: "Clients Served", value: 103 },
            { label: "Technologies Used", value: 57 },
            { label: "Projects Delivered", value: 89 },
          ].map((stat, i) => (
            <div
              key={i}
              className="group relative bg-gradient-to-br from-slate-900 via-blue-950 to-black border border-white/10 rounded-2xl p-6 shadow-[0_20px_60px_rgba(0,0,0,0.45)] hover:shadow-[0_30px_80px_rgba(0,0,0,0.6)] transition-all duration-500 hover:-translate-y-1 text-center overflow-hidden"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-500 bg-gradient-to-r from-blue-500/10 via-transparent to-amber-500/10" />

              <p className="text-sm font-medium text-white/70">{stat.label}</p>

              <div className="h-px bg-white/10 my-3" />

              <p className="text-3xl font-semibold text-white tracking-tight">
                <CountUp to={stat.value} />+
              </p>
            </div>
          ))}
        </motion.div>

        {/* CAROUSEL */}
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, x: -60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 60 }}
              transition={{ duration: 1 }}
              className="relative flex justify-center md:justify-start"
            >
              <motion.div
                whileHover={{ scale: 1.04 }}
                animate={{ rotate: slide.tilt }}
                transition={{ type: "spring", stiffness: 200 }}
                className="relative rounded-3xl overflow-hidden shadow-[0_35px_80px_rgba(0,0,0,0.18)]"
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  width={620}
                  height={520}
                  className="object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/40 via-transparent to-amber-500/30" />
              </motion.div>
            </motion.div>
          </AnimatePresence>

          <AnimatePresence mode="wait">
            <motion.div
              key={`text-${currentSlide}`}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 1 }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              <div className="flex items-center gap-2 mb-4">
                {slide.icon}
                <span className="text-blue-900/80 font-medium">
                  {slide.subtitle}
                </span>
              </div>

              <h2 className="text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold leading-tight bg-gradient-to-r from-blue-950 via-amber-700 to-yellow-500 bg-clip-text text-transparent">
                {slide.title}
              </h2>

              <p className="mt-4 text-blue-900/80 text-sm sm:text-base leading-relaxed max-w-[500px]">
                {slide.paragraph}
              </p>

              <div className="mt-6">
                <FancyButton text={slide.ctaText} href={slide.ctaHref} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* COLLAPSIBLE */}
        <div className="mt-20 flex justify-center">
          <button
            suppressHydrationWarning
            onClick={() => setOpen((prev) => !prev)}
            className="flex items-center gap-2 text-blue-900 font-medium group animate-bounce cursor-pointer"
          >
            Discover Our Philosophy
            <ChevronDown
              size={18}
              className={`transition-transform duration-300 ${
                open ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="max-w-3xl mx-auto mt-6 text-center text-blue-900/80 text-sm leading-relaxed"
            >
              We believe great technology should empower businesses to innovate,
              scale and compete globally. Our approach combines thoughtful
              engineering, clean design and long-term partnership with our
              clients — building platforms that are not just functional but
              future-ready.
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
