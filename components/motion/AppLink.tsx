"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { useMotion } from "@/components/motion/MotionProvider";
import { hashForSection, sectionIdFromHref } from "@/lib/nav";

type AppLinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

export function AppLink({ href, children, className, onClick }: AppLinkProps) {
  const { to } = useMotion();
  const section = sectionIdFromHref(href);

  if (section) {
    return (
      <a
        href={hashForSection(section)}
        className={className}
        onClick={(event) => {
          event.preventDefault();
          onClick?.(event);
          to(href);
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  );
}
