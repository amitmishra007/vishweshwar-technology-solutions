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
      {/* Sliding background */}
      <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-blue-950 group-hover:translate-x-0 ease">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      </span>

      {/* Text */}
      <span className="absolute flex items-center justify-center w-full h-full text-white bg-blue-950 transition-all duration-300 transform group-hover:translate-x-full ease">
        {text}
      </span>

      {/* Invisible span for button size */}
      <span className="relative invisible">{text}</span>
    </>
  );

  if (href) {
    // Render as Next.js Link
    return (
      <Link
        href={href}
        className={`
          group relative inline-flex items-center justify-center
          px-6 py-3 overflow-hidden font-medium
          text-blue-950 border-2 bg-blue-950 rounded-full shadow-md
          transition duration-300 ease-out
          ${className || ""}
        `}
      >
        {content}
      </Link>
    );
  }

  // Render as normal button
  return (
    <button
      onClick={onClick}
      className={`
        group relative inline-flex items-center justify-center
        px-6 py-3 overflow-hidden font-medium
        text-white border-2 bg-blue-950 rounded-full shadow-md
        transition duration-300 ease-out
        ${className || ""}
      `}
    >
      {content}
    </button>
  );
}
