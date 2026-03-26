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
  const [activeCategory, setActiveCategory] = useState<Category>("Websites");

  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [start, setStart] = useState({ x: 0, y: 0 });

  // RESET on change
  useEffect(() => {
    setZoom(1);
    setPosition({ x: 0, y: 0 });
  }, [activeIndex, activeCategory]);

  // CATEGORY-BASED ZOOM LIMITS
  const maxZoom =
    activeCategory === "Logos" ? 1.8 : activeCategory === "Brochures" ? 2.2 : 3;

  const items = data[activeCategory];

  // 🔒 MODAL CONTROL (SAFE)
  useEffect(() => {
    setIsModalOpen(activeIndex !== null);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow =
      activeIndex !== null ? "hidden" : originalOverflow;

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [activeIndex, setIsModalOpen]);

  // ⌨️ ESC CLOSE (UX BOOST)
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveIndex(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <section className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-blue-950 text-white relative overflow-hidden">
      {/* BACKGROUND */}
      <div className="absolute -top-10 -left-10 w-96 h-96 bg-amber-400/20 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-500/20 blur-[160px] rounded-full pointer-events-none" />

      {/* CATEGORY NAV */}
      <div className="sticky top-0 z-30 backdrop-blur-md bg-black/20 py-6 flex justify-center gap-4 md:gap-6">
        {categories.map((cat) => (
          <button
            key={cat}
            suppressHydrationWarning
            onClick={() => setActiveCategory(cat)}
            className={`px-4 md:px-6 py-2 text-sm md:text-base rounded-full border transition ${
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
            key={`${activeCategory}-${index}`} // 🔥 FIXED KEY
            layoutId={`${activeCategory}-${index}`}
            onClick={() => setActiveIndex(index)}
            className="group rounded-2xl overflow-hidden bg-neutral-900 cursor-pointer will-change-transform"
            whileHover={{ scale: 1.03 }}
          >
            {/* WEBSITES */}
            {activeCategory === "Websites" && (
              <div className="h-[220px] md:h-[300px] overflow-hidden">
                <Image
                  src={item}
                  alt="website preview"
                  width={1200}
                  height={2000}
                  priority={index === 0}
                  className="w-full h-auto transition-transform duration-[8000ms] ease-linear group-hover:-translate-y-[60%]"
                />
              </div>
            )}

            {/* BROCHURES */}
            {activeCategory === "Brochures" && (
              <div className="h-[220px] md:h-[300px] overflow-hidden bg-white">
                <iframe
                  src={`${item}#page=1&view=FitH`}
                  className="w-full h-[600px] pointer-events-none"
                  loading="lazy"
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
            key="viewer"
            className="fixed inset-0 z-50 bg-[#0b0f19] text-white flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* 🔥 LEFT CATEGORY SIDEBAR */}
            <div className="w-[110px] md:w-[180px] border-r border-white/10 p-4 flex flex-col gap-4">
              {categories.map((cat) => (
                <div
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveIndex(0);
                  }}
                  className={`cursor-pointer rounded-xl p-3 text-xs md:text-sm transition ${
                    activeCategory === cat
                      ? "bg-white text-black"
                      : "bg-white/5 hover:bg-white/10"
                  }`}
                >
                  {cat}
                </div>
              ))}
            </div>

            {/* 🔥 MAIN VIEWER */}
            <div className="flex-1 relative flex flex-col items-center justify-center overflow-hidden">
              {/* CLOSE */}
              <button
                className="absolute top-6 right-6 text-2xl z-50"
                onClick={() => setActiveIndex(null)}
              >
                ✕
              </button>

              {/* ZOOM CONTROLS */}
              <div className="absolute top-6 left-1/2 -translate-x-1/2 flex gap-3 z-50 bg-black/40 px-4 py-2 rounded-lg backdrop-blur">
                <button onClick={() => setZoom((z) => Math.max(1, z - 0.2))}>
                  −
                </button>
                <button
                  onClick={() => setZoom((z) => Math.min(maxZoom, z + 0.2))}
                >
                  +
                </button>
                <button
                  onClick={() => {
                    setZoom(1);
                    setPosition({ x: 0, y: 0 });
                  }}
                >
                  Reset
                </button>
              </div>

              {/* 🧠 DRAG + ZOOM CONTAINER */}
              <div
                className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                onMouseDown={(e) => {
                  setDragging(true);
                  setStart({
                    x: e.clientX - position.x,
                    y: e.clientY - position.y,
                  });
                }}
                onMouseMove={(e) => {
                  if (!dragging) return;
                  setPosition({
                    x: e.clientX - start.x,
                    y: e.clientY - start.y,
                  });
                }}
                onMouseUp={() => setDragging(false)}
                onMouseLeave={() => setDragging(false)}
                onWheel={(e) => {
                  e.preventDefault();
                  const delta = e.deltaY > 0 ? -0.15 : 0.15;
                  setZoom((z) => Math.min(maxZoom, Math.max(1, z + delta)));
                }}
              >
                {/* 🖼 WEBSITES */}
                {activeCategory === "Websites" && (
                  <motion.img
                    src={items[activeIndex]}
                    draggable={false}
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                    }}
                    className="max-h-[85vh] object-contain select-none"
                  />
                )}

                {/* 📄 BROCHURES */}
                {activeCategory === "Brochures" && (
                  <div
                    style={{
                      transform: `scale(${zoom})`,
                    }}
                    className="w-[80vw] h-[85vh] bg-white rounded-xl overflow-auto"
                  >
                    <iframe
                      src={items[activeIndex]}
                      className="w-full h-full"
                    />
                  </div>
                )}

                {/* 🧩 LOGOS (LESS ZOOM) */}
                {activeCategory === "Logos" && (
                  <motion.img
                    src={items[activeIndex]}
                    draggable={false}
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
                    }}
                    className="max-h-[60vh] object-contain"
                  />
                )}
              </div>

              {/* 🔥 THUMBNAIL STRIP (PREV/NEXT UPGRADED) */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 bg-black/40 p-3 rounded-xl backdrop-blur-md">
                {items.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`w-16 h-12 md:w-20 md:h-14 overflow-hidden rounded-md cursor-pointer border transition ${
                      activeIndex === i
                        ? "border-white scale-105"
                        : "border-white/20 hover:border-white/60"
                    }`}
                  >
                    {activeCategory === "Brochures" ? (
                      <div className="bg-white w-full h-full text-black flex items-center justify-center text-xs font-medium">
                        PDF
                      </div>
                    ) : (
                      <Image
                        alt={`${item}_${i}_image_vishweshwar_industries_client_logo`}
                        src={item}
                        width={300}
                        height={200}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
