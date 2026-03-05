// "use client";

// import Image from "next/image";
// import FancyButton from "./FancyButton";
// import {
//   motion,
//   useMotionValue,
//   useTransform,
//   animate,
//   MotionValue,
// } from "framer-motion";
// import {
//   useEffect,
//   useState,
//   useRef,
//   Dispatch,
//   SetStateAction,
//   useLayoutEffect,
// } from "react";
// import Link from "next/link";
// import fadeUp from "../utils/animation";
// import { createPortal } from "react-dom";

// /* ================= TYPES ================= */

// type SlideProps = {
//   setHeroPaused: Dispatch<SetStateAction<boolean>>;
// };

// type LogoItem = {
//   src: string;
//   name: string;
//   description: string;
//   link: string;
// };

// type OrbitLogoProps = {
//   logo: string;
//   name: string;
//   description: string;
//   link: string;
//   angle: number;
//   radius: number;
//   rotation: MotionValue<number>;
//   logoSize: number;
//   pause: () => void;
//   resume: () => void;
// };

// /* ================= DATA ================= */

// const logos: LogoItem[] = [
//   {
//     src: "/logo4.png",
//     name: "React.js",
//     description: "UI library for dynamic web apps.",
//     link: "/services#react-development",
//   },
//   {
//     src: "/logo5.png",
//     name: "Next.js",
//     description: "SSR & static site generation.",
//     link: "/services#nextjs-development",
//   },
//   {
//     src: "/logo6.png",
//     name: "Node.js",
//     description: "Server-side JavaScript runtime.",
//     link: "/services#node-development",
//   },
//   {
//     src: "/logo7.png",
//     name: "Express.js",
//     description: "Backend web framework for Node.",
//     link: "/services#express-development",
//   },
//   {
//     src: "/logo8.png",
//     name: "MongoDB",
//     description: "NoSQL database solutions.",
//     link: "/services#mongo-database",
//   },
//   {
//     src: "/logo9.png",
//     name: "PostgreSQL",
//     description: "SQL relational database.",
//     link: "/services#postgresql",
//   },
//   {
//     src: "/logo10.png",
//     name: "Docker",
//     description: "Containerization & deployment.",
//     link: "/services#docker",
//   },
//   {
//     src: "/logo11.png",
//     name: "Tailwind CSS",
//     description: "Utility-first CSS framework.",
//     link: "/services#tailwind",
//   },
//   {
//     src: "/logo12.png",
//     name: "TypeScript",
//     description: "Typed superset of JavaScript.",
//     link: "/services#typescript",
//   },
// ];

// const services = [
//   { title: "Website Design & Development", id: "website-development" },
//   { title: "Progressive Web Applications", id: "pwa" },
//   { title: "ERPs / CRMs / CMS / Dashboards", id: "custom-systems" },
//   { title: "Enterprise / School / Hospital Systems", id: "enterprise-systems" },
// ];

// /* ================= MAIN COMPONENT ================= */

// export default function WebDevSlide({ setHeroPaused }: SlideProps) {
//   const rotation = useMotionValue(0);
//   const controlsRef = useRef<ReturnType<typeof animate> | null>(null);
//   const [orbitSize, setOrbitSize] = useState<number>(300);
//   const [orbitalOffset, setOrbitalOffset] = useState<number>(0);
//   const [activePopupIndex, setActivePopupIndex] = useState<number | null>(null);
//   const [paddingTop, setPaddingTop] = useState(
//     "calc(80px + env(safe-area-inset-top))",
//   );

//   /* ROTATION */
//   useEffect(() => {
//     controlsRef.current = animate(rotation, 360, {
//       duration: 32,
//       ease: "linear",
//       repeat: Infinity,
//     });
//     return () => controlsRef.current?.stop();
//   }, [rotation]);

//   const pauseRotation = () => controlsRef.current?.stop();
//   const resumeRotation = () => {
//     const current = rotation.get();
//     controlsRef.current = animate(rotation, current + 360, {
//       duration: 32,
//       ease: "linear",
//       repeat: Infinity,
//     });
//   };

//   /* RESPONSIVE ORBIT & PADDING */
//   useEffect(() => {
//     const updateOrbit = () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;
//       const navbarHeight = 80;
//       const verticalPadding = navbarHeight + 40;
//       let size = 0;
//       let offset = 0;

//       if (width < 380) {
//         size = width * 0.65;
//         offset = -30;
//       } else if (width >= 540 && width < 768) {
//         size = width * 0.65;
//         offset = -50;
//       } else if (width < 768) {
//         size = Math.min(width * 0.75, height - verticalPadding);
//       } else if (width < 1280) {
//         size = Math.min(width * 0.46, height - verticalPadding);
//       } else {
//         size = Math.min(width * 0.28, height - verticalPadding);
//       }

//       setOrbitSize(Math.max(size, 220));
//       setOrbitalOffset(offset);
//     };

//     const updatePadding = () => {
//       const width = window.innerWidth;
//       if (width < 380) setPaddingTop("calc(128px + env(safe-area-inset-top))");
//       else if (width >= 540 && width < 768)
//         setPaddingTop("calc(129px + env(safe-area-inset-top))");
//       else if (width >= 1280) setPaddingTop("120px");
//       else setPaddingTop("calc(80px + env(safe-area-inset-top))");
//     };

//     updateOrbit();
//     updatePadding();
//     window.addEventListener("resize", updateOrbit);
//     window.addEventListener("resize", updatePadding);
//     return () => {
//       window.removeEventListener("resize", updateOrbit);
//       window.removeEventListener("resize", updatePadding);
//     };
//   }, []);

//   const logoSize = orbitSize * 0.14;
//   const coreSize = orbitSize * 0.65;
//   const radius = orbitSize / 2 - logoSize / 2;

//   return (
//     <motion.section
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       transition={{ duration: 0.8 }}
//       viewport={{ once: true }}
//       onMouseEnter={() => setHeroPaused(true)}
//       onMouseLeave={() => setHeroPaused(false)}
//       className="relative w-full min-h-screen bg-gradient-to-b from-white to-blue-50 text-blue-950 flex flex-col md:flex-row justify-center items-center overflow-visible pb-12"
//       style={{ paddingTop }}
//     >
//       <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center px-6 md:px-8 gap-12">
//         {/* LEFT SIDE */}
//         <motion.div
//           initial={{ opacity: 0, x: -60 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.9 }}
//           viewport={{ once: true }}
//           className="w-full md:w-1/2 flex items-center md:items-start justify-center md:justify-start text-center md:text-left"
//         >
//           <div className="flex flex-col gap-3 md:gap-4 items-center md:items-start justify-center">
//             <motion.h1
//               variants={fadeUp(0.7)}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               className="text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold leading-tight bg-gradient-to-r from-blue-950 via-amber-700 to-yellow-500 bg-clip-text text-transparent"
//             >
//               Modern & Scalable Web Engineering
//             </motion.h1>

//             <motion.p
//               variants={fadeUp(0.8)}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               className="text-sm sm:text-base text-blue-900/80 leading-relaxed max-w-[420px] mx-auto md:mx-0"
//             >
//               High-performance engineering, secure databases & cutting-edge
//               technologies architecting enterprise-grade ecosystems.
//             </motion.p>

//             <motion.div
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               variants={{
//                 hidden: {},
//                 visible: {
//                   transition: { staggerChildren: 0.08, delayChildren: 0.2 },
//                 },
//               }}
//               className="hidden md:flex flex-col mt-6 space-y-2"
//             >
//               {services.map((service, i) => (
//                 <motion.div
//                   key={i}
//                   variants={fadeUp(0.5)}
//                   whileHover={{ scale: 1.02, y: -2 }}
//                   className="group relative py-2 px-4 rounded-r-2xl bg-white/60 backdrop-blur-md border border-blue-100 hover:border-[#d4af37]/70 transition-all duration-300 hover:shadow-[0_6px_18px_rgba(212,175,55,0.18)] cursor-pointer max-w-max"
//                 >
//                   <Link href={`/services#${service.id}`}>
//                     <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#d4af37] to-[#f5d76e] rounded-l-lg opacity-80" />
//                     <p className="pl-3 text-sm font-medium text-blue-950 group-hover:text-amber-700 transition">
//                       {service.title}
//                     </p>
//                   </Link>
//                 </motion.div>
//               ))}
//             </motion.div>

//             <motion.div
//               variants={fadeUp(0.9)}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               className="flex justify-center md:justify-start mt-4"
//             >
//               <FancyButton text="Explore Web Services" href="/services" />
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* RIGHT SIDE ORBIT */}
//         <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0">
//           <div
//             className="relative flex items-center justify-center isolate"
//             style={{
//               width: orbitSize,
//               height: orbitSize,
//               transform: `translateY(${orbitalOffset}px)`,
//             }}
//           >
//             {/* Core */}
//             <motion.div
//               animate={{ scale: [1, 1.04, 1] }}
//               transition={{ duration: 6, repeat: Infinity }}
//               className="absolute rounded-full"
//               style={{
//                 width: coreSize,
//                 height: coreSize,
//                 background: `radial-gradient(circle at center, rgba(255,215,0,0.9) 0%, rgba(212,175,55,0.8) 40%, rgba(25,32,72,0.4) 75%, rgba(10,15,40,0.2) 100%)`,
//                 boxShadow: `0 0 60px rgba(255,215,0,0.6), 0 0 120px rgba(212,175,55,0.4)`,
//               }}
//             />

//             {/* Ring */}
//             <motion.div
//               animate={{ scale: [1, 1.02, 1] }}
//               transition={{ duration: 8, repeat: Infinity }}
//               className="absolute rounded-full border border-yellow-400"
//               style={{
//                 width: orbitSize,
//                 height: orbitSize,
//                 boxShadow:
//                   "0 0 30px rgba(255,215,0,0.6), 0 0 80px rgba(212,175,55,0.4)",
//               }}
//             />

//             {/* Logos */}
//             <motion.div style={{ rotate: rotation }} className="absolute z-30">
//               {logos.map((logo, index) => {
//                 const angle = (360 / logos.length) * index;
//                 return (
//                   <OrbitLogo
//                     key={index}
//                     index={index}
//                     logo={logo.src}
//                     name={logo.name}
//                     description={logo.description}
//                     link={logo.link}
//                     angle={angle}
//                     radius={radius}
//                     rotation={rotation}
//                     logoSize={logoSize}
//                     pause={pauseRotation}
//                     resume={resumeRotation}
//                     activePopupIndex={activePopupIndex}
//                     setActivePopupIndex={setActivePopupIndex}
//                   />
//                 );
//               })}
//             </motion.div>

//             {/* Center Graphic */}
//             <motion.div
//               animate={{ y: [0, -8, 0] }}
//               transition={{ repeat: Infinity, duration: 5 }}
//               className="relative z-20"
//             >
//               <Image
//                 src="/mini-responsive-collage.webp"
//                 alt="Web Development"
//                 width={400}
//                 height={400}
//                 style={{ width: coreSize * 0.9, height: "auto" }}
//               />
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </motion.section>
//   );
// }

// /* ================= ORBIT LOGO ================= */

// function OrbitLogo({
//   logo,
//   name,
//   description,
//   link,
//   angle,
//   radius,
//   rotation,
//   logoSize,
//   pause,
//   resume,
//   index,
// }: OrbitLogoProps & {
//   index: number;
//   activePopupIndex: number | null;
//   setActivePopupIndex: Dispatch<SetStateAction<number | null>>;
// }) {
//   const rotateDeg = useTransform(rotation, (r) => `${-(r + angle)}deg`);
//   const ref = useRef<HTMLDivElement | null>(null);
//   const [position, setPosition] = useState<{ top: number; left: number }>({
//     top: 0,
//     left: 0,
//   });
//   const [hoveringLogo, setHoveringLogo] = useState(false);
//   const [hoveringPopup, setHoveringPopup] = useState(false);
//   const isActive = hoveringLogo || hoveringPopup;

//   useLayoutEffect(() => {
//     if (!isActive || !ref.current) return;
//     const rect = ref.current.getBoundingClientRect();
//     const popupWidth = 260;
//     const popupHeight = 140;
//     const padding = 12;

//     let top = rect.top - popupHeight - 12;
//     if (top < padding) top = rect.bottom + 12;
//     let left = rect.left + rect.width / 2 - popupWidth / 2;
//     left = Math.max(
//       padding,
//       Math.min(left, window.innerWidth - popupWidth - padding),
//     );
//     setPosition({ top, left });
//   }, [isActive]);

//   useEffect(() => {
//     if (!hoveringLogo && !hoveringPopup) {
//       resume();
//     } else {
//       pause();
//     }
//   }, [hoveringLogo, hoveringPopup, pause, resume]);

//   return (
//     <>
//       <div
//         className="absolute top-1/2 left-1/2"
//         style={{ transform: `rotate(${angle}deg) translate(${radius}px)` }}
//       >
//         <motion.div
//           ref={ref}
//           style={{
//             rotate: rotateDeg,
//             width: logoSize,
//             height: logoSize,
//             transform: "translate(-50%, -50%)",
//           }}
//           className="relative flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-white/40 shadow-lg cursor-pointer"
//           onMouseEnter={() => setHoveringLogo(true)}
//           onMouseLeave={() => setHoveringLogo(false)}
//           whileHover={{ scale: 1.15 }}
//           transition={{ type: "spring", stiffness: 260, damping: 20 }}
//         >
//           <Image
//             src={logo}
//             alt={name}
//             width={60}
//             height={60}
//             style={{ width: logoSize * 0.6, height: logoSize * 0.6 }}
//           />
//         </motion.div>
//       </div>

//       {isActive &&
//         createPortal(
//           <motion.div
//             key={index}
//             initial={{ opacity: 0, scale: 0.8, y: 15 }}
//             animate={{ opacity: 1, scale: 1, y: 0 }}
//             exit={{ opacity: 0, scale: 0.8, y: 15 }}
//             transition={{ type: "spring", stiffness: 300, damping: 25 }}
//             style={{
//               position: "fixed",
//               top: position.top,
//               left: position.left,
//               width: 260,
//               zIndex: 1000,
//               pointerEvents: "auto",
//             }}
//             onMouseEnter={() => setHoveringPopup(true)}
//             onMouseLeave={() => setHoveringPopup(false)}
//           >
//             <div className="rounded-2xl bg-gradient-to-br from-blue-950 via-indigo-900 to-amber-600 text-white p-5 shadow-2xl border border-white/20 backdrop-blur-xl">
//               <p className="text-sm font-semibold mb-2">{name}</p>
//               <p className="text-xs text-white/80 leading-relaxed mb-4">
//                 {description}
//               </p>
//               <Link
//                 href={link}
//                 className="text-xs font-semibold text-amber-300 hover:text-white transition-colors duration-300"
//               >
//                 Read More →
//               </Link>
//             </div>
//           </motion.div>,
//           document.body,
//         )}
//     </>
//   );
// }

"use client";

import Image from "next/image";
import FancyButton from "./FancyButton";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  MotionValue,
} from "framer-motion";
import {
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
} from "react";
import Link from "next/link";
import fadeUp from "../utils/animation";
import { createPortal } from "react-dom";

/* ================= TYPES ================= */

type SlideProps = {
  setHeroPaused: Dispatch<SetStateAction<boolean>>;
};

type LogoItem = {
  src: string;
  name: string;
  description: string;
  link: string;
};

type OrbitLogoProps = {
  index: number;
  logo: string;
  name: string;
  description: string;
  link: string;
  angle: number;
  radius: number;
  rotation: MotionValue<number>;
  logoSize: number;
  pause: () => void;
  resume: () => void;
};

/* ================= DATA ================= */

const logos: LogoItem[] = [
  {
    src: "/logo4.png",
    name: "React.js",
    description: "UI library for dynamic web apps.",
    link: "/services#react-development",
  },
  {
    src: "/logo5.png",
    name: "Next.js",
    description: "SSR & static site generation.",
    link: "/services#nextjs-development",
  },
  {
    src: "/logo6.png",
    name: "Node.js",
    description: "Server-side JavaScript runtime.",
    link: "/services#node-development",
  },
  {
    src: "/logo7.png",
    name: "Express.js",
    description: "Backend web framework for Node.",
    link: "/services#express-development",
  },
  {
    src: "/logo8.png",
    name: "MongoDB",
    description: "NoSQL database solutions.",
    link: "/services#mongo-database",
  },
  {
    src: "/logo9.png",
    name: "PostgreSQL",
    description: "SQL relational database.",
    link: "/services#postgresql",
  },
  {
    src: "/logo10.png",
    name: "Docker",
    description: "Containerization & deployment.",
    link: "/services#docker",
  },
  {
    src: "/logo11.png",
    name: "Tailwind CSS",
    description: "Utility-first CSS framework.",
    link: "/services#tailwind",
  },
  {
    src: "/logo12.png",
    name: "TypeScript",
    description: "Typed superset of JavaScript.",
    link: "/services#typescript",
  },
];

const services = [
  { title: "Website Design & Development", id: "website-development" },
  { title: "Progressive Web Applications", id: "pwa" },
  { title: "ERPs / CRMs / CMS / Dashboards", id: "custom-systems" },
  { title: "Enterprise / School / Hospital Systems", id: "enterprise-systems" },
];

/* ================= MAIN COMPONENT ================= */

export default function WebDevSlide({ setHeroPaused }: SlideProps) {
  const rotation = useMotionValue(0);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

  const [orbitSize, setOrbitSize] = useState(300);
  const [orbitalOffset, setOrbitalOffset] = useState(0);
  const [paddingTop, setPaddingTop] = useState(
    "calc(80px + env(safe-area-inset-top))",
  );

  /* ROTATION */

  useEffect(() => {
    controlsRef.current = animate(rotation, 360, {
      duration: 36,
      ease: "linear",
      repeat: Infinity,
    });

    return () => controlsRef.current?.stop();
  }, [rotation]);

  const pauseRotation = () => {
    controlsRef.current?.stop();
  };

  const resumeRotation = () => {
    const current = rotation.get();
    controlsRef.current = animate(rotation, current + 360, {
      duration: 36,
      ease: "linear",
      repeat: Infinity,
    });
  };

  /* RESPONSIVE ORBIT */

  useEffect(() => {
    const updateOrbit = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      const navbarHeight = 80;
      const verticalPadding = navbarHeight + 40;

      let size = 0;
      let offset = 0;

      if (width < 380) {
        size = width * 0.65;
        offset = -30;
      } else if (width >= 540 && width < 768) {
        size = width * 0.65;
        offset = -50;
      } else if (width < 768) {
        size = Math.min(width * 0.75, height - verticalPadding);
      } else if (width < 1280) {
        size = Math.min(width * 0.46, height - verticalPadding);
      } else {
        size = Math.min(width * 0.28, height - verticalPadding);
      }

      setOrbitSize(Math.max(size, 220));
      setOrbitalOffset(offset);
    };

    const updatePadding = () => {
      const width = window.innerWidth;

      if (width < 380) setPaddingTop("calc(128px + env(safe-area-inset-top))");
      else if (width >= 540 && width < 768)
        setPaddingTop("calc(129px + env(safe-area-inset-top))");
      else if (width >= 1280) setPaddingTop("120px");
      else setPaddingTop("calc(80px + env(safe-area-inset-top))");
    };

    updateOrbit();
    updatePadding();

    window.addEventListener("resize", updateOrbit);
    window.addEventListener("resize", updatePadding);

    return () => {
      window.removeEventListener("resize", updateOrbit);
      window.removeEventListener("resize", updatePadding);
    };
  }, []);

  const logoSize = orbitSize * 0.14;
  const coreSize = orbitSize * 0.65;
  const radius = orbitSize / 2 - logoSize / 2;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHeroPaused(true)}
      onMouseLeave={() => setHeroPaused(false)}
      className="relative w-full min-h-screen bg-gradient-to-b from-white to-blue-50 text-blue-950 flex flex-col md:flex-row justify-center items-center overflow-visible pb-12"
      style={{ paddingTop }}
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center px-6 md:px-8 gap-12">
        {/* LEFT SIDE */}

        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 flex items-center md:items-start justify-center md:justify-start text-center md:text-left"
        >
          <div className="flex flex-col gap-3 md:gap-4 items-center md:items-start justify-center">
            <motion.h1
              variants={fadeUp(0.7)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold leading-tight bg-gradient-to-r from-blue-950 via-amber-700 to-yellow-500 bg-clip-text text-transparent"
            >
              Modern & Scalable Web Engineering
            </motion.h1>

            <motion.p
              variants={fadeUp(0.8)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm sm:text-base text-blue-900/80 leading-relaxed max-w-[420px] mx-auto md:mx-0"
            >
              High-performance engineering, secure databases & cutting-edge
              technologies architecting enterprise-grade ecosystems.
            </motion.p>

            {/* SERVICES */}

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.08, delayChildren: 0.2 },
                },
              }}
              className="hidden md:flex flex-col mt-6 space-y-2"
            >
              {services.map((service) => (
                <motion.div
                  key={service.id}
                  variants={fadeUp(0.5)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group relative py-2 px-4 rounded-r-2xl bg-white/60 backdrop-blur-md border border-blue-100 hover:border-[#d4af37]/70 transition-all duration-300 hover:shadow-[0_6px_18px_rgba(212,175,55,0.18)] cursor-pointer max-w-max"
                >
                  <Link href={`/services#${service.id}`}>
                    <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#d4af37] to-[#f5d76e] rounded-l-lg opacity-80" />
                    <p className="pl-3 text-sm font-medium text-blue-950 group-hover:text-amber-700 transition">
                      {service.title}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp(0.9)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex justify-center md:justify-start mt-4"
            >
              <FancyButton text="Explore Web Services" href="/services" />
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE ORBIT */}

        <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0">
          <div
            className="relative flex items-center justify-center isolate"
            style={{
              width: orbitSize,
              height: orbitSize,
              transform: `translateY(${orbitalOffset}px) translateZ(0)`,
              willChange: "transform",
            }}
          >
            {/* CORE */}

            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute rounded-full"
              style={{
                width: coreSize,
                height: coreSize,
                background:
                  "radial-gradient(circle at center, rgba(255,215,0,0.9) 0%, rgba(212,175,55,0.8) 40%, rgba(25,32,72,0.4) 75%, rgba(10,15,40,0.2) 100%)",
                boxShadow:
                  "0 0 60px rgba(255,215,0,0.6), 0 0 120px rgba(212,175,55,0.4)",
              }}
            />

            {/* ORBIT RING */}

            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute rounded-full border border-yellow-400"
              style={{
                width: orbitSize,
                height: orbitSize,
                boxShadow:
                  "0 0 30px rgba(255,215,0,0.6), 0 0 80px rgba(212,175,55,0.4)",
              }}
            />

            {/* LOGOS */}

            <motion.div
              style={{
                rotate: rotation,
                transform: "translateZ(0)",
                willChange: "transform",
              }}
              className="absolute z-30"
            >
              {logos.map((logo, index) => {
                const angle = (360 / logos.length) * index;

                return (
                  <OrbitLogo
                    key={logo.name}
                    index={index}
                    logo={logo.src}
                    name={logo.name}
                    description={logo.description}
                    link={logo.link}
                    angle={angle}
                    radius={radius}
                    rotation={rotation}
                    logoSize={logoSize}
                    pause={pauseRotation}
                    resume={resumeRotation}
                  />
                );
              })}
            </motion.div>

            {/* CENTER IMAGE */}

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20"
              style={{ transform: "translateZ(0)" }}
            >
              <Image
                src="/mini-responsive-collage.webp"
                alt="Web Development"
                width={400}
                height={400}
                style={{ width: coreSize * 0.9, height: "auto" }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </motion.section>
  );
}

/* ================= ORBIT LOGO ================= */

function OrbitLogo({
  logo,
  name,
  description,
  link,
  angle,
  radius,
  rotation,
  logoSize,
  pause,
  resume,
}: OrbitLogoProps) {
  const rotateDeg = useTransform(rotation, (r) => `${-(r + angle)}deg`);

  const ref = useRef<HTMLDivElement | null>(null);

  const [hoverLogo, setHoverLogo] = useState(false);
  const [hoverPopup, setHoverPopup] = useState(false);

  const [position, setPosition] = useState({ top: 0, left: 0 });

  const active = hoverLogo || hoverPopup;

  useLayoutEffect(() => {
    if (!active || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();

    const popupWidth = 260;
    const popupHeight = 140;
    const padding = 12;

    let top = rect.top - popupHeight - 12;

    if (top < padding) top = rect.bottom + 12;

    let left = rect.left + rect.width / 2 - popupWidth / 2;

    left = Math.max(
      padding,
      Math.min(left, window.innerWidth - popupWidth - padding),
    );

    setPosition({ top, left });
  }, [active, logoSize]);

  useEffect(() => {
    if (active) pause();
    else resume();
  }, [active, pause, resume]);

  return (
    <>
      <div
        className="absolute top-1/2 left-1/2"
        style={{
          transform: `rotate(${angle}deg) translate(${radius}px) translateZ(0)`,
          willChange: "transform",
        }}
      >
        <motion.div
          ref={ref}
          style={{
            rotate: rotateDeg,
            width: logoSize,
            height: logoSize,
            transform: "translate(-50%, -50%) translateZ(0)",
          }}
          className="relative flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-white/40 shadow-lg cursor-pointer"
          onMouseEnter={() => setHoverLogo(true)}
          onMouseLeave={() => setHoverLogo(false)}
          whileHover={{ scale: 1.15 }}
        >
          <Image
            src={logo}
            alt={name}
            width={60}
            height={60}
            style={{ width: logoSize * 0.6, height: logoSize * 0.6 }}
          />
        </motion.div>
      </div>

      {active &&
        createPortal(
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 15 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              width: 260,
              zIndex: 1000,
              transform: "translateZ(0)",
            }}
            onMouseEnter={() => setHoverPopup(true)}
            onMouseLeave={() => setHoverPopup(false)}
          >
            <div className="rounded-2xl bg-gradient-to-br from-blue-950 via-indigo-900 to-amber-600 text-white p-5 shadow-2xl border border-white/20 backdrop-blur-xl">
              <p className="text-sm font-semibold mb-2">{name}</p>
              <p className="text-xs text-white/80 leading-relaxed mb-4">
                {description}
              </p>

              <Link
                href={link}
                className="text-xs font-semibold text-amber-300 hover:text-white transition-colors duration-300"
              >
                Read More →
              </Link>
            </div>
          </motion.div>,
          document.body,
        )}
    </>
  );
}
