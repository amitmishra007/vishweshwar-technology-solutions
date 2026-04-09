"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
  Globe,
  Smartphone,
  Palette,
  TrendingUp,
  ArrowLeft,
  Linkedin,
  Instagram,
  Twitter,
  LucideIcon,
} from "lucide-react";
import FancyButton from "./FancyButton";
import dynamic from "next/dynamic";

const CallButton = dynamic(() => import("./CallButton"), {
  ssr: false,
});

/* ----------------------------- NAV ITEMS ----------------------------- */
const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Technologies", href: "/technologies" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

/* --------------------------- SERVICES MENU -------------------------- */
const SERVICE_MENU = {
  "Web Development": [
    { title: "Website Design & Development", id: "website-development" },
    { title: "Progressive Web Applications", id: "pwa" },
    { title: "ERPs / CRMs / CMS / Dashboards", id: "custom-systems" },
    { title: "Enterprise Systems", id: "enterprise-systems" },
  ],
  "Mobile App Development": [
    { title: "iOS & Android Apps", id: "mobile-apps" },
    { title: "Cross Platform Apps", id: "cross-platform" },
    { title: "Enterprise Mobile Systems", id: "enterprise-mobile" },
    { title: "App UI / UX Design", id: "app-uiux" },
  ],
  "Graphics & Brand Identity": [
    { title: "Logo Design", id: "logo-design" },
    { title: "Brand Identity Systems", id: "brand-identity" },
    { title: "Marketing Graphics", id: "marketing-graphics" },
    { title: "Packaging & Print Design", id: "packaging" },
  ],
  "Marketing & SEO": [
    { title: "SEO & Organic Growth", id: "seo" },
    { title: "Google & Meta Ads", id: "paid-advertising" },
    { title: "Content & Social Marketing", id: "content-marketing" },
    { title: "Analytics & CRO", id: "analytics" },
  ],
} as const;

type ServiceCategory = keyof typeof SERVICE_MENU;

const SERVICE_ICONS: Record<ServiceCategory, LucideIcon> = {
  "Web Development": Globe,
  "Mobile App Development": Smartphone,
  "Graphics & Brand Identity": Palette,
  "Marketing & SEO": TrendingUp,
};

/* --------------------------- NAVBAR COMPONENT ------------------------ */
export default function Navbar({ hide = false }: { hide?: boolean }) {
  const pathname = usePathname();
  /* ----------------------------- STATES ----------------------------- */
  const [desktopCategory, setDesktopCategory] =
    useState<ServiceCategory | null>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const [megaTimeout, setMegaTimeout] = useState<NodeJS.Timeout | null>(null);

  const [open, setOpen] = useState(false); // mobile hamburger
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | null>(
    null,
  );

  const [logoLoaded, setLogoLoaded] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);

  const spacing = 6;

  const fadeUp = (duration = 0.3): Variants => ({
    hidden: { opacity: 0, y: 12 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration, type: "spring", stiffness: 120 },
    },
  });

  /* --------------------------- LOGO ANIMATION ------------------------ */
  useEffect(() => {
    const timer = setTimeout(() => setLogoLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  /* ---------------------------- SCROLL DETECTION -------------------- */

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;

          setScrollY(currentScroll);
          setShowNav(currentScroll < lastScroll || currentScroll < 50);
          setShowTopBtn(currentScroll > 300);
          setLastScroll(currentScroll);

          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScroll]);

  // Escape Key

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setMegaOpen(false);
      }
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  /* --------------------------- SCROLL LOCK MOBILE ------------------- */
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* ----------------------------- RESET STATES ------------------------ */
  useEffect(() => {
    if (!open) {
      setMobileServiceOpen(false);
      setActiveCategory(null);
    }
  }, [open]);

  useEffect(() => {
    if (!megaOpen) setDesktopCategory(null);
  }, [megaOpen]);

  /* --------------------------- MEGA MENU HANDLERS ------------------- */
  const [backClicked, setBackClicked] = useState(false); // track if Back was clicked

  const handleMegaEnter = () => {
    // Cancel any pending close
    if (megaTimeout) {
      clearTimeout(megaTimeout);
      setMegaTimeout(null);
    }
    setMegaOpen(true);
    setBackClicked(false); // reset back click state
  };

  const handleMegaLeave = () => {
    if (backClicked) {
      // Give 2 seconds to return
      const timeout = setTimeout(() => {
        setMegaOpen(false);
        setDesktopCategory(null);
        setBackClicked(false);
      }, 2000);
      setMegaTimeout(timeout);
    } else {
      // normal hover out: close immediately
      setMegaOpen(false);
      setDesktopCategory(null);
    }
  };

  const handleBackClick = () => {
    // Just reset the subcategory, keep mega menu open
    setDesktopCategory(null);

    // Set the backClicked state to true so leaving gives 2s
    setBackClicked(true);

    // Cancel any pending close
    if (megaTimeout) {
      clearTimeout(megaTimeout);
      setMegaTimeout(null);
    }
  };

  /* --------------------------- NAV ITEM ANIMATION ------------------ */
  const navItemVariants: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.08, type: "spring", stiffness: 120 },
    }),
  };

  /* --------------------------- RENDER ------------------------------- */
  return (
    <>
      {/* ------------------------------ NAVBAR -------------------------------- */}
      <motion.nav
        initial={{ y: 0 }}
        animate={{
          y: hide ? -200 : open ? 0 : showNav ? 0 : -180,
        }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className={`fixed top-0 left-0 z-[999] w-full ${
          scrollY > 0
            ? "bg-gradient-to-br from-[#FCF5E5] via-[#FAF9F6] to-transparent"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 py-1">
          {/* LOGO */}
          <motion.div
            initial={{ x: -160, opacity: 0 }}
            animate={logoLoaded ? { x: 0, opacity: 1 } : {}}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 relative -ml-6 sm:-ml-8 md:-ml-10 mt-1 sm:mt-2 md:mt-3 h-20 w-32 sm:h-24 sm:w-44 md:h-26 md:w-52 lg:h-28 lg:w-56 xl:h-32 xl:w-64"
          >
            <Image
              src="/vishweshwar-industries-logo.png"
              alt="Vishweshwar Industries Logo"
              fill
              className="object-contain drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
              priority
            />
          </motion.div>

          {/* -------------------- DESKTOP NAV -------------------- */}
          <div className="hidden lg:flex flex-1 justify-end space-x-8 brand-font relative">
            {NAV_ITEMS.map((item, idx) => {
              if (item.label === "Services") {
                return (
                  <div
                    key="services"
                    className="relative"
                    onMouseEnter={handleMegaEnter}
                    onMouseLeave={handleMegaLeave}
                  >
                    <motion.div
                      custom={idx}
                      initial="hidden"
                      animate="visible"
                      variants={navItemVariants}
                      className="cursor-pointer text-blue-950/90 font-semibold hover:text-amber-700 transition-colors"
                    >
                      Services +
                    </motion.div>

                    <AnimatePresence>
                      {megaOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.97 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.97 }}
                          transition={{
                            duration: 0.35,
                            ease: [0.16, 1, 0.3, 1],
                          }}
                          className={`absolute left-1/2 top-full mt-2 -translate-x-1/2
                          rounded-3xl bg-white/90 backdrop-blur-xl border border-white/20
                          shadow-[0_25px_80px_rgba(0,0,0,0.2)] p-8 z-50
                          flex gap-10
                          ${desktopCategory ? "w-[750px] max-w-[95vw]" : "w-max"}`}
                        >
                          {!desktopCategory && (
                            <motion.div
                              className="flex flex-col space-y-4 w-max"
                              initial="hidden"
                              animate="visible"
                              variants={{
                                hidden: {},
                                visible: {
                                  transition: { staggerChildren: 0.08 },
                                },
                              }}
                            >
                              {(
                                Object.keys(SERVICE_MENU) as ServiceCategory[]
                              ).map((category) => {
                                const Icon = SERVICE_ICONS[category];
                                return (
                                  <motion.button
                                    key={category}
                                    onClick={() => setDesktopCategory(category)}
                                    className="flex items-center gap-2 text-sm font-medium text-blue-950/90 hover:text-amber-700 transition-all duration-300 hover:translate-x-1"
                                    whileHover={{ scale: 1.02 }}
                                  >
                                    <Icon size={16} /> {category}
                                  </motion.button>
                                );
                              })}
                            </motion.div>
                          )}

                          {desktopCategory && (
                            <>
                              {/* Left panel: category title + back */}
                              <div className="flex flex-col w-1/2 pr-6 justify-center">
                                <h3 className="text-blue-950 font-bold text-lg mb-6">
                                  {desktopCategory}
                                </h3>
                                <div className="flex justify-between">
                                  <Link
                                    className="text-blue-500 hover:text-amber-700 underline w-1/3"
                                    href={"www.google.com"}
                                  >
                                    Know More
                                  </Link>
                                  <FancyButton
                                    text="Back"
                                    onClick={handleBackClick}
                                    className="w-1/3 cursor-pointer hover:rotate-180"
                                  />
                                </div>
                              </div>

                              {/* Right panel: services list */}
                              <motion.div
                                className="flex flex-col w-1/2 mt-2 space-y-2"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                  hidden: {},
                                  visible: {
                                    transition: {
                                      staggerChildren: 0.08,
                                      delayChildren: 0.1,
                                    },
                                  },
                                }}
                              >
                                {SERVICE_MENU[desktopCategory].map(
                                  (service) => (
                                    <motion.div
                                      key={service.id}
                                      variants={fadeUp(0.5)}
                                      whileHover={{ scale: 1.02, y: -2 }}
                                      className="group relative py-2 px-4 rounded-r-2xl bg-white/60 backdrop-blur-md border border-blue-100 hover:border-[#d4af37]/70 transition-all duration-300 hover:shadow-[0_6px_18px_rgba(212,175,55,0.18)] cursor-pointer max-w-max"
                                    >
                                      <Link href={`/services/${service.id}`}>
                                        <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#d4af37] to-[#f5d76e] rounded-l-lg opacity-80" />
                                        <p className="pl-3 text-sm font-medium text-blue-950 group-hover:text-amber-700 transition">
                                          {service.title}
                                        </p>
                                      </Link>
                                    </motion.div>
                                  ),
                                )}
                              </motion.div>
                            </>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <motion.div
                  key={item.href}
                  custom={idx}
                  initial="hidden"
                  animate="visible"
                  variants={navItemVariants}
                >
                  <Link
                    href={item.href}
                    className={`font-semibold transition-colors duration-300 ${
                      pathname === item.href
                        ? "text-amber-700"
                        : "text-blue-950/90 hover:text-amber-700"
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* ------------------- HAMBURGER BUTTON -------------------- */}
          <div className="lg:hidden">
            <button
              onClick={() => setOpen((prev) => !prev)}
              className="relative h-10 w-10 flex items-center justify-center bg-transparent border-0 p-0 focus:outline-none cursor-pointer hover:scale-105"
              aria-label="Menu"
            >
              <div className="absolute top-1/2 left-0 w-full -translate-y-1/2">
                <motion.span
                  animate={{ rotate: open ? 45 : 0, y: open ? 0 : -spacing }}
                  className="absolute left-0 h-0.5 w-full rounded bg-linear-to-r from-[#d4af37] to-[#b8860b]"
                />
                <motion.span
                  animate={{ opacity: open ? 0 : 1 }}
                  className="absolute left-0 top-1/2 h-0.5 w-full rounded -translate-y-1/2 bg-linear-to-r from-[#d4af37] to-[#b8860b]"
                />
                <motion.span
                  animate={{ rotate: open ? -45 : 0, y: open ? 0 : spacing }}
                  className="absolute left-0 h-0.5 w-full rounded bg-linear-to-r from-[#d4af37] to-[#b8860b]"
                />
              </div>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* -------------------------- MOBILE MENU -------------------------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            animate={{ clipPath: "circle(150% at calc(100% - 40px) 40px)" }}
            exit={{ clipPath: "circle(0% at calc(100% - 40px) 40px)" }}
            transition={{ duration: 0.6, ease: [0.83, 0, 0.17, 1] }}
            className="fixed inset-0 z-[998] bg-gradient-to-br from-[#FCF5E5] via-white to-blue-50 backdrop-blur-xl flex justify-center items-start pt-36"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="w-full h-full flex flex-col items-center justify-center px-6 relative"
            >
              {/* ---------------- MAIN NAV LINKS ---------------- */}
              <div className="flex flex-col items-center space-y-8">
                {!mobileServiceOpen &&
                  NAV_ITEMS.map((item, idx) =>
                    item.label === "Services" ? (
                      <motion.button
                        key="services"
                        onClick={() => setMobileServiceOpen(true)}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.07 }}
                        className="relative text-3xl md:text-4xl font-semibold text-blue-950/90 hover:text-amber-700 transition-all group flex items-center gap-3"
                      >
                        Services
                        {/* Chevron */}
                        <motion.span
                          animate={{ rotate: mobileServiceOpen ? 180 : 0 }}
                          transition={{ duration: 0.3 }}
                          className="text-amber-600 text-xl"
                        >
                          ↓
                        </motion.span>
                        {/* Gold underline */}
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-amber-600 group-hover:w-16 transition-all duration-300" />
                      </motion.button>
                    ) : (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                      >
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.07 }}
                          className="relative text-3xl md:text-4xl font-semibold text-blue-950/90 hover:text-amber-700 transition-all group"
                        >
                          {item.label}
                          <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-amber-600 group-hover:w-16 transition-all duration-300" />
                        </motion.div>
                      </Link>
                    ),
                  )}
              </div>

              {/* ---------------- CATEGORY MENU ---------------- */}
              {mobileServiceOpen && !activeCategory && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ staggerChildren: 0.05 }}
                  className="w-full flex flex-col items-center space-y-4"
                >
                  <button
                    onClick={() => setMobileServiceOpen(false)}
                    className="flex items-center gap-2 text-blue-950 font-semibold bg-blue-50 hover:bg-blue-100 transition-colors px-4 py-2 rounded-full shadow-md hover:shadow-lg"
                  >
                    <ArrowLeft size={18} /> Back
                  </button>

                  <div className="flex flex-col space-y-5 w-full mt-6">
                    {(Object.keys(SERVICE_MENU) as ServiceCategory[]).map(
                      (category) => {
                        const Icon = SERVICE_ICONS[category];
                        return (
                          <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className="flex items-center justify-between text-lg font-medium text-blue-950/90 hover:text-amber-700 transition group"
                          >
                            <span className="flex items-center gap-3">
                              <Icon size={20} /> {category}
                            </span>
                            <span className="w-0 group-hover:w-8 h-[2px] bg-amber-600 transition-all" />
                          </button>
                        );
                      },
                    )}
                  </div>
                </motion.div>
              )}

              {/* ---------------- NESTED SERVICES ---------------- */}
              {mobileServiceOpen && activeCategory && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ staggerChildren: 0.05 }}
                  className="w-full flex flex-col items-center space-y-4 bg-blue-50 rounded-xl p-4"
                >
                  <button
                    onClick={() => setActiveCategory(null)}
                    className="flex items-center gap-2 text-blue-950/80 hover:text-amber-700 transition text-sm tracking-wide"
                  >
                    <ArrowLeft size={18} /> Back
                  </button>

                  <div className="flex flex-col space-y-4 w-full mt-6">
                    {SERVICE_MENU[activeCategory].map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.id}`}
                        onClick={() => setOpen(false)}
                        className="group flex items-center justify-between text-base text-blue-950/90 hover:text-amber-700 transition"
                      >
                        {service.title}
                        <span className="w-0 group-hover:w-6 h-[2px] bg-amber-600 transition-all" />
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* SOCIAL ICONS */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-8">
                <a href="https://linkedin.com" target="_blank">
                  <Linkedin className="text-blue-900 hover:text-amber-700 transition-all hover:scale-110" />
                </a>
                <a href="https://instagram.com" target="_blank">
                  <Instagram className="text-blue-900 hover:text-amber-700 transition-all hover:scale-110" />
                </a>
                <a href="https://twitter.com" target="_blank">
                  <Twitter className="text-blue-900 hover:text-amber-700 transition-all hover:scale-110" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------------- SCROLL TOP -------------------------- */}
      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 120, damping: 15 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="cursor-pointer fixed bottom-16 right-8 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#d4af37] via-[#f5d76e] to-amber-400/70 text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-[999]"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
      {/* 📞 Floating Call Button */}
      <CallButton />
    </>
  );
}
