import type { MetadataRoute } from "next";

/* The PWA manifest is a Next file convention, not a static JSON in public/.
   Values carried over from the Vue app's vite.config.js, with theme_color
   restated against the new palette.

   The icons are still the wordmark, which is the wrong format for an icon:
   hairline cursive is a smudge at 192px, the maskable's safe-zone padding
   shrinks it to nothing inside Android's circle, and pwa-192x192.png is
   transparent so it vanishes on a dark home screen. They need redrawing as one
   letterform on a solid ground; see todo. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Le Petit Cours",
    short_name: "Le Petit Cours",
    description:
      "Cours de français pour hispanophones. Grammaire, orthographe, conjugaison et exercices, hors ligne et gratuits.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    lang: "fr",
    dir: "ltr",
    /* --surface-app in light mode. A manifest has one theme_color and no
       media queries; the per-theme pair lives in the viewport export in
       layout.tsx, which is what browsers actually honour for the status bar. */
    theme_color: "#F5F7FA",
    background_color: "#F5F7FA",
    icons: [
      { src: "/pwa-64x64.png", sizes: "64x64", type: "image/png" },
      { src: "/pwa-192x192.png", sizes: "192x192", type: "image/png" },
      { src: "/pwa-512x512.png", sizes: "512x512", type: "image/png" },
      {
        src: "/maskable-icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
