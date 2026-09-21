import { content } from "@/lib/content";

export function getCalLink() {
  return (process.env.NEXT_PUBLIC_CAL_LINK || content.booking.calLink).replace(
    /^https?:\/\/(www\.)?cal\.com\//,
    "",
  );
}

export function getCalConfig() {
  return {
    layout: content.booking.layout,
    theme: content.booking.theme,
  };
}
