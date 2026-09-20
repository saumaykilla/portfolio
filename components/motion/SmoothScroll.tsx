"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useMotion } from "@/components/motion/MotionProvider";

export function SmoothScroll() {
  const pathname = usePathname();
  const { overlay, introDone, setScroller } = useMotion();
  const overlayRef = useRef(overlay);
  const introRef = useRef(introDone);
  overlayRef.current = overlay;
  introRef.current = introDone;

  useEffect(() => {
    if (pathname !== "/") return;

    let current = window.scrollY;
    let target = window.scrollY;
    let lastProgrammatic = 0;
    let frame = 0;

    const maxScroll = () =>
      Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    setScroller((y) => {
      target = Math.max(0, Math.min(maxScroll(), y));
      lastProgrammatic = performance.now() + 400;
    });

    const tick = () => {
      if (overlayRef.current === "modal") {
        target = current;
        frame = requestAnimationFrame(tick);
        return;
      }
      const diff = target - current;
      if (Math.abs(diff) < 0.4) {
        current = target;
      } else {
        current += diff * (Math.abs(diff) > 600 ? 0.14 : 0.1);
        lastProgrammatic = performance.now();
        window.scrollTo(0, current);
      }
      frame = requestAnimationFrame(tick);
    };

    const onWheel = (event: WheelEvent) => {
      if (!introRef.current) return;
      const native = (event.target as HTMLElement | null)?.closest("[data-native-scroll]");
      if (overlayRef.current === "modal") {
        if (!native) event.preventDefault();
        return;
      }
      if (event.ctrlKey) return;
      if (native) return;
      event.preventDefault();
      target = Math.max(0, Math.min(maxScroll(), target + event.deltaY * 0.7));
    };

    const onScroll = () => {
      if (performance.now() - lastProgrammatic < 64) return;
      current = window.scrollY;
      target = window.scrollY;
    };

    frame = requestAnimationFrame(tick);
    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      setScroller(null);
      cancelAnimationFrame(frame);
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname, setScroller]);

  return null;
}
