"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { content } from "@/lib/content";
import { useMotion } from "@/components/motion/MotionProvider";

export function IntroSignature() {
  const { introDone } = useMotion();
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const letters = [...content.site.name];

  useEffect(() => {
    if (!introDone) return;
    const id = window.setTimeout(() => setVisible(false), 1200);
    return () => window.clearTimeout(id);
  }, [introDone]);

  if (!visible) return null;

  return (
    <motion.div
      className={`absolute inset-0 z-10 grid place-items-center bg-cream ${introDone ? "pointer-events-none" : "pointer-events-auto"}`}
      initial={false}
      animate={{ opacity: introDone ? 0 : 1 }}
      transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="px-6 text-center">
        <p className="font-hand text-5xl text-terracotta sm:text-7xl md:text-8xl">
          {letters.map((letter, index) => (
            <motion.span
              key={`${letter}-${index}`}
              className="inline-block"
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: introDone ? 0 : 1, y: 0 }}
              transition={{
                duration: 0.28,
                delay: introDone ? 0 : 0.3 + index * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </p>
        <svg
          viewBox="0 0 280 36"
          className="mx-auto mt-2 h-8 w-[min(280px,70vw)] text-terracotta"
          fill="none"
          aria-hidden
        >
          <motion.path
            d="M8 22c42-18 86-20 128-8 28 8 52 14 96 4"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: introDone ? 0 : 1 }}
            transition={{ duration: 0.9, delay: introDone ? 0 : 1.4, ease: "easeInOut" }}
          />
        </svg>
      </div>
    </motion.div>
  );
}
