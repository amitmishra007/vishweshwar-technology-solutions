"use client";

import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import * as THREE from "three";

interface Testimonial {
  img: string;
  quote: string;
  name: string;
  role: string;
}

const testimonials: Testimonial[] = [
  {
    img: "/logo3.png",
    quote:
      "Working with Vishweshwar Industries transformed our digital presence completely. The design precision and branding clarity elevated our company beyond expectations.",
    name: "Jaswant Singh",
    role: "Atom Learning Center",
  },
  {
    img: "/logo4.png",
    quote:
      "Amit Mishra and his team delivered a website and brand identity that feels modern, trustworthy, and incredibly refined.",
    name: "Kirti Kapoor",
    role: "Paradigm Spaces",
  },
  {
    img: "/iOS-and-Android-development.png",
    quote:
      "The digital branding strategy created by Vishweshwar Industries gave our company a strong and professional online identity.",
    name: "Imran Khan",
    role: "ECR Builders",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const mountRef = useRef<HTMLDivElement | null>(null);

  /* ---------------- AUTO ROTATE ---------------- */

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  /* ---------------- MOUSE PARALLAX ---------------- */

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLElement).getBoundingClientRect();
    mouseX.set(e.clientX - rect.left - rect.width / 2);
    mouseY.set(e.clientY - rect.top - rect.height / 2);
  };

  /* ---------------- THREE GLASS ORB ---------------- */

  useEffect(() => {
    if (!mountRef.current) return;

    const mount = mountRef.current;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1000);
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    renderer.setSize(600, 600);
    mount.appendChild(renderer.domElement);

    const geometry = new THREE.IcosahedronGeometry(2, 1);

    const material = new THREE.MeshPhysicalMaterial({
      color: 0xfbbf24,
      roughness: 0.15,
      metalness: 0.9,
      transmission: 0.4,
      thickness: 1,
      clearcoat: 1,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const light = new THREE.PointLight(0xffffff, 1.8);
    light.position.set(5, 5, 5);
    scene.add(light);

    const ambient = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambient);

    let frame: number;

    const animate = () => {
      mesh.rotation.y += 0.002;
      mesh.rotation.x += 0.001;

      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(frame);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  const t = testimonials[active];

  return (
    <section
      onMouseMove={handleMouseMove}
      className="relative py-48 overflow-hidden bg-white"
    >
      {/* CINEMATIC LIGHTS */}

      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-gradient-to-br from-[#d4af37]/80 to-[#f5d76e]/70rounded-full blur-[160px]" />

        <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-white rounded-full blur-[160px]" />
      </div>

      {/* THREE ORB */}

      <motion.div
        ref={mountRef}
        style={{ rotateX, rotateY }}
        className="absolute left-1/2 top-24 -translate-x-1/2 opacity-40 pointer-events-none"
      />

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* TITLE */}

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-semibold text-blue-900 tracking-tight mb-24"
        >
          Trusted by ambitious businesses
        </motion.h2>

        {/* AVATAR */}

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.7 }}
            className="flex justify-center mb-14"
          >
            <Image
              src={t.img}
              alt={t.name}
              width={120}
              height={120}
              className="rounded-full shadow-xl"
            />
          </motion.div>
        </AnimatePresence>

        {/* QUOTE */}

        <AnimatePresence mode="wait">
          <motion.p
            key={active}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -40 }}
            transition={{ duration: 0.7 }}
            className="text-xl md:text-2xl text-slate-700 leading-relaxed max-w-3xl mx-auto font-medium"
          >
            “{t.quote}”
          </motion.p>
        </AnimatePresence>

        {/* AUTHOR */}

        <motion.div
          key={active + "name"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-12"
        >
          <p className="text-lg font-semibold text-blue-900">{t.name}</p>

          <p className="text-sm text-slate-500 mt-1">{t.role}</p>
        </motion.div>

        {/* INDICATORS */}

        <div className="flex justify-center gap-4 mt-16">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-[2px] transition-all duration-500 ${
                active === i
                  ? "w-14 bg-amber-500"
                  : "w-6 bg-slate-300 hover:bg-amber-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
