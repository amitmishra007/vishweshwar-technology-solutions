"use client";

import Link from "next/link";
import { MouseEventHandler } from "react";

interface FancyButtonProps {
  text: string;
  href?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  className?: string;
}

export default function FancyButton({
  text,
  href,
  onClick,
  className,
}: FancyButtonProps) {
  const content = (
    <>
      {/* 🌊 Animated Royal Gradient Background */}
      <span className="absolute inset-0 rounded-full overflow-hidden">
        <span className="absolute inset-0 bg-gradient-to-r from-blue-950 via-amber-700 to-yellow-500 animate-gradientMove" />
        <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-amber-700 to-blue-950 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
      </span>

      {/* ✨ Shine Sweep */}
      <span className="absolute inset-0 overflow-hidden rounded-full">
        <span className="absolute top-0 left-[-75%] w-1/2 h-full bg-white/20 skew-x-[-25deg] group-hover:left-[130%] transition-all duration-[1200ms] ease-out" />
      </span>

      {/* 🎬 Text Layer */}
      <span className="absolute inset-0 flex items-center justify-center text-white font-semibold tracking-wide transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-10 group-hover:opacity-0">
        {text}
      </span>

      {/* ➡ Arrow Layer */}
      <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 translate-y-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100">
        <svg
          className="w-6 h-6 md:w-5 md:h-5 sm:w-4 sm:h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </span>

      {/* Invisible span for sizing */}
      <span className="relative invisible">{text}</span>
    </>
  );

  const baseClasses = `
    group relative inline-flex items-center justify-center
    overflow-hidden
    rounded-full
    font-medium
    transition-all duration-500

    /* Default padding and font size */
    px-8 py-3 text-base

    /* Tablet adjustments */
    md:px-5 md:py-2 md:text-sm

    /* Mobile adjustments */
    sm:px-4 sm:py-1.5 sm:text-xs

    shadow-[0_10px_40px_rgba(212,175,55,0.35)]
    hover:shadow-[0_15px_60px_rgba(212,175,55,0.6)]

    ${className || ""}
  `;

  if (href) {
    return (
      <Link href={href} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClasses}>
      {content}
    </button>
  );
}
