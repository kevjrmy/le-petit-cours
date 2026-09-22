import type { MetadataRoute } from "next";
import { annexes, trackedChapters } from "@/data/navigation";
import { SITE_URL } from "@/lib/site";

/* Derived from the manifest, so publishing a lesson lists it here with no
   second edit. Every entry in the manifest is a page that exists (#51), so
   there is nothing to filter out; /design is not in the manifest at all, which
   is why it never appears.

   **One exception, and it covers a whole chapter** (#80, #81): the atelier's
   pages exist right now and are gone next week, and a sitemap is where a site
   says which of its URLs are worth coming back to. Since #81 put the chapter
   itself behind a password, its landing page went too — listing a URL that
   answers with a redirect to a login form is an invitation to nothing. */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: { path: string; lastModified?: string }[] = [
    { path: "/" },
    ...trackedChapters().map((chapter) => ({ path: chapter.path })),
    ...trackedChapters().flatMap((chapter) =>
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
