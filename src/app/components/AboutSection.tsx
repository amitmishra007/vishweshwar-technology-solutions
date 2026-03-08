"use client";

import Image from "next/image";
import { motion, useInView, animate } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Sparkles, ChevronDown } from "lucide-react";
import FancyButton from "./FancyButton";

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, to, {
      duration: 2,
      ease: "easeOut",
      onUpdate(value) {
        if (ref.current) {
          ref.current.textContent = Math.floor(value).toString();
        }
      },
    });

    return () => controls.stop();
  }, [isInView, to]);

  return <span ref={ref}>0</span>;
}

export default function AboutSection() {
  const [open, setOpen] = useState(false);

  return (
    <section className="relative w-full py-28 bg-gradient-to-b from-blue-50 via-white to-blue-50 overflow-hidden">
      {/* decorative glow */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/30 blur-[140px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-200/30 blur-[140px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        {/* ---------- STATS GRID ---------- */}

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-20"
        >
          {/* card 1 */}
          <div className="group bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <p className="text-sm font-medium text-blue-900/70">
              Years of Experience
            </p>

            <div className="h-px bg-blue-100 my-3" />

            <p className="text-3xl font-semibold text-blue-950">
              <CountUp to={13} />+
            </p>
          </div>

          {/* card 2 */}
          <div className="group bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <p className="text-sm font-medium text-blue-900/70">
              Clients Served
            </p>

            <div className="h-px bg-blue-100 my-3" />

            <p className="text-3xl font-semibold text-blue-950">
              <CountUp to={103} />+
            </p>
          </div>

          {/* card 3 */}
          <div className="group bg-white/70 backdrop-blur-md border border-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <p className="text-sm font-medium text-blue-900/70">
              Technologies Used
            </p>

            <div className="h-px bg-blue-100 my-3" />

            <p className="text-3xl font-semibold text-blue-950">
              <CountUp to={57} />+
            </p>
          </div>
        </motion.div>

        {/* ---------- ABOUT GRID ---------- */}

        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* LEFT IMAGE */}

          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="relative flex justify-center md:justify-start"
          >
            <motion.div
              whileHover={{ rotate: 0, scale: 1.04 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="relative rotate-[-5deg] rounded-3xl overflow-hidden shadow-[0_35px_80px_rgba(0,0,0,0.18)]"
            >
              <Image
                src="/mini-responsive-collage.webp"
                alt="Our Development Team"
                width={620}
                height={520}
                className="object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/40 via-transparent to-amber-500/30" />
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT */}

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="flex flex-col items-center md:items-start text-center md:text-left"
          >
            {/* title */}

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl md:text-xl lg:text-2xl font-semibold leading-tight bg-gradient-to-r from-blue-950 via-amber-700 to-yellow-500 bg-clip-text text-transparent"
            >
              Engineering Digital Platforms for the Future
            </motion.h2>

            {/* subtitle */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="flex items-center gap-2 mt-4 text-blue-900 font-medium"
            >
              <Sparkles size={18} className="text-amber-600" />
              12+ Years of Web Engineering Excellence
            </motion.div>

            {/* paragraph */}

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-6 text-blue-900/80 text-sm sm:text-base leading-relaxed max-w-[500px]"
            >
              For over a decade we have been designing and building scalable
              digital platforms for businesses across industries. Our network
              includes experienced engineers across India who have worked with
              leading technology companies and global tech giants, bringing deep
              expertise in modern frameworks, distributed systems and
              high-performance web platforms.
            </motion.p>

            {/* CTA */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="mt-8"
            >
              <FancyButton text="Learn About Our Journey" href="/about" />
            </motion.div>
          </motion.div>
        </div>

        {/* ---------- COLLAPSIBLE INTERACTION ---------- */}

        <div className="mt-20 flex justify-center">
          <button
            onClick={() => setOpen(!open)}
            className="flex items-center gap-2 text-blue-900 font-medium group animate-bounce cursor-pointer"
          >
            Discover Our Philosophy
            <ChevronDown
              className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
              size={18}
            />
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto mt-6 text-center text-blue-900/80 text-sm leading-relaxed"
          >
            We believe great technology should empower businesses to innovate,
            scale and compete globally. Our approach combines thoughtful
            engineering, clean design and long-term partnership with our clients
            — building platforms that are not just functional but future-ready.
          </motion.div>
        )}
      </div>
    </section>
  );
}
