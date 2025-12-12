"use client";

import React, { useState, useEffect } from "react";
import { motion, useScroll, useSpring, useMotionValue } from "framer-motion";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import HeroSection from "@/components/HeroSection";
import Projects from "@/components/Projects";
import Timeline from "@/components/Timeline";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

// --- Dummy Data ---

export type sections = "home" | "projects" | "timeline" | "skills" | "contact";

const SECTIONS: sections[] = [
  "home",
  "projects",
  "timeline",
  "skills",
  "contact",
];

export default function Portfolio() {
  const [cursorVariant, setCursorVariant] = useState("default");
  const [activeSection, setActiveSection] = useState<sections>("home");
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Initialize React Hook Form

  // Custom Cursor Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const mouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 16);
      mouseY.set(e.clientY - 16);
    };
    window.addEventListener("mousemove", mouseMove);
    return () => window.removeEventListener("mousemove", mouseMove);
  }, [mouseX, mouseY]);

  const textEnter = () => setCursorVariant("text");
  const linkEnter = () => setCursorVariant("link");
  const textLeave = () => setCursorVariant("default");

  // Scroll Spy Logic
  useEffect(() => {
    const handleScroll = () => {
      const current = SECTIONS.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: sections) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 selection:bg-indigo-100 selection:text-indigo-900 font-sans cursor-none overflow-x-hidden">
      {/* --- Global Background Grain/Mesh --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-multiply"></div>
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-indigo-200/40 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-100/40 rounded-full blur-[100px]"></div>
      </div>

      {/* --- Custom Cursor --- */}
      <motion.div
        className="hidden lg:block fixed top-0 left-0 w-8 h-8 rounded-full border border-indigo-500 z-[100] pointer-events-none mix-blend-difference bg-white/10 backdrop-blur-[1px]"
        style={{ x: mouseX, y: mouseY }}
        variants={{
          default: { height: 32, width: 32, opacity: 1 },
          text: {
            height: 100,
            width: 100,
            backgroundColor: "rgba(255,255,255,0.1)",
            mixBlendMode: "difference",
          },
          link: {
            height: 48,
            width: 48,
            backgroundColor: "rgba(99, 102, 241, 0.2)",
            borderColor: "transparent",
          },
        }}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        <div className="w-1 h-1 bg-indigo-500 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </motion.div>

      {/* --- Progress Bar --- */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-linear-to-r from-indigo-500 to-purple-500 origin-left z-[60]"
        style={{ scaleX }}
      />

      {/* --- Sticky Navigation --- */}
      <header className="fixed top-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <nav className="bg-white/70 backdrop-blur-md border border-white/40 shadow-lg shadow-indigo-100/20 px-2 py-2 rounded-full pointer-events-auto flex gap-1">
          {SECTIONS.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              onMouseEnter={linkEnter}
              onMouseLeave={textLeave}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeSection === item
                  ? "text-indigo-600"
                  : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {activeSection === item && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-white rounded-full shadow-sm border border-slate-100"
                  initial={false}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  style={{ zIndex: -1 }}
                />
              )}
              <span className="capitalize relative z-10">{item}</span>
            </button>
          ))}
        </nav>
      </header>

      {/* --- Hero Section --- */}
      <HeroSection
        scrollTo={scrollTo}
        textEnter={textEnter}
        textLeave={textLeave}
        linkEnter={linkEnter}
      />

      {/* --- Projects Section --- */}
      <Projects linkEnter={linkEnter} textLeave={textLeave} />

      {/* --- Timeline Section --- */}
      <Timeline />

      {/* --- Skills Section --- */}
      <Skills
        setCursorVariant={setCursorVariant}
        linkEnter={linkEnter}
        textLeave={textLeave}
      />

      {/* --- Contact Section --- */}
      <Contact
        setCursorVariant={setCursorVariant}
        linkEnter={linkEnter}
        textLeave={textLeave}
      />

      {/* --- Footer --- */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-xs md:text-sm font-mono">
     
        <p>
          &copy; {new Date().getFullYear()} Saumay Killa. Designed with React &
          Framer Motion.
        </p>
      </footer>
    </div>
  );
}
