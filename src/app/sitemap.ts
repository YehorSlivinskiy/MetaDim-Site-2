import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getProjects } from "@/lib/db";

export const revalidate = 3600; // 1h

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${SITE_URL}/works`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Reserve project permalinks for when /projects/[slug] routes ship.
  // Until then we expose anchored fragments which Google still recognises.
  let projectEntries: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects();
    projectEntries = projects.map((p) => ({
      url: `${SITE_URL}/works#${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch {
    // DB unreachable at build time — skip dynamic entries
  }

  return [...staticRoutes, ...projectEntries];
}
