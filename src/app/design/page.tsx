import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Système de design",
  robots: { index: false, follow: false },
};

/* A specimen of every shared pattern in globals.css, on one page.
   It is deliberately absent from src/data/navigation.ts: nothing links here,
   and it is not a lesson. It exists so a visual change can be checked in both
   themes at both breakpoints (AGENTS.md §11) without a lesson to check it on.
   Delete it the day the real pages cover the same ground. */
const SURFACES = [
  ["--surface-app", "var(--surface-app)"],
  ["--surface-1", "var(--surface-1)"],
  ["--surface-2", "var(--surface-2)"],
  ["--surface-3", "var(--surface-3)"],
  ["--surface-sidebar", "var(--surface-sidebar)"],
  ["--accent-soft", "var(--accent-soft)"],
  ["--warn-soft", "var(--warn-soft)"],
  ["--danger-soft", "var(--danger-soft)"],
  ["--success-soft", "var(--success-soft)"],
] as const;

export default function DesignPage() {
  return (
    <main className={`prose ${styles.page}`}>
      <header className={styles.section}>
        <h1>Système de design</h1>
        <p>
          Toutes les formes partagées de <code>globals.css</code>, sur une seule
          page. À vérifier dans les deux thèmes et aux deux largeurs.
        </p>
      </header>

      <section className={styles.section}>
        <h2>Surfaces</h2>
        <div className={styles.swatches}>
          {SURFACES.map(([name, value]) => (
            <div
              key={name}
              className={styles.swatch}
              style={{ background: value }}
            >
              <code>{name}</code>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2>Le français en serif, l’explication en sans</h2>
        <p>
          En francés, cada sustantivo lleva un artículo, y el género no siempre
          coincide con el español:{" "}
          <span className="fr" lang="fr">
            une robe
          </span>{" "}
          no es <em>la ropa</em>, y{" "}
          <span className="fr" lang="fr">
            le sol
          </span>{" "}
          no es <em>el sol</em>.
        </p>
        <div className="example" lang="fr">
          le livre · la table · l’école · les sœurs · un garçon
        </div>
        <p>
          La misma regla en la vía de herencia, explicada en francés :{" "}
          <span className="fr" lang="fr">
            une sœur
          </span>{" "}
          prend un <em>e</em> au féminin.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Blocs de contenu</h2>
        <div className={styles.stack}>
          <div className="rule">
            <strong>La règle.</strong> Le déterminant s’accorde en genre et en
            nombre avec le nom qu’il précède.
          </div>
          <div className="astuce">
            <p className="astuce-hook">
              Pays en <strong>-e</strong> → <strong>en</strong>
            </p>
            <p>en France, en Espagne, en Italie.</p>
          </div>
          <div className="exception">au Mexique, au Cambodge, au Zimbabwe.</div>
          <div className="attention">
            un <span className="fr" lang="fr">œuf</span> se prononce « euf », mais
            des <span className="fr" lang="fr">œufs</span> se prononce « eu ».
          </div>
          <div className="message">
            Un message de l&rsquo;interface — neutre. Rien n&rsquo;est ajouté
            devant, contrairement aux blocs de leçon ci-dessus.
          </div>
          <div className="message message-danger">
            Ce lien n&rsquo;est plus valable. Demandez-en un nouveau.
          </div>
          <div className="message message-success">Nom enregistré.</div>
          <div className={styles.elevated}>
            Une carte posée sur la page — <code>--shadow</code> et{" "}
            <code>--surface-1</code>.
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Tableaux</h2>
        <div className="table-wrap">
          <table>
            <caption>Les articles définis</caption>
            <thead>
              <tr>
                <th scope="col">Genre</th>
                <th scope="col">Français</th>
                <th scope="col">Español</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">masculin</th>
                <td className="fr" lang="fr">le livre</td>
                <td>el libro</td>
              </tr>
              <tr>
                <th scope="row">féminin</th>
                <td className="fr" lang="fr">la table</td>
                <td>la mesa</td>
              </tr>
              <tr>
                <th scope="row">pluriel</th>
                <td className="fr" lang="fr">les écoles</td>
                <td>las escuelas</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Retours d’exercice</h2>
        <p>
          La couleur ne porte jamais le sens toute seule : chaque état dit aussi
          quelque chose.
        </p>
        <div className={styles.states}>
          <span className={`${styles.state} is-correct`}>
            ✓ <span className="fr" lang="fr">la table</span> — juste
          </span>
          <span className={`${styles.state} is-wrong`}>
            ✗ <span className="fr" lang="fr">le table</span> — faux
          </span>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Boutons et listes</h2>
        <div className={styles.states}>
          <button type="button" className="button button-primary">
            J&rsquo;ai terminé
          </button>
          <button type="button" className="button">
            Recommencer
          </button>
          <button type="button" className="button button-primary" disabled>
            Enregistrer
          </button>
          <button type="button" className="button" disabled>
            Désactivé
          </button>
        </div>
        <p style={{ fontSize: "0.8rem", color: "var(--text-3)" }}>
          Un bouton désactivé le montre — et quelque chose à côté dit pourquoi.
        </p>
        <ul>
          <li>Une liste dans la colonne de lecture.</li>
          <li>
            Le reset met les marges à zéro, donc <code>.prose</code> les
            redéclare — puces comprises.
          </li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Liens et focus</h2>
        <p>
          <Link href="/">Retour à l’accueil</Link> — tabulez jusqu’ici pour voir
          l’anneau de focus.
        </p>
      </section>
    </main>
  );
}
