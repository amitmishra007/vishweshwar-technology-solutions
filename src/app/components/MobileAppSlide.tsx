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

// // Mobile app development related logos
// const logos: LogoItem[] = [
//   {
//     src: "/logo1.png",
//     name: "React Native",
//     description: "Cross-platform mobile framework.",
//     link: "/services#react-native",
//   },
//   {
//     src: "/logo2.png",
//     name: "Flutter",
//     description: "Fast UI toolkit by Google.",
//     link: "/services#flutter",
//   },
//   {
//     src: "/logo3.png",
//     name: "Swift",
//     description: "iOS native development.",
//     link: "/services#swift",
//   },
//   {
//     src: "/logo4.png",
//     name: "Kotlin",
//     description: "Android native development.",
//     link: "/services#kotlin",
//   },
//   {
//     src: "/logo5.png",
//     name: "Firebase",
//     description: "Backend & analytics services.",
//     link: "/services#firebase",
//   },
//   {
//     src: "/logo6.png",
//     name: "Expo",
//     description: "React Native app tools.",
//     link: "/services#expo",
//   },
//   {
//     src: "/logo7.png",
//     name: "AWS Amplify",
//     description: "Cloud backend & deployment.",
//     link: "/services#aws-amplify",
//   },
//   {
//     src: "/logo8.png",
//     name: "App Store & Play Store",
//     description: "Publishing & distribution.",
//     link: "/services#app-distribution",
//   },
// ];

// // Mobile app services for left side
// const services = [
//   { title: "Cross-Platform Mobile Apps", id: "react-native" },
//   { title: "Native iOS & Android Development", id: "swift-kotlin" },
//   { title: "Backend & API Integrations", id: "firebase-aws" },
//   { title: "App Deployment & Distribution", id: "app-distribution" },
// ];

// /* ================= MAIN COMPONENT ================= */

// export default function MobileAppSlide({ setHeroPaused }: SlideProps) {
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

//   /* RESPONSIVE ORBIT */
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
//               Cutting-Edge Mobile App Development
//             </motion.h1>

//             <motion.p
//               variants={fadeUp(0.8)}
//               initial="hidden"
//               whileInView="visible"
//               viewport={{ once: true }}
//               className="text-sm sm:text-base text-blue-900/80 leading-relaxed max-w-[420px] mx-auto md:mx-0"
//             >
//               High-performance, secure, and scalable mobile apps across iOS and
//               Android with modern frameworks, seamless UX, and robust backend
//               integrations.
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
//               <FancyButton text="Explore Mobile Apps" href="/services" />
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
//                 src="/iOS-and-Android-development.png"
//                 alt="Mobile App Development"
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
import AndroidModel from "./AndroidModel";
import {
  useEffect,
  useState,
  useRef,
  Dispatch,
  SetStateAction,
  useLayoutEffect,
  useCallback,
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
    src: "/google-playstore-for-android-logo-vishweshwar-industries-bhiwadi.png",
    name: "playstore logo",
    description: "Cross-platform mobile apps.",
    link: "/services#react-native",
  },
  {
    src: "/apple-store-for-ios-devices-logo-vishweshwar-industries-bhiwadi.png",
    name: "Apple Store Deployment",
    description: "ios UI toolkit.",
    link: "/services#apple-store",
  },
  {
    src: "/logo3.png",
    name: "Swift",
    description: "Native iOS development.",
    link: "/services#swift",
  },
  {
    src: "/kotlin-for-android-application-development-logo-vishweshwar-industries-bhiwadi.png",
    name: "Kotlin",
    description:
      "Kotlin is a modern, statically typed, cross-platform programming language developed by JetBrains and officially supported by Google for Android development. It is designed to be concise, safe, and fully interoperable with Java, enabling developers to build powerful and scalable applications with reduced boilerplate code. Kotlin is primarily used for native Android app development, leveraging the Android SDK and modern frameworks like Jetpack to create high-performance, responsive, and feature-rich mobile experiences. Kotlin supports multiple platforms, including Android, backend, web, and even iOS through Kotlin Multiplatform, allowing teams to share business logic across platforms while maintaining native performance. Its expressive syntax, null-safety features, and coroutine-based asynchronous programming model make development faster, more efficient, and less error-prone. With strong tooling support in Android Studio, Kotlin enhances developer productivity through intelligent code suggestions, seamless debugging, and robust testing capabilities. Integrated CI/CD pipelines, combined with modern DevOps practices, enable streamlined testing, deployment, and continuous delivery to platforms like the Google Play Store and Apple App Store (via multiplatform approaches). Kotlin also prioritizes security and reliability, offering features that minimize runtime crashes and protect sensitive data, making it an ideal choice for enterprise-grade mobile applications that demand performance, scalability, and long-term maintainability.",
    link: "/services#kotlin",
  },
  {
    src: "/flutter-for-android-application-and-ios-development-logo-vishweshwar-industries-bhiwadi.png",
    name: "Flutter",
    description:
      "Flutter is an open source, cross-platform software development kit (SDK) developed by Google. It extends a wide range of plugins backed by Google and allows mobile apps to be built for both Android and Apple iOS platforms. A trending mobile application development framework, Flutter allows you to build, test, and deploy natively-compiled stunning mobile apps for any screen (mobile, desktop, web) from a single code base. It uses “Dart” as a programming language instead of JavaScript which facilitates rapid and effective analysis, fabricates UIs, includes highlights, and fixes bugs in milliseconds. Flutter is a unique mobile app development toolkit that doesn’t rely on the web browser technology and the widgets shipped with each device. Flutter uses its own high-performance engine to customize widgets. ",
    link: "/services#firebase",
  },
  {
    src: "/react-native-for-android-application-development-logo-vishweshwar-industries-bhiwadi.png",
    name: "React Native",
    description:
      "This JavaScript open-source framework is one of the most preferred native mobile app development technologies in recent times. React Native offers ample support to IDEs and other  tools to support the development of native apps for iOS and Android platforms. ReactNative allows native mobile apps to be built with JavaScript, using the same design as React. Native apps built using this framework are truly native, that cannot be distinguished from an app built using Objective-C or Java or Swift. React Native can be used to upgrade your existing iOS and Android apps as well as to create whole new native mobile apps from scratch. Developers can use React Native to share code across multiple platforms from a single code base. This can be done by creating platform-specific versions of the code components. ",
    link: "/services#expo",
  },
  {
    src: "/ionic-for-android-application-and-ios-development-logo-vishweshwar-industries-bhiwadi.png",
    name: "Ionic",
    description:
      "Ionic is a modern, cross-platform, open-source SDK for iOS and Android apps. It uses the standard web technologies – HTML5, CSS3, and JavaScript to build powerful apps for multiple platforms and supports creating their UI functionalities with ease, all from a single code base. Ionic mobile app development technology works on iOS’s UIWebView or Android’s WebView. Ionic is built on top of Angular JS and Apache Cordova, offering developers the easiest way to build, grow, and scale cross-platform mobile apps. Built-in CI/CD tools for testing and deployment automates app delivery by helping organizations publish their apps directly to the Google and Apple App Stores. Ionic’s cloud security safeguards and best-in-class mobile security solutions protect sensitive data.",
    link: "/services#aws-amplify",
  },
  {
    src: "/xamarin-for-android-application-and-ios-development-logo-vishweshwar-industries-bhiwadi.png",
    name: "Xamarin",
    description:
      "Xamarin is a free and open-source, cross-platform app building platform for creating iOS and Android apps using .NET and C#. With the benefits of code sharing and extending access to native APIs, Xamarin builds applications that render exact native app experience. It is one of the most time and cost saving frameworks for mobile app development. Xamarin allows you to deliver native Android, iOS, and Windows apps with a single shared .NET code base. The framework offers access to the full spectrum of functionality exposed by the underlying platform and device, including platform-specific capabilities. Xamarin’s seamless integration with Azure Cloud Platform offers your mobile app a scalable, efficient, and versatile back-end, with storage, database, and intelligent services.",
    link: "/services#app-distribution",
  },
];

const services = [
  { title: "Cross-Platform Mobile Apps", id: "react-native" },
  { title: "Native iOS & Android Apps", id: "swift-kotlin" },
  { title: "Backend & API Integrations", id: "firebase-aws" },
  { title: "App Store Deployment", id: "app-distribution" },
];

/* ================= MAIN COMPONENT ================= */

export default function MobileAppSlide({ setHeroPaused }: SlideProps) {
  const rotation = useMotionValue(0);
  const controlsRef = useRef<ReturnType<typeof animate> | null>(null);

  const [orbitSize, setOrbitSize] = useState(300);
  const [orbitalOffset, setOrbitalOffset] = useState(0);
  const [paddingTop, setPaddingTop] = useState(
    "calc(80px + env(safe-area-inset-top))",
  );

  /* ROTATION ENGINE */

  useEffect(() => {
    controlsRef.current = animate(rotation, 360, {
      duration: 36,
      ease: "linear",
      repeat: Infinity,
    });

    return () => controlsRef.current?.stop();
  }, [rotation]);

  const pauseRotation = useCallback(() => {
    controlsRef.current?.stop();
  }, []);

  const resumeRotation = useCallback(() => {
    const current = rotation.get();

    controlsRef.current = animate(rotation, current + 360, {
      duration: 36,
      ease: "linear",
      repeat: Infinity,
    });
  }, [rotation]);

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
        {/* LEFT CONTENT */}

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
              Cutting-Edge Mobile App Development
            </motion.h1>

            <motion.p
              variants={fadeUp(0.8)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm sm:text-base text-blue-900/80 leading-relaxed max-w-[420px]"
            >
              High-performance mobile applications across iOS and Android with
              modern frameworks, scalable architecture and seamless user
              experiences.
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
                    <div className="absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#d4af37] to-[#f5d76e]" />
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
              <FancyButton text="Explore Mobile Apps" href="/services" />
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT ORBIT */}

        <div className="w-full md:w-1/2 flex items-center justify-center mt-8 md:mt-0">
          <div
            className="relative flex items-center justify-center isolate gpu-layer"
            style={{
              width: orbitSize,
              height: orbitSize,
              transform: `translate3d(0, ${orbitalOffset}px, 0)`,
            }}
          >
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute rounded-full gpu-layer"
              style={{
                width: coreSize,
                height: coreSize,
                background:
                  "radial-gradient(circle at center, rgba(255,215,0,0.9) 0%, rgba(212,175,55,0.8) 40%, rgba(25,32,72,0.4) 75%, rgba(10,15,40,0.2) 100%)",
                boxShadow:
                  "0 0 60px rgba(255,215,0,0.6), 0 0 120px rgba(212,175,55,0.4)",
              }}
            />

            <motion.div
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 8, repeat: Infinity }}
              className="absolute rounded-full border border-yellow-400 gpu-layer"
              style={{
                width: orbitSize,
                height: orbitSize,
                boxShadow:
                  "0 0 30px rgba(255,215,0,0.6), 0 0 80px rgba(212,175,55,0.4)",
              }}
            />

            <motion.div
              className="absolute z-30 gpu-layer"
              style={{ rotate: rotation }}
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

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-20 gpu-layer flex items-center justify-center"
            >
              <div
                className="relative flex items-center justify-center gpu-layer"
                style={{
                  width: coreSize * 0.95,
                  height: coreSize * 0.95,
                  borderRadius: "50%",

                  /* 🔥 AMBER → MAROON CORE */
                  background: `
      radial-gradient(
        circle at 35% 30%,
        rgba(255, 215, 0, 0.85) 0%,
        rgba(212, 175, 55, 0.75) 25%,
        rgba(128, 0, 32, 0.55) 55%,
        rgba(40, 0, 10, 0.65) 80%,
        rgba(10, 0, 5, 0.85) 100%
      )
    `,

                  /* ✨ CINEMATIC GLOW */
                  boxShadow: `
      inset 0 0 60px rgba(255, 215, 0, 0.35),
      inset 0 0 120px rgba(128, 0, 32, 0.35),
      0 0 40px rgba(212, 175, 55, 0.35),
      0 0 90px rgba(128, 0, 32, 0.25)
    `,

                  /* 💎 GLASS EDGE */
                  border: "1px solid rgba(255, 215, 0, 0.25)",

                  backdropFilter: "blur(18px) saturate(140%)",
                }}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <AndroidModel />
                </div>
              </div>
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
        className="absolute top-1/2 left-1/2 gpu-layer"
        style={{
          transform: `rotate(${angle}deg) translate(${radius}px)`,
        }}
      >
        <motion.div
          ref={ref}
          style={{
            rotate: rotateDeg,
            width: logoSize,
            height: logoSize,
            transform: "translate(-50%, -50%)",
          }}
          className="relative flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md border border-white/40 shadow-lg cursor-pointer gpu-layer"
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
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{
              position: "fixed",
              top: position.top,
              left: position.left,
              width: 260,
              zIndex: 1000,
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
