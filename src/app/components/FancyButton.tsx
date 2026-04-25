"use client";

import Link from "next/link";
import {
  ButtonHTMLAttributes,
  AnchorHTMLAttributes,
  DetailedHTMLProps,
} from "react";

/* -------------------- TYPES -------------------- */

type BaseProps = {
  text: string;
  className?: string;
};

type ButtonProps = BaseProps &
  Omit<
    DetailedHTMLProps<
      ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "className"
  > & {
    href?: undefined;
  };

type LinkProps = BaseProps &
  Omit<
    DetailedHTMLProps<
      AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >,
    "className"
  > & {
    href: string;
  };

type FancyButtonProps = ButtonProps | LinkProps;

/* -------------------- COMPONENT -------------------- */

export default function FancyButton(props: FancyButtonProps) {
  const { text, className } = props;

  /* 🎨 CONTENT (FIXED LAYOUT) */
  const content = (
    <>
      {/* GRADIENT */}
      <span className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
        <span className="absolute inset-0 bg-gradient-to-r from-blue-950 via-amber-700 to-yellow-500 animate-gradientMove" />
        <span className="absolute inset-0 bg-gradient-to-r from-yellow-500 via-amber-700 to-blue-950 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-in-out" />
      </span>

      {/* SHINE */}
      <span className="absolute inset-0 overflow-hidden rounded-full pointer-events-none">
        <span className="absolute top-0 left-[-75%] w-1/2 h-full bg-white/20 skew-x-[-25deg] group-hover:left-[130%] transition-all duration-[1200ms] ease-out" />
      </span>

      {/* TEXT (NOW RELATIVE → DEFINES SIZE) */}
      <span className="relative z-10 flex items-center justify-center text-white font-semibold tracking-wide transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-translate-y-10 group-hover:opacity-0 whitespace-nowrap">
        {text}
      </span>

      {/* ICON */}
      <span className="absolute inset-0 flex items-center justify-center text-white opacity-0 translate-y-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:translate-y-0 group-hover:opacity-100 pointer-events-none">
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
    </>
  );

  /* 🎯 BASE CLASSES (CRITICAL FIXES ADDED) */
  const baseClasses = `
    group relative inline-flex items-center justify-center

    w-auto max-w-max flex-none self-start
    whitespace-nowrap

    overflow-hidden rounded-full font-medium
    transition-all duration-500

    px-8 py-3 text-base
    md:px-5 md:py-2 md:text-sm
    sm:px-4 sm:py-1.5 sm:text-xs

    shadow-[inset_0_2px_4px_rgba(255,255,255,0.25),_0_4px_6px_rgba(0,0,0,0.15)]
    backdrop-blur-[6px]
    border border-white/20

    hover:shadow-[inset_0_2px_6px_rgba(255,255,255,0.3),_0_6px_10px_rgba(0,0,0,0.2)]
    hover:-translate-y-0.5 hover:scale-105

    ${className || ""}
  `;

  /* -------------------- LINK MODE (FIXED) -------------------- */
  if ("href" in props && props.href) {
    const { href, ...anchorProps } = props;

    return (
      <Link href={href} className={baseClasses} {...anchorProps}>
        {content}
      </Link>
    );
  }

  /* -------------------- BUTTON MODE -------------------- */
  const { type = "button", ...buttonProps } = props as ButtonProps;

  return (
    <button
      type={type}
      className={baseClasses}
      suppressHydrationWarning
      {...buttonProps}
    >
      {content}
    </button>
  );
}
