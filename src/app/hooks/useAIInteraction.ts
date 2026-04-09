"use client";

import { useScroll, useMotionValueEvent, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";

export function useAIInteraction() {
  const { scrollY } = useScroll();

  const lastY = useRef(0);
  const idleTimer = useRef<NodeJS.Timeout | null>(null);

  const [scrollVelocity, setScrollVelocity] = useState(0);
  const [scrollDepth, setScrollDepth] = useState(0);
  const [idle, setIdle] = useState(false);
  const [intentLevel, setIntentLevel] = useState(0); // 0 → 1
  const [userState, setUserState] = useState<
    "idle" | "exploring" | "engaged" | "ready"
  >("exploring");

  /* 🔥 SMOOTH ENERGY VALUE */
  const energy = useSpring(0.3, {
    stiffness: 80,
    damping: 20,
  });

  /* ---------------- SCROLL TRACK ---------------- */
  useMotionValueEvent(scrollY, "change", (latest) => {
    const diff = Math.abs(latest - lastY.current);

    setScrollVelocity(diff);
    setScrollDepth(latest);

    lastY.current = latest;

    /* 🎯 INTENT CALCULATION */
    let intent = 0;

    if (latest > 300) intent += 0.3;
    if (diff < 2) intent += 0.2; // slow reading
    if (latest > 800) intent += 0.3;

    intent = Math.min(intent, 1);
    setIntentLevel(intent);

    /* ⚡ ENERGY (for animations) */
    const normalized = Math.min(diff / 100, 1);
    energy.set(0.3 + normalized * 0.7);
  });

  /* ---------------- IDLE DETECTION ---------------- */
  useEffect(() => {
    const resetIdle = () => {
      setIdle(false);

      if (idleTimer.current) clearTimeout(idleTimer.current);

      idleTimer.current = setTimeout(() => {
        setIdle(true);
      }, 4000);
    };

    window.addEventListener("mousemove", resetIdle);
    window.addEventListener("scroll", resetIdle);

    resetIdle();

    return () => {
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("scroll", resetIdle);
    };
  }, []);

  /* ---------------- USER STATE ---------------- */
  useEffect(() => {
    if (idle) {
      setUserState("idle");
    } else if (intentLevel > 0.7) {
      setUserState("ready");
    } else if (intentLevel > 0.4) {
      setUserState("engaged");
    } else {
      setUserState("exploring");
    }
  }, [intentLevel, idle]);

  return {
    scrollVelocity,
    scrollDepth,
    intentLevel,
    energy,
    userState,
    idle,
  };
}
