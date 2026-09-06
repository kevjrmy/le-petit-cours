"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { PageRow } from "@/components/nav/PageRow";
import { useAccount } from "@/hooks/useAccount";
import { atLevel, searchCourse } from "@/lib/search";
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
 * **The level groups the results, it does not cut them.** Everywhere else the
 * chosen level filters what the course offers (§6, #35); a page someone has typed
 * the name of is not an offer, and dropping it would answer « ça n'existe pas »
 * to a question about a page that does exist. So out-of-level matches keep
 * their own labelled group under the rest — visible, and visibly not part of
 * the programme (`docs/decisions.md` #39).
 */
export function SearchResults() {
  const query = (useSearchParams().get("q") ?? "").trim();
  const account = useAccount();
  const level = account?.level ?? null;

  const hits = searchCourse(query);
  const here = hits.filter((hit) => atLevel(hit, level));
  const elsewhere = hits.filter((hit) => !atLevel(hit, level));

  return (
    <>
      <h1 className={styles.title}>
        {query ? <>Résultats pour «&nbsp;{query}&nbsp;»</> : "Recherche"}
      </h1>

      <SearchBox defaultValue={query} />

      {/* Announced politely rather than not at all: a screen reader user who
          submits the form needs to be told the count changed. */}
      <p className={styles.count} role="status">
        {!query
          ? "Cherchez une leçon, un chapitre ou une page du site."
          : hits.length === 0
            ? `Aucun résultat pour « ${query} ».`
            : `${hits.length} résultat${hits.length > 1 ? "s" : ""}`}
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
          <h2 className={styles.otherTitle}>À d’autres niveaux</h2>
          <p className={styles.otherNote}>
            {here.length > 0 ? "Ces pages ne sont pas" : "Ce que vous cherchez n’est pas"} au
            programme <strong>{level}</strong>, mais elles se lisent normalement.{" "}
            <Link href="/compte">Changer de niveau</Link>
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
          <p>
            La recherche porte sur les titres du cours, pas encore sur le texte
            des leçons. Essayez un mot plus court, ou partez d’un chapitre.
          </p>
          <StartPills />
        </div>
      )}
    </>
  );
}
