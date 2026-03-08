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
  tilt: number; // tilt for image
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

  // Auto rotate every 7 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % SLIDES.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const slide = SLIDES[currentSlide];

  return (
    <section className="relative w-full py-28 bg-gradient-to-b from-blue-50 via-white to-blue-50 overflow-hidden">
      {/* decorative glows */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/30 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-20 max-w-5xl mx-auto"
        >
          <div className="group bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <p className="text-sm font-medium text-blue-900/70">
              Years of Experience
            </p>
            <div className="h-px bg-blue-100 my-2 md:my-3" />
            <p className="text-2xl md:text-3xl font-semibold text-blue-950">
              <CountUp to={13} />+
            </p>
          </div>

          <div className="group bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <p className="text-sm font-medium text-blue-900/70">
              Clients Served
            </p>
            <div className="h-px bg-blue-100 my-2 md:my-3" />
            <p className="text-2xl md:text-3xl font-semibold text-blue-950">
              <CountUp to={103} />+
            </p>
          </div>

          <div className="group bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <p className="text-sm font-medium text-blue-900/70">
              Technologies Used
            </p>
            <div className="h-px bg-blue-100 my-2 md:my-3" />
            <p className="text-2xl md:text-3xl font-semibold text-blue-950">
              <CountUp to={57} />+
            </p>
          </div>

          <div className="group bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <p className="text-sm font-medium text-blue-900/70">
              Projects Delivered
            </p>
            <div className="h-px bg-blue-100 my-2 md:my-3" />
            <p className="text-2xl md:text-3xl font-semibold text-blue-950">
              <CountUp to={89} />+
            </p>
          </div>
        </motion.div>

        {/* ---------- CINEMATIC CAROUSEL ---------- */}
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
                transition={{ type: "spring", stiffness: 200 }}
                className={`relative rounded-3xl overflow-hidden shadow-[0_35px_80px_rgba(0,0,0,0.18)] rotate-[${slide.tilt}deg]`}
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
              <motion.div className="flex items-center gap-2 mb-4">
                {slide.icon}
                <span className="text-blue-900/80 font-medium">
                  {slide.subtitle}
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.8 }}
                className="text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold leading-tight bg-gradient-to-r from-blue-950 via-amber-700 to-yellow-500 bg-clip-text text-transparent"
              >
                {slide.title}
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.8 }}
                className="mt-4 text-blue-900/80 text-sm sm:text-base leading-relaxed max-w-[500px]"
              >
                {slide.paragraph}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.8 }}
                className="mt-6"
              >
                <FancyButton text={slide.ctaText} href={slide.ctaHref} />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ---------- COLLAPSIBLE INTERACTION ---------- */}
        <div className="mt-20 flex justify-center">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-blue-900 font-medium group animate-bounce cursor-pointer"
          >
            Discover Our Philosophy
            <ChevronDown
              className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              size={18}
            />
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mt-6 text-center text-blue-900/80 text-sm leading-relaxed"
          >
            We believe great technology should empower businesses to innovate,
            scale and compete globally. Our approach combines thoughtful
            engineering, clean design and long-term partnership with our clients
            — building platforms that are not just functional but future-ready.
          </motion.div>
        )}
      </div>
    </section>
  );
}
