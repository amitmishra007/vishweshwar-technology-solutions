"use client";
import { useState, useEffect, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// TYPES
type Category = "Websites" | "Brochures" | "Logos";

const categories: Category[] = ["Websites", "Brochures", "Logos"];

const data: Record<Category, string[]> = {
  Websites: [
    "/websites/Vishweshwar_Industries_Bhiwadi_Client_Atom_Learning_Centre_Gurugram.png",
    "/websites/Vishweshwar_Industries_Bhiwadi_Client_Paradigm_Spaces_Gurugram.png",
    "/websites/Vishweshwar_Industries_Bhiwadi_Client_Atom_Learning_Centre_Gurugram.png",
    "/websites/Vishweshwar_Industries_Bhiwadi_Client_Paradigm_Spaces_Gurugram.png",
  ],
  Brochures: ["/logos/BMRPROFILEUPDATED.pdf", "/logos/BMRPROFILEUPDATED.pdf"],
  Logos: [
    "/logos/vishweshwar_industries_client_paradigm-spaces-gurugram-logo.svg",
    "/logos/bmr-enterprises-bhiwadi-logo.png",
  ],
};

export default function Portfolio({
  setIsModalOpen,
}: {
  setIsModalOpen: (val: boolean) => void;
}): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    setIsModalOpen(activeIndex !== null);
  }, [activeIndex, setIsModalOpen]);
  const [activeCategory, setActiveCategory] = useState<Category>("Websites");

  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "auto";
  }, [activeIndex]);

  const items = data[activeCategory];

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-blue-950 text-white relative overflow-hidden">
      {/* BG */}
      <div className="absolute -top-10 -left-10 w-96 h-96 bg-amber-400/20 blur-[160px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/20 blur-[160px] rounded-full" />

      {/* NAV */}
      <div className="sticky top-0 z-30 backdrop-blur-md bg-black/20 py-6 flex justify-center gap-4 md:gap-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`cursor-pointer px-4 md:px-6 py-2 text-sm md:text-base rounded-full border transition ${
              activeCategory === cat
                ? "bg-white text-black"
                : "border-white/30 hover:border-white"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <motion.div
        layout
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 p-6 md:p-16"
      >
        {items.map((item, index) => (
          <motion.div
            key={`${item}_${index}`}
            layoutId={item}
            onClick={() => setActiveIndex(index)}
            className="group rounded-2xl overflow-hidden bg-neutral-900 cursor-pointer"
            whileHover={{ scale: 1.03 }}
          >
            {/* WEBSITES */}
            {activeCategory === "Websites" && (
              <div className="h-[220px] md:h-[300px] overflow-hidden">
                <Image
                  src={item}
                  alt="website"
                  width={1200}
                  height={2000}
                  className="w-full h-auto transition-transform duration-[8000ms] ease-linear group-hover:-translate-y-[60%]"
                />
              </div>
            )}

            {/* BROCHURES (NOW SAME BEHAVIOR AS WEBSITE) */}
            {activeCategory === "Brochures" && (
              <div className="h-[220px] md:h-[300px] overflow-hidden bg-white">
                <iframe
                  src={`${item}#page=1&view=FitH`}
                  className="w-full h-[600px] pointer-events-none transition-transform duration-[8000ms] ease-linear group-hover:-translate-y-[50%]"
                />
              </div>
            )}

            {/* LOGOS */}
            {activeCategory === "Logos" && (
              <div className="h-[160px] md:h-[220px] flex items-center justify-center p-6 bg-gradient-to-br from-amber-50 via-white to-blue-100">
                <Image
                  src={item}
                  alt="logo"
                  width={300}
                  height={200}
                  className="object-contain max-w-full max-h-full"
                />
              </div>
            )}
          </motion.div>
        ))}
      </motion.div>

      {/* MODAL */}
      <AnimatePresence>
        {activeIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex flex-col items-center justify-center px-4 overflow-hidden
bg-gradient-to-br from-slate-900 via-blue-900 to-blue-950 text-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* BG INSIDE MODAL */}
            <div className="absolute -top-10 -left-10 w-96 h-96 bg-amber-400/20 blur-[160px] rounded-full" />
            <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/20 blur-[160px] rounded-full" />
            {/* CLOSE */}
            <button
              className="absolute top-6 right-6 text-2xl cursor-pointer "
              onClick={() => setActiveIndex(null)}
            >
              ✕
            </button>

            {/* CONTENT */}
            {activeCategory === "Websites" && (
              <motion.img
                src={items[activeIndex]}
                className="max-h-[80vh] rounded-xl"
              />
            )}

            {activeCategory === "Brochures" && (
              <div className="w-full md:w-[85vw] h-[70vh] md:h-[85vh] bg-white rounded-xl overflow-hidden">
                <iframe src={items[activeIndex]} className="w-full h-full" />
              </div>
            )}

            {activeCategory === "Logos" && (
              <motion.img
                src={items[activeIndex]}
                className="max-h-[50vh] object-contain"
              />
            )}

            {/* NAV */}
            <div className="flex gap-6 mt-6 text-sm md:text-base">
              <button
                className="cursor-pointer"
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === null
                      ? 0
                      : (prev - 1 + items.length) % items.length,
                  )
                }
              >
                Prev
              </button>
              <button
                className="cursor-pointer"
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === null ? 0 : (prev + 1) % items.length,
                  )
                }
              >
                Next
              </button>
            </div>

            {/* CATEGORY SWITCH */}
            <div className="flex gap-4 mt-6 text-xs md:text-sm opacity-70">
              {categories.map((cat) => (
                <button
                  className="cursor-pointer"
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveIndex(0);
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
