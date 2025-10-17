"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-transparent backdrop-blur-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-white text-2xl font-bold"
        >
          <Image
            src="https://static.vecteezy.com/system/resources/previews/011/883/296/non_2x/modern-graphic-leaf-abstrack-with-water-drop-colorful-logo-good-for-technology-logo-fruits-logo-fresh-logo-nature-logo-company-logo-dummy-logo-bussiness-logo-vector.jpg"
            alt="Logo"
            className="w-10 h-10"
            width="40"
            height="40"
          />
          <span>MyAgency</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 text-white font-medium">
          <li>
            <Link href="#services" className="hover:text-blue-400 transition">
              Services
            </Link>
          </li>
          <li>
            <Link href="#about" className="hover:text-blue-400 transition">
              About
            </Link>
          </li>
          <li>
            <Link href="#portfolio" className="hover:text-blue-400 transition">
              Portfolio
            </Link>
          </li>
          <li>
            <Link href="#contact" className="hover:text-blue-400 transition">
              Contact
            </Link>
          </li>
        </ul>

        {/* CTA */}
        <Link
          href="#contact"
          className="hidden md:block px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-full text-white font-semibold transition"
        >
          Get Started
        </Link>

        {/* Mobile Menu Button */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="md:hidden bg-black bg-opacity-80 px-6 pb-4">
          <ul className="flex flex-col gap-4 text-white">
            <li>
              <Link href="#services" onClick={() => setOpen(false)}>
                Services
              </Link>
            </li>
            <li>
              <Link href="#about" onClick={() => setOpen(false)}>
                About
              </Link>
            </li>
            <li>
              <Link href="#portfolio" onClick={() => setOpen(false)}>
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="#contact" onClick={() => setOpen(false)}>
                Contact
              </Link>
            </li>
          </ul>
          <button className="relative inline-flex items-center justify-center p-4 px-5 py-5 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-1 hover:ring-purple-500 cursor cursor-pointer">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 via-purple-600 to-pink-700"></span>
            <span className="absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-pink-500 rounded-full opacity-30 group-hover:rotate-90 ease"></span>
            <span className="relative text-white">
              <Link
                href="#contact"
                className="mt-4 inline-block w-full text-center  font-semibold transition"
              >
                Get Started
              </Link>
            </span>
          </button>
        </div>
      )}
    </nav>
  );
}
