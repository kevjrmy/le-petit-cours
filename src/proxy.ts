import { NextResponse, type NextRequest } from "next/server";
import { ATELIER_COOKIE, atelierToken, sameSecret } from "@/lib/atelier";

/**
 * Le seul proxy du projet, et il ne sert qu'à une chose : le verrou de
 * l'atelier (#81).
 *
 * **Ce n'est pas un proxy de session, et ça ne doit jamais le devenir**
 * (`AGENTS.md` §8, #37). Ce projet n'a pas de client Supabase serveur et n'a
 * besoin d'aucun rafraîchissement de session : les comptes vivent dans des
 * feuilles clientes, l'autorisation est RLS. Ce fichier lit un cookie de mot
 * de passe partagé sur un seul chemin, et c'est tout ce qu'il a le droit de
 * lire. Y ajouter `getUser()` ou une redirection basée sur la session serait
 * une décision nouvelle, pas une extension de celle-ci.
 *
 * **Le `matcher` est ce qui garde le reste du cours statique.** Sans lui, le
 * proxy tournerait sur chaque requête, fichiers de `_next/static` compris. Ici
 * il ne voit que `/temp` et ses enfants, et comme un proxy s'exécute *avant* le
 * cache, les pages de l'atelier restent prérendues : le verrou coûte une
 * redirection, pas le rendu dynamique de quoi que ce soit.
 *
 * **La porte, `/entrer`, est volontairement hors du `matcher`.** Les Server
 * Functions ne sont pas des routes à part : ce sont des POST vers la route qui
 * les contient (doc `proxy.md`). Une action placée sous `/temp` serait donc
 * interceptée par ce proxy avant d'avoir pu vérifier le mot de passe, et la
 * porte ne s'ouvrirait jamais. L'action vit donc sur `/entrer`, où elle
 * refait le contrôle pour son compte plutôt que de faire confiance à ce
 * fichier.
 *
 * **Sans `FRONTEND_PASSWORD`, personne n'entre.** Laisser passer quand la
 * variable manque serait la panne silencieuse : sur un déploiement mal
 * configuré, l'atelier s'ouvrirait à tout le monde et rien n'échouerait.
 */
export function proxy(request: NextRequest) {
  const expected = atelierToken();
  const given = request.cookies.get(ATELIER_COOKIE)?.value;

  if (expected !== null && given !== undefined && sameSecret(given, expected)) {
    return NextResponse.next();
  }

  /* `vers` plutôt que `suivant` : `?suivant=` appartient à la connexion, et
     `signInHref` est le seul endroit qui l'écrit (#70). Deux portes qui se
     partagent un nom de paramètre, c'est la confusion garantie le jour où
     quelqu'un arrive sur l'une avec le lien de l'autre. */
  const gate = new URL("/entrer", request.url);
  gate.searchParams.set("vers", request.nextUrl.pathname);
  return NextResponse.redirect(gate);
}

/* Constantes obligatoires : le matcher est analysé au build et une valeur
   calculée serait ignorée, silencieusement. `/temp` et `/temp/:path*` sont deux
   entrées parce que la seconde ne couvre pas le chemin nu. */
export const config = {
  matcher: ["/temp", "/temp/:path*"],
};
