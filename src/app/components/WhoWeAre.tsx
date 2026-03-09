"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface Step {
  number: string;
  title: string;
  description: string[];
  image: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    title: "Consultation",
    description: [
      "Business analysis",
      "Requirements gathering",
      "Creating mockups",
    ],
    image:
      "https://cdn.pixabay.com/photo/2017/01/10/23/01/seo-1970475_960_720.png",
  },
  {
    number: "02",
    title: "Planning",
    description: [
      "Define scope",
      "Set budget & timeline",
      "Develop project plan",
    ],
    image:
      "https://cdn.pixabay.com/photo/2017/03/08/14/20/flat-2126876_960_720.png",
  },
  {
    number: "03",
    title: "Execution",
    description: ["Development", "Monitoring & reporting", "Testing"],
    image:
      "https://cdn.pixabay.com/photo/2017/03/08/14/20/flat-2126878_960_720.png",
  },
  {
    number: "04",
    title: "Delivery",
    description: ["UAT", "Handover", "Documentation & go-live"],
    image:
      "https://cdn.pixabay.com/photo/2017/01/10/23/01/vector-1970471_960_720.png",
  },
];

export default function ZigZagInfographic() {
  return (
    <section className="relative w-full py-20 bg-blue-50">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center bg-gradient-to-r from-blue-950 via-amber-700 to-yellow-500 bg-clip-text text-transparent mb-20">
        Our Software Development Methodology
      </h2>

      <div className="flex flex-col items-center md:items-stretch md:flex-row md:justify-center md:space-x-10 space-y-16 md:space-y-0">
        {STEPS.map((step, idx) => {
          const isTop = idx % 2 === 1;

          return (
            <motion.div
              key={idx}
              className={`flex flex-col items-center md:items-${isTop ? "end" : "start"} justify-center w-64 relative
              p-4
              ${
                isTop
                  ? "border-t-8 border-t-amber-400 rounded-t-full shadow-lg"
                  : "border-b-8 border-b-blue-400 rounded-b-full shadow-lg"
              }`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
            >
              {/* Step Number */}
              <div className="absolute -top-8 md:-top-10 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-orange-500 flex items-center justify-center text-white font-bold text-lg shadow-xl z-10">
                {step.number}
              </div>

              {/* Image */}
              <div className="w-full h-40 mb-4">
                <Image
                  src={step.image}
                  alt={step.title}
                  width={300}
                  height={200}
                  className="object-contain w-full h-full"
                />
              </div>

              {/* Title */}
              <h3 className="text-center md:text-left font-semibold text-blue-900 text-lg mb-2">
                {step.title}
              </h3>

              {/* Description as bullets */}
              <ul className="list-disc list-inside text-center md:text-left text-blue-800 text-sm space-y-1">
                {step.description.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>

              {/* Connecting arrows for desktop */}
              {idx < STEPS.length - 1 && (
                <div
                  className={`hidden md:block absolute top-1/2 w-32 h-1 rounded-full ${
                    isTop ? "bg-amber-400" : "bg-blue-400"
                  }`}
                  style={{
                    left: isTop ? "-128px" : "100%",
                    transform: isTop
                      ? "translateY(-50%) rotate(15deg)"
                      : "translateY(-50%) rotate(-15deg)",
                  }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
