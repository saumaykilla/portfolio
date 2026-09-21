"use client";

import { AnimatePresence, motion } from "framer-motion";
import { content } from "@/lib/content";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui";
import { AppLink } from "@/components/motion/AppLink";
import { useMotion } from "@/components/motion/MotionProvider";
import { useCalBooking } from "@/components/CalProvider";
import { sectionIdFromHref } from "@/lib/nav";

export function Navbar() {
  const { overlay, setOverlay, to, activeSection } = useMotion();
  const { openBooking } = useCalBooking();
  const open = overlay === "menu";
  const talk = () => {
    if (content.site.navCta.action === "cal") openBooking();
    else to(content.site.navCta.href);
  };

  return (
    <header className="sticky top-0 z-40 bg-cream/90 shadow-[0_1px_0_rgba(28,22,18,0.06)] backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between px-5 sm:px-8">
        <AppLink href="/#home" className="flex items-center gap-2.5">
          <span className="relative grid h-8 w-8 place-items-center">
            <svg viewBox="0 0 32 32" className="h-8 w-8 text-terracotta" aria-hidden>
              <path
                fill="currentColor"
                d="M16 2.5 18.2 11 27 12.2 18.2 14.8 16 23.5 13.8 14.8 5 12.2 13.8 11 16 2.5Z"
              />
            </svg>
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight text-ink">
            {content.site.name}
          </span>
        </AppLink>

        <nav className="hidden items-center gap-5 xl:gap-7 lg:flex">
          {content.site.navigation.map((item) => {
            const active = sectionIdFromHref(item.href) === activeSection;
            return (
              <AppLink
                key={item.href}
                href={item.href}
                className={cn(
                  "relative text-[13.5px] transition-colors",
                  active ? "font-medium text-terracotta" : "text-ink/70 hover:text-ink",
                )}
              >
                {item.label}
                {active ? (
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full rounded-full bg-terracotta" />
                ) : null}
              </AppLink>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button className="px-5 py-2.5 text-[13px]" onClick={talk}>
            {content.site.navCta.label}
          </Button>
        </div>

        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-ink/10 lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOverlay(open ? "none" : "menu")}
        >
          <span className="sr-only">Menu</span>
          <div className="relative h-3.5 w-4">
            <span
              className={cn(
                "absolute left-0 h-px w-full bg-ink transition-transform duration-200",
                open ? "top-1.5 rotate-45" : "top-0.5",
              )}
            />
            <span
              className={cn(
                "absolute left-0 h-px w-full bg-ink transition-transform duration-200",
                open ? "top-1.5 -rotate-45" : "top-3",
              )}
            />
          </div>
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="border-t border-ink/8 bg-cream/80 px-5 pb-8 pt-4 backdrop-blur-xl lg:hidden"
          >
            <nav className="flex flex-col gap-1">
              {content.site.navigation.map((item) => {
                const active = sectionIdFromHref(item.href) === activeSection;
                return (
                  <AppLink
                    key={item.href}
                    href={item.href}
                    onClick={() => setOverlay("none")}
                    className={cn(
                      "rounded-xl px-3 py-3 text-base",
                      active ? "bg-terracotta/12 font-semibold text-terracotta" : "font-medium text-ink",
                    )}
                  >
                    {item.label}
                  </AppLink>
                );
              })}
              <button
                type="button"
                className="mt-3 w-full rounded-full bg-terracotta py-3 text-sm font-medium text-white"
                onClick={() => {
                  setOverlay("none");
                  talk();
                }}
              >
                {content.site.navCta.label}
              </button>
            </nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
