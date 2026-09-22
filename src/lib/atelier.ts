import { createHash, timingSafeEqual } from "node:crypto";

/**
 * Le verrou de l'atelier : un mot de passe partagé devant `/temp` (#81).
 *
 * **Ce module est serveur, et il doit le rester.** Il lit
 * `FRONTEND_PASSWORD`, qui n'a délibérément pas de préfixe `NEXT_PUBLIC_` :
 * une variable préfixée est recopiée telle quelle dans le bundle du
 * navigateur, et le mot de passe serait alors lisible par tout le monde, ce
 * qui est exactement ce que la page prétend empêcher. Il importe `node:crypto`
 * pour la même raison : si ce fichier est un jour importé depuis un composant
 * client, le build casse, et c'est le garde-fou qu'on veut.
 *
 * **Ce que ce verrou vaut, et ce qu'il ne vaut pas.** Il tient les visiteurs
 * du site déployé à l'écart d'un chapitre qui n'est pas pour eux. Il ne rend
 * rien secret : les mêmes pages sont dans un dépôt public (#80, `AGENTS.md`
 * §9b), et c'est voulu. Un mot de passe partagé, un seul, pour tout le monde,
 * et aucun compte derrière.
 *
 * **Il n'a rien à voir avec les comptes** (#37). Il ne lit pas de session, ne
 * touche pas Supabase, et ne protège aucune donnée d'apprenant : les coches
 * sont protégées par RLS et rien d'autre.
 */

/** Le nom du cookie, écrit par l'action et relu par le proxy. Une seule fois. */
export const ATELIER_COOKIE = "atelier";

/**
 * Le jeton attendu dans le cookie, ou `null` si aucun mot de passe n'est posé.
 *
 * **C'est un condensat, pas le mot de passe.** Le cookie voyage à chaque
 * requête et se lit dans n'importe quel navigateur ; y écrire le mot de passe
 * en clair le donnerait à quiconque ouvre l'inspecteur sur la machine où la
 * classe a eu lieu, et ce mot de passe est le même pour tout le monde.
 *
 * `null` veut dire « la variable n'est pas posée sur ce déploiement », et les
 * deux appelants le traitent en **refusant tout le monde**. Ouvrir l'atelier
 * quand la configuration manque serait la panne silencieuse habituelle : le
 * verrou ne servirait plus à rien et rien ne le dirait.
 */
export function atelierToken(): string | null {
  const password = process.env.FRONTEND_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(`atelier:${password}`).digest("hex");
}

/**
 * Deux chaînes égales, comparées en temps constant.
 *
 * `timingSafeEqual` jette quand les longueurs diffèrent, donc on passe par des
 * condensats : ils font toujours 32 octets, et comparer leurs longueurs ne dit
 * donc rien sur celle du mot de passe.
 */
export function sameSecret(given: string, expected: string): boolean {
  const a = createHash("sha256").update(given).digest();
  const b = createHash("sha256").update(expected).digest();
  return timingSafeEqual(a, b);
}

/**
 * Le mot de passe frappé à la porte est-il le bon ?
 *
 * **À ne pas confondre avec `atelierToken()`, et c'est déjà arrivé.** Le jeton
 * est ce que porte le *cookie* ; ce que tape un visiteur est le mot de passe en
 * clair. Comparer l'un à l'autre compile parfaitement, ne casse rien, et refuse
 * simplement tout le monde — y compris avec le bon mot de passe. C'est le
 * genre de panne que seul un essai bout en bout montre, puisque ni les types ni
 * le build n'ont d'opinion là-dessus.
 *
 * Deux appelants, deux fonctions : le proxy compare un cookie à un jeton, la
 * porte compare une frappe à la variable.
 */
export function atelierPasswordOk(given: string): boolean {
  const password = process.env.FRONTEND_PASSWORD;
  if (!password) return false;
  return sameSecret(given, password);
}
