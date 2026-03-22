"use client";

import { motion, Variants } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
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

  const easeCinematic: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.12,
        duration: 0.7,
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
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-blue-900 text-white">
      {/* BACKGROUND GLOW */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-500/20 blur-[160px] rounded-full" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-amber-400/20 blur-[160px] rounded-full" />

      {/* GRID PATTERN */}
      <div
        className="absolute inset-0 opacity-[0.04] 
      [background-image:linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] 
      [background-size:40px_40px]"
      />

      {/* ---------------- FULL WIDTH MAP ---------------- */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeUp}
        className="relative w-full h-[220px] md:h-[260px] lg:h-[300px]"
      >
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3516.5449093053794!2d76.80970407916509!3d28.190752641909008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDExJzI2LjciTiA3NsKwNDgnNTIuNSJF!5e0!3m2!1sen!2sin!4v1772390982236!5m2!1sen!2sin"
          className="w-full h-full border-0 grayscale-[0.2] contrast-125 brightness-90"
          loading="lazy"
        />

        {/* overlay tint */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950 via-blue-950/60 to-transparent" />
      </motion.div>

      {/* ---------------- MAIN CONTENT ---------------- */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* LOGO + ABOUT */}
        <motion.div variants={fadeUp} custom={1} className="space-y-6">
          <div className="bg-white/95 px-3 py-2 rounded-md shadow-xl inline-block">
            <Image
              src="/vishweshwar-industries-logo.png"
              alt="Logo"
              width={260}
              height={120}
              className="object-contain h-16 md:h-20 w-auto"
            />
          </div>

          <div className="flex items-start gap-3">
            <Globe className="w-6 h-6 text-amber-300 mt-1 shrink-0" />
            <p className="text-sm text-white/70 leading-relaxed">
              We craft modern digital experiences that connect brands with their
              audience through scalable technology and powerful engineering.
            </p>
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
                  className="flex items-center gap-2 text-white/70 hover:text-amber-300 transition duration-300"
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
                  className="text-white/70 hover:text-amber-300 transition duration-300"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* LOCATION INFO (replacing small map) */}
        <motion.div variants={fadeUp} custom={4} className="space-y-4">
          <h3 className="font-semibold text-amber-400 flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            Our Location
          </h3>{" "}
          <p className="text-white/70 text-sm leading-relaxed">
            Visit our office for collaboration, consultation, or just a quick
            discussion about your next big idea.
          </p>
          <p className="text-amber-400/70 text-sm leading-relaxed">
            Konarks Oasis, Alwar Bypass Road
          </p>{" "}
          <p className="text-amber-400/70 text-sm leading-relaxed">
            Bhiwadi, Rajasthan, 301019
          </p>
          <Link
            href="https://maps.google.com"
            target="_blank"
            className="inline-block text-sm text-amber-300 hover:underline"
          >
            Open in Google Maps <span className="animate-pulse">→</span>
          </Link>
        </motion.div>
      </div>

      {/* ---------------- BOTTOM BAR ---------------- */}
      <motion.div
        variants={fadeUp}
        custom={5}
        className="relative z-10 border-t border-white/10 py-6 px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between"
      >
        <p className="text-sm text-white/60">
          © {currentYear} Vishweshwar Industries. All rights reserved.
        </p>

        <div className="flex gap-4 mt-4 md:mt-0">
          {[Twitter, Instagram, Linkedin].map((Icon, i) => (
            <Link
              key={i}
              href="#"
              className="p-2 rounded-full bg-white/10 border border-white/20 hover:border-amber-300 hover:text-amber-300 transition"
            >
              <Icon className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </motion.div>
    </footer>
  );
};
