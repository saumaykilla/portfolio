import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Handwritten({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-hand text-[1.35rem] leading-none text-terracotta sm:text-[1.55rem]",
        className,
      )}
    >
      {children}
    </p>
  );
}

export function ScribbleArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 86 36"
      fill="none"
      className={cn("text-terracotta", className)}
      aria-hidden
    >
      <path
        d="M4 28c18-20 42-24 70-20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <path
        d="M64 4c8 4 12 10 14 18"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Blob({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 400 400" className={cn("text-terracotta", className)} aria-hidden>
      <path
        fill="currentColor"
        d="M312 86c38 28 62 86 54 136s-50 92-104 118-118 36-168 8-84-92-78-148 50-110 108-132 150-10 188 18Z"
      />
    </svg>
  );
}

export function CornerBlob({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 520 420" className={cn("text-terracotta", className)} aria-hidden>
      <path
        fill="currentColor"
        d="M520 0v420H210c20-70 18-120 62-168 48-52 118-48 168-92C500 116 508 52 520 0Z"
      />
    </svg>
  );
}

export function LoopDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 180 220" fill="none" className={cn("text-terracotta/70", className)} aria-hidden>
      <path
        d="M150 40c-70-28-140 18-128 88 10 58 92 62 108 18 12-34-28-52-58-38"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function SparkDoodle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="none" className={cn("text-terracotta", className)} aria-hidden>
      <path d="M16 2v8M16 22v8M2 16h8M22 16h8M6 6l5 5M21 21l5 5M26 6l-5 5M11 21l-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}
