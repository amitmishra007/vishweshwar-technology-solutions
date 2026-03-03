"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Technologies", href: "/technologies" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact-us" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const spacing = 6;

  // Logo animation
  useEffect(() => {
    const timer = setTimeout(() => setLogoLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Scroll handling
  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);
      setShowNav(currentScroll < lastScroll || currentScroll < 50);
      setShowTopBtn(currentScroll > 300);
      setLastScroll(currentScroll);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  // Nav item stagger variants
  const navItemVariants: Variants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.08, type: "spring", stiffness: 120 },
    }),
  };

  return (
    <>
      {/* Navbar */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: showNav ? 0 : -200 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className={`fixed top-0 left-0 z-[999] w-full ${
          scrollY > 0
            ? "bg-gradient-to-br from-[#FCF5E5#FAF9F6] via-[#FAF9F6] to-transparent "
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-6 lg:px-12 py-2">
          {/* Logo more left */}
          <motion.div
            initial={{ x: -160, opacity: 0 }}
            animate={logoLoaded ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 relative -ml-6 sm:-ml-8 md:-ml-10 mt-2 sm:mt-4 md:mt-6 h-32 w-40 sm:h-28 sm:w-56 md:h-32 md:w-64 lg:h-36 lg:w-72 xl:h-40 xl:w-80"
          >
            <Image
              src="/vishweshwar-industries-logo.png"
              alt="Vishweshwar Industries Logo"
              fill
              className="object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
              priority
            />
          </motion.div>

          {/* Desktop Menu (lg+) */}
          <div className="hidden lg:flex flex-1 justify-end space-x-8">
            {NAV_ITEMS.map((item, idx) => (
              <motion.div
                key={item.href}
                custom={idx}
                initial="hidden"
                animate="visible"
                variants={navItemVariants}
              >
                <Link
                  href={item.href}
                  className="text-blue-900/80 font-semibold hover:text-red-400 hover:text-shadow-red-950 transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Hamburger (md/lg smaller) */}
          <div className="lg:hidden">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="relative h-10 w-10 flex items-center justify-center bg-transparent border-0 p-0 focus:outline-none cursor-pointer hover:scale-105"
              aria-label="Menu"
            >
              <div className="absolute top-1/2 left-0 w-full -translate-y-1/2">
                <motion.span
                  animate={{ rotate: open ? 45 : 0, y: open ? 0 : -spacing }}
                  className="absolute left-0 h-0.5 w-full rounded origin-center bg-linear-to-r from-[#d4af37] to-[#b8860b]"
                />
                <motion.span
                  animate={{ opacity: open ? 0 : 1 }}
                  className="absolute left-0 top-1/2 h-0.5 w-full rounded origin-center -translate-y-1/2 bg-linear-to-r from-[#d4af37] to-[#b8860b]"
                />
                <motion.span
                  animate={{ rotate: open ? -45 : 0, y: open ? 0 : spacing }}
                  className="absolute left-0 h-0.5 w-full rounded origin-center bg-linear-to-r from-[#d4af37] to-[#b8860b]"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile/Tablet Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[998] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center"
          >
            {NAV_ITEMS.map((item, idx) => (
              <motion.div
                key={item.href}
                custom={idx}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{
                  delay: idx * 0.08,
                  type: "spring",
                  stiffness: 120,
                }}
                className="my-4"
              >
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="text-2xl font-semibold text-blue-900/80 hover:text-red-400 hover:text-shadow-red-950  transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll To Top */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-950 via-amber-700 to-yellow-500 text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-[999]"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
