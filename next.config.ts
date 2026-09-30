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
        destination: "/litterature/l-invitation-au-voyage",
        permanent: false,
      },
      /* The eight classics moved from `lecture` to `litterature`; ids kept (#50). */
      {
        source: "/lecture/cosette-dans-le-bois",
        destination: "/litterature/cosette-dans-le-bois",
        permanent: false,
      },
      {
        source: "/lecture/cyrano-de-bergerac",
        destination: "/litterature/cyrano-de-bergerac",
        permanent: false,
      },
      {
        source: "/lecture/du-cote-de-chez-swann",
        destination: "/litterature/du-cote-de-chez-swann",
        permanent: false,
      },
      {
        source: "/lecture/le-comte-de-monte-cristo",
        destination: "/litterature/le-comte-de-monte-cristo",
        permanent: false,
      },
      {
        source: "/lecture/le-lion-et-le-rat",
        destination: "/litterature/le-lion-et-le-rat",
        permanent: false,
      },
      {
        source: "/lecture/l-invitation-au-voyage",
        destination: "/litterature/l-invitation-au-voyage",
        permanent: false,
      },
      {
        source: "/lecture/phileas-fogg",
        destination: "/litterature/phileas-fogg",
        permanent: false,
      },
      {
        source: "/lecture/romeo-et-juliette",
        destination: "/litterature/romeo-et-juliette",
        permanent: false,
      },
      /* The reading list was dropped, not replaced: its chapter is what is left. */
      {
        source: "/litterature/par-ou-commencer",
        destination: "/litterature",
        permanent: false,
      },
      /* Same slot, new text: the imparfait souvenir was replaced by the film
         summary, so the old path lands on the page that took its place. */
      {
        source: "/traduction/quand-j-etais-petite",
        destination: "/traduction/le-resume-d-un-film",
        permanent: false,
      },
      /* A page that was written and then dropped rather than replaced, so this
         one lands on its chapter: three épreuves to sit are what the chapter is
         for, and a page explaining the barème in front of them was a page
         between the learner and the exam. Nothing took its slot, so there is no
         successor to point at.

         Its id, `delf-comment-ca-se-passe`, is retired and never reused (#50).
         A tick stored against it is now unreadable, which is the honest cost of
         deleting a lesson and the reason ids are not recycled. */
      {
        source: "/delf/comment-ca-se-passe",
        destination: "/delf",
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
