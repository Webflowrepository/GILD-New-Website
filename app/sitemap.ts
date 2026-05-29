import type { MetadataRoute } from "next";
import { youtubeEpisodes } from "@/lib/podcast";

const BASE = "https://gildhq.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE}/newsletter`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/podcast`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE}/past-events/making-ai-gains-stick-austin-may-12-2026`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE}/past-events/ai-and-engineering-leaders-dinner-austin-may-27-2026`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
  ];

  const episodePages: MetadataRoute.Sitemap = youtubeEpisodes.map((ep) => ({
    url: `${BASE}/podcast/${ep.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...episodePages];
}
