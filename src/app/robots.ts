import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    /* The specimen page is for whoever is changing a token, not for readers,
       and it also declares `robots: noindex` for itself. */
    rules: { userAgent: "*", allow: "/", disallow: "/design" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
