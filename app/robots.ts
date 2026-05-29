import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/member-access/"],
      },
    ],
    sitemap: "https://gildhq.com/sitemap.xml",
  };
}
