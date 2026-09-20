"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type FadeInProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  x?: number;
  eager?: boolean;
};

export function FadeIn({
  children,
  className,
  delay = 0,
  y = 28,
  x = 0,
  eager = false,
}: FadeInProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(eager || Boolean(reduce));

  useEffect(() => {
    if (eager || reduce) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setInView(true);
        io.disconnect();
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [eager, reduce]);

  return (
    <div ref={ref}>
      <motion.div
        className={className}
        initial={reduce ? false : { opacity: 0, y: x ? 0 : y, x }}
        animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y: x ? 0 : y, x }}
        transition={{ duration: 0.7, delay: inView ? delay : 0, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const fadeItem = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
  },
};
