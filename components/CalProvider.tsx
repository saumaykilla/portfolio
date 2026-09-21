"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  type ReactNode,
} from "react";
import { getCalApi } from "@calcom/embed-react";
import { content } from "@/lib/content";
import { getCalConfig, getCalLink } from "@/lib/cal";
import { useMotion } from "@/components/motion/MotionProvider";

type CalContextValue = {
  openBooking: () => void;
};

const CalContext = createContext<CalContextValue | null>(null);

export function useCalBooking() {
  const value = useContext(CalContext);
  if (!value) {
    throw new Error("useCalBooking must be used within CalProvider");
  }
  return value;
}

function bookingModalOpen() {
  const modal = document.querySelector("cal-modal-box");
  if (!(modal instanceof HTMLElement)) return false;
  const state = modal.getAttribute("state");
  if (state === "closed" || state === "closing" || state === "prerendering") {
    return false;
  }
  const visibility = modal.style.visibility || getComputedStyle(modal).visibility;
  return visibility !== "hidden";
}

export function CalProvider({ children }: { children: ReactNode }) {
  const namespace = content.booking.namespace;
  const { setBookingOpen } = useMotion();

  useEffect(() => {
    let cancelled = false;
    let seenModal = false;

    const sync = () => {
      const modal = document.querySelector("cal-modal-box");
      if (modal) {
        seenModal = true;
        setBookingOpen(bookingModalOpen());
        return;
      }
      if (seenModal) {
        seenModal = false;
        setBookingOpen(false);
      }
    };

    const onEvent = (event: { detail?: { type?: string } }) => {
      const type = event.detail?.type;
      if (type === "closeIframe" || type === "__closeIframe") {
        setBookingOpen(false);
        return;
      }
      setBookingOpen(bookingModalOpen());
    };

    const onBoxEvent = (event: Event) => {
      if (!(event.target instanceof Element) || event.target.localName !== "cal-modal-box") {
        return;
      }
      setBookingOpen(event.type === "open" ? true : bookingModalOpen());
      if (event.type === "close") setBookingOpen(false);
    };

    (async () => {
      const cal = await getCalApi({ namespace });
      if (cancelled) return;
      cal("ui", {
        theme: content.booking.theme,
        hideEventTypeDetails: false,
        layout: content.booking.layout,
        cssVarsPerTheme: {
          light: {
            "cal-brand": content.booking.brandColor,
          },
          dark: {
            "cal-brand": content.booking.brandColor,
          },
        },
      });
      cal("on", {
        action: "*",
        callback: onEvent,
      });
    })();

    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["state", "style"],
    });
    document.addEventListener("open", onBoxEvent, true);
    document.addEventListener("close", onBoxEvent, true);

    return () => {
      cancelled = true;
      observer.disconnect();
      document.removeEventListener("open", onBoxEvent, true);
      document.removeEventListener("close", onBoxEvent, true);
      setBookingOpen(false);
    };
  }, [namespace, setBookingOpen]);

  const openBooking = useCallback(() => {
    setBookingOpen(true);
    void (async () => {
      const cal = await getCalApi({ namespace });
      cal("modal", {
        calLink: getCalLink(),
        config: getCalConfig(),
      });
    })();
  }, [namespace, setBookingOpen]);

  return <CalContext.Provider value={{ openBooking }}>{children}</CalContext.Provider>;
}
