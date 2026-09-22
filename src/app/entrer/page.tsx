import type { Metadata } from "next";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ATELIER_COOKIE, atelierPasswordOk, atelierToken } from "@/lib/atelier";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Atelier",
  description: "L’atelier demande un mot de passe.",
  /* Une porte n'a rien à faire dans un index, et les pages derrière elle non
     plus : le chapitre `temp` est déjà hors du sitemap (#80, #81). */
  robots: { index: false, follow: false },
};

/** Trente jours : une porte qu'on repasse à chaque cours n'est pas une porte. */
const UN_MOIS = 60 * 60 * 24 * 30;

/**
 * **Toujours vers l'atelier, jamais ailleurs.** `vers` arrive d'une requête,
 * donc de n'importe qui : sans ce filtre, `/entrer?vers=https://…` ferait de
 * cette page une redirection ouverte, et le lien serait d'autant plus crédible
 * qu'il porterait le nom de domaine du cours.
 *
 * On vérifie le préfixe **et** on écarte `//`, qui est une URL absolue
 * déguisée que `startsWith("/")` laisse passer.
 */
function versLAtelier(vers: unknown): string {
  if (typeof vers !== "string") return "/temp";
  if (vers.startsWith("//")) return "/temp";
  return vers === "/temp" || vers.startsWith("/temp/") ? vers : "/temp";
}

/**
 * La porte de l'atelier (#81).
 *
 * **Aucun composant client.** Le formulaire est un `<form>` qui appelle une
 * Server Function, et l'erreur revient par l'URL plutôt que par un état React :
 * un mot de passe ne doit pas exister dans le bundle du navigateur, et le
 * chemin le plus sûr pour qu'il n'y soit pas est qu'aucune de ces lignes ne
 * parte côté client.
 *
 * **L'action refait le contrôle.** Le proxy garde `/temp` ; cette route est
 * hors de son `matcher`, donc rien ne l'a vérifiée avant d'arriver ici. C'est
 * la règle générale des Server Functions — on n'autorise pas dans le proxy, on
 * autorise dans la fonction (doc `proxy.md`) — et ici c'est aussi la seule
 * façon que la porte s'ouvre.
 *
 * La page lit `searchParams`, donc elle est rendue à la demande. C'est sans
 * conséquence : elle ne fait partie ni du cours ni de ce qui doit marcher hors
 * ligne, et le reste du site ne la traverse pas (`AGENTS.md` §8).
 */
export default async function Page({ searchParams }: PageProps<"/entrer">) {
  const params = await searchParams;
  const vers = versLAtelier(params.vers);
  const erreur = params.erreur !== undefined;
  const configure = atelierToken() !== null;

  async function entrer(formData: FormData) {
    "use server";

    const cible = versLAtelier(formData.get("vers"));
    const attendu = atelierToken();
    const donne = String(formData.get("motdepasse") ?? "");

    if (attendu === null || !atelierPasswordOk(donne)) {
      /* Le mot de passe ne repart pas dans l'URL, évidemment, et la raison de
         l'échec n'est pas détaillée : « pas configuré » et « pas le bon » se
         disent pareil à celui qui frappe, et se distinguent sur la page par
         l'état de la variable, pas par la tentative. */
      redirect(`/entrer?vers=${encodeURIComponent(cible)}&erreur=1`);
    }

    const bocal = await cookies();
    bocal.set(ATELIER_COOKIE, attendu, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: UN_MOIS,
      secure: process.env.NODE_ENV === "production",
    });

    redirect(cible);
  }

  return (
    <article className="prose">
      <header className={styles.header}>
        <h1>Atelier</h1>
        <p className={styles.blurb}>
          Ce chapitre sert un cours en particulier. Il demande un mot de passe.
        </p>
      </header>

      {configure ? (
        <form action={entrer} className={styles.form}>
          <input type="hidden" name="vers" value={vers} />

          <label className={styles.label} htmlFor="motdepasse">
            Mot de passe
          </label>
          <div className={styles.row}>
            <input
              id="motdepasse"
              name="motdepasse"
              type="password"
              className={`${styles.input} ${erreur ? "is-wrong" : ""}`}
              autoComplete="current-password"
              required
              aria-describedby={erreur ? "erreur" : undefined}
            />
            <button type="submit" className="button button-primary">
              Entrer
            </button>
          </div>

          {erreur && (
            <p id="erreur" className={styles.erreur} role="alert">
              Ce n’est pas le bon mot de passe.
            </p>
          )}
        </form>
      ) : (
        <div className="attention">
          l’atelier est fermé sur ce déploiement : la variable{" "}
          <code>FRONTEND_PASSWORD</code> n’y est pas posée. Personne ne peut
          entrer tant qu’elle manque, y compris celui qui connaît le mot de
          passe.
        </div>
      )}

      <p className={styles.sortie}>
        <Link href="/">Retourner au cours</Link>
      </p>
    </article>
  );
}
