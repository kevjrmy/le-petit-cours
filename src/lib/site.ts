/**
 * The deployed origin, in one place.
 *
 * `metadataBase` needs it today; a sitemap would too (#95), and two copies
 * of a hostname is exactly the kind of thing that drifts the day a custom
 * domain appears. There is no custom domain yet, and that is deliberate — one
 * would mean setting the Supabase redirect URLs twice (`docs/decisions.md` #26).
 */
export const SITE_URL = "https://lepetitcours.vercel.app";
