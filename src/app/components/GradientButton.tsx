"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";

interface GradientButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function GradientButton({
  href,
  onClick,
  children,
  className = "",
}: GradientButtonProps) {
  // Common classes
  const baseClasses = `
    relative inline-flex items-center justify-center px-6 py-3 
    font-semibold text-white rounded-xl overflow-hidden
    shadow-[0_4px_20px_rgba(0,0,0,0.25)]
    transition-all duration-300 cursor-pointer
    ${className}
  `;

  // Button content
  const InnerContent = (
    <>
      {/* Background gradient */}
      <span
        className="
          absolute inset-0 opacity-100 
          bg-gradient-to-br 
          from-[#1b2a49] via-gray-600 to-[#d4af37]
        "
      />

      {/* Shine overlay */}
      <span
        className="
          absolute inset-0 opacity-0 group-hover:opacity-20 
          bg-gradient-to-r from-white/20 to-transparent 
          transition-opacity duration-500
        "
      />

      <span className="relative z-10">{children}</span>
    </>
  );

  // If href exists, render as Link + motion.a
  if (href) {
    return (
      <Link href={href} className="group">
        <motion.a
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.96 }}
          className={baseClasses}
        >
          {InnerContent}
        </motion.a>
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <motion.button
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`group ${baseClasses}`}
    >
      {InnerContent}
    </motion.button>
  );
}
