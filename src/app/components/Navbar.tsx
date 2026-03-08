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
export default function Navbar() {
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

  /* --------------------------- LOGO ANIMATION ------------------------ */
  useEffect(() => {
    const timer = setTimeout(() => setLogoLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  /* ---------------------------- SCROLL DETECTION -------------------- */
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
  const handleMegaEnter = () => {
    if (megaTimeout) {
      clearTimeout(megaTimeout);
      setMegaTimeout(null);
    }
    setMegaOpen(true);
  };

  const handleMegaLeave = () => {
    if (!desktopCategory) {
      setMegaOpen(false);
      return;
    }
    const timeout = setTimeout(() => setMegaOpen(false), 400);
    setMegaTimeout(timeout);
  };

  const handleBackClick = () => {
    setDesktopCategory(null);
    const timeout = setTimeout(() => setMegaOpen(false), 1200);
    setMegaTimeout(timeout);
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
                                    className="flex items-center gap-2 text-sm font-medium text-blue-900/80 hover:text-amber-500 transition-all duration-300 hover:translate-x-1"
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
                    className="text-blue-900/80 font-semibold hover:text-amber-500 transition-colors duration-300"
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
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-[998] bg-white/90 backdrop-blur-md flex flex-col items-center justify-center"
          >
            {!mobileServiceOpen &&
              NAV_ITEMS.map((item) =>
                item.label === "Services" ? (
                  <button
                    key="services"
                    onClick={() => setMobileServiceOpen(true)}
                    className="text-lg font-medium text-blue-900/80 my-3"
                  >
                    Services
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="text-lg font-medium text-blue-900/80 my-3"
                  >
                    {item.label}
                  </Link>
                ),
              )}

            {mobileServiceOpen && !activeCategory && (
              <>
                <button
                  onClick={() => setMobileServiceOpen(false)}
                  className="flex items-center gap-2 text-blue-900 my-4"
                >
                  <ArrowLeft size={18} /> Back
                </button>

                {(Object.keys(SERVICE_MENU) as ServiceCategory[]).map(
                  (category) => {
                    const Icon = SERVICE_ICONS[category];
                    return (
                      <button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className="flex items-center gap-3 text-sm font-medium text-blue-950 my-2"
                      >
                        <Icon size={20} /> {category}
                      </button>
                    );
                  },
                )}
              </>
            )}

            {mobileServiceOpen && activeCategory && (
              <>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="flex items-center gap-2 text-blue-900 my-4"
                >
                  <ArrowLeft size={18} /> Back
                </button>

                {SERVICE_MENU[activeCategory].map((service) => (
                  <Link
                    key={service.id}
                    href={`/services/${service.id}`}
                    onClick={() => setOpen(false)}
                    className="text-base text-blue-900/80 my-1.5"
                  >
                    {service.title}
                  </Link>
                ))}
              </>
            )}
            {/* SOCIAL ICONS AT BOTTOM */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-center gap-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin
                  size={24}
                  className="text-blue-900 hover:text-amber-500 transition-colors"
                />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram
                  size={24}
                  className="text-blue-900 hover:text-amber-500 transition-colors"
                />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter
                  size={24}
                  className="text-blue-900 hover:text-amber-500 transition-colors"
                />
              </a>
            </div>
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
            className="fixed bottom-8 right-8 w-14 h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-blue-950 via-amber-700 to-yellow-500 text-white shadow-lg flex items-center justify-center hover:scale-110 transition-transform z-[999]"
          >
            ↑
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
