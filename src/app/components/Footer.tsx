"use client";

import { motion, Variants, useMotionValue, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import {
  Twitter,
  Instagram,
  Linkedin,
  MapPin,
  Briefcase,
  BookOpen,
  Globe,
  Palette,
  TrendingUp,
  Laptop,
  MessageCircle,
} from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const easeCinematic: [number, number, number, number] = [0.22, 1, 0.36, 1];

  /* ---------------- MOUSE LIGHT INTERACTION ---------------- */
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    let rafId: number;

    const move = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      });
    };

    window.addEventListener("mousemove", move, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", move);
    };
  }, [mouseX, mouseY]);

  const glowX = useTransform(mouseX, [0, 1920], ["0%", "100%"]);
  const glowY = useTransform(mouseY, [0, 1080], ["0%", "100%"]);

  /* ---------------- ANIMATION ---------------- */
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.8,
        ease: easeCinematic,
      },
    }),
  };

  const links = [
    { name: "Web Development", link: "/web-development", icon: Laptop },
    { name: "SEO & Marketing", link: "/seo", icon: TrendingUp },
    { name: "Design & UX", link: "/design", icon: Palette },
    { name: "Consulting", link: "/consulting", icon: MessageCircle },
  ];

  const resources = [
    ["Blog", "/blog"],
    ["FAQs", "/faqs"],
    ["Portfolio", "/portfolio"],
    ["Contact", "/contact-us"],
  ];

  return (
    <footer className="relative overflow-hidden bg-[#030712] text-white">
      {/* ---------------- LIQUID GLASS BASE ---------------- */}
      <div className="absolute inset-0 backdrop-blur-[120px]" />

      {/* ---------------- DYNAMIC LIGHT ---------------- */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: `radial-gradient(circle at ${glowX} ${glowY}, rgba(255,255,255,0.12), transparent 40%)`,
        }}
      />

      {/* ---------------- 3D WAVE LAYERS ---------------- */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -40, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[200%] h-[200%] opacity-20"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, #3b82f6, transparent 60%)",
            filter: "blur(120px)",
          }}
        />
        <motion.div
          animate={{ y: [0, 50, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute w-[200%] h-[200%] opacity-20"
          style={{
            background:
              "radial-gradient(circle at 70% 60%, #f59e0b, transparent 60%)",
            filter: "blur(140px)",
          }}
        />
      </div>

      {/* GRID */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* ---------------- MAP ---------------- */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="relative w-full h-[240px] md:h-[280px] lg:h-[320px]"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3516.5449093053794!2d76.80970407916509!3d28.190752641909008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDExJzI2LjciTiA3NsKwNDgnNTIuNSJF!5e0!3m2!1sen!2sin!4v1772390982236!5m2!1sen!2sin"
          className="w-full h-full border-0 grayscale contrast-125 brightness-75"
          loading="lazy"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/70 to-transparent" />
      </motion.div>

      {/* ---------------- CONTENT ---------------- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* LOGO */}
        <motion.div variants={fadeUp} custom={1} className="relative group">
          {/* 🔮 GLASS CONTAINER */}
          <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-white/20 via-white/5 to-transparent">
            {/* INNER GLASS */}
            <div className="relative rounded-2xl bg-white/[0.04] backdrop-blur-2xl border border-white/10 p-6 md:p-7 overflow-hidden">
              {/* 🌊 SUBTLE LIGHT SWEEP */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700">
                <div className="absolute -inset-[200%] bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.08),transparent)] rotate-12 animate-[shine_6s_linear_infinite]" />
              </div>

              {/* 💡 AMBIENT GLOW */}
              <div className="absolute -top-20 -left-20 w-40 h-40 bg-blue-500/20 blur-3xl rounded-full" />
              <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-amber-400/20 blur-3xl rounded-full" />

              {/* ---------------- CONTENT ---------------- */}
              <div className="relative z-10 space-y-6">
                {/* 🏆 LOGO + BRAND */}
                <div className="flex items-center gap-4">
                  <div className="bg-white/90 backdrop-blur-xl px-3 py-2 rounded-lg shadow-xl">
                    <Image
                      src="/vishweshwar-industries-logo.png"
                      alt="Logo"
                      width={240}
                      height={100}
                      className="object-contain h-14 md:h-16 w-auto"
                    />
                  </div>

                  {/* BRAND TEXT (optional but premium) */}
                  <div className="leading-tight">
                    <div className="p-2 rounded-md bg-white/5 border border-white/10 backdrop-blur-md">
                      <Globe className="w-5 h-5 text-amber-300" />
                      <p className="text-white font-semibold tracking-wide">
                        Vishweshwar
                      </p>
                      <p className="text-xs text-white/40 tracking-[0.25em] uppercase">
                        Industries
                      </p>
                    </div>
                  </div>
                </div>

                {/* ✨ DIVIDER */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                {/* 🌍 DESCRIPTION */}
                <div className="flex items-start gap-4">
                  <p className="text-sm text-white/70 leading-relaxed">
                    We craft modern digital experiences that connect brands with
                    their audience through scalable technology and powerful
                    engineering.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* SERVICES */}
        <motion.div variants={fadeUp} custom={2}>
          <h3 className="font-semibold mb-5 text-amber-400 flex items-center gap-2">
            <Briefcase className="w-4 h-4" />
            Services
          </h3>

          <ul className="space-y-3">
            {links.map(({ name, link, icon: Icon }, i) => (
              <li key={i}>
                <Link
                  href={link}
                  className="flex items-center gap-2 text-white/70 hover:text-amber-300 transition duration-300 hover:translate-x-1"
                >
                  <Icon className="w-4 h-4" />
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* RESOURCES */}
        <motion.div variants={fadeUp} custom={3}>
          <h3 className="font-semibold mb-5 text-amber-400 flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            Resources
          </h3>

          <ul className="space-y-3">
            {resources.map(([name, link], i) => (
              <li key={i}>
                <Link
                  href={link}
                  className="text-white/70 hover:text-amber-300 transition duration-300 hover:translate-x-1"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* LOCATION */}
        <motion.div variants={fadeUp} custom={4} className="space-y-4">
          <h3 className="font-semibold text-amber-400 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Our Location
          </h3>

          <p className="text-white/70 text-sm leading-relaxed">
            Visit our office for collaboration, consultation, or just a quick
            discussion about your next big idea.
          </p>

          <p className="text-amber-400/70 text-sm">
            Konarks Oasis, Alwar Bypass Road
          </p>
          <p className="text-amber-400/70 text-sm">
            Bhiwadi, Rajasthan, 301019
          </p>

          <Link
            href="https://maps.google.com"
            target="_blank"
            className="inline-block text-sm text-amber-300 hover:underline"
          >
            Open in Google Maps →
          </Link>
        </motion.div>
      </div>

      {/* ---------------- BOTTOM BAR (UNCHANGED STRUCTURE) ---------------- */}
      <motion.div
        variants={fadeUp}
        custom={5}
        className="relative z-10 border-t border-white/10 py-6 px-9 lg:px-8 flex flex-col md:flex-row items-center justify-between"
      >
        <p className="text-sm text-white/60">
          © {currentYear} Vishweshwar Industries. All rights reserved.
        </p>

        <div className="flex gap-4 mt-4 md:mt-0">
          {[Twitter, Instagram, Linkedin].map((Icon, i) => (
            <Link
              key={i}
              href="#"
              className="p-2 rounded-full bg-white/10 border border-white/20 hover:border-amber-300 hover:text-amber-300 transition backdrop-blur-xl"
            >
              <Icon className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </motion.div>
    </footer>
  );
};
