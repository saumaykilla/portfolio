"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

function parseStat(value: string) {
  const match = value.match(/^(~|\+)?(\d+(?:\.\d+)?)(.*)$/);
  if (!match) {
    return { prefix: "", number: Number.NaN, suffix: value, decimals: 0 };
  }

  return {
    prefix: match[1] ?? "",
    number: Number(match[2]),
    suffix: match[3],
    decimals: match[2].includes(".") ? match[2].split(".")[1].length : 0,
  };
}

export function CountUpValue({ value }: { value: string }) {
  const parsed = parseStat(value);
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.55 });
  const [shown, setShown] = useState(() => {
    if (reduce || Number.isNaN(parsed.number)) return value;
    return `${parsed.prefix}${(0).toFixed(parsed.decimals)}${parsed.suffix}`;
  });

  useEffect(() => {
    if (!inView) return;
    if (reduce || Number.isNaN(parsed.number)) {
      setShown(value);
      return;
    }

    const duration = 1300;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      setShown(
        `${parsed.prefix}${(parsed.number * eased).toFixed(parsed.decimals)}${parsed.suffix}`,
      );
      if (t < 1) frame = requestAnimationFrame(tick);
      else setShown(value);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, parsed.decimals, parsed.number, parsed.prefix, parsed.suffix, reduce, value]);

  return <span ref={ref}>{shown}</span>;
}
