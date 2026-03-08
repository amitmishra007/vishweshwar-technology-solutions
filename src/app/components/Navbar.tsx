"use client";

import { useState, useEffect } from "react";
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

/* --------------------------------- DATA --------------------------------- */

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Technologies", href: "/technologies" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact-us" },
] as const;

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
/* -------------------------------------------------------------------------- */

export default function Navbar() {
  const [desktopCategory, setDesktopCategory] =
    useState<ServiceCategory | null>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const [megaTimeout, setMegaTimeout] = useState<NodeJS.Timeout | null>(null);

  // ---------------- MEGA MENU HANDLERS ----------------
  const handleMegaEnter = () => {
    if (megaTimeout) {
      clearTimeout(megaTimeout);
      setMegaTimeout(null);
    }
    setMegaOpen(true);
  };

  const handleMegaLeave = () => {
    if (!desktopCategory) {
      // If only Services hover (no submenu), close immediately
      setMegaOpen(false);
      return;
    }

    // If submenu open, keep mega menu visible for short delay
    const timeout = setTimeout(() => setMegaOpen(false), 400); // 400ms delay
    setMegaTimeout(timeout);
  };

  // ---------------- BACK BUTTON ----------------
  const handleBackClick = () => {
    setDesktopCategory(null);
    // Mega menu remains open for 400ms
    const timeout = setTimeout(() => setMegaOpen(false), 1200);
    setMegaTimeout(timeout);
  };
  const [mobileServiceOpen, setMobileServiceOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ServiceCategory | null>(
    null,
  );

  const [open, setOpen] = useState(false);

  const [logoLoaded, setLogoLoaded] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScroll, setLastScroll] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [showTopBtn, setShowTopBtn] = useState(false);

  /* ------------------------------ Logo Animation ----------------------------- */

  useEffect(() => {
    const timer = setTimeout(() => setLogoLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  /* ------------------------------ Scroll Lock -------------------------------- */
  /* ------------------------------ Scroll Lock -------------------------------- */
  useEffect(() => {
    // Only lock scroll for mobile menu, never for desktop mega menu
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]); // <-- only include 'open' because 'megaOpen' no longer locks scroll

  /* ----------------------------- Reset States -------------------------------- */

  useEffect(() => {
    if (!open) {
      setMobileServiceOpen(false);
      setActiveCategory(null);
    }
  }, [open]);

  useEffect(() => {
    if (!megaOpen) setDesktopCategory(null);
  }, [megaOpen]);

  /* ----------------------------- Scroll Detection ---------------------------- */

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

  /* ----------------------------- Nav Animation ------------------------------- */

  const navItemVariants: Variants = {
    hidden: { opacity: 0, x: 40 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.08, type: "spring", stiffness: 120 },
    }),
  };

  /* ========================================================================== */

  return (
    <>
      {/* ------------------------------ NAVBAR -------------------------------- */}

      <motion.nav
        initial={{ y: 0 }}
        animate={{ y: open ? 0 : showNav ? 0 : -200 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
        className={`fixed top-0 left-0 z-[999] w-full ${
          scrollY > 0
            ? "bg-gradient-to-br from-[#FCF5E5] via-[#FAF9F6] to-transparent"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-6 lg:px-12 py-2 md:py-0">
          {/* LOGO */}
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
                      className="cursor-pointer text-blue-900/80 font-semibold hover:text-amber-500 transition-colors"
                    >
                      Services
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
                          {/* CATEGORY SELECTION */}
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
                                    className="flex items-center gap-2 text-sm font-medium text-blue-900/80 
                      hover:text-amber-500 transition-all duration-300 
                      hover:translate-x-1"
                                    whileHover={{ scale: 1.02 }}
                                  >
                                    <Icon size={16} />
                                    {category}
                                  </motion.button>
                                );
                              })}
                            </motion.div>
                          )}

                          {/* SUBMENU */}
                          {desktopCategory && (
                            <>
                              {/* Left half: Title + Back */}
                              <div className="flex flex-col w-1/2 border-r border-white/20 pr-6 justify-center">
                                <h3 className="text-blue-950 font-bold text-lg mb-6">
                                  {desktopCategory}
                                </h3>
                                <motion.button
                                  onClick={handleBackClick}
                                  className="flex items-center gap-2 text-blue-900 font-semibold hover:text-amber-500 transition-all duration-300 hover:translate-x-1"
                                  whileHover={{ scale: 1.02 }}
                                >
                                  <ArrowLeft size={16} /> Back
                                </motion.button>
                              </div>

                              {/* Right half: Submenu items */}
                              <motion.div
                                className="flex flex-col w-1/2 space-y-5"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                  hidden: {},
                                  visible: {
                                    transition: { staggerChildren: 0.08 },
                                  },
                                }}
                              >
                                {SERVICE_MENU[desktopCategory].map(
                                  (service, i) => (
                                    <motion.div
                                      key={service.id}
                                      className="relative overflow-hidden rounded-lg"
                                      initial={{ opacity: 0, y: 12 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{
                                        delay: i * 0.05,
                                        type: "spring",
                                        stiffness: 120,
                                      }}
                                    >
                                      <Link
                                        href={`/services/${service.id}`}
                                        className="relative z-10 text-blue-900/80 hover:text-amber-500 font-medium text-sm transition-all duration-300 py-2 block border-b border-white/20 last:border-b-0 px-2"
                                      >
                                        {service.title}
                                      </Link>

                                      <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-amber-300/20 via-yellow-300/10 to-amber-300/20 opacity-0 pointer-events-none rounded-lg"
                                        whileHover={{ opacity: 1 }}
                                        transition={{
                                          duration: 0.4,
                                          ease: "easeInOut",
                                        }}
                                      />
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
                    className="text-blue-900/80 font-semibold hover:text-red-400 transition-colors duration-300"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* HAMBURGER REMAINS UNCHANGED */}
        </div>
      </motion.nav>

      {/* -------------------------- MOBILE MENU -------------------------- */}

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[998] bg-white/95 backdrop-blur-md flex flex-col items-center justify-center gap-6"
          >
            {/* MAIN NAV */}

            {!mobileServiceOpen &&
              NAV_ITEMS.map((item) =>
                item.label === "Services" ? (
                  <button
                    key="services"
                    onClick={() => setMobileServiceOpen(true)}
                    className="text-lg font-semibold text-blue-900/80"
                  >
                    Services
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-semibold text-blue-900/80"
                  >
                    {item.label}
                  </Link>
                ),
              )}

            {/* CATEGORY LEVEL */}

            {mobileServiceOpen && !activeCategory && (
              <>
                <button
                  onClick={() => setMobileServiceOpen(false)}
                  className="flex items-center gap-2 text-blue-900"
                >
                  <ArrowLeft size={18} />
                  Back
                </button>

                {(Object.keys(SERVICE_MENU) as ServiceCategory[]).map(
                  (category) => {
                    const Icon = SERVICE_ICONS[category];

                    return (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className="flex items-center gap-3 text-base font-semibold text-blue-950"
                      >
                        <Icon size={20} />
                        {category}
                      </button>
                    );
                  },
                )}
              </>
            )}

            {/* SERVICE LEVEL */}

            {mobileServiceOpen && activeCategory && (
              <>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="flex items-center gap-2 text-blue-900"
                >
                  <ArrowLeft size={18} />
                  Back
                </button>

                {SERVICE_MENU[activeCategory].map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
                    onClick={() => setOpen(false)}
                    className="text-base text-blue-900/80"
                  >
                    {service.title}
                  </Link>
                ))}
              </>
            )}

            {/* SOCIAL BAR */}

            <div className="absolute bottom-8 flex gap-6 text-blue-900">
              <Linkedin className="hover:text-amber-600 cursor-pointer" />
              <Instagram className="hover:text-amber-600 cursor-pointer" />
              <Twitter className="hover:text-amber-600 cursor-pointer" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* -------------------------- SCROLL TOP -------------------------- */}

      <AnimatePresence>
        {showTopBtn && (
          <motion.button
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="fixed bottom-8 right-8 w-14 h-14 rounded-full
            bg-gradient-to-br from-blue-950 via-amber-700 to-yellow-500
            text-white shadow-lg flex items-center justify-center"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
