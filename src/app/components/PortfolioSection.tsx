"use client";
import { useState, useEffect, JSX } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// TYPES
type Category = "Websites" | "Brochures" | "Logos";

const categories: Category[] = ["Websites", "Brochures", "Logos"];

const data: Record<Category, string[]> = {
  Websites: [
    "/websites/Vishweshwar_Industries_Bhiwadi_Client_Paradigm_Spaces_Gurugram.png",
    "/websites/Vishweshwar_Industries_Bhiwadi_Client_Atom_Learning_Centre_Gurugram.png",
    "/websites/site3.jpg",
  ],
  Brochures: ["/logos/BMRPROFILEUPDATED.pdf", "/logos/BMRPROFILEUPDATED.pdf"],
  Logos: [
    "/logos/vishweshwar_industries_client_paradigm-spaces-gurugram-logo.svg",
    "/logos/bmr-enterprises-bhiwadi-logo.png",
  ],
};

export default function Portfolio(): JSX.Element {
  const [activeCategory, setActiveCategory] = useState<Category>("Websites");
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // SCROLL LOCK
  useEffect(() => {
    if (activeIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [activeIndex]);

  const images: string[] = data[activeCategory];

  return (
    <section className="w-screen h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-blue-950 text-white overflow-hidden relative">
      <div className="absolute -top-10 -left-10 w-96 h-96 bg-amber-400/20 blur-[160px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/20 blur-[160px] rounded-full" />
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] [background-size:28px_28px]" />

      {/* CATEGORY NAV */}
      <div className="absolute top-10 w-full flex justify-center gap-6 z-20">
        {categories.map((cat: Category) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`cursor-col-resize px-6 py-2 border rounded-full transition-all ${
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
      <motion.div layout className="grid grid-cols-3 gap-4 p-20 pt-32">
        {images.map((img: string, index: number) => (
          <motion.div
            key={`${img}_${index}`}
            layoutId={img}
            onClick={() => setActiveIndex(index)}
            className="cursor-pointer overflow-hidden rounded-2xl group bg-neutral-900"
            whileHover={{ scale: 1.05 }}
          >
            {/* WEBSITES */}
            {activeCategory === "Websites" && (
              <div className="relative w-full h-[300px] overflow-hidden">
                <Image
                  src={img}
                  alt="portfolio"
                  width={1200}
                  height={2000}
                  className="w-full h-auto transition-transform duration-[8000ms] ease-in-out group-hover:-translate-y-[60%]"
                />
              </div>
            )}

            {/* BROCHURES (SUBTLE PDF CARD) */}
            {activeCategory === "Brochures" && (
              <div className="relative w-full h-[300px] overflow-hidden bg-white group">
                {/* PDF subtle scrolling preview */}
                <embed
                  src={`${img}#page=1&view=FitH`}
                  type="application/pdf"
                  className="w-full h-full pointer-events-none transition-transform duration-[6000ms] ease-linear group-hover:-translate-y-[40%]"
                />

                {/* minimal dark overlay on hover */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

                {/* ACTIONS (ONLY ON HOVER) */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(index);
                    }}
                    className="px-4 py-2 text-xs bg-white/90 text-black rounded-md font-semibold"
                  >
                    Open
                  </button>

                  <a
                    href={img}
                    download
                    onClick={(e) => e.stopPropagation()}
                    className="px-4 py-2 text-xs bg-white/90 text-black rounded-md font-semibold"
                  >
                    Download
                  </a>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveIndex(null);
                    }}
                    className="px-4 py-2 text-xs bg-white/90 text-black rounded-md font-semibold"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}

            {/* LOGOS (CENTERED + CONTAINED) */}
            {activeCategory === "Logos" && (
              <div className="relative w-full h-[220px] flex items-center justify-center p-6">
                <Image
                  src={img}
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
            className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* CLOSE */}
            <button
              className="absolute top-6 right-6 text-2xl"
              onClick={() => setActiveIndex(null)}
            >
              ✕
            </button>

            {/* WEBSITES VIEW */}
            {activeCategory === "Websites" && (
              <motion.img
                key={images[activeIndex]}
                src={images[activeIndex]}
                alt="preview"
                className="max-h-[80vh] rounded-2xl shadow-2xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
              />
            )}

            {/* BROCHURE FULL VIEW (READABLE PDF) */}
            {activeCategory === "Brochures" && (
              <div className="w-[85vw] h-[85vh] bg-white rounded-xl overflow-hidden shadow-2xl">
                <iframe src={images[activeIndex]} className="w-full h-full" />
              </div>
            )}

            {/* LOGO VIEW */}
            {activeCategory === "Logos" && (
              <motion.img
                key={images[activeIndex]}
                src={images[activeIndex]}
                className="max-h-[60vh] object-contain"
              />
            )}

            {/* NAV */}
            <div className="flex gap-6 mt-6">
              <button
                onClick={() =>
                  setActiveIndex((prev) => {
                    if (prev === null) return 0;
                    return (prev - 1 + images.length) % images.length;
                  })
                }
              >
                Prev
              </button>
              <button
                onClick={() =>
                  setActiveIndex((prev) => {
                    if (prev === null) return 0;
                    return (prev + 1) % images.length;
                  })
                }
              >
                Next
              </button>
            </div>

            {/* CATEGORY SWITCH INSIDE MODAL */}
            <div className="flex gap-4 mt-8">
              {categories.map((cat: Category) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveIndex(0);
                  }}
                  className="text-sm opacity-70 hover:opacity-100"
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
