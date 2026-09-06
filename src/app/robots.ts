import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    /* The specimen page is for whoever is changing a token, not for readers.
       `/recherche` has nothing of its own to index and every page it can reach
       is already in the sitemap. Both also declare `noindex` for themselves. */
    rules: { userAgent: "*", allow: "/", disallow: ["/design", "/recherche"] },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
