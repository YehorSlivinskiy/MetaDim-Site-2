import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";
import { getProjects, getServices } from "@/lib/db";

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

  let projectEntries: MetadataRoute.Sitemap = [];
  let serviceEntries: MetadataRoute.Sitemap = [];

  try {
    const projects = await getProjects();
    projectEntries = projects.map((p) => ({
      url: `${SITE_URL}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch {
    // DB unreachable at build time — skip dynamic entries
  }

  try {
    const services = await getServices();
    serviceEntries = services.map((s) => ({
      url: `${SITE_URL}/services/${s.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    }));
  } catch {
    // ignore
  }

  return [...staticRoutes, ...projectEntries, ...serviceEntries];
}
