import type { MetadataRoute } from "next";
import { annexes, chapters } from "@/data/navigation";
import { SITE_URL } from "@/lib/site";

/* Derived from the manifest, so publishing a lesson lists it here with no
   second edit. Every entry in the manifest is a page that exists (#51), so
   there is nothing to filter out; /design is not in the manifest at all, which
   is why it never appears. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; lastModified?: string }[] = [
    { path: "/" },
    ...chapters.map((chapter) => ({ path: chapter.path })),
    ...chapters.flatMap((chapter) =>
      chapter.lessons.map((lesson) => ({
        path: lesson.path,
        lastModified: lesson.created,
      })),
    ),
    ...annexes.map((page) => ({ path: page.path })),
  ];

  return pages.map(({ path, lastModified }) => ({
    url: `${SITE_URL}${path}`,
    ...(lastModified ? { lastModified: new Date(lastModified) } : {}),
  }));
}
