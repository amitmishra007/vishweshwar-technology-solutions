"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  depth: number;
  logo: string;
};

const logos = Array.from({ length: 12 }, (_, i) => `/logo${i + 1}.png`);

export default function TechnologiesUltra() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef({ x: 0, y: 0 });
  const scrollY = useRef(0);

  useEffect(() => {
    const container = canvasRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // INIT PARTICLES
    particles.current = Array.from({ length: 35 }, () => {
      const depth = Math.random(); // 0 (far) → 1 (near)

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (-0.3 + Math.random() * 0.6) * (0.5 + depth),
        vy: (0.6 + Math.random()) * (0.5 + depth),
        size: 50 + depth * 40,
        depth,
        logo: logos[Math.floor(Math.random() * logos.length)],
      };
    });

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleScroll = () => {
      scrollY.current = window.scrollY;
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    const animate = () => {
      particles.current.forEach((p) => {
        // 🌀 WIND EFFECT (scroll-based)
        p.x += p.vx + scrollY.current * 0.00005;

        // 🌧 FALLING
        p.y += p.vy;

        // 🎮 MOUSE REPULSION
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 6;
          p.y += (dy / dist) * force * 6;
        }

        // 🔁 RESET
        if (p.y > height + 100) {
          p.y = -100;
          p.x = Math.random() * width;
        }
      });

      render();
      requestAnimationFrame(animate);
    };

    const render = () => {
      if (!container) return;

      container.innerHTML = "";

      particles.current.forEach((p, i) => {
        const el = document.createElement("div");

        const blur = (1 - p.depth) * 6;

        el.style.position = "absolute";
        el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0)`;
        el.style.width = `${p.size}px`;
        el.style.height = `${p.size}px`;
        el.style.borderRadius = "999px";
        el.style.display = "flex";
        el.style.alignItems = "center";
        el.style.justifyContent = "center";

        // 💎 GLASS STYLE
        el.style.background = "rgba(255,255,255,0.35)";
        el.style.backdropFilter = "blur(12px)";
        el.style.border = "1px solid rgba(255,255,255,0.3)";
        el.style.boxShadow = `0 10px 30px rgba(0,0,0,0.15), 0 0 ${
          20 + p.depth * 30
        }px rgba(255,200,0,0.2)`;

        el.style.filter = `blur(${blur}px)`;

        // 🖼 IMAGE
        const img = document.createElement("img");
        img.src = p.logo;
        img.style.width = "60%";
        img.style.height = "60%";
        img.style.objectFit = "contain";

        el.appendChild(img);
        container.appendChild(el);
      });
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-[#f5f1e8] via-white to-[#f5f1e8]">
      {/* TITLE */}
      <div className="absolute top-20 w-full text-center z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
          Technologies
        </h2>
        <div className="mt-4 h-[2px] w-24 bg-gradient-to-r from-amber-400 to-yellow-500 mx-auto rounded-full" />
      </div>

      {/* PARTICLE LAYER */}
      <div ref={canvasRef} className="absolute inset-0 will-change-transform" />

      {/* SOFT LIGHT OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-white/20 pointer-events-none" />
    </section>
  );
}
