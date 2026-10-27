import type { Metadata, Viewport } from "next";
import { Inter, Spectral } from "next/font/google";
import { AppShell } from "@/components/shell/AppShell";
import { LANG_SCRIPT } from "@/lib/lang";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

/* Spectral (Production Type, Paris) carries the French being taught; Inter
   carries the instruction around it. See AGENTS.md §5.

   `latin` alone is enough for both languages: the subset covers U+0000-00FF
   and U+0152-0153, so every French and Spanish character this course needs —
   accents, ç, ñ, ¿, ¡ and the œ ligature — is in it. Pulling `latin-ext` would
   ship glyphs no lesson can contain.

   Spectral is static rather than variable, so only the weights actually used
   are downloaded. Italics are real, not synthesised — the serif sets French,
   and a synthesised italic slants the accents wrongly. */
const spectral = Spectral({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
  variable: "--font-spectral",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Le Petit Cours",
    template: "%s · Le Petit Cours",
  },
  description:
    "Cours de français pour hispanophones. Grammaire, orthographe, conjugaison et exercices, hors ligne et gratuits.",
  applicationName: "Le Petit Cours",
  /* Not indexed, anywhere (#95). A page's own `robots` replaces this one, so
     `next.config.ts` sends the same thing as a header, which no page can. */
  robots: { index: false, follow: false },
  /* No `icons` here on purpose: declaring it replaces the app/ file
     conventions rather than adding to them, and silently drops icon.svg from
     the head. favicon.ico, icon.svg and apple-icon.png are all file
     conventions in src/app/ and link themselves. */
};

/* The status bar follows the page, not the brand: --surface-app in each
   theme. Announced-but-wrong is worse than absent, so these two values move
   whenever --grey-50 / --grey-950 do. */
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F8F4EA" },
    { media: "(prefers-color-scheme: dark)", color: "#0B1027" },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    /* No default data-theme: its absence means "système", which is what
       `color-scheme: light dark` in globals.css resolves. The script below
       sets the attribute only when the learner has actually chosen, so a
       first-time visitor still follows their OS.

       data-scroll-behavior is required by Next 16, which no longer overrides
       `scroll-behavior: smooth` during navigation (AGENTS.md §3).

       Never read the session here. Reading cookies in this layout opts every
       lesson underneath out of static prerendering, and nothing fails loudly
       when it happens (AGENTS.md §8).

       translate="no" and the `google` meta below keep the browser from
       offering to translate the page: the French is the lesson, and a
       translated page teaches nothing. The meta is written in <head> rather
       than in `metadata.other`, which a page's own `other` would replace. */
    <html
      lang="fr"
      translate="no"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${spectral.variable}`}
      suppressHydrationWarning
    >
      <head>
        <meta name="google" content="notranslate" />
        {/* Runs synchronously while <head> is parsed, so the theme and the
            sidebar are right before the first paint. useEffect is exactly what
            does not prevent the flash, and a cookie read on the server would
            cost prerendering.

            **Three jobs, and only these three** (decisions.md #24, #42, #102).
            Each has to be correct before anything is painted — a theme that
            arrives late flashes white, a sidebar that arrives late renders open
            and snaps shut, and a language that arrives late shows a Spanish
            visitor the French first. Each is one short string nobody would
            mourn. The chosen view and progress are in IndexedDB, which is async
            and cannot be read here at all; that is the line, not the count.
            The language's half is `LANG_SCRIPT`, kept beside the code that
            writes the same key. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t==="dark"||t==="light")d.setAttribute("data-theme",t);var r=localStorage.getItem("rail");if(r==="0"||r==="1")d.setAttribute("data-rail",r)}catch(e){}${LANG_SCRIPT}})()`,
          }}
        />
      </head>
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
