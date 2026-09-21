import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  /* A dead lesson URL, kept alive (AGENTS.md §6). The Daudet extract was
     replaced by « L’Invitation au voyage » in the same slot, so the old path points at the
     page that took its place rather than at the chapter.

     `permanent: false` on purpose: a 308 is cached by the browser until it is
     cleared, and the site is unlisted, so being able to change our mind is
     worth more here than the search engines a 308 would please. */
  async redirects() {
    return [
      {
        source: "/lecture/la-chevre-de-monsieur-seguin",
        destination: "/lecture/l-invitation-au-voyage",
        permanent: false,
      },
      /* Same slot, new text: the imparfait souvenir was replaced by the film
         summary, so the old path lands on the page that took its place. */
      {
        source: "/traduction/quand-j-etais-petite",
        destination: "/traduction/le-resume-d-un-film",
        permanent: false,
      },
      /* **Not a dead URL — an alias.** Signing in is one page and stays one
         page (#26): a second route could not read the session on the server
         either (AGENTS.md §8), so it would duplicate the signed-in/signed-out
         branch rather than remove it, and every `?suivant=` link would have to
         move. This gives the honest URL anyway, and the query survives the hop,
         so `/connexion?suivant=…` arrives intact.

         **A `page.tsx` at `app/connexion/` would never render**: a redirect is
         matched before the filesystem. If sign-in ever does earn its own route,
         this entry comes out in the same commit. */
      {
        source: "/connexion",
        destination: "/compte",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
