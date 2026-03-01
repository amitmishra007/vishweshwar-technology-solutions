"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6 },
    }),
  };

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="relative bg-gradient-to-t from-blue-950 via-amber-700 to-yellow-500 text-white overflow-hidden pt-16 pb-10"
    >
      {/* Top wave */}
      <svg
        className="absolute top-0 w-full h-12 sm:h-20 -mt-10 text-blue-950"
        preserveAspectRatio="none"
        viewBox="0 0 1440 54"
      >
        <path
          fill="currentColor"
          d="M0 22L120 16.7C240 11 480 1.00001 720 0.700012C960 1.00001 1200 11 1320 16.7L1440 22V54H1320C1200 54 960 54 720 54C480 54 240 54 120 54H0V22Z"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Logo + About */}
        <motion.div custom={1} variants={fadeUp} className="space-y-4">
          <div className="flex items-center space-x-3">
            <Image
              src="/vishweshwar-industries-logo.png"
              alt="Vishweshwar Industries Logo"
              width={40}
              height={40}
            />
            <span className="font-bold text-lg uppercase">Company</span>
          </div>
          <p className="text-sm text-white/80">
            We craft digital experiences that connect brands with their audience
            through modern, scalable, and beautiful solutions.
          </p>
        </motion.div>

        {/* Links Grid */}
        <motion.div custom={2} variants={fadeUp}>
          <h3 className="font-semibold mb-4">Services</h3>
          <ul className="space-y-2 text-white/80">
            <li>
              <Link
                href="/web-development"
                className="hover:text-yellow-300 transition"
              >
                Web Development
              </Link>
            </li>
            <li>
              <Link href="/seo" className="hover:text-yellow-300 transition">
                SEO & Marketing
              </Link>
            </li>
            <li>
              <Link href="/design" className="hover:text-yellow-300 transition">
                Design & UX
              </Link>
            </li>
            <li>
              <Link
                href="/consulting"
                className="hover:text-yellow-300 transition"
              >
                Consulting
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Resources Grid */}
        <motion.div custom={3} variants={fadeUp}>
          <h3 className="font-semibold mb-4">Resources</h3>
          <ul className="space-y-2 text-white/80">
            <li>
              <Link href="/blog" className="hover:text-yellow-300 transition">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/faqs" className="hover:text-yellow-300 transition">
                FAQs
              </Link>
            </li>
            <li>
              <Link
                href="/portfolio"
                className="hover:text-yellow-300 transition"
              >
                Portfolio
              </Link>
            </li>
            <li>
              <Link
                href="/contact-us"
                className="hover:text-yellow-300 transition"
              >
                Contact
              </Link>
            </li>
          </ul>
        </motion.div>

        {/* Map / Location */}
        <motion.div custom={4} variants={fadeUp} className="space-y-3">
          <h3 className="font-semibold mb-4">Our Location</h3>
          <div className="w-full h-40 rounded-lg overflow-hidden shadow-lg border border-white/20">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3516.5449093053794!2d76.80970407916509!3d28.190752641909008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDExJzI2LjciTiA3NsKwNDgnNTIuNSJF!5e0!3m2!1sen!2sin!4v1772390982236!5m2!1sen!2sin"
              width="100%"
              height="100%"
              className="border-0"
              allowFullScreen={true}
              loading="lazy"
              title="Company Location"
            ></iframe>
          </div>
        </motion.div>
      </div>

      {/* Bottom copyright */}
      <motion.div
        custom={5}
        variants={fadeUp}
        className="mt-12 pt-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-between px-6 lg:px-8 text-sm text-white/80"
      >
        <p>© {currentYear} Company. All rights reserved.</p>
        <div className="flex items-center space-x-4 mt-3 md:mt-0">
          <Link href="/" className="hover:text-yellow-300 transition">
            Twitter
          </Link>
          <Link href="/" className="hover:text-yellow-300 transition">
            Instagram
          </Link>
          <Link href="/" className="hover:text-yellow-300 transition">
            LinkedIn
          </Link>
        </div>
      </motion.div>
    </motion.footer>
  );
};
