import type { MetadataRoute } from "next";
import { seo } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${seo.name} — ${seo.role}`,
    short_name: seo.name,
    description: seo.description,
    start_url: "/",
    display: "standalone",
    background_color: "#F7F1E8",
    theme_color: "#C45A38",
    lang: "en",
  };
}
