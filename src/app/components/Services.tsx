"use client";
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Crown,
  Globe,
  Code,
  PenTool,
  Mail,
  Server,
  Brush,
} from "lucide-react";

const cardData = [
  {
    title: "Mobile Application Development",
    description:
      "We craft world-class Android and iOS applications that deliver seamless performance and elevate user experiences.",
    imgSrc: "/iOS-and-Android-development.png",
    icon: <Globe size={16} className="text-blue-600" />,
  },
  {
    title: "Website Development",
    description:
      "We build fast, modern, SEO-optimized websites using technologies like Next.js and Angular for exceptional digital experiences.",
    imgSrc: "/resposnsive-website-development.png",
    icon: <Code size={16} className="text-purple-600" />,
  },
  {
    title: "Graphics Development",
    description:
      "Logos, brochures, animations, and motion graphics — we create powerful visuals that leave a lasting impression.",
    imgSrc: "/iOS-and-Android-development.png",
    icon: <PenTool size={16} className="text-pink-600" />,
  },
  {
    title: "SEO / SMO",
    description:
      "We run targeted campaigns that boost search rankings, maximize reach, and help your business stand out online.",
    imgSrc: "/iOS-and-Android-development.png",
    icon: <Brush size={16} className="text-yellow-500" />,
  },
  {
    title: "Bulk SMS / Email",
    description:
      "Deliver your message to thousands in a single click with our high-speed and high-deliverability messaging services.",
    imgSrc: "/iOS-and-Android-development.png",
    icon: <Mail size={16} className="text-green-500" />,
  },
  {
    title: "Hosting / AMC",
    description:
      "Reliable hosting and professional AMC services to ensure your digital presence is fast, secure, and always available.",
    imgSrc: "/iOS-and-Android-development.png",
    icon: <Server size={16} className="text-indigo-500" />,
  },
];

// ✨ Card appearance animation
const cardVariants = {
  hidden: { opacity: 0, y: -40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

// ✨ Hover shine
const shineVariants = {
  rest: { backgroundPosition: "-200% 0" },
  hover: {
    backgroundPosition: "200% 0",
    transition: { duration: 1.8, ease: "easeInOut" },
  },
};

export default function Services() {
  return (
    <div className="bg-[#fafafa] relative overflow-hidden pb-20">
      {/* === Section Header === */}
      <section className="max-w-7xl mx-auto px-6 pt-12 pb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center relative z-10">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="relative flex items-center gap-2 before:content-['----'] after:content-['----'] before:text-cyan-900 after:text-cyan-900 before:mr-2 after:ml-2">
            <Crown size={16} className="text-[#3d5a80]" />
          </div>
          <h2 className="text-md text-left uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-700 leading-relaxed font-black">
            OUR SERVICES
          </h2>
          <p className="text-2xl font-extrabold text-[#293241] leading-snug pt-2">
            Smart Solutions for your Digital Needs
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-right uppercase bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-purple-600 to-pink-700 font-black leading-relaxed">
            We provide world-class digital services that help businesses grow
            smarter and faster.
          </p>
        </motion.div>
      </section>

      {/* === Cards Grid === */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
      >
        {cardData.map((card, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={cardVariants}
            whileHover="hover"
            initial="rest"
            animate="rest"
            className="group relative bg-white rounded-xl p-6 flex flex-col items-center text-center transition-all duration-500 overflow-hidden
            shadow-lg hover:shadow-[0_0_30px_0_rgba(59,130,246,0.4),0_0_30px_0_rgba(139,92,246,0.3),0_0_30px_0_rgba(236,72,153,0.3)]"
          >
            {/* === Hover Shine === */}
            <motion.div
              variants={shineVariants}
              className="absolute inset-0 bg-[linear-gradient(120deg,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition"
            />

            {/* === Image === */}
            <Image
              src={card.imgSrc}
              alt={card.title}
              width={800}
              height={800}
              className="object-contain h-56 w-56 md:w-60 relative z-10 transition-transform duration-500 group-hover:scale-110"
            />

            {/* === Title === */}
            <h3 className="text-lg font-bold text-[#293241] mb-1 tracking-tight z-10">
              {card.title}
            </h3>

            {/* === Icon === */}
            <div className="z-10 before:content-['----'] after:content-['----'] before:text-cyan-900 after:text-cyan-900 before:mr-2 after:ml-2 flex items-center justify-center">
              {card.icon}
            </div>

            {/* === Description === */}
            <p className="text-gray-600 text-sm z-10 text-center bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-700">
              {card.description}
            </p>

            {/* === Button === */}
            <button className="relative inline-flex items-center justify-center px-5 py-5 mt-4 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500 cursor-pointer z-10">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700 rounded-full"></span>
              <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
              <span className="relative text-white">
                <ArrowRight size={18} />
              </span>
            </button>
          </motion.div>
        ))}
      </motion.section>
    </div>
  );
}
