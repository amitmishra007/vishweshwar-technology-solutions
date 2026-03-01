"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useTransform,
  animate,
  MotionValue,
} from "framer-motion";
import { useEffect, useState, Dispatch, SetStateAction } from "react";
import Link from "next/link";
import FancyButton from "./FancyButton";
import fadeUp from "../utils/animation";

type SlideProps = {
  setHeroPaused: Dispatch<SetStateAction<boolean>>;
};

export default function GraphicsSlide({ setHeroPaused }: SlideProps) {
  const logos: string[] = [
    "/logo1.png",
    "/logo2.png",
    "/logo3.png",
    "/logo4.png",
    "/logo5.png",
    "/logo6.png",
    "/logo7.png",
    "/logo8.png",
  ];

  const rotation = useMotionValue(0);
  const [orbitSize, setOrbitSize] = useState(420);

  useEffect(() => {
    const controls = animate(rotation, 360, {
      duration: 35,
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [rotation]);

  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      let size;
      if (width < 768) size = width * 0.78;
      else if (width < 1280) size = width * 0.46;
      else size = width * 0.28;
      setOrbitSize(size);
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const logoSize = orbitSize * 0.14;
  const coreSize = orbitSize * 0.65;
  const radius = orbitSize / 2 - logoSize / 2;

  const services = [
    { title: "Logo Design & Visual Identity Systems", id: "logo-design" },
    { title: "Brand Guidelines & Brand Architecture", id: "brand-guidelines" },
    { title: "Brochures & Print Collaterals", id: "print-design" },
    { title: "Packaging & Product Label Design", id: "packaging-design" },
    { title: "Corporate Stationery & Business Cards", id: "stationery-design" },
    { title: "Marketing Creatives & Digital Assets", id: "marketing-design" },
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      onMouseEnter={() => setHeroPaused(true)}
      onMouseLeave={() => setHeroPaused(false)}
      className="relative w-full h-full flex items-center justify-center
        bg-gradient-to-b from-white to-blue-50
        text-blue-950 overflow-hidden pt-[80px]"
    >
      <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-center px-6 md:px-8 py-12 md:py-0">
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="w-full md:w-auto flex flex-col items-start justify-center"
        >
          <div className="text-left space-y-4">
            {/* Heading */}
            <motion.h1
              variants={fadeUp(0.6)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold leading-tight
                bg-gradient-to-r from-blue-950 via-amber-700 to-yellow-500
                bg-clip-text text-transparent"
            >
              Strategic Graphics & Brand Identity
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={fadeUp(0.7)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-sm text-blue-900/80 leading-relaxed max-w-[380px]"
            >
              We architect cohesive visual systems that blend aesthetic
              precision, brand psychology, and market positioning — delivering
              timeless, high-impact brand ecosystems.
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
              {services.map((service, i) => (
                <motion.div
                  key={i}
                  variants={fadeUp(0.5)}
                  whileHover={{ scale: 1.02, y: -2 }}
                  className="group relative py-2 px-4 rounded-r-2xl
                    bg-white/60 backdrop-blur-md
                    border border-blue-100
                    hover:border-[#d4af37]/70
                    transition-all duration-300
                    hover:shadow-[0_6px_18px_rgba(212,175,55,0.18)]
                    cursor-pointer max-w-max"
                >
                  <Link href={`/services#${service.id}`}>
                    <div
                      className="absolute left-0 top-0 h-full w-[2px]
                        bg-gradient-to-b from-[#d4af37] to-[#f5d76e]
                        rounded-l-lg opacity-80"
                    />
                    <p className="pl-3 text-sm font-medium text-blue-950 group-hover:text-amber-700 transition">
                      {service.title}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* View Work Button */}
            <motion.div
              variants={fadeUp(0.9)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex justify-start mt-4"
            >
              <FancyButton text="View Graphics Work" href="/services" />
            </motion.div>
          </div>
        </motion.div>

        {/* RIGHT SIDE ORBIT */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="w-full md:w-1/2 flex items-center justify-center mt-10 md:mt-0"
        >
          <div
            className="relative flex items-center justify-center"
            style={{ width: orbitSize, height: orbitSize }}
          >
            {/* Core Glow */}
            <motion.div
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 6, repeat: Infinity }}
              className="absolute rounded-full"
              style={{
                width: coreSize,
                height: coreSize,
                background: `radial-gradient(circle at center,
                  rgba(255,215,0,0.9) 0%,
                  rgba(212,175,55,0.8) 40%,
                  rgba(25,32,72,0.4) 75%,
                  rgba(10,15,40,0.2) 100%)`,
                boxShadow: `
                  0 0 60px rgba(255,215,0,0.6),
                  0 0 120px rgba(212,175,55,0.4)
                `,
              }}
            />

            {/* Orbit Ring */}
            <div
              className="absolute rounded-full border border-yellow-400"
              style={{
                width: orbitSize,
                height: orbitSize,
                boxShadow:
                  "0 0 30px rgba(255,215,0,0.6), 0 0 80px rgba(212,175,55,0.4)",
              }}
            />

            {/* Rotating Logos */}
            <motion.div style={{ rotate: rotation }} className="absolute z-30">
              {logos.map((logo, index) => {
                const angle = (360 / logos.length) * index;
                return (
                  <OrbitLogo
                    key={index}
                    logo={logo}
                    angle={angle}
                    radius={radius}
                    rotation={rotation}
                    logoSize={logoSize}
                  />
                );
              })}
            </motion.div>

            {/* Center Image */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 5 }}
              className="relative z-20"
            >
              <Image
                src="/graphics.png"
                alt="Graphics Design"
                width={400}
                height={400}
                style={{ width: coreSize * 0.9, height: "auto" }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

/* ================= Orbit Logo ================= */
function OrbitLogo({
  logo,
  angle,
  radius,
  rotation,
  logoSize,
}: {
  logo: string;
  angle: number;
  radius: number;
  rotation: MotionValue<number>;
  logoSize: number;
}) {
  const uprightRotation = useTransform(rotation, (r) => -(r + angle));

  return (
    <div
      className="absolute top-1/2 left-1/2"
      style={{ transform: `rotate(${angle}deg) translate(${radius}px)` }}
    >
      <motion.div
        style={{
          rotate: uprightRotation,
          width: logoSize,
          height: logoSize,
          transform: "translate(-50%, -50%)",
        }}
        whileHover={{ scale: 1.1 }}
        className="flex items-center justify-center
          bg-white/80 backdrop-blur-md rounded-full
          border border-white/40 shadow-md"
      >
        <Image
          src={logo}
          alt="Design Tool"
          width={60}
          height={60}
          style={{ width: logoSize * 0.6, height: logoSize * 0.6 }}
        />
      </motion.div>
    </div>
  );
}
