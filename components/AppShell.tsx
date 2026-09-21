"use client";

import dynamic from "next/dynamic";
import { cn } from "@/lib/cn";
import { CalProvider } from "@/components/CalProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MotionProvider, useMotion } from "@/components/motion/MotionProvider";
import { SmoothScroll } from "@/components/motion/SmoothScroll";

const AgentWidget = dynamic(
  () => import("@/components/AgentWidget").then((mod) => mod.AgentWidget),
  { ssr: false },
);

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <CalProvider>
        <ShellBody>{children}</ShellBody>
      </CalProvider>
    </MotionProvider>
  );
}

function ShellBody({ children }: { children: React.ReactNode }) {
  const { overlay, introDone, introPlaying } = useMotion();
  const blurPage = overlay === "modal";
  const waiting = introPlaying && !introDone;
  const revealing = introPlaying && introDone;

  return (
    <>
      <SmoothScroll />
      <div
        className={cn(
          "relative z-0 flex min-h-full flex-col bg-cream",
          waiting && "scale-[1.02] blur-[28px]",
          revealing &&
            "scale-100 blur-none transition-[filter,transform] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          blurPage && "pointer-events-none scale-[0.99] blur-xl brightness-75 transition-[filter,transform] duration-500",
        )}
      >
        <Navbar />
        <main
          className={cn(
            "flex-1",
            overlay === "menu" && "pointer-events-none blur-xl brightness-75 transition-[filter] duration-500",
          )}
        >
          {children}
        </main>
        <Footer />
      </div>
      <AgentWidget />
    </>
  );
}
