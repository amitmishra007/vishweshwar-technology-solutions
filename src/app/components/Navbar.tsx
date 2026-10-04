"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import type { Variants } from "framer-motion";

import {
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Briefcase,
  Building2,
  Code2,
  Globe,
  House,
  Instagram,
  LayoutDashboard,
  Layers as LayersIcon,
  Linkedin,
  Mail,
  Megaphone,
  Monitor,
  Palette,
  PenTool,
  Search,
  Server,
  Smartphone,
  TrendingUp,
  Users,
  Youtube,
} from "lucide-react";

import dynamic from "next/dynamic";
import FancyButton from "@/app/components/FancyButton";

const CallButton = dynamic(
  () => import("@/app/components/CallButton"),
  {
    ssr: false,
  }
);

/* -------------------------------------------------------------------------- */
/* NAV ITEMS                                                                  */
/* -------------------------------------------------------------------------- */

const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
    icon: House,
  },
  {
    label: "About Us",
    href: "/about-us",
    icon: Building2,
  },
  {
    label: "Services",
    href: "/services",
    icon: Briefcase,
  },
  {
    label: "Technologies",
    href: "/technologies",
    icon: Code2,
  },
  {
    label: "Careers",
    href: "/careers",
    icon: Users,
  },
  {
    label: "Contact Us",
    href: "/contact-us",
    icon: Mail,
  },
] as const;

/* -------------------------------------------------------------------------- */
/* SERVICES                                                                   */
/* -------------------------------------------------------------------------- */

const SERVICE_MENU = [
  {
    title: "Web Development",
    icon: Globe,
    description: "Web platforms built for performance and growth.",
    items: [
      {
        title: "Website Design & Development",
        icon: Monitor,
      },
      {
        title: "Progressive Web Applications",
        icon: Globe,
      },
      {
        title: "ERPs / CRMs / CMS / Dashboards",
        icon: LayoutDashboard,
      },
      {
        title: "Enterprise Systems",
        icon: Server,
      },
    ],
  },
  {
    title: "Mobile App Development",
    icon: Smartphone,
    description: "Native and cross-platform mobile experiences.",
    items: [
      {
        title: "iOS & Android Apps",
        icon: Smartphone,
      },
      {
        title: "Cross Platform Apps",
        icon: Code2,
      },
      {
        title: "Enterprise Mobile Systems",
        icon: Briefcase,
      },
      {
        title: "App UI / UX Design",
        icon: PenTool,
      },
    ],
  },
  {
    title: "Graphics & Brand Identity",
    icon: Palette,
    description: "Visual identities that make brands memorable.",
    items: [
      {
        title: "Logo Design",
        icon: PenTool,
      },
      {
        title: "Brand Identity Systems",
        icon: LayersIcon,
      },
      {
        title: "Marketing Graphics",
        icon: Megaphone,
      },
      {
        title: "Packaging & Print Design",
        icon: Palette,
      },
    ],
  },
  {
    title: "Marketing & SEO",
    icon: TrendingUp,
    description:
      "Digital visibility, acquisition and measurable growth.",
    items: [
      {
        title: "SEO & Organic Growth",
        icon: Search,
      },
      {
        title: "Google & Meta Ads",
        icon: Megaphone,
      },
      {
        title: "Content & Social Marketing",
        icon: TrendingUp,
      },
      {
        title: "Analytics & CRO",
        icon: BarChart3,
      },
    ],
  },
] as const;

/* -------------------------------------------------------------------------- */
/* ANIMATION VARIANTS                                                         */
/* -------------------------------------------------------------------------- */

const panelVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 8,
    scale: 0.985,
    filter: "blur(5px)",
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      opacity: {
        duration: 0.22,
        ease: "easeOut",
      },
      y: {
        duration: 0.42,
        ease: "easeOut",
      },
      scale: {
        duration: 0.42,
        ease: "easeOut",
      },
      filter: {
        duration: 0.35,
        ease: "easeOut",
      },
    },
  },

  exit: {
    opacity: 0,
    y: 5,
    scale: 0.992,
    filter: "blur(3px)",
    transition: {
      opacity: {
        duration: 0.16,
        ease: "easeIn",
      },
      y: {
        duration: 0.22,
        ease: "easeIn",
      },
      scale: {
        duration: 0.22,
        ease: "easeIn",
      },
      filter: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  },
};

const categoryVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -10,
    scale: 0.985,
    filter: "blur(4px)",
  },

  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: index * 0.055,
      duration: 0.34,
      ease: "easeOut",
    },
  }),

  exit: (index: number) => ({
    opacity: 0,
    x: -6,
    scale: 0.99,
    filter: "blur(3px)",
    transition: {
      delay: index * 0.025,
      duration: 0.18,
      ease: "easeIn",
    },
  }),
};

const serviceVariants: Variants = {
  hidden: {
    opacity: 0,
    x: 12,
    y: 4,
    scale: 0.985,
    filter: "blur(5px)",
  },

  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      delay: 0.08 + index * 0.065,
      duration: 0.38,
      ease: "easeOut",
    },
  }),

  exit: (index: number) => ({
    opacity: 0,
    x: 7,
    y: 2,
    scale: 0.99,
    filter: "blur(3px)",
    transition: {
      delay: index * 0.025,
      duration: 0.18,
      ease: "easeIn",
    },
  }),
};

const mobilePanelVariants: Variants = {
  hidden: {
    opacity: 0,
    clipPath: "circle(0% at 100% 0%)",
  },

  visible: {
    opacity: 1,
    clipPath: "circle(150% at 100% 0%)",
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },

  exit: {
    opacity: 0,
    clipPath: "circle(0% at 100% 0%)",
    transition: {
      duration: 0.42,
      ease: "easeIn",
    },
  },
};

const mobileItemVariants: Variants = {
  hidden: {
    opacity: 0,
    x: -12,
  },

  visible: (index: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: index * 0.055,
      duration: 0.32,
      ease: "easeOut",
    },
  }),
};

/* -------------------------------------------------------------------------- */
/* COMPONENT                                                                  */
/* -------------------------------------------------------------------------- */

export default function Navbar({
  hide = false,
}: {
  hide?: boolean;
}) {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = prefersReducedMotion ?? false;

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [mobileServiceView, setMobileServiceView] = useState<
    number | null
  >(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [showNav, setShowNav] = useState(true);

  const lastScrollRef = useRef(0);
  const tickingRef = useRef(false);
  const animationFrameRef = useRef<number | null>(null);

  const megaTimeoutRef =
    useRef<ReturnType<typeof setTimeout> | null>(null);

  /* ------------------------------------------------------------------------ */
  /* SERVICES MENU                                                             */
  /* ------------------------------------------------------------------------ */

  const clearMegaTimeout = useCallback(() => {
    if (megaTimeoutRef.current !== null) {
      clearTimeout(megaTimeoutRef.current);
      megaTimeoutRef.current = null;
    }
  }, []);

  const openServices = useCallback(() => {
    clearMegaTimeout();
    setIsServicesOpen(true);
  }, [clearMegaTimeout]);

  const closeServices = useCallback(
    (delay = 0) => {
      clearMegaTimeout();

      if (delay > 0) {
        megaTimeoutRef.current = setTimeout(() => {
          setIsServicesOpen(false);
          megaTimeoutRef.current = null;
        }, delay);

        return;
      }

      setIsServicesOpen(false);
    },
    [clearMegaTimeout]
  );

  const handleServiceChange = useCallback((index: number) => {
    setActiveService(index);
  }, []);

  const handleBackClick = useCallback(() => {
    setMobileServiceView(null);
  }, []);

  /* ------------------------------------------------------------------------ */
  /* SCROLL                                                                    */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) {
        return;
      }

      tickingRef.current = true;

      animationFrameRef.current =
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;
          const previousScroll = lastScrollRef.current;

          setIsScrolled(currentScroll > 24);

          if (currentScroll < 40) {
            setShowNav(true);
          } else if (currentScroll > previousScroll + 4) {
            setShowNav(false);
          } else if (currentScroll < previousScroll - 4) {
            setShowNav(true);
          }

          lastScrollRef.current = currentScroll;
          tickingRef.current = false;
        });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(
          animationFrameRef.current
        );
      }
    };
  }, []);

  /* ------------------------------------------------------------------------ */
  /* ROUTE CHANGES                                                             */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    setIsMobileOpen(false);
    setIsServicesOpen(false);
    setMobileServiceView(null);
  }, [pathname]);

  /* ------------------------------------------------------------------------ */
  /* ESCAPE                                                                    */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!isMobileOpen && !isServicesOpen) {
      return;
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") {
        return;
      }

      setIsMobileOpen(false);
      setIsServicesOpen(false);
      setMobileServiceView(null);
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isMobileOpen, isServicesOpen]);

  /* ------------------------------------------------------------------------ */
  /* MOBILE BODY LOCK                                                          */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    if (!isMobileOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isMobileOpen]);

  /* ------------------------------------------------------------------------ */
  /* CLEANUP                                                                   */
  /* ------------------------------------------------------------------------ */

  useEffect(() => {
    return () => {
      clearMegaTimeout();

      if (animationFrameRef.current !== null) {
        window.cancelAnimationFrame(
          animationFrameRef.current
        );
      }
    };
  }, [clearMegaTimeout]);

  /* ------------------------------------------------------------------------ */
  /* RENDER                                                                    */
  /* ------------------------------------------------------------------------ */

  return (
    <>
      <motion.nav
        initial={false}
        animate={{
          y:
            hide || (!showNav && !isMobileOpen)
              ? -180
              : 0,
        }}
        transition={
          reducedMotion
            ? { duration: 0 }
            : {
                duration: 0.42,
                ease: "easeOut",
              }
        }
        className="fixed inset-x-0 top-0 z-[999]"
      >
        <div
          className={[
            "mx-auto w-full px-4 transition-all duration-500",
            "sm:px-6 lg:px-8",
            isScrolled ? "pt-3" : "pt-5",
          ].join(" ")}
        >
          <div className="mx-auto flex max-w-[1440px] items-center justify-between">
            {/* ---------------------------------------------------------------- */}
            {/* LOGO                                                              */}
            {/* ---------------------------------------------------------------- */}

            <Link
              href="/"
              aria-label="Vishweshwar Industries home"
              className={[
                "relative z-10 shrink-0",
                "-ml-6 sm:-ml-8 md:-ml-10",
                "mt-1 sm:mt-2 md:mt-3",
                "h-20 w-32",
                "sm:h-24 sm:w-44",
                "md:h-[6.5rem] md:w-52",
                "lg:h-28 lg:w-56",
                "xl:h-32 xl:w-64",
              ].join(" ")}
            >
              <Image
                src="/vishweshwar-industries-logo.png"
                alt="Vishweshwar Industries"
                fill
                priority
                sizes="(max-width: 640px) 128px, (max-width: 768px) 176px, (max-width: 1024px) 208px, 256px"
                className="object-contain object-left drop-shadow-[0_0_12px_rgba(255,255,255,0.4)]"
              />
            </Link>

            {/* ---------------------------------------------------------------- */}
            {/* DESKTOP NAVIGATION                                                */}
            {/* ---------------------------------------------------------------- */}

            <div className="hidden flex-1 items-center justify-end gap-1 brand-font lg:flex">
              {NAV_ITEMS.map((item, index) => {
                const isServices =
                  item.label === "Services";
                const isActive = pathname === item.href;

                if (isServices) {
                  return (
                    <div
                      key={item.label}
                      className="relative"
                      onMouseEnter={openServices}
                      onMouseLeave={() => closeServices(180)}
                      onFocus={openServices}
                      onBlur={(event) => {
                        if (
                          !event.currentTarget.contains(
                            event.relatedTarget as Node | null
                          )
                        ) {
                          closeServices(180);
                        }
                      }}
                    >
                      <motion.button
                        type="button"
                        initial={
                          reducedMotion
                            ? { opacity: 1 }
                            : { opacity: 0, y: -8 }
                        }
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: reducedMotion
                            ? 0
                            : index * 0.035,
                          duration: reducedMotion
                            ? 0
                            : 0.34,
                          ease: "easeOut",
                        }}
                        aria-expanded={isServicesOpen}
                        aria-haspopup="true"
                        onClick={() => {
                          if (isServicesOpen) {
                            closeServices();
                          } else {
                            openServices();
                          }
                        }}
                        className={[
                          "group relative flex cursor-pointer items-center gap-1.5",
                          "rounded-full px-4 py-2.5",
                          "text-[13px] font-medium tracking-wide",
                          "text-blue-950/90",
                          "transition-all duration-300",
                          "hover:bg-white/[0.20]",
                          "hover:text-amber-700",
                          "active:scale-[0.97]",
                          "focus:outline-none",
                          "focus-visible:ring-2",
                          "focus-visible:ring-[#d4af37]/60",
                        ].join(" ")}
                      >
                        <span>Services</span>

                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className={[
                            "transition-transform duration-300",
                            isServicesOpen
                              ? "rotate-180"
                              : "group-hover:translate-y-0.5",
                          ].join(" ")}
                        >
                          <path d="m6 9 6 6 6-6" />
                        </svg>

                        <span
                          className={[
                            "absolute inset-x-3 -bottom-0.5 h-px",
                            "origin-center bg-gradient-to-r",
                            "from-transparent via-[#d4af37]/80 to-transparent",
                            "transition-all duration-300",
                            isServicesOpen
                              ? "scale-x-100 opacity-100"
                              : "scale-x-0 opacity-0 group-hover:scale-x-75 group-hover:opacity-60",
                          ].join(" ")}
                        />
                      </motion.button>

                      {/* ====================================================== */}
                      {/* SERVICES MEGA MENU                                    */}
                      {/* ====================================================== */}

                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            variants={panelVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            className="absolute left-1/2 top-full mt-3 w-[790px] -translate-x-1/2"
                          >
                            <div
                              className={[
                                "relative overflow-hidden rounded-[30px]",
                                "border border-white/50",
                                "bg-white/[0.50]",
                                "backdrop-blur-2xl",
                                "backdrop-saturate-150",
                                "shadow-[0_12px_30px_rgba(0,0,0,0.075)]",
                                "ring-1 ring-white/20",
                              ].join(" ")}
                            >
                              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/35 via-white/[0.06] to-transparent" />

                              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-[#d4af37]/[0.035] blur-3xl" />

                              <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent" />

                              {!reducedMotion && (
                                <motion.div
                                  initial={{
                                    x: "-140%",
                                    opacity: 0,
                                  }}
                                  animate={{
                                    x: "140%",
                                    opacity: [0, 0.16, 0],
                                  }}
                                  transition={{
                                    duration: 1.1,
                                    ease: "easeInOut",
                                  }}
                                  className={[
                                    "pointer-events-none absolute inset-y-0 left-0",
                                    "w-1/4 -skew-x-12",
                                    "bg-gradient-to-r",
                                    "from-transparent via-white/60 to-transparent",
                                  ].join(" ")}
                                />
                              )}

                              <div className="relative p-5">
                                <div className="grid grid-cols-[265px_1fr] gap-5">
                                  <div className="border-r border-white/30 pr-5">
                                    <div className="mb-3 px-2">
                                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-[#0a1a2f]/40">
                                        What we do
                                      </p>
                                    </div>

                                    <div className="space-y-1.5">
                                      {SERVICE_MENU.map(
                                        (
                                          service,
                                          serviceIndex
                                        ) => {
                                          const Icon =
                                            service.icon;

                                          const active =
                                            activeService ===
                                            serviceIndex;

                                          return (
                                            <motion.button
                                              key={
                                                service.title
                                              }
                                              type="button"
                                              custom={
                                                serviceIndex
                                              }
                                              variants={
                                                categoryVariants
                                              }
                                              initial="hidden"
                                              animate="visible"
                                              exit="exit"
                                              onMouseEnter={() =>
                                                handleServiceChange(
                                                  serviceIndex
                                                )
                                              }
                                              onFocus={() =>
                                                handleServiceChange(
                                                  serviceIndex
                                                )
                                              }
                                              onClick={() =>
                                                handleServiceChange(
                                                  serviceIndex
                                                )
                                              }
                                              className={[
                                                "group relative flex w-full cursor-pointer",
                                                "items-center gap-3 rounded-full",
                                                "border px-3 py-2.5 text-left",
                                                "transition-all duration-300",
                                                "active:scale-[0.98]",
                                                active
                                                  ? [
                                                      "border-white/60",
                                                      "bg-white/[0.44]",
                                                      "text-[#0a1a2f]",
                                                      "shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]",
                                                    ].join(
                                                      " "
                                                    )
                                                  : [
                                                      "border-transparent",
                                                      "bg-white/[0.12]",
                                                      "text-[#0a1a2f]/68",
                                                      "hover:border-white/40",
                                                      "hover:bg-white/[0.29]",
                                                      "hover:text-[#0a1a2f]",
                                                    ].join(
                                                      " "
                                                    ),
                                              ].join(" ")}
                                            >
                                              <span
                                                className={[
                                                  "flex h-9 w-9 shrink-0 items-center",
                                                  "justify-center rounded-full",
                                                  "border transition-all duration-300",
                                                  active
                                                    ? [
                                                        "border-[#d4af37]/30",
                                                        "bg-[#d4af37]/10",
                                                        "text-[#8c6d12]",
                                                      ].join(
                                                        " "
                                                      )
                                                    : [
                                                        "border-white/40",
                                                        "bg-white/[0.20]",
                                                        "text-[#0a1a2f]/60",
                                                        "group-hover:border-white/60",
                                                        "group-hover:bg-white/[0.38]",
                                                      ].join(
                                                        " "
                                                      ),
                                                ].join(" ")}
                                              >
                                                <Icon
                                                  size={16}
                                                  strokeWidth={
                                                    1.7
                                                  }
                                                />
                                              </span>

                                              <span className="min-w-0 flex-1">
                                                <span className="block truncate text-[13px] font-medium">
                                                  {
                                                    service.title
                                                  }
                                                </span>

                                                <span
                                                  className={[
                                                    "mt-0.5 block truncate text-[9px]",
                                                    "tracking-wide",
                                                    active
                                                      ? "text-[#0a1a2f]/45"
                                                      : "text-[#0a1a2f]/30",
                                                  ].join(
                                                    " "
                                                  )}
                                                >
                                                  {
                                                    service.description
                                                  }
                                                </span>
                                              </span>

                                              <ArrowRight
                                                size={14}
                                                strokeWidth={
                                                  1.7
                                                }
                                                className={[
                                                  "shrink-0 transition-all duration-300",
                                                  active
                                                    ? "translate-x-0 opacity-60"
                                                    : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-50",
                                                ].join(
                                                  " "
                                                )}
                                              />
                                            </motion.button>
                                          );
                                        }
                                      )}
                                    </div>
                                  </div>

                                  <div className="min-w-0">
                                    <AnimatePresence
                                      mode="wait"
                                      initial={false}
                                    >
                                      <motion.div
                                        key={activeService}
                                        initial={{
                                          opacity: 0,
                                          x: 8,
                                        }}
                                        animate={{
                                          opacity: 1,
                                          x: 0,
                                        }}
                                        exit={{
                                          opacity: 0,
                                          x: -5,
                                        }}
                                        transition={{
                                          duration:
                                            reducedMotion
                                              ? 0
                                              : 0.25,
                                          ease: "easeOut",
                                        }}
                                      >
                                        <div className="mb-4 flex items-center justify-between px-1">
                                          <div>
                                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#0a1a2f]/40">
                                              Services
                                            </p>

                                            <h3 className="mt-1 text-lg font-semibold tracking-tight text-[#0a1a2f]">
                                              {
                                                SERVICE_MENU[
                                                  activeService
                                                ].title
                                              }
                                            </h3>
                                          </div>

                                          <span className="rounded-full border border-white/45 bg-white/[0.20] px-3 py-1 text-[10px] font-medium text-[#0a1a2f]/45">
                                            {String(
                                              activeService + 1
                                            ).padStart(
                                              2,
                                              "0"
                                            )}
                                          </span>
                                        </div>

                                        <div className="grid grid-cols-2 gap-2.5">
                                          {SERVICE_MENU[
                                            activeService
                                          ].items.map(
                                            (
                                              item,
                                              itemIndex
                                            ) => {
                                              const ItemIcon =
                                                item.icon;

                                              return (
                                                <motion.div
                                                  key={
                                                    item.title
                                                  }
                                                  custom={
                                                    itemIndex
                                                  }
                                                  variants={
                                                    serviceVariants
                                                  }
                                                  initial="hidden"
                                                  animate="visible"
                                                  exit="exit"
                                                >
                                                  <Link
                                                    href="/services"
                                                    onClick={() =>
                                                      closeServices()
                                                    }
                                                    className={[
                                                      "group relative flex min-h-[58px]",
                                                      "cursor-pointer items-center",
                                                      "overflow-hidden rounded-[18px]",
                                                      "border border-white/35",
                                                      "bg-white/[0.17]",
                                                      "px-3.5 py-2.5",
                                                      "transition-all duration-300",
                                                      "hover:-translate-y-0.5",
                                                      "hover:border-white/65",
                                                      "hover:bg-white/[0.48]",
                                                      "hover:shadow-[0_5px_18px_rgba(0,0,0,0.035)]",
                                                      "active:translate-y-0",
                                                      "focus:outline-none",
                                                      "focus-visible:ring-2",
                                                      "focus-visible:ring-[#d4af37]/55",
                                                    ].join(
                                                      " "
                                                    )}
                                                  >
                                                    <span className="pointer-events-none absolute inset-0 rounded-[18px] bg-gradient-to-r from-white/0 via-white/25 to-white/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                                    <span
                                                      className={[
                                                        "relative mr-3 flex h-9 w-9 shrink-0",
                                                        "items-center justify-center rounded-xl",
                                                        "border border-white/45",
                                                        "bg-white/[0.28]",
                                                        "text-[#0a1a2f]/60",
                                                        "transition-all duration-300",
                                                        "group-hover:border-[#d4af37]/25",
                                                        "group-hover:bg-[#d4af37]/[0.08]",
                                                        "group-hover:text-[#8c6d12]",
                                                      ].join(
                                                        " "
                                                      )}
                                                    >
                                                      <ItemIcon
                                                        size={16}
                                                        strokeWidth={
                                                          1.65
                                                        }
                                                      />
                                                    </span>

                                                    <span className="relative flex-1 text-[12px] font-medium leading-5 text-[#0a1a2f]/72 transition-colors duration-300 group-hover:text-[#0a1a2f]">
                                                      {
                                                        item.title
                                                      }
                                                    </span>

                                                    <ArrowRight
                                                      size={14}
                                                      strokeWidth={
                                                        1.7
                                                      }
                                                      className={[
                                                        "relative ml-2 shrink-0",
                                                        "-translate-x-1",
                                                        "text-[#0a1a2f]/25",
                                                        "opacity-0",
                                                        "transition-all duration-300",
                                                        "group-hover:translate-x-0",
                                                        "group-hover:opacity-65",
                                                      ].join(
                                                        " "
                                                      )}
                                                    />
                                                  </Link>
                                                </motion.div>
                                              );
                                            }
                                          )}
                                        </div>
                                      </motion.div>
                                    </AnimatePresence>
                                  </div>
                                </div>

                                <div className="mt-5 flex items-center justify-between border-t border-white/30 pt-4">
                                  <Link
                                    href="/services"
                                    onClick={() =>
                                      closeServices()
                                    }
                                    className={[
                                      "group inline-flex cursor-pointer",
                                      "items-center gap-2 rounded-full",
                                      "px-2 py-2",
                                      "text-[11px] font-semibold uppercase",
                                      "tracking-[0.16em]",
                                      "text-[#0a1a2f]/50",
                                      "transition-all duration-300",
                                      "hover:text-[#0a1a2f]",
                                    ].join(" ")}
                                  >
                                    <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/45 bg-white/[0.20] transition-all duration-300 group-hover:bg-white/[0.42]">
                                      <ArrowRight
                                        size={13}
                                        strokeWidth={1.8}
                                        className="transition-transform duration-300 group-hover:translate-x-0.5"
                                      />
                                    </span>

                                    <span>
                                      Explore all services
                                    </span>
                                  </Link>

                                  <FancyButton
                                    href="/contact-us"
                                    text="Let's Talk"
                                  />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }

                return (
                  <motion.div
                    key={item.label}
                    initial={
                      reducedMotion
                        ? { opacity: 1 }
                        : { opacity: 0, y: -8 }
                    }
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: reducedMotion
                        ? 0
                        : index * 0.035,
                      duration: reducedMotion
                        ? 0
                        : 0.34,
                      ease: "easeOut",
                    }}
                  >
                    <Link
                      href={item.href}
                      className={[
                        "group relative block cursor-pointer",
                        "rounded-full px-4 py-2.5",
                        "text-[13px] font-medium tracking-wide",
                        "text-blue-950/90",
                        "transition-all duration-300",
                        "hover:bg-white/[0.20]",
                        "hover:text-amber-700",
                        "active:scale-[0.97]",
                        "focus:outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-[#d4af37]/60",
                      ].join(" ")}
                    >
                      <span>{item.label}</span>

                      {isActive && (
                        <motion.span
                          layoutId="active-nav"
                          className="absolute inset-x-3 -bottom-0.5 h-px bg-gradient-to-r from-transparent via-[#d4af37]/80 to-transparent"
                          transition={{
                            duration: 0.3,
                            ease: "easeOut",
                          }}
                        />
                      )}

                      {!isActive && (
                        <span className="absolute inset-x-3 -bottom-0.5 h-px origin-center scale-x-0 bg-gradient-to-r from-transparent via-[#d4af37]/60 to-transparent opacity-0 transition-all duration-300 group-hover:scale-x-75 group-hover:opacity-100" />
                      )}
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* DESKTOP CTA                                                       */}
            {/* ---------------------------------------------------------------- */}

            <div className="mr-2 hidden items-center gap-2 lg:flex">
              <CallButton />

              <FancyButton
                href="/contact-us"
                text="Let's Talk"
              />
            </div>

            {/* ---------------------------------------------------------------- */}
            {/* MOBILE TOGGLE                                                     */}
            {/* ---------------------------------------------------------------- */}

            <button
              type="button"
              aria-label={
                isMobileOpen
                  ? "Close navigation"
                  : "Open navigation"
              }
              aria-expanded={isMobileOpen}
              onClick={() => {
                setIsMobileOpen((current) => !current);
                setMobileServiceView(null);
              }}
              className={[
                "group mr-2 flex h-11 w-11 cursor-pointer",
                "items-center justify-center rounded-full",
                "border border-blue-950/15",
                "bg-white/[0.30]",
                "backdrop-blur-md",
                "transition-all duration-300",
                "hover:bg-white/[0.50]",
                "active:scale-95",
                "focus:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-[#d4af37]/60",
                "lg:hidden",
              ].join(" ")}
            >
              {/* ============================================================ */}
              {/* ORIGINAL THREE-LINE HAMBURGER                                */}
              {/* ============================================================ */}

              <span
                aria-hidden="true"
                className="relative flex h-[20px] w-[22px] items-center justify-center"
              >
                {/* TOP LINE */}
                <motion.span
                  initial={false}
                  animate={
                    isMobileOpen
                      ? {
                          rotate: 45,
                          y: 0,
                        }
                      : {
                          rotate: 0,
                          y: -6,
                        }
                  }
                  transition={{
                    duration: reducedMotion ? 0 : 0.32,
                    ease: "easeInOut",
                  }}
                  className="absolute h-[1.5px] w-[22px] rounded-full bg-[#0a1a2f]"
                />

                {/* MIDDLE LINE */}
                <motion.span
                  initial={false}
                  animate={
                    isMobileOpen
                      ? {
                          opacity: 0,
                          scaleX: 0,
                        }
                      : {
                          opacity: 1,
                          scaleX: 1,
                        }
                  }
                  transition={{
                    duration: reducedMotion ? 0 : 0.2,
                    ease: "easeInOut",
                  }}
                  className="absolute h-[1.5px] w-[22px] rounded-full bg-[#0a1a2f]"
                />

                {/* BOTTOM LINE */}
                <motion.span
                  initial={false}
                  animate={
                    isMobileOpen
                      ? {
                          rotate: -45,
                          y: 0,
                        }
                      : {
                          rotate: 0,
                          y: 6,
                        }
                  }
                  transition={{
                    duration: reducedMotion ? 0 : 0.32,
                    ease: "easeInOut",
                  }}
                  className="absolute h-[1.5px] w-[22px] rounded-full bg-[#0a1a2f]"
                />
              </span>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* ====================================================================== */}
      {/* MOBILE MENU                                                            */}
      {/* ====================================================================== */}

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            variants={mobilePanelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={[
              "fixed inset-0 z-[990]",
              "bg-gradient-to-br",
              "from-[#FCF5E5] via-[#FAF9F6] to-[#ecebe7]",
              "backdrop-blur-2xl lg:hidden",
            ].join(" ")}
          >
            <div className="flex h-full flex-col overflow-y-auto px-6 pb-10 pt-28">
              <div className="mx-auto w-full max-w-md">
                <AnimatePresence
                  mode="wait"
                  initial={false}
                >
                  {mobileServiceView === null ? (
                    <motion.div
                      key="main-menu"
                      initial={{
                        opacity: 0,
                        x: -12,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: -12,
                      }}
                      className="space-y-2"
                    >
                      {NAV_ITEMS.map((item, index) => {
                        const isServices =
                          item.label === "Services";

                        const NavIcon = item.icon;

                        return (
                          <motion.div
                            key={item.label}
                            custom={index}
                            variants={mobileItemVariants}
                            initial="hidden"
                            animate="visible"
                          >
                            {isServices ? (
                              <button
                                type="button"
                                onClick={() =>
                                  setMobileServiceView(0)
                                }
                                className={[
                                  "group flex w-full cursor-pointer",
                                  "items-center justify-between",
                                  "rounded-2xl border",
                                  "border-white/60",
                                  "bg-white/[0.42]",
                                  "px-5 py-4",
                                  "text-left text-[#0a1a2f]",
                                  "shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]",
                                  "transition-all duration-300",
                                  "hover:bg-white/[0.58]",
                                ].join(" ")}
                              >
                                <span className="flex items-center gap-3">
                                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#d4af37]/10 text-[#8c6d12]">
                                    <NavIcon
                                      size={17}
                                      strokeWidth={1.7}
                                    />
                                  </span>

                                  <span>{item.label}</span>
                                </span>

                                <ArrowRight
                                  size={17}
                                  strokeWidth={1.7}
                                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                                />
                              </button>
                            ) : (
                              <Link
                                href={item.href}
                                onClick={() =>
                                  setIsMobileOpen(false)
                                }
                                className={[
                                  "group flex w-full cursor-pointer",
                                  "items-center justify-between",
                                  "rounded-2xl border",
                                  "border-white/50",
                                  "bg-white/[0.18]",
                                  "px-5 py-4",
                                  "text-[#0a1a2f]/80",
                                  "transition-all duration-300",
                                  "hover:border-white/65",
                                  "hover:bg-white/[0.42]",
                                  "hover:text-[#0a1a2f]",
                                ].join(" ")}
                              >
                                <span className="flex items-center gap-3">
                                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/50 bg-white/[0.28] text-[#8c6d12] transition-all duration-300 group-hover:border-[#d4af37]/25 group-hover:bg-[#d4af37]/10">
                                    <NavIcon
                                      size={17}
                                      strokeWidth={1.7}
                                    />
                                  </span>

                                  <span>{item.label}</span>
                                </span>

                                <ArrowRight
                                  size={16}
                                  strokeWidth={1.7}
                                  className="-translate-x-1 opacity-40 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-70"
                                />
                              </Link>
                            )}
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="services-menu"
                      initial={{
                        opacity: 0,
                        x: 12,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: 12,
                      }}
                    >
                      <button
                        type="button"
                        onClick={handleBackClick}
                        className="mb-5 inline-flex cursor-pointer items-center gap-2 rounded-full px-2 py-2 text-sm text-[#0a1a2f]/60 transition-colors hover:text-[#0a1a2f]"
                      >
                        <ArrowLeft
                          size={16}
                          strokeWidth={1.7}
                        />
                        Back
                      </button>

                      <div className="space-y-2">
                        {SERVICE_MENU.map(
                          (service, index) => {
                            const Icon = service.icon;

                            return (
                              <button
                                key={service.title}
                                type="button"
                                onClick={() =>
                                  setMobileServiceView(
                                    index
                                  )
                                }
                                className={[
                                  "group flex w-full cursor-pointer",
                                  "items-center justify-between",
                                  "rounded-2xl border",
                                  "border-white/50",
                                  "bg-white/[0.35]",
                                  "px-4 py-3",
                                  "text-left",
                                  "transition-all duration-300",
                                  "hover:bg-white/[0.55]",
                                ].join(" ")}
                              >
                                <span className="flex items-center gap-3">
                                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/50 bg-white/[0.30] text-[#8c6d12]">
                                    <Icon
                                      size={17}
                                      strokeWidth={1.7}
                                    />
                                  </span>

                                  <span className="text-sm font-medium text-[#0a1a2f]">
                                    {service.title}
                                  </span>
                                </span>

                                <ArrowRight
                                  size={16}
                                  strokeWidth={1.7}
                                  className="transition-transform duration-300 group-hover:translate-x-0.5"
                                />
                              </button>
                            );
                          }
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ====================================================================== */}
      {/* FLOATING CALL BUTTON                                                   */}
      {/* ====================================================================== */}

      <CallButton />
    </>
  );
}