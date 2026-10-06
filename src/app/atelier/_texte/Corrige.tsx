import type { ReactNode } from "react";
import styles from "./Corrige.module.css";

/**
 * Le corrigé, caché jusqu'à ce qu'on le demande. L'élève cherche d'abord ses
 * fautes dans sa copie ; le corrigé affiché d'emblée se lirait sans chercher.
 *
 * `<details>` plutôt qu'un état React : le bouton s'ouvre sans JavaScript, la
 * page reste un composant serveur (`AGENTS.md` §4), et le clavier et les
 * lecteurs d'écran savent déjà s'en servir.
 *
 * `voir` et `cacher` renomment le bouton : une page qui commence par le texte
 * à trous cache la copie d'origine de la même façon, sous « Voir ta copie ».
 */
export function Corrige({
  children,
  voir = "Voir le corrigé",
  cacher = "Cacher le corrigé",
}: {
  children: ReactNode;
  voir?: string;
  cacher?: string;
}) {
  return (
    <details className={styles.corrige}>
      <summary className={`button button-primary ${styles.toggle}`}>
        <span className={styles.closed}>{voir}</span>
        <span className={styles.open}>{cacher}</span>
      </summary>
      <div className={styles.body}>{children}</div>
    </details>
  );
}
