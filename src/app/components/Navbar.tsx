"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [logoLoaded, setLogoLoaded] = useState(false);
  const spacing = 6;

  useEffect(() => {
    const timer = setTimeout(() => setLogoLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 z-50 w-full bg-transparent">
        <div className="flex pt-2 items-center justify-between">
          {/* Logo with responsive size and negative margin */}
          <motion.div
            initial={{ x: -160, opacity: 0 }}
            animate={logoLoaded ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="
    shrink-0
    -ml-4 sm:-ml-6 md:-ml-8
    mt-2 sm:mt-4 md:mt-6
    
    /* NEW, LARGER RESPONSIVE SIZES */
    h-32  w-40        /* mobile */
    sm:h- sm:w-56   /* tablet */
    md:h-32 md:w-64   /* small desktops */
    lg:h-36 lg:w-72   /* large desktops */
    xl:h-40 xl:w-80   /* big screens */

    relative
    drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)] 
  "
          >
            <Image
              src="/vishweshwar-industries-logo.png"
              alt="Gladiator Kennel"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          {/* Hamburger */}
          <button
            onClick={() => setOpen((prev) => !prev)}
            className="relative h-10 w-10 flex items-center justify-center mr-4 sm:mr-4 md:mr-6 bg-transparent border-0 p-0 focus:outline-none cursor-pointer hover:scale-105"
            aria-label="Menu"
          >
            <div className="absolute top-1/2 left-0 w-full -translate-y-1/2 bg-amber-50">
              {/* Top Line */}
              <motion.span
                animate={{ rotate: open ? 45 : 0, y: open ? 0 : -spacing }}
                className="absolute left-0 h-0.5 w-full rounded origin-center
                           bg-linear-to-r from-[#d4af37] to-[#b8860b]"
              />

              {/* Middle Line */}
              <motion.span
                animate={{ opacity: open ? 0 : 1 }}
                className="absolute left-0 top-1/2 h-0.5 w-full rounded origin-center -translate-y-1/2
                           bg-linear-to-r from-[#d4af37] to-[#b8860b]"
              />

              {/* Bottom Line */}
              <motion.span
                animate={{ rotate: open ? -45 : 0, y: open ? 0 : spacing }}
                className="absolute left-0 h-0.5 w-full rounded origin-center
                           bg-linear-to-r from-[#d4af37] to-[#b8860b]"
              />
            </div>
          </button>
        </div>
      </nav>

      {/* Menu Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: 200, y: -200, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 200, y: -200, scale: 0.9 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden w-full h-full bg-gradient-to-br from-white via-yellow-100 to-yellow-200"
          >
            {/* 🔥 Your Menu Content (stays on top) */}
            <p className="text-white text-3xl md:text-4xl font-semibold drop-shadow-lg relative z-50">
              Menu Coming Soon
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
