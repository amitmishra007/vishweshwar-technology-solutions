import Image from "next/image";
import { motion } from "framer-motion";
import FancyButton from "./FancyButton";

export default function MobileAppSlide() {
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-white to-gray-200 flex items-center justify-center overflow-hidden">
      {/* 🔥 Animated Blob Background */}
      <div className="section-blob-bg">
        <svg preserveAspectRatio="xMidYMid slice" viewBox="10 10 80 80">
          <path
            fill="#FCF5E5"
            className="blob-out-top"
            d="M37-5C25.1-14.7,5.7-19.1-9.2-10-28.5,1.8-32.7,31.1-19.8,49c15.5,21.5,52.6,22,67.2,2.3C59.4,35,53.7,8.5,37-5Z"
          />
          <path
            fill="#FAFAFA"
            className="blob-in-top"
            d="M20.6,4.1C11.6,1.5-1.9,2.5-8,11.2-16.3,23.1-8.2,45.6,7.4,50S42.1,38.9,41,24.5C40.2,14.1,29.4,6.6,20.6,4.1Z"
          />
          <path
            fill="#FFF5EE"
            className="blob-out-bottom"
            d="M105.9,48.6c-12.4-8.2-29.3-4.8-39.4.8-23.4,12.8-37.7,51.9-19.1,74.1s63.9,15.3,76-5.6c7.6-13.3,1.8-31.1-2.3-43.8C117.6,63.3,114.7,54.3,105.9,48.6Z"
          />
          <path
            fill="#F9F6EE"
            className="blob-in-bottom"
            d="M102,67.1c-9.6-6.1-22-3.1-29.5,2-15.4,10.7-19.6,37.5-7.6,47.8s35.9,3.9,44.5-12.5C115.5,92.6,113.9,74.6,102,67.1Z"
          />
        </svg>
      </div>

      {/* CONTENT (always on top) */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 md:pt-28 lg:pt-32 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* LEFT TEXT */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9 }}
            className="space-y-6 text-center md:text-left"
          >
            <p className="text-gray-700 opacity-90 text-base sm:text-lg md:text-xl lg:text-2xl">
              Android • iOS • Cross-Platform <br />
              Flutter • React Native • Kotlin • Swift
            </p>

            <h1
              className="
              font-bold text-gray-900
              text-4xl sm:text-2xl md:text-2xl lg:text-3xl
              leading-tight
            "
            >
              High-Performance Mobile Applications
            </h1>

            <div className="flex md:justify-start justify-center">
              <FancyButton text="Explore Mobile Apps" href="/services" />
            </div>
          </motion.div>

          {/* RIGHT IMAGE */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.1 }}
            className="flex justify-center"
          >
            <Image
              src="/responsive_webste.svg"
              alt="Mobile Apps"
              width={600}
              height={500}
              className="
                w-60 sm:w-72 md:w-80 lg:w-[420px] xl:w-[500px]
                h-auto drop-shadow-xl
              "
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
