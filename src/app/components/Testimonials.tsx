// "use client";

// import { useEffect, useRef, useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import Image from "next/image";

// interface Testimonial {
//   img: string;
//   quote: string;
//   name: string;
//   role: string;
// }

// const testimonials: Testimonial[] = [
//   {
//     img: "/logo3.png",
//     quote:
//       "The ability to capture responses is a game-changer. Even if a user gets tired of the signup and leaves, that data is still persisted.",
//     name: "Jessie J",
//     role: "Acme LTD",
//   },
//   {
//     img: "/logo4.png",
//     quote:
//       "Capturing user feedback is revolutionary. Even if a participant abandons, their valuable input remains intact.",
//     name: "Nick V",
//     role: "Malika Inc.",
//   },
//   {
//     img: "/iOS-and-Android-development.png",
//     quote:
//       "Even if a user abandons the sign-up process, their information remains stored — a true game changer.",
//     name: "Amelia W",
//     role: "Panda AI",
//   },
// ];

// export default function Testimonials() {
//   const [active, setActive] = useState(0);
//   const autorotateTiming = 7000;

//   const intervalRef = useRef<NodeJS.Timeout | null>(null);
//   const textRef = useRef<HTMLDivElement | null>(null);

//   // Auto-rotate logic
//   useEffect(() => {
//     startAutoRotate();
//     return stopAutoRotate;
//   }, []);

//   const startAutoRotate = () => {
//     intervalRef.current = setInterval(() => {
//       setActive((prev) => (prev + 1) % testimonials.length);
//     }, autorotateTiming);
//   };

//   const stopAutoRotate = () => {
//     if (intervalRef.current) clearInterval(intervalRef.current);
//   };

//   // Dynamic height adjustment
//   useEffect(() => {
//     if (!textRef.current) return;

//     const el = textRef.current.children[active] as HTMLElement;
//     if (el) textRef.current.style.height = `${el.offsetHeight}px`;
//   }, [active]);

//   return (
//     <div className="relative font-inter antialiased">
//       <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
//         <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
//           <div className="flex justify-center">
//             <div className="w-full max-w-3xl mx-auto text-center">
//               {/* IMAGE */}
//               <div className="relative h-32 mb-6">
//                 <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] pointer-events-none before:absolute before:inset-0 before:bg-gradient-to-b before:from-indigo-500/25 before:via-indigo-500/5 before:via-25% before:to-indigo-500/0 before:to-75% before:rounded-full before:-z-10">
//                   <div className="h-32 [mask-image:_linear-gradient(0deg,transparent,white_20%,white)]">
//                     <AnimatePresence mode="wait">
//                       <motion.div
//                         key={active}
//                         initial={{ opacity: 0, rotate: -60 }}
//                         animate={{ opacity: 1, rotate: 0 }}
//                         exit={{ opacity: 0, rotate: 60 }}
//                         transition={{
//                           duration: 0.7,
//                           ease: [0.68, -0.3, 0.32, 1],
//                         }}
//                         className="absolute inset-0 flex items-center justify-center"
//                       >
//                         <Image
//                           src={testimonials[active].img}
//                           alt={testimonials[active].name}
//                           width={156}
//                           height={156}
//                           className="rounded-full top-11 relative"
//                         />
//                       </motion.div>
//                     </AnimatePresence>
//                   </div>
//                 </div>
//               </div>

//               {/* TEXT QUOTES */}
//               <div
//                 ref={textRef}
//                 className="mb-9 relative flex flex-col transition-all duration-150 ease-in-out"
//               >
//                 <AnimatePresence mode="wait">
//                   <motion.div
//                     key={active}
//                     initial={{ opacity: 0, x: -20 }}
//                     animate={{ opacity: 1, x: 0 }}
//                     exit={{ opacity: 0, x: 20, position: "absolute" }}
//                     transition={{ duration: 0.5 }}
//                   >
//                     <div className="text-2xl font-bold text-slate-900 before:content-['\u201C'] after:content-['\u201D']">
//                       {testimonials[active].quote}
//                     </div>
//                   </motion.div>
//                 </AnimatePresence>
//               </div>

//               {/* BUTTONS */}
//               <div className="flex flex-wrap justify-center -m-1.5">
//                 {testimonials.map((t, index) => (
//                   <button
//                     key={index}
//                     onClick={() => {
//                       stopAutoRotate();
//                       setActive(index);
//                     }}
//                     className={`inline-flex justify-center whitespace-nowrap rounded-full px-3 py-1.5 m-1.5 text-xs shadow-sm transition-colors duration-150
//                       ${
//                         active === index
//                           ? "bg-indigo-500 text-white shadow-indigo-950/10"
//                           : "bg-white hover:bg-indigo-100 text-slate-900"
//                       }`}
//                   >
//                     {t.name}
//                     <span
//                       className={`px-1 ${
//                         active === index ? "text-indigo-200" : "text-slate-300"
//                       }`}
//                     >
//                       -
//                     </span>
//                     {t.role}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Testimonial {
  img: string;
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    img: "/logo3.png",
    quote:
      "Working with Vishweshwar Industries completely transformed our digital presence. Amit Mishra and his team delivered a beautiful website and branding strategy that helped us attract more students and improve our credibility.",
    name: "Jaswant Singh",
    role: "Atom Learning Center",
  },
  {
    img: "/logo4.png",
    quote:
      "Amit Mishra and the Vishweshwar Industries team built our corporate website and marketing materials from scratch. The professionalism and attention to detail were exceptional. Our brand now looks truly world-class.",
    name: "Kirti Kapoor",
    role: "Paradigm Spaces",
  },
  {
    img: "/iOS-and-Android-development.png",
    quote:
      "Vishweshwar Industries helped us launch our new website and digital branding campaign. Their design sense and technical expertise gave our construction brand a modern and trustworthy image online.",
    name: "Imran Khan",
    role: "ECR Builders",
  },
  {
    img: "/logo3.png",
    quote:
      "From brochure design to website development, Amit Mishra ensured every detail matched our business identity. Vishweshwar Industries truly understands how to build a strong brand digitally.",
    name: "Rajhans Fagna",
    role: "BMR Enterprises",
  },
  {
    img: "/logo4.png",
    quote:
      "Our mobile application and marketing website were developed flawlessly by Vishweshwar Industries. Amit Mishra’s guidance throughout the project made the entire process smooth and highly efficient.",
    name: "Sandeep Arora",
    role: "Arora Logistics",
  },
  {
    img: "/logo3.png",
    quote:
      "The branding and digital strategy created by Vishweshwar Industries helped our company stand out in a competitive market. Amit Mishra and his team are incredibly creative and reliable.",
    name: "Neha Sharma",
    role: "NS Interiors",
  },
  {
    img: "/logo4.png",
    quote:
      "We approached Vishweshwar Industries for a complete digital transformation — website, brochures, and social media marketing. Amit Mishra delivered outstanding results that elevated our brand image.",
    name: "Rohit Bansal",
    role: "Bansal Trading Co.",
  },
  {
    img: "/iOS-and-Android-development.png",
    quote:
      "Amit Mishra and the Vishweshwar Industries team provided exceptional service. Our website and branding now reflect the scale and professionalism of our business.",
    name: "Pooja Verma",
    role: "Verma Healthcare",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const autorotateTiming = 7000;

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const textRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- AUTO ROTATION ---------------- */

  const stopAutoRotate = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const startAutoRotate = useCallback(() => {
    stopAutoRotate();

    intervalRef.current = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, autorotateTiming);
  }, [stopAutoRotate]);

  useEffect(() => {
    startAutoRotate();
    return stopAutoRotate;
  }, [startAutoRotate, stopAutoRotate]);

  /* ---------------- DYNAMIC HEIGHT ---------------- */

  useEffect(() => {
    const container = textRef.current;
    if (!container) return;

    const el = container.children[0] as HTMLElement;
    if (el) container.style.height = `${el.offsetHeight}px`;
  }, [active]);

  return (
    <div className="relative font-inter antialiased">
      <main className="relative min-h-screen flex flex-col justify-center bg-slate-50 overflow-hidden">
        <div className="w-full max-w-6xl mx-auto px-4 md:px-6 py-24">
          <div className="flex justify-center">
            <div className="w-full max-w-3xl mx-auto text-center">
              {/* IMAGE */}
              <div className="relative h-40 mb-6">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[480px] h-[480px] pointer-events-none">
                  {/* GOLDEN GLOW CIRCLE */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-b from-amber-400/35 via-amber-300/15 via-25% to-transparent to-75%" />

                  {/* MASKED IMAGE */}
                  <div className="h-40 flex items-center justify-center [mask-image:linear-gradient(0deg,transparent,white_25%,white)]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={active}
                        initial={{ opacity: 0, rotate: -60 }}
                        animate={{ opacity: 1, rotate: 0 }}
                        exit={{ opacity: 0, rotate: 60 }}
                        transition={{
                          duration: 0.7,
                          ease: [0.68, -0.3, 0.32, 1],
                        }}
                        className="flex items-center justify-center"
                      >
                        <Image
                          src={testimonials[active].img}
                          alt={testimonials[active].name}
                          width={156}
                          height={156}
                          priority
                          unoptimized
                          className="rounded-full object-contain"
                        />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>
              </div>

              {/* TEXT */}
              {/* TEXT */}
              <div
                ref={textRef}
                className="mb-12 relative flex flex-col items-center transition-all duration-200 ease-in-out px-4"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20, position: "absolute" }}
                    transition={{ duration: 0.5 }}
                    className="max-w-2xl"
                  >
                    <div className="text-lg md:text-xl font-semibold leading-relaxed text-blue-900 before:content-['\u201C'] after:content-['\u201D']">
                      {testimonials[active].quote}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
              {/* BUTTONS */}
              <div className="flex flex-wrap justify-center -m-1.5">
                {testimonials.map((t, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      stopAutoRotate();
                      setActive(index);
                    }}
                    className={`inline-flex justify-center whitespace-nowrap rounded-full px-3 py-1.5 m-1.5 text-xs shadow-sm transition-colors duration-150
                    ${
                      active === index
                        ? "bg-amber-600 text-white shadow-amber-500/30"
                        : "bg-white hover:bg-amber-100 text-slate-900"
                    }`}
                  >
                    {t.name}
                    <span
                      className={`px-1 ${
                        active === index ? "text-amber-200" : "text-slate-300"
                      }`}
                    >
                      -
                    </span>
                    {t.role}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
