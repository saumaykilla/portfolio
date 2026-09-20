"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { IntroSignature } from "@/components/motion/IntroSignature";
import { hashForSection, NAV_OFFSET, sectionIdFromHref, type SectionId } from "@/lib/nav";

type Overlay = "none" | "menu" | "modal";

type MotionContextValue = {
  overlay: Overlay;
  setOverlay: (overlay: Overlay) => void;
  introDone: boolean;
  introPlaying: boolean;
  activeSection: SectionId;
  to: (href: string) => void;
  setScroller: (fn: ((y: number) => void) | null) => void;
};

const MotionContext = createContext<MotionContextValue | null>(null);

export function useMotion() {
  const value = useContext(MotionContext);
  if (!value) {
    throw new Error("useMotion must be used within MotionProvider");
  }
  return value;
}

const INTRO_KEY = "sk-intro-v4";

export function MotionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [overlay, setOverlay] = useState<Overlay>("none");
  const [introDone, setIntroDone] = useState(false);
  const [introPlaying, setIntroPlaying] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>("home");
  const scrollerRef = useRef<((y: number) => void) | null>(null);

  useEffect(() => {
    document.documentElement.classList.toggle("is-blurred", overlay !== "none");
    document.documentElement.classList.toggle("is-locked", overlay === "modal");

    if (overlay !== "modal") return;

    const allow = (event: Event) =>
      Boolean((event.target as HTMLElement | null)?.closest("[data-native-scroll]"));

    const block = (event: Event) => {
      if (allow(event)) return;
      event.preventDefault();
    };

    const onKey = (event: KeyboardEvent) => {
      if (!["ArrowUp", "ArrowDown", "PageUp", "PageDown", "Home", "End", " "].includes(event.key)) {
        return;
      }
      if (allow(event)) return;
      event.preventDefault();
    };

    window.addEventListener("wheel", block, { passive: false });
    window.addEventListener("touchmove", block, { passive: false });
    window.addEventListener("keydown", onKey);

    return () => {
      document.documentElement.classList.remove("is-locked");
      window.removeEventListener("wheel", block);
      window.removeEventListener("touchmove", block);
      window.removeEventListener("keydown", onKey);
    };
  }, [overlay]);

  useEffect(() => {
    setOverlay("none");
  }, [pathname]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce || sessionStorage.getItem(INTRO_KEY) === "1") {
      setIntroDone(true);
    } else {
      setIntroPlaying(true);
      const id = window.setTimeout(() => {
        sessionStorage.setItem(INTRO_KEY, "1");
        setIntroDone(true);
      }, 2800);
      return () => window.clearTimeout(id);
    }
  }, []);

  const setScroller = useCallback((fn: ((y: number) => void) | null) => {
    scrollerRef.current = fn;
  }, []);

  const to = useCallback(
    (href: string) => {
      setOverlay("none");
      const id = sectionIdFromHref(href);
      if (!id) {
        router.push(href);
        return;
      }

      if (pathname !== "/") {
        router.replace(hashForSection(id));
        return;
      }

      const el = document.getElementById(id);
      if (!el) return;

      const y = Math.max(0, window.scrollY + el.getBoundingClientRect().top - NAV_OFFSET);
      if (scrollerRef.current) scrollerRef.current(y);
      else window.scrollTo(0, y);

      const next = hashForSection(id);
      if (`${window.location.pathname}${window.location.hash}` !== next) {
        window.history.replaceState(null, "", next);
      }
      setActiveSection(id);
    },
    [pathname, router],
  );

  useEffect(() => {
    if (!introDone || !introPlaying) return;
    const id = window.setTimeout(() => setIntroPlaying(false), 1300);
    return () => window.clearTimeout(id);
  }, [introDone, introPlaying]);

  useEffect(() => {
    if (!introDone || pathname !== "/") return;
    const id = sectionIdFromHref(window.location.hash || "#home");
    if (id && id !== "home") {
      const timer = window.setTimeout(() => to(`#${id}`), 80);
      return () => window.clearTimeout(timer);
    }
  }, [introDone, pathname, to]);

  useEffect(() => {
    if (pathname !== "/") return;

    const sections = ["home", "projects", "work", "skills", "achievements", "contact"] as const;

    const onScroll = () => {
      let current: SectionId = "home";
      const probe = Math.max(NAV_OFFSET + 24, window.innerHeight * 0.32);
      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= probe) current = id;
      }
      setActiveSection(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  const value = useMemo(
    () => ({ overlay, setOverlay, introDone, introPlaying, activeSection, to, setScroller }),
    [overlay, introDone, introPlaying, activeSection, to, setScroller],
  );

  return (
    <MotionContext.Provider value={value}>
      {children}
      <div id="overlay-root" className="pointer-events-none fixed inset-0 z-[9999]">
        <IntroSignature />
      </div>
    </MotionContext.Provider>
  );
}
