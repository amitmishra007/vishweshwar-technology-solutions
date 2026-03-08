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
    hidden: {
      opacity: 0,
      y: 35,
    },
    visible: (i: number = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.75,
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
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative overflow-hidden pt-24 pb-10 text-white
      bg-gradient-to-br from-blue-950 via-blue-900 to-blue-800"
    >
      {/* Ambient lighting */}

      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-500/20 blur-[160px] rounded-full" />
      <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] bg-amber-400/20 blur-[160px] rounded-full" />

      {/* Top wave */}

      <svg
        className="absolute top-0 w-full h-20 -mt-10 text-blue-900"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
      >
        <path
          fill="currentColor"
          d="M0 22L120 16.7C240 11 480 1 720 1C960 1 1200 11 1320 16.7L1440 22V54H0Z"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14 relative z-10">
        {/* Logo Section */}

        <motion.div custom={1} variants={fadeUp} className="space-y-6">
          <div className="relative bg-white/95 px-3 py-2 rounded-md shadow-xl flex items-center justify-center perspective-[1200px]">
            <motion.div
              initial={{ scale: 1, rotateX: 0, rotateY: 0 }}
              whileHover={{
                scale: 1.4,
                rotateX: 8,
                rotateY: -8,
                transition: {
                  scale: {
                    duration: 6,
                    ease: easeCinematic,
                  },
                  rotateX: { duration: 0.6 },
                  rotateY: { duration: 0.6 },
                },
              }}
              transition={{
                duration: 0.25,
                ease: easeCinematic,
              }}
              className="will-change-transform"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Image
                src="/vishweshwar-industries-logo.png"
                alt="Vishweshwar Industries Logo"
                width={320}
                height={140}
                className="object-contain h-20 md:h-24 lg:h-28 w-auto"
                priority
              />
            </motion.div>
          </div>

          <div className="flex items-start gap-2">
            <Globe className="w-32 h-32 text-amber-300 mt-1" />

            <p className="text-sm text-white/75 leading-relaxed max-w-sm">
              We craft modern digital experiences that connect brands with their
              audience through scalable technology, thoughtful design and
              powerful engineering solutions.
            </p>
          </div>
        </motion.div>

        {/* Services */}

        <motion.div custom={2} variants={fadeUp}>
          <h3 className="font-semibold mb-6 text-amber-400 tracking-wide flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-amber-300" />
            Services
          </h3>

          <ul className="space-y-3 text-white/80">
            {links.map(({ name, link, icon: Icon }, i) => (
              <li key={i}>
                <Link
                  href={link}
                  className="flex items-center gap-2 relative group hover:text-amber-300 transition duration-300"
                >
                  <Icon className="w-4 h-4 opacity-80 group-hover:text-amber-300" />

                  {name}

                  <span className="absolute left-0 bottom-[-3px] w-0 h-[1px] bg-amber-300 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Resources */}

        <motion.div custom={3} variants={fadeUp}>
          <h3 className="font-semibold mb-6 text-amber-400 tracking-wide flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-amber-300" />
            Resources
          </h3>

          <ul className="space-y-3 text-white/80">
            {resources.map(([name, link], i) => (
              <li key={i}>
                <Link
                  href={link}
                  className="relative group hover:text-amber-300 transition duration-300"
                >
                  {name}

                  <span className="absolute left-0 bottom-[-3px] w-0 h-[1px] bg-amber-300 transition-all duration-300 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>

        {/* Map */}

        <motion.div custom={4} variants={fadeUp} className="space-y-5">
          <h3 className="font-semibold text-amber-400 tracking-wide flex items-center gap-2">
            <MapPin className="w-4 h-4 text-amber-300" />
            Our Location
          </h3>

          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ type: "spring", stiffness: 120 }}
            className="relative"
          >
            {/* glow */}

            <div className="absolute inset-0 bg-amber-400/25 blur-2xl opacity-0 hover:opacity-100 transition duration-500 rounded-xl" />

            <div className="relative w-full h-40 rounded-xl overflow-hidden shadow-2xl border border-white/20">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3516.5449093053794!2d76.80970407916509!3d28.190752641909008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDExJzI2LjciTiA3NsKwNDgnNTIuNSJF!5e0!3m2!1sen!2sin!4v1772390982236!5m2!1sen!2sin"
                width="100%"
                height="100%"
                className="border-0"
                allowFullScreen
                loading="lazy"
                title="Vishweshwar Industries Location"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Bar */}

      <motion.div
        custom={5}
        variants={fadeUp}
        className="mt-20 pt-6 border-t border-white/15 backdrop-blur-md
        flex flex-col md:flex-row items-center justify-between
        px-6 lg:px-8 text-sm text-white/70"
      >
        <p>© {currentYear} Vishweshwar Industries. All rights reserved.</p>

        <div className="flex items-center gap-5 mt-4 md:mt-0">
          {[
            { icon: Twitter, link: "https://twitter.com" },
            { icon: Instagram, link: "https://instagram.com" },
            { icon: Linkedin, link: "https://linkedin.com" },
          ].map(({ icon: Icon, link }, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.15, y: -3 }}
              transition={{ type: "spring", stiffness: 260, damping: 18 }}
            >
              <Link
                href={link}
                target="_blank"
                className="relative p-2 rounded-full bg-white/10 backdrop-blur
        border border-white/20 text-white
        hover:text-amber-300 hover:border-amber-300
        transition duration-300"
              >
                <Icon className="w-5 h-5" />

                {/* glow */}
                <span
                  className="absolute inset-0 rounded-full opacity-0
          group-hover:opacity-100 blur-md
          bg-amber-400/30 transition duration-500"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.footer>
  );
};
