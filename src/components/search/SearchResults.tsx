"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageRow } from "@/components/nav/PageRow";
import { T } from "@/components/lang/T";
import { Planete } from "@/components/ornement/Planete";
import { useAccount } from "@/hooks/useAccount";
import { atView, searchCourse } from "@/lib/search";
import { SearchBox } from "./SearchBox";
import { StartPills } from "./StartPills";
import styles from "./SearchResults.module.css";

/**
 * The answer to `?q=`.
 *
 * A Client Component because the query is in the URL and the level is in the
 * session — but a leaf: the route above it reads neither and stays static
 * (`AGENTS.md` §8). Searching itself is synchronous over the manifest, so there
 * is no loading state to render and nothing to wait for offline.
 *
 * **The view groups the results, it does not cut them.** Everywhere else the
 * chosen levels filter what the course offers (§6, #86); a page someone has typed
 * the name of is not an offer, and dropping it would answer « ça n'existe pas »
 * to a question about a page that does exist. So out-of-level matches keep
 * their own labelled group under the rest — visible, and visibly not part of
 * the programme (`docs/decisions.md` #39).
 */
export function SearchResults() {
  const query = (useSearchParams().get("q") ?? "").trim();
  const account = useAccount();
  const view = account?.view ?? "all";

  const hits = searchCourse(query);
  const here = hits.filter((hit) => atView(hit, view));
  const elsewhere = hits.filter((hit) => !atView(hit, view));

  return (
    <>
      <h1 className={styles.title}>
        {query ? (
          <T fr={<>Résultats pour «&nbsp;{query}&nbsp;»</>} es={<>Resultados para «{query}»</>} />
        ) : (
          <T fr="Recherche" es="Búsqueda" />
        )}
      </h1>

      <SearchBox defaultValue={query} />

      {/* Announced politely rather than not at all: a screen reader user who
          submits the form needs to be told the count changed. */}
      <p className={styles.count} role="status">
        {!query ? (
          <T
            fr="Cherchez une leçon, un chapitre ou une page du site."
            es="Busca una lección, un capítulo o una página del sitio."
          />
        ) : hits.length === 0 ? (
          <T fr={`Aucun résultat pour « ${query} ».`} es={`Ningún resultado para «${query}».`} />
        ) : (
          <T
            fr={`${hits.length} résultat${hits.length > 1 ? "s" : ""}`}
            es={`${hits.length} resultado${hits.length > 1 ? "s" : ""}`}
          />
        )}
      </p>

      {here.length > 0 && (
        <ul className={styles.list}>
          {here.map((hit) => (
            <PageRow key={hit.path} {...hit} />
          ))}
        </ul>
      )}

      {elsewhere.length > 0 && (
        <section className={styles.other}>
          <h2 className="label">
            <T fr="À d’autres niveaux" es="En otros niveles" />
          </h2>
          <p className={styles.otherNote}>
            <T
              fr={
                <>
                  {here.length > 0 ? "Ces pages ne sont pas" : "Ce que vous cherchez n’est pas"}{" "}
                  aux niveaux que vous avez choisis, mais elles se lisent normalement.
                </>
              }
              es={
                here.length > 0
                  ? "Estas páginas no están en los niveles que has elegido, pero se pueden leer con normalidad."
                  : "Lo que buscas no está en los niveles que has elegido, pero se puede leer con normalidad."
              }
            />{" "}
            <Link href="/compte#vue">
              <T fr="Changer" es="Cambiar" />
            </Link>
          </p>
          <ul className={styles.list}>
            {elsewhere.map((hit) => (
              <PageRow key={hit.path} {...hit} />
            ))}
          </ul>
        </section>
      )}

      {query !== "" && hits.length === 0 && (
        <div className={styles.empty}>
          <Planete />
          <p>
            <T
              fr="La recherche porte sur les titres du cours, pas encore sur le texte des leçons. Essayez un mot plus court, ou parcourez le cours."
              es="La búsqueda mira los títulos del curso, todavía no el texto de las lecciones. Prueba con una palabra más corta, o explora el curso."
            />
          </p>
          <StartPills />
        </div>
      )}
    </>
  );
}
