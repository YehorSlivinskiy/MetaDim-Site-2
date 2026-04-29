import fs from "node:fs";
import path from "node:path";

/**
 * Returns public-relative URLs for every image in /public/images.
 * Server-only (reads filesystem). Cached per request via React `cache` if needed.
 */
export function listPublicGallery(): string[] {
  const dir = path.join(process.cwd(), "public", "images");
  try {
    const files = fs.readdirSync(dir);
    return files
      .filter((f) => /\.(webp|jpg|jpeg|png|avif|gif)$/i.test(f))
      .sort((a, b) => {
        const numA = parseInt(a.match(/\d+/)?.[0] ?? "0", 10);
        const numB = parseInt(b.match(/\d+/)?.[0] ?? "0", 10);
        return numA - numB;
      })
      .map((f) => `/images/${f}`);
  } catch {
    return [];
  }
}
