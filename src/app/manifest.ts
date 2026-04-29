import type { MetadataRoute } from "next";
import { BUSINESS } from "@/lib/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${BUSINESS.brandName} — ${BUSINESS.shortDescription}`,
    short_name: BUSINESS.brandName,
    description: BUSINESS.description,
    start_url: "/",
    display: "standalone",
    background_color: "#0a0a0b",
    theme_color: "#0a0a0b",
    lang: "uk",
    icons: [
      { src: "/icon", sizes: "32x32", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
