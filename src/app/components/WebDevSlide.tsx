import Image from "next/image";
import { motion } from "framer-motion";
import FancyButton from "./FancyButton";

export default function WebDevSlide() {
  return (
    <div className="relative w-full h-full text-white flex items-center justify-center overflow-hidden">
      {/* 🔥 Animated Sliding Background Layers */}
      <div className="bg-anim"></div>
      <div className="bg-anim bg2"></div>
      <div className="bg-anim bg3"></div>

      {/* CONTENT */}
      <div className="max-w-6xl mx-auto px-6 pt-24 md:pt-28 lg:pt-32 w-full relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="space-y-6 text-center md:text-left"
          >
            <h1
              className="
    font-bold 
    text-2xl sm:text-2xl md:text-2xl lg:text-3xl
    bg-gradient-to-r from-black via-blue-950 to-amber-950
    bg-clip-text text-transparent
  "
            >
              Modern & Scalable Web Development
            </h1>

            <p className="opacity-90 text-base sm:text-sm md:text-md lg:text-lg text-black">
              <strong>Frontend:</strong>
              {""} React • Next.js • Angular • Vue <br />
              <strong>Backend:</strong>
              {""} Node.js • PHP • Java • ASP.NET
            </p>

            <div className="flex md:justify-start justify-center">
              <FancyButton text="View Web Services" href="/services" />
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1 }}
            className="flex justify-center md:items-center"
          >
            <Image
              src="/responsive-design.png"
              alt="Web Development"
              width={650}
              height={500}
              className="
                w-72 sm:w-80 md:w-96 lg:w-[440px] xl:w-[520px]
                h-auto drop-shadow-2xl
              "
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
