/**
 * The deployed origin, in one place.
 *
 * It is needed by `metadataBase`, the sitemap and robots.txt, and three copies
 * of a hostname is exactly the kind of thing that drifts the day a custom
 * domain appears. There is no custom domain yet, and that is deliberate — one
 * would mean setting the Supabase redirect URLs twice (`docs/decisions.md` #26).
 */
export const SITE_URL = "https://lepetitcours.vercel.app";
